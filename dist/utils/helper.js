import Ioredis from "ioredis";
import { BadRequestError, UnauthenticatedError } from "./error.js";
export function parseJSON(value) {
    try {
        return JSON.parse(value);
    }
    catch (err) {
        return value;
    }
}
export class Redis {
    client;
    constructor(url) {
        this.client = new Ioredis(url);
    }
    async start() {
        await this.client.connect();
    }
    async disconnect() {
        await this.client.disconnect();
    }
    async keys(pattern) {
        return await this.client.keys(pattern);
    }
    async set(key, data) {
        if (!key || typeof key !== "string")
            throw new BadRequestError("Redis key must be a string");
        if (typeof data !== "number" || typeof data !== "string")
            data = JSON.stringify(data);
        return await this.client.set(key, data);
    }
    async setEx(key, data, duration) {
        if (!key || typeof key !== "string")
            throw new BadRequestError("Redis key must be a string");
        if (typeof data !== "number" || typeof data !== "string")
            data = JSON.stringify(data);
        if (typeof duration === "string") {
            let [value, unit] = duration.split(" ");
            value = Number(value);
            if (unit === "days" || unit === "day") {
                duration = 60 * 60 * 24 * value;
            }
            else if (unit === "minutes" || unit === "minute") {
                duration = 60 * value;
            }
            else if (unit === "hours" || unit === "hour") {
                duration = 60 * 60 * value;
            }
            else if (unit === "seconds" || unit === "second") {
                duration = value;
            }
        }
        return await this.client.setex(key, duration, data);
    }
    async get(key, parse = true) {
        if (!key || typeof key !== "string")
            throw new BadRequestError("Redis key must be a string");
        const data = (await this.client.get(key));
        return parse ? parseJSON(data) : data;
    }
    async delete(key) {
        if (!key || typeof key !== "string")
            throw new BadRequestError("Redis key must be a string");
        return Boolean(await this.client.del(key));
    }
    async deleteAll(prefix) {
        const keys = await this.keys(prefix);
        for (const key of keys) {
            await this.delete(key);
        }
    }
    async getCachedUser(id, throwError = true) {
        let userToken = `${id}-token`;
        const user = await this.client.get(userToken);
        if (!user && throwError)
            throw new UnauthenticatedError("Kindly login, user not found");
        return parseJSON(user);
    }
    async cacheUser(user) {
        await Promise.all([
            this.set(user.tokenRef, user),
            this.set(`${user.id}-token`, user),
        ]);
    }
    async updateAuthData(userId, key, value, action = "ADD") {
        const user = await this.getCachedUser(userId, false);
        if (!user)
            return;
        if (Array.isArray(user[key])) {
            if (action === "ADD")
                user[key].push(value);
            else if (action === "REMOVE") {
                user[key].splice(user[key].indexOf(value), 1);
            }
            await this.cacheUser(user);
        }
        return parseJSON(user);
    }
}
