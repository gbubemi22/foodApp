export interface LocationDto {
  newLocation: {
    latitude: number;
    longitude: number;
  };
}

export interface NearByRidersDto {
  orderId: string;
}

export interface AcceptOrderDto {
  orderId: string;
}

export enum SocketEnums {
  UPDATE_LOCATION = "updateLocation",
  LOCATION_UPDATED = "locationUpdated",
  FIND_RIDERS = "findRiders",
  RIDERS_FOUND = "ridersFound",
  ACCEPT_ORDER = "acceptOrder",
  ORDER_ACCEPTED = "orderAccepted",
  UPDATE_TRACK_ORDER_LACTATION = "updateTrackOrderLocation",
  TRACK_ORDER_LOCATION_UPDATED = "trackOrderLocationUpdated",
  ORDER_LOCATION = "orderLocation",
  ORDER_LOCATION_UPDATED = "orderLocationUpdated",
  ERROR = "error",
}
