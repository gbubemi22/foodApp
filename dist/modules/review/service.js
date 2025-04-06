import mongoose from 'mongoose';
import { NotFoundError } from '../../utils/error.js';
import Review from './model.js';
// export const addReview = async (
//   riderId: string,
//   userProfileId: string,
//   comment: string,
//   rating: number
// ) => {
//   const user = await User.findById(profileId);
//   const CreatedUser = await User.findById(userProfileId);
//   if (!user) {
//     throw new NotFoundError('User not found');
//   }
//   if (rating < 1 || rating > 5) {
//     throw new BadRequestError('Rating must be between 1 and 5');
//   }
//   if (CreatedUser?.id === profileId) {
//     throw new BadRequestError('You cannot review yourself');
//   }
//   const checkReview = await Review.findOne({
//     profileId,
//     reviewer: userProfileId,
//   });
//   if (checkReview) {
//     throw new BadRequestError('You have already reviewed this profile');
//   }
//   const newReview = await Review.create({
//     comment,
//     rating,
//     profileId,
//     reviewer: userProfileId,
//   });
//   return {
//     status: true,
//     message: `Review added successfully`,
//     data: newReview,
//   };
// };
export const getUserAverageRating = async (profileId) => {
    const result = await Review.aggregate([
        { $match: { profileId: new mongoose.Types.ObjectId(profileId) } }, // Filter reviews by userId
        { $group: { _id: null, averageRating: { $avg: '$rating' } } }, // Calculate average rating
    ]);
    return {
        status: true,
        message: 'Average rating fetched successfully',
        averageRating: result.length > 0 ? result[0].averageRating : 0,
    };
};
export const getUserReviews = async (userId) => {
    const reviews = await Review.find({ userId })
        .sort({ createdAt: -1 }) // Sort by latest reviews first
        .lean();
    return {
        status: true,
        message: 'User reviews fetched successfully',
        data: reviews,
    };
};
export const updateReview = async (reviewId, profileId, rating, comment) => {
    if (rating < 1 || rating > 5) {
        throw new Error('Rating must be between 1 and 5');
    }
    const existingReview = await Review.findOne({ _id: reviewId, profileId });
    if (!existingReview) {
        throw new NotFoundError('Review not found or unauthorized');
    }
    existingReview.rating = rating;
    if (comment)
        existingReview.comment = comment;
    await existingReview.save();
    return {
        status: true,
        message: 'Review updated successfully',
        data: existingReview,
    };
};
