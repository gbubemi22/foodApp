import * as dotenv from 'dotenv';
dotenv.config();
import { v4 as uuidv4 } from 'uuid';
import { Readable } from 'stream'; // Import Readable for buffer streams
import { validateFileType } from './util.js';
import { BadRequestError } from './error.js';
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME as string,
  api_key: process.env.CLOUDINARY_API_KEY as string,
  api_secret: process.env.CLOUDINARY_API_SECRET as string,
});

// Helper to upload a buffer to Cloudinary
const uploadStreamToCloudinary = (buffer: Buffer, publicId: string) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        public_id: publicId,
        resource_type: 'auto', // Auto-detect file type
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );

    Readable.from(buffer).pipe(stream); // Stream the buffer to Cloudinary
  });
};

// Function to upload a single file to Cloudinary
export const uploadToCloudinary = async (file: any) => {
  // Check if a file is provided
  if (!file) {
    throw new BadRequestError('No file provided for upload.');
  }

  try {
    const publicId = `${uuidv4()}_${file.mimetype.replace('/', '-')}`;
    const result: any = await uploadStreamToCloudinary(file.data, publicId);
    return result.secure_url;
  } catch (error) {
    console.error('Error uploading file to Cloudinary:', error);
    throw error;
  }
};

// Function to upload multiple files to Cloudinary
export const uploadMultipleToCloudinary = async (files: any) => {
  try {
    const uploadedUrls = [];

    for (const file of files) {
      const maxFileSize = 5 * 1024 * 1024; // 5MB in bytes
      if (file.size > maxFileSize) {
        throw new BadRequestError(
          'File size exceeds the maximum allowed limit (5MB).'
        );
      }

      if (!validateFileType(file)) {
        throw new BadRequestError(
          'Unsupported file type. Only JPEG, PNG, and GIF files are allowed.'
        );
      }

      const publicId = `${uuidv4()}_${file.mimetype.replace('/', '-')}`;
      const result: any = await uploadStreamToCloudinary(file.data, publicId);
      uploadedUrls.push(result.secure_url);
    }

    return uploadedUrls;
  } catch (error) {
    console.error('Error uploading files to Cloudinary:', error);
    throw error;
  }
};
