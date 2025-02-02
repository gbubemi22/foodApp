import mongoose from "mongoose";
export type RoleDocument = {
    name: string;
};
declare const Role: mongoose.Model<RoleDocument, {}, {}, {}, mongoose.Document<unknown, {}, RoleDocument> & RoleDocument & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, any>;
export default Role;
