export const MAX_IMAGE_SIZE_MB = 10;

export const getImageSizeError = (file) => {
  const maxBytes = MAX_IMAGE_SIZE_MB * 1024 * 1024;
  if (file.size > maxBytes) {
    return `"${file.name}" is ${(file.size / (1024 * 1024)).toFixed(1)}MB — max allowed size is ${MAX_IMAGE_SIZE_MB}MB.`;
  }
  return null;
};
