import { Socket } from "socket.io";
export declare function verifyJwtToken(token: string): any;
export declare function HandleUpdateRidersLocSocketEvent(socket: Socket): void;
export declare function HandleFindNearbyRidersSocketEvent(socket: Socket): void;
export declare function HandleAcceptOrderSocketEvent(socket: Socket): void;
export declare function HandleUpdateRiderLocationSocketEvent(socket: Socket): void;
export declare function HandleGetRiderCurrentLocationByOrderSocketEvent(socket: Socket): void;
