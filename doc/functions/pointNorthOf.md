[**@ulrik.ek/wgs84**](../README.md) • **Docs**

***

[@ulrik.ek/wgs84](../globals.md) / pointNorthOf

# Function: pointNorthOf()

> **pointNorthOf**(`origin`, `dN`): [`Point`](../interfaces/Point.md)

Gives a new point at a distance dN north of the current point
will throw for impossible input

## Parameters

• **origin**: [`Point`](../interfaces/Point.md)

the origin point in GeoJson

• **dN**: `number`

the distance in meters along a northern meridian, negative number gives distance to south

## Returns

[`Point`](../interfaces/Point.md)

GeoJson Point

## Defined in

[index.ts:155](https://github.com/UEk/wgs84/blob/7f15499841cff3193653ccb3eb4cdc78317fda40/src/index.ts#L155)
