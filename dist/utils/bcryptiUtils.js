import bcrypt from "bcryptjs";
export const hash = async (string) => {
    const salt = await bcrypt.genSalt(9);
    const hashed = await bcrypt.hash(string, salt);
    return hashed;
};
export const compare = async (string, hash) => {
    const result = await bcrypt.compare(string, hash);
    return result;
};
