export declare function parseJSON(value: any): any;
export declare class Redis {
    private client;
    constructor(url: string);
    start(): Promise<void>;
    disconnect(): Promise<void>;
    keys(pattern: string): Promise<Array<string> | any>;
    set(key: string, data: any): Promise<any>;
    setEx(key: string, data: any, duration: number | string): Promise<any>;
    get(key: string, parse?: boolean): Promise<any>;
    delete(key: string): Promise<boolean>;
    deleteAll(prefix: string): Promise<void>;
    getCachedUser(id: string, throwError?: boolean): Promise<any>;
    cacheUser(user: any): Promise<void>;
    updateAuthData(userId: string, key: string, value: string, action?: string): Promise<void>;
}
