
import imageCompression from 'browser-image-compression';

// Options for thumbnail/cover images
const thumbnailOptions = {
  maxSizeMB: 1,
  maxWidthOrHeight: 1280,
  useWebWorker: true,
  fileType: 'image/jpeg',
};

// Options for gallery images
const galleryOptions = {
  maxSizeMB: 0.8,
  maxWidthOrHeight: 1000,
  useWebWorker: true,
  fileType: 'image/jpeg',
};

// Maximum allowed file size before optimization (5MB)
export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB in bytes

/**
 * Validates if a file is within the size limit
 * @param file The file to validate
 * @returns True if valid, false if too large
 */
export const validateFileSize = (file: File): boolean => {
  return file.size <= MAX_FILE_SIZE;
};

/**
 * Optimizes a single image file
 * @param file The image file to optimize
 * @param isThumbail Whether this is a thumbnail (true) or gallery image (false)
 * @returns Promise resolving to the optimized file
 */
export const optimizeImage = async (file: File, isThumbnail: boolean = false): Promise<File> => {
  try {
    const options = isThumbnail ? thumbnailOptions : galleryOptions;
    const compressedFile = await imageCompression(file, options);
    
    // Create a new file with a .jpg extension regardless of original extension
    const fileName = file.name.split('.').slice(0, -1).join('.') || file.name;
    return new File([compressedFile], `${fileName}.jpg`, { 
      type: 'image/jpeg',
      lastModified: new Date().getTime() 
    });
  } catch (error) {
    console.error("Error optimizing image:", error);
    throw error;
  }
};

/**
 * Optimizes multiple image files
 * @param fileList The FileList object containing images
 * @param isThumbnail Whether these are thumbnails (true) or gallery images (false)
 * @returns Promise resolving to an array of optimized files
 */
export const optimizeMultipleImages = async (
  fileList: FileList,
  isThumbnail: boolean = false
): Promise<File[]> => {
  if (!fileList || fileList.length === 0) return [];
  
  const optimizationPromises = Array.from(fileList).map(file => 
    validateFileSize(file) 
      ? optimizeImage(file, isThumbnail)
      : Promise.reject(new Error(`File ${file.name} exceeds the 5MB limit`))
  );
  
  return Promise.all(optimizationPromises);
};
