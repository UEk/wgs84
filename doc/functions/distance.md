[**@ulrik.ek/wgs84**](../README.md)

***

[@ulrik.ek/wgs84](../globals.md) / distance

# Function: distance()

> **distance**(`origin`, `target`): `number`

Defined in: [index.ts:59](https://github.com/UEk/wgs84/blob/e8e4bbfd1d8ff81410dce1ae7afe5436fa6e0608/src/index.ts#L59)

Calculates the distance in meters between origin and target
Will take height into consideration, if given for both points
will throw for impossible input

## Parameters

### origin

[`Point`](../interfaces/Point.md)

the origin point in GeoJson

### target

[`Point`](../interfaces/Point.md)

the resulting point in GeoJson

## Returns

`number`

meters
