import * as wgs84 from '../dist';

// 1. Create points (lat, lon)
const p = wgs84.point(59.326634, 18.072837); // Royal castle, Stockholm

// 2. Project new coordinates
// Get a point 300m North and 400m East of origin
const p1: wgs84.Point = wgs84.pointEastOf(wgs84.pointNorthOf(p, 300), 400);
console.log(`lat=${p1.coordinates[1].toFixed(6)}, lon=${p1.coordinates[0].toFixed(6)}`); // GeoJSON uses [lon, lat] order!

// 3, Get the distance between the 2 points
console.log(`Total distance=${wgs84.distance(p, p1).toFixed(3)}m`);
