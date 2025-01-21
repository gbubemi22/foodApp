import * as dotenv from 'dotenv';
dotenv.config();
import { v4 as uuidv4 } from 'uuid';
import { validateFileType } from './util.js';
import AWS from 'aws-sdk';

import fs from 'fs';
import { BadRequestError } from './error.js';

AWS.config.update({
  accessKeyId:
    (process.env.AWS_ACCESS_KEY_ID as string) || 'AKIA5V6I64EAJ4OERKFY',
  secretAccessKey:
    (process.env.AWS_SECRET_ACCESS_KEY as string) ||
    '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',
  region: (process.env.BUCKET_REGION as string) || 'eu-north-1',
});

//Create an S3 instance
const s3 = new AWS.S3();

//Function to upload files to S3

export const uploadToS3 = async (file: any) => {
  // Check if a file is provided
  if (!file) {
    throw new BadRequestError('No file provided for upload.');
  }

  const key = `${uuidv4()}_${file.mimetype.replace('/', '-')}`;

  console.log(key);

  const params = {
    Bucket: 'paynflex',
    Key: key,
    Body: file.data,
    ContentType: file.mimetype,
  };

  try {
    // Upload the file to S3
    await s3.upload(params).promise();

    // Return the S3 URL
    return `https://${params.Bucket}.s3.amazonaws.com/${key}`;
  } catch (error) {
    // Handle errors appropriately (e.g., logging, throwing, etc.)
    console.error('Error uploading file to S3:', error);
    throw error;
  }
};

export const uploadMultipleAws = async (files: any) => {
  try {
    const uploadedUrls = [];

    for (const file of files) {
      const maxFileSize = 70 * 1024 * 1024; // 70MB in bytes
      if (file.size > maxFileSize) {
        throw new BadRequestError(
          'File size exceeds the maximum allowed limit (70MB).'
        );
      }

      if (!validateFileType(file)) {
        throw new BadRequestError(
          'Unsupported file type. Only JPEG, PNG, and GIF files are allowed.'
        );
      }

      const key = `${uuidv4()}_${file.mimetype.replace('/', '-')}`;

      console.log(key);

      const params = {
        Bucket: 'paynflex',
        Key: key,
        Body: file.data,
        ContentType: file.mimetype,
      };

      // Upload the file to S3
      const { Location } = await s3.upload(params).promise();
      uploadedUrls.push(Location);
      // return uploadedUrls;
    }
    return uploadedUrls;
  } catch (error) {
    console.error('Error uploading files to AWS S3:', error);
    throw error;
  }
};