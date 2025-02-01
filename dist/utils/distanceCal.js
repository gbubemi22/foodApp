export const haversineDistance = (coord1, coord2) => {
    const toRadians = (degrees) => (degrees * Math.PI) / 180;
    const R = 6371; // Earth's radius in kilometers
    const lat1 = toRadians(coord1.latitude);
    const lon1 = toRadians(coord1.longitude);
    const lat2 = toRadians(coord2.latitude);
    const lon2 = toRadians(coord2.longitude);
    const dLat = lat2 - lat1;
    const dLon = lon2 - lon1;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in kilometers
    return distance;
};
// Example usage
const vendorLocation = { latitude: 40.712776, longitude: -74.005974 }; // New York
const userLocation = { latitude: 40.73061, longitude: -73.935242 }; // Brooklyn
const distance = haversineDistance(vendorLocation, userLocation);
console.log(`Distance: ${distance.toFixed(2)} km`);
const distanceInKm = haversineDistance(`${vendorLocation}`, `${userLocation}, km`);
const distanceInMiles = haversineDistance(`${vendorLocation}`, `${userLocation}, mi`);
const distanceInMeters = haversineDistance(`${vendorLocation}`, `${userLocation}, m`);
console.log(`Distance: ${distanceInKm.toFixed(2)} km`);
console.log(`Distance: ${distanceInMiles.toFixed(2)} miles`);
console.log(`Distance: ${distanceInMeters.toFixed(2)} meters`);
// import { getDistance } from 'geolib';
// const distance = getDistance(
//   { latitude: vendorLat, longitude: vendorLong },
//   { latitude: userLat, longitude: userLong }
// );
// if (distance <= vendorDeliveryRangeInMeters) {
//   console.log('Delivery possible!');
// } else {
//   console.log('Out of delivery range!');
// }
