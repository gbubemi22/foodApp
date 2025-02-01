import Ioredis from "ioredis";
import { BadRequestError, UnauthenticatedError } from "./error.js";

export function parseJSON(value: any): any {
  try {
    return JSON.parse(value);
  } catch (err) {
    return value;
  }
}

export class Redis {
  private client;

  constructor(url: string) {
    this.client = new Ioredis(url);
  }

  async start() {
    await this.client.connect();
  }

  async disconnect() {
    await this.client.disconnect();
  }

  async keys(pattern: string): Promise<Array<string> | any> {
    return await this.client.keys(pattern);
  }

  async set(key: string, data: any): Promise<any> {
    if (!key || typeof key !== "string")
      throw new BadRequestError("Redis key must be a string");

    if (typeof data !== "number" || typeof data !== "string")
      data = JSON.stringify(data);
    return await this.client.set(key, data);
  }

  async setEx(key: string, data: any, duration: number | string): Promise<any> {
    if (!key || typeof key !== "string")
      throw new BadRequestError("Redis key must be a string");

    if (typeof data !== "number" || typeof data !== "string")
      data = JSON.stringify(data);

    if (typeof duration === "string") {
      let [value, unit] = duration.split(" ") as any;
      value = Number(value);
      if (unit === "days" || unit === "day") {
        duration = 60 * 60 * 24 * value;
      } else if (unit === "minutes" || unit === "minute") {
        duration = 60 * value;
      } else if (unit === "hours" || unit === "hour") {
        duration = 60 * 60 * value;
      } else if (unit === "seconds" || unit === "second") {
        duration = value;
      }
    }
    return await this.client.setex(key, duration as number, data);
  }

  async get(key: string, parse: boolean = true): Promise<any> {
    if (!key || typeof key !== "string")
      throw new BadRequestError("Redis key must be a string");

    const data = (await this.client.get(key)) as any;
    return parse ? parseJSON(data) : data;
  }

  async delete(key: string): Promise<boolean> {
    if (!key || typeof key !== "string")
      throw new BadRequestError("Redis key must be a string");

    return Boolean(await this.client.del(key));
  }

  async deleteAll(prefix: string): Promise<void> {
    const keys = await this.keys(prefix);
    for (const key of keys) {
      await this.delete(key);
    }
  }

  async getCachedUser(id: string, throwError = true): Promise<any> {
    let userToken = `${id}-token`;
    const user = await this.client.get(userToken);
    if (!user && throwError)
      throw new UnauthenticatedError("Kindly login, user not found");
    return parseJSON(user);
  }

  async cacheUser(user: any): Promise<void> {
    await Promise.all([
      this.set(user.tokenRef, user),
      this.set(`${user.id}-token`, user),
    ]);
  }

  async updateAuthData(
    userId: string,
    key: string,
    value: string,
    action = "ADD"
  ): Promise<void> {
    const user = await this.getCachedUser(userId, false);

    if (!user) return;

    if (Array.isArray(user[key])) {
      if (action === "ADD") user[key].push(value);
      else if (action === "REMOVE") {
        user[key].splice(user[key].indexOf(value), 1);
      }
      await this.cacheUser(user);
    }

    return parseJSON(user);
  }
}
