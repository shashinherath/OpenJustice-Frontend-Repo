/**
 * Converts a Blob to a Base64 Data URL
 * @param blob The blob to convert
 * @returns A promise that resolves to the data URL string
 */
export const blobToDataURL = (blob: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};
