export const calculateMaskSize = (
  containerWidth: number,
  containerHeight: number,
  baseWidth: number = 150
): number => {
  // Use the smaller dimension to ensure mask fits within thumbnail
  const minDimension = Math.min(containerWidth, containerHeight);
  // Calculate scale factor based on typical full-size image dimensions
  const scaleFactor = minDimension / 800; // Assuming 800px as reference size
  return baseWidth * scaleFactor;
};