import { useEffect, useState } from 'react';
import { Plus, Trash2, Upload, X } from 'lucide-react';
import { useCategories } from '@/hooks/useCategories';
import { useProducts } from '@/hooks/useProducts';
import { getImageSizeError } from '@/utils/fileValidation';

const initialForm = {
  name: '',
  description: '',
  price: '',
  stockQuantity: '',
  categoryId: '',
  isBestSeller: false,
};

export default function AdminCreateProductForm() {
  const { items: categories, status: categoriesStatus, fetchCategories } = useCategories();
  const { addProduct, uploadImage, mutationStatus } = useProducts();

  const [form, setForm] = useState(initialForm);
  const [variants, setVariants] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [uploadingImages, setUploadingImages] = useState(false);

  useEffect(() => {
    fetchCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (field) => (e) => {
    const value = field === 'isBestSeller' ? e.target.checked : e.target.value;
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const addVariant = () => setVariants((prev) => [...prev, { label: '', price: '' }]);

  const updateVariant = (index, field, value) =>
    setVariants((prev) =>
      prev.map((v, i) => (i === index ? { ...v, [field]: value } : v))
    );

  const removeVariant = (index) =>
    setVariants((prev) => prev.filter((_, i) => i !== index));

  const handleFilesChange = (e) => {
    const files = Array.from(e.target.files);
    e.target.value = '';

    const sizeError = files.map(getImageSizeError).find(Boolean);
    if (sizeError) {
      setError(sizeError);
      return;
    }

    setError('');
    setImageFiles((prev) => [...prev, ...files]);
  };

  const removeImageFile = (index) =>
    setImageFiles((prev) => prev.filter((_, i) => i !== index));

  const resetForm = () => {
    setForm(initialForm);
    setVariants([]);
    setImageFiles([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    const payload = {
      name: form.name,
      description: form.description,
      price: Number(form.price),
      stockQuantity: form.stockQuantity === '' ? null : Number(form.stockQuantity),
      categoryId: Number(form.categoryId),
      isBestSeller: form.isBestSeller,
      variants: variants
        .filter((v) => v.label.trim() && v.price !== '')
        .map((v) => ({ label: v.label.trim(), price: Number(v.price) })),
    };

    const result = await addProduct(payload);
    if (result.meta.requestStatus !== 'fulfilled') {
      setError(result.error?.message || 'Failed to create product.');
      return;
    }

    const createdProduct = result.payload;

    if (imageFiles.length > 0) {
      setUploadingImages(true);
      for (const file of imageFiles) {
        // eslint-disable-next-line no-await-in-loop
        await uploadImage(createdProduct.id, file);
      }
      setUploadingImages(false);
    }

    setSuccess(true);
    resetForm();
  };

  const submitting = mutationStatus === 'loading' || uploadingImages;

  return (
    <form onSubmit={handleSubmit} className="mt-6 rounded-xl border border-gray-200 bg-white p-6">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className="mb-1.5 block text-sm font-bold text-ink-900">Name</label>
          <input
            required
            value={form.name}
            onChange={handleChange('name')}
            className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm text-ink-900 focus:border-primary-500 focus:outline-none"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="mb-1.5 block text-sm font-bold text-ink-900">Description</label>
          <textarea
            required
            rows={3}
            value={form.description}
            onChange={handleChange('description')}
            className="w-full resize-none rounded-lg border border-gray-200 px-4 py-2.5 text-sm text-ink-900 focus:border-primary-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-bold text-ink-900">Price</label>
          <input
            required
            type="number"
            min={0}
            step="0.01"
            value={form.price}
            onChange={handleChange('price')}
            className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm text-ink-900 focus:border-primary-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-bold text-ink-900">
            Stock <span className="font-normal text-ink-400">(blank = unlimited)</span>
          </label>
          <input
            type="number"
            min={0}
            value={form.stockQuantity}
            onChange={handleChange('stockQuantity')}
            className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm text-ink-900 focus:border-primary-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-bold text-ink-900">Category</label>
          <select
            required
            value={form.categoryId}
            onChange={handleChange('categoryId')}
            className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm text-ink-900 focus:border-primary-500 focus:outline-none"
          >
            <option value="">
              {categoriesStatus === 'loading' ? 'Loading categories...' : 'Select a category'}
            </option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2 pt-6">
          <input
            id="isBestSeller"
            type="checkbox"
            checked={form.isBestSeller}
            onChange={handleChange('isBestSeller')}
            className="h-4 w-4 rounded border-gray-300 text-primary-500 focus:ring-primary-500"
          />
          <label htmlFor="isBestSeller" className="text-sm font-bold text-ink-900">
            Mark as Best Seller
          </label>
        </div>
      </div>

      <div className="mt-6">
        <div className="flex items-center justify-between">
          <label className="text-sm font-bold text-ink-900">
            Variants <span className="font-normal text-ink-400">(optional — e.g. Box of 4/8)</span>
          </label>
          <button
            type="button"
            onClick={addVariant}
            className="flex items-center gap-1 text-sm font-bold text-primary-600 hover:text-primary-700"
          >
            <Plus size={14} />
            Add Variant
          </button>
        </div>

        {variants.length > 0 && (
          <div className="mt-3 space-y-3">
            {variants.map((variant, index) => (
              <div key={index} className="flex items-center gap-3">
                <input
                  placeholder="Label (e.g. Box of 4)"
                  value={variant.label}
                  onChange={(e) => updateVariant(index, 'label', e.target.value)}
                  className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm text-ink-900 focus:border-primary-500 focus:outline-none"
                />
                <input
                  type="number"
                  min={0}
                  placeholder="Price"
                  value={variant.price}
                  onChange={(e) => updateVariant(index, 'price', e.target.value)}
                  className="w-40 shrink-0 rounded-lg border border-gray-200 px-4 py-2.5 text-sm text-ink-900 focus:border-primary-500 focus:outline-none"
                />
                <button
                  type="button"
                  aria-label="Remove variant"
                  onClick={() => removeVariant(index)}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-ink-600 hover:bg-primary-100 hover:text-primary-600"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-6">
        <label className="mb-1.5 block text-sm font-bold text-ink-900">Product Images</label>
        <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-dashed border-gray-300 px-4 py-3 text-sm font-medium text-ink-500 hover:border-primary-400 hover:text-primary-600">
          <Upload size={16} />
          Click to upload images
          <input type="file" accept="image/*" multiple onChange={handleFilesChange} className="hidden" />
        </label>

        {imageFiles.length > 0 && (
          <ul className="mt-3 space-y-2">
            {imageFiles.map((file, index) => (
              <li
                key={file.name + index}
                className="flex items-center justify-between rounded-lg bg-gray-50 px-3 py-2 text-sm text-ink-700"
              >
                {file.name}
                <button
                  type="button"
                  aria-label="Remove image"
                  onClick={() => removeImageFile(index)}
                  className="text-ink-400 hover:text-primary-600"
                >
                  <X size={14} />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {error && <p className="mt-4 text-sm text-primary-600">{error}</p>}
      {success && (
        <p className="mt-4 text-sm font-medium text-green-700">Product created successfully.</p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="mt-6 rounded-lg bg-primary-500 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-primary-600 disabled:opacity-50"
      >
        {uploadingImages ? 'Uploading images...' : submitting ? 'Creating...' : 'Create Product'}
      </button>
    </form>
  );
}
