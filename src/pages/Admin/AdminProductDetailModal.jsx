import { useEffect, useState } from 'react';
import { Cookie as CookieIcon, Plus, Trash2, Upload, X } from 'lucide-react';
import { formatCurrency } from '@/utils/format';
import { useCategories } from '@/hooks/useCategories';
import { useProducts } from '@/hooks/useProducts';
import { getImageSizeError } from '@/utils/fileValidation';

export default function AdminProductDetailModal({ product, startInEdit, onClose, onSave }) {
  const [editing, setEditing] = useState(Boolean(startInEdit));
  const { items: categories, fetchCategories } = useCategories();
  const { uploadImage } = useProducts();
  const [imageError, setImageError] = useState('');

  const [form, setForm] = useState({
    name: product.name,
    description: product.description,
    price: product.price,
    stockQuantity: product.stockQuantity ?? '',
    categoryId: product.category?.id ?? '',
    isBestSeller: product.bestSeller ?? false,
  });
  const [variants, setVariants] = useState(
    (product.variants ?? []).map((v) => ({ id: v.id, label: v.label, price: v.price }))
  );
  const [existingImages, setExistingImages] = useState(product.images ?? []);
  const [newImageFiles, setNewImageFiles] = useState([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (editing && categories.length === 0) fetchCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editing]);

  const handleChange = (field) => (e) => {
    const value = field === 'isBestSeller' ? e.target.checked : e.target.value;
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const addVariant = () => setVariants((prev) => [...prev, { label: '', price: '' }]);
  const updateVariant = (index, field, value) =>
    setVariants((prev) => prev.map((v, i) => (i === index ? { ...v, [field]: value } : v)));
  const removeVariant = (index) => setVariants((prev) => prev.filter((_, i) => i !== index));

  const removeExistingImage = (imageId) =>
    setExistingImages((prev) => prev.filter((img) => img.id !== imageId));

  const handleNewFiles = (e) => {
    const files = Array.from(e.target.files);
    e.target.value = '';

    const sizeError = files.map(getImageSizeError).find(Boolean);
    if (sizeError) {
      setImageError(sizeError);
      return;
    }

    setImageError('');
    setNewImageFiles((prev) => [...prev, ...files]);
  };

  const removeNewFile = (index) =>
    setNewImageFiles((prev) => prev.filter((_, i) => i !== index));

  const imagesChanged =
    existingImages.length !== (product.images?.length ?? 0) ||
    existingImages.some((img, i) => img.id !== product.images?.[i]?.id);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);

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
      ...(imagesChanged ? { images: existingImages.map((img) => img.url) } : {}),
    };

    await onSave(product.id, payload);

    for (const file of newImageFiles) {
      // eslint-disable-next-line no-await-in-loop
      await uploadImage(product.id, file);
    }

    setSaving(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink-900/50 p-4">
      <div className="flex max-h-[90vh] w-full max-w-4xl flex-col rounded-2xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-gray-200 p-5">
          <h2 className="text-lg font-extrabold text-ink-900">
            {editing ? 'Edit Product' : product.name}
          </h2>
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="text-ink-400 transition-colors hover:text-primary-600"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* Images */}
            <div>
              <p className="mb-3 text-sm font-bold text-ink-900">Images</p>

              {existingImages.length === 0 && newImageFiles.length === 0 ? (
                <div className="flex h-48 items-center justify-center rounded-xl bg-primary-50 text-primary-300">
                  <CookieIcon size={40} strokeWidth={1.5} />
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-3">
                  {existingImages.map((image) => (
                    <div key={image.id} className="relative aspect-square overflow-hidden rounded-lg bg-primary-50">
                      <img src={image.url} alt={product.name} className="h-full w-full object-cover" />
                      {editing && (
                        <button
                          type="button"
                          aria-label="Remove image"
                          onClick={() => removeExistingImage(image.id)}
                          className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-white/90 text-ink-600 shadow hover:text-primary-600"
                        >
                          <X size={12} />
                        </button>
                      )}
                    </div>
                  ))}
                  {newImageFiles.map((file, index) => (
                    <div key={file.name + index} className="relative aspect-square overflow-hidden rounded-lg bg-primary-50">
                      <img
                        src={URL.createObjectURL(file)}
                        alt={file.name}
                        className="h-full w-full object-cover"
                      />
                      <button
                        type="button"
                        aria-label="Remove new image"
                        onClick={() => removeNewFile(index)}
                        className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-white/90 text-ink-600 shadow hover:text-primary-600"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {editing && (
                <label className="mt-3 flex cursor-pointer items-center gap-2 rounded-lg border border-dashed border-gray-300 px-4 py-3 text-sm font-medium text-ink-500 hover:border-primary-400 hover:text-primary-600">
                  <Upload size={16} />
                  Add images
                  <input type="file" accept="image/*" multiple onChange={handleNewFiles} className="hidden" />
                </label>
              )}
              {imageError && <p className="mt-2 text-sm text-primary-600">{imageError}</p>}
            </div>

            {/* Fields */}
            <div>
              {editing ? (
                <form id="product-edit-form" onSubmit={handleSave} className="space-y-4">
                  <div>
                    <label className="mb-1.5 block text-sm font-bold text-ink-900">Name</label>
                    <input
                      required
                      value={form.name}
                      onChange={handleChange('name')}
                      className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm text-ink-900 focus:border-primary-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-bold text-ink-900">Description</label>
                    <textarea
                      required
                      rows={3}
                      value={form.description}
                      onChange={handleChange('description')}
                      className="w-full resize-none rounded-lg border border-gray-200 px-4 py-2.5 text-sm text-ink-900 focus:border-primary-500 focus:outline-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="mb-1.5 block text-sm font-bold text-ink-900">Price</label>
                      <input
                        required
                        type="number"
                        min={0}
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
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-bold text-ink-900">Category</label>
                    <select
                      required
                      value={form.categoryId}
                      onChange={handleChange('categoryId')}
                      className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm text-ink-900 focus:border-primary-500 focus:outline-none"
                    >
                      <option value="">Select a category</option>
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      id="edit-isBestSeller"
                      type="checkbox"
                      checked={form.isBestSeller}
                      onChange={handleChange('isBestSeller')}
                      className="h-4 w-4 rounded border-gray-300 text-primary-500 focus:ring-primary-500"
                    />
                    <label htmlFor="edit-isBestSeller" className="text-sm font-bold text-ink-900">
                      Mark as Best Seller
                    </label>
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-bold text-ink-900">
                        Variants <span className="font-normal text-ink-400">(optional)</span>
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
                          <div key={variant.id ?? index} className="flex items-center gap-3">
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
                </form>
              ) : (
                <dl className="space-y-4 text-sm">
                  <div>
                    <dt className="font-bold text-ink-900">Description</dt>
                    <dd className="mt-1 text-ink-500">{product.description}</dd>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <dt className="font-bold text-ink-900">Price</dt>
                      <dd className="mt-1 text-ink-500">{formatCurrency(product.price)}</dd>
                    </div>
                    <div>
                      <dt className="font-bold text-ink-900">Stock</dt>
                      <dd className="mt-1 text-ink-500">
                        {product.stockQuantity ?? 'Unlimited'}
                      </dd>
                    </div>
                  </div>
                  <div>
                    <dt className="font-bold text-ink-900">Category</dt>
                    <dd className="mt-1 text-ink-500">{product.category?.name}</dd>
                  </div>
                  <div>
                    <dt className="font-bold text-ink-900">Best Seller</dt>
                    <dd className="mt-1 text-ink-500">{product.bestSeller ? 'Yes' : 'No'}</dd>
                  </div>
                  <div>
                    <dt className="font-bold text-ink-900">Rating</dt>
                    <dd className="mt-1 text-ink-500">
                      {product.averageRating ?? 0} / 5 ({product.reviewCount ?? 0} reviews)
                    </dd>
                  </div>
                  {product.variants?.length > 0 && (
                    <div>
                      <dt className="font-bold text-ink-900">Variants</dt>
                      <dd className="mt-1 space-y-1 text-ink-500">
                        {product.variants.map((v) => (
                          <div key={v.id} className="flex justify-between">
                            <span>{v.label}</span>
                            <span>{formatCurrency(v.price)}</span>
                          </div>
                        ))}
                      </dd>
                    </div>
                  )}
                </dl>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 border-t border-gray-200 p-5">
          {editing ? (
            <>
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg bg-gray-100 px-5 py-2.5 text-sm font-bold text-ink-900 transition-colors hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                form="product-edit-form"
                disabled={saving}
                className="rounded-lg bg-primary-500 px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-primary-600 disabled:opacity-50"
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={() => setEditing(true)}
              className="rounded-lg bg-primary-500 px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-primary-600"
            >
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
