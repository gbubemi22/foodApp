export declare const createRole: (name: string) => Promise<{
    status: boolean;
    message: string;
    data: import("mongoose").FlattenMaps<import("./model.js").RoleDocument & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}>;
export declare const listAllRoles: () => Promise<{
    status: boolean;
    message: string;
    data: (import("mongoose").Document<unknown, {}, import("./model.js").RoleDocument> & import("./model.js").RoleDocument & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[];
}>;
export declare const listOneRole: (roleId: string) => Promise<{
    status: boolean;
    message: string;
    data: import("mongoose").FlattenMaps<import("./model.js").RoleDocument & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}>;
export declare const updateRoleService: (roleId: string, name: string) => Promise<{
    status: boolean;
    message: string;
    data: import("mongoose").FlattenMaps<import("./model.js").RoleDocument & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}>;
export declare const deleteRoleService: (roleId: string) => Promise<{
    status: boolean;
    message: string;
    data: never[];
}>;
