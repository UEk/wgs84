import * as wgs84 from '../dist';

// helper function to construct a GeoJSON Point
const lat = 15;
const lon = 25;
const p: wgs84.Point = wgs84.point(lat, lon);

// Getting a new point 100m north and 200m east of the first point
const p1: wgs84.Point = wgs84.pointEastOf(wgs84.pointNorthOf(p, 100), 200);
const newLat = p1.coordinates[1]; // GeoJSON uses [lon, lat] order!
const newLon = p1.coordinates[0];
console.log(`lat=${newLat}, lon=${newLon}`);

// get the distance along north between the 2 points
console.log(`distance along north=${wgs84.distanceNorth(p, p1)}`);
console.log(`distance along east=${wgs84.distanceEast(p, p1)}`);
