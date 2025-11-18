[**@ulrik.ek/wgs84**](../README.md)

***

[@ulrik.ek/wgs84](../globals.md) / pointAbove

# Function: pointAbove()

> **pointAbove**(`origin`, `dH`): [`Point`](../interfaces/Point.md)

Defined in: [index.ts:203](https://github.com/UEk/wgs84/blob/d77ad0ecc1b3a330d6e512061e047b1ca284314c/src/index.ts#L203)

Gives a new point at a height dH above the current point
will throw for impossible input

## Parameters

### origin

[`Point`](../interfaces/Point.md)

the origin point in GeoJson

### dH

`number`

the distance up in meters, negative number gives a lower height

## Returns

[`Point`](../interfaces/Point.md)

GeoJson Point
