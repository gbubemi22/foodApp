//////  For customers  ////////

import { NotFoundError } from "../../utils/error.js";
import Item from "../store/model.js";

export const listAll = async () => {
     const result = await Item.find({});
   
     return {
       success: true,
       message: `fetched successfully`,
       data: result,
     };
   };
   
   export const listOneForCustomer = async (itemId: string) => {
     const result = await Item.findById(itemId);
   
     if (!result) {
       throw new NotFoundError(`Item not found`);
     }
   
     return {
       success: true,
       message: `fetched successfully`,
       data: result,
     };
   };
   
   export const listFreshFoodForCustomer = async () => {
     const result = await Item.find({ category: "Fresh_food" });
   
     return {
       success: true,
       message: `fetched successfully`,
       data: result,
     };
   };
   
   export const listFoodForCustomer = async () => {
     const result = await Item.find({ category: "Food" });
   
     return {
       success: true,
       message: `fetched successfully`,
       data: result,
     };
   };
   
   export const listExtrasForCustomer = async () => {
     const result = await Item.find({ category: "Extras" });
   
     return {
       success: true,
       message: `fetched successfully`,
       data: result,
     };
   };
   