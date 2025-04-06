import { Server } from "socket.io";
import { HandleAcceptOrderSocketEvent, HandleFindNearbyRidersSocketEvent, HandleGetRiderCurrentLocationByOrderSocketEvent, HandleUpdateRiderLocationSocketEvent, HandleUpdateRidersLocSocketEvent, } from "./modules/gateway/gateway.js";
const io = new Server();
const registerRidersLocationEvents = (socket) => {
    HandleUpdateRidersLocSocketEvent(socket);
};
const registerTrackOrderEvents = (socket) => {
    HandleUpdateRidersLocSocketEvent(socket);
    HandleFindNearbyRidersSocketEvent(socket);
    HandleAcceptOrderSocketEvent(socket);
    HandleUpdateRiderLocationSocketEvent(socket);
    HandleGetRiderCurrentLocationByOrderSocketEvent(socket);
};
const locationNamespace = io.of("/rider-location");
locationNamespace.on("connection", (socket) => {
    console.log(`[${new Date().toISOString()}] User connected to connection namespace with session ID: ${socket.id}`);
    registerRidersLocationEvents(socket);
    // Handle disconnections
    socket.on("disconnect", () => {
        console.log(`[${new Date().toISOString()}] User disconnected from connection namespace with session ID: ${socket.id}`);
    });
});
const trackOrderNamespace = io.of("/track-order");
trackOrderNamespace.on("connection", (socket) => {
    console.log(`[${new Date().toISOString()}] User connected to connection namespace with session ID: ${socket.id}`);
    registerTrackOrderEvents(socket);
    // Handle disconnections
    socket.on("disconnect", () => {
        console.log(`[${new Date().toISOString()}] User disconnected from connection namespace with session ID: ${socket.id}`);
    });
});
export default io;
