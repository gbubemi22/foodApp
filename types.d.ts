declare namespace Express {
  export interface Request {
    user: any;
    deviceInfo: DeviceInfo;
  }
  export interface Response {
    user: any;
    deviceInfo: DeviceInfo;
  }
}
