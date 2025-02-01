import { Types } from 'mongoose';
import { BadRequestError } from './error.js';
import { Redis } from './helper.js';
import { redis } from '../utils/constant.js'

export declare type DefaultResponseInterface = {
  success: boolean;
  message: string;
  error?: string;
  data?: any;
  HttpStatusCode?: number;
};

export type DecodedUser = {
  id: Types.ObjectId;
  email: string;
  phone_number?: string;
};

export const createSession = async (id: string, payload: DecodedUser) => {
  const key = `auth:sessions:${id}`;

  try {
    const redisInstance = new Redis(redis as unknown as string);

     // Serialize the payload before storing it
  const serializedPayload = JSON.stringify(payload);

    // Retrieve current session if it exists
    const currentSession = await redisInstance.get(key);

    // If a session exists, delete it
    if (currentSession) {
      await redisInstance.delete(key);
    }

    // Set the new session with a duration of 30 minutes (60 seconds * 30)
    const duration = 60 * 30;

    const durationFor7Days = duration * 24 * 7;

    // Duration for 1000 days (in minutes)
    const durationFor1000Days = 60 * 60 * 24 * 365 * 2.7;

    await redisInstance.setEx(key, serializedPayload, durationFor1000Days);

    return id;
  } catch (error) {
    console.error('Error creating session:', error);
    throw new BadRequestError(`Error creating session`);
  }
};

export const getSession = async (id: string) => {
  const key = `auth:sessions:${id}`;

  const redisInstance = new Redis(redis as unknown as string);

  // Retrieve current session if it exists
  const session = await redisInstance.get(key);

  if (!session || session === '') return false;

  return session;
};

export const deleteSession = async (id: string) => {
  const key = `auth:sessions:${id}`;
  const redisInstance = new Redis(redis as unknown as string);

  await redisInstance.delete(key);

  return true;
};