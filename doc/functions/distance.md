[**@ulrik.ek/wgs84**](../README.md)

***

[@ulrik.ek/wgs84](../globals.md) / distance

# Function: distance()

> **distance**(`origin`, `target`): `number`

Defined in: [index.ts:116](https://github.com/UEk/wgs84/blob/d77ad0ecc1b3a330d6e512061e047b1ca284314c/src/index.ts#L116)

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
