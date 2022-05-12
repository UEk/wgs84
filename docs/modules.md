[@UEk/wgs84](README.md) / Exports

# @UEk/wgs84

## Table of contents

### Interfaces

- [Point](interfaces/Point.md)

### Functions

- [R1](modules.md#r1)
- [R2](modules.md#r2)
- [bearing](modules.md#bearing)
- [distance](modules.md#distance)
- [distanceEast](modules.md#distanceeast)
- [distanceNorth](modules.md#distancenorth)
- [distanceUp](modules.md#distanceup)
- [point](modules.md#point)
- [pointAbove](modules.md#pointabove)
- [pointEastOf](modules.md#pointeastof)
- [pointNorthOf](modules.md#pointnorthof)

## Functions

### R1

▸ **R1**(`position`): `number`

The meridional radius of curvature at a certain geographical position
will throw for impossible input

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `position` | [`Point`](interfaces/Point.md) | The current position |

#### Returns

`number`

meters

#### Defined in

[index.ts:39](https://github.com/UEk/wgs84/blob/3542cf7/src/index.ts#L39)

___

### R2

▸ **R2**(`position`): `number`

The radius of curvature in the prime vertical at a certain geographical position
will throw for impossible input

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `position` | [`Point`](interfaces/Point.md) | The current position |

#### Returns

`number`

meters

#### Defined in

[index.ts:51](https://github.com/UEk/wgs84/blob/3542cf7/src/index.ts#L51)

___

### bearing

▸ **bearing**(`origin`, `target`): `number`

Calculates the bearing from origin to target in the plane
with 0 degrees being north, and 90 degrees being east
will throw for impossible input

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `origin` | [`Point`](interfaces/Point.md) | the origin point |
| `target` | [`Point`](interfaces/Point.md) | the target point |

#### Returns

`number`

degrees

#### Defined in

[index.ts:140](https://github.com/UEk/wgs84/blob/3542cf7/src/index.ts#L140)

___

### distance

▸ **distance**(`origin`, `target`): `number`

Calculates the distance in meters between origin and target
Will take height into consideration, if given for both points
will throw for impossible input

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `origin` | [`Point`](interfaces/Point.md) | the origin point |
| `target` | [`Point`](interfaces/Point.md) | the resulting point |

#### Returns

`number`

meters

#### Defined in

[index.ts:118](https://github.com/UEk/wgs84/blob/3542cf7/src/index.ts#L118)

___

### distanceEast

▸ **distanceEast**(`origin`, `target`): `number`

Calculates the distance in meters along an eastern meridian
will throw for impossible input

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `origin` | [`Point`](interfaces/Point.md) | the starting point |
| `target` | [`Point`](interfaces/Point.md) | the ending point |

#### Returns

`number`

meters

#### Defined in

[index.ts:79](https://github.com/UEk/wgs84/blob/3542cf7/src/index.ts#L79)

___

### distanceNorth

▸ **distanceNorth**(`origin`, `target`): `number`

Calculates the distance in meters along a northern meridian
will throw for impossible input

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `origin` | [`Point`](interfaces/Point.md) | the starting point |
| `target` | [`Point`](interfaces/Point.md) | the ending point |

#### Returns

`number`

meters

#### Defined in

[index.ts:64](https://github.com/UEk/wgs84/blob/3542cf7/src/index.ts#L64)

___

### distanceUp

▸ **distanceUp**(`origin`, `target`): `number`

Calculates the vertical distance in meters

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `origin` | [`Point`](interfaces/Point.md) | the starting point |
| `target` | [`Point`](interfaces/Point.md) | the ending point |

#### Returns

`number`

meters

#### Defined in

[index.ts:102](https://github.com/UEk/wgs84/blob/3542cf7/src/index.ts#L102)

___

### point

▸ **point**(`lat`, `lon`, `height?`): [`Point`](interfaces/Point.md)

creates a GeoJSON Point
will throw for impossible input

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `lat` | `number` | in degrees, has to be -90 < lat < 90 |
| `lon` | `number` | in degrees, has to be -180 <= lon <= 180 |
| `height?` | `number` | in meters |

#### Returns

[`Point`](interfaces/Point.md)

GeoJSON Point

#### Defined in

[index.ts:18](https://github.com/UEk/wgs84/blob/3542cf7/src/index.ts#L18)

___

### pointAbove

▸ **pointAbove**(`origin`, `dH`): [`Point`](interfaces/Point.md)

Gives a new point at a height dH above the current point
will throw for impossible input

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `origin` | [`Point`](interfaces/Point.md) | the origin point |
| `dH` | `number` | the distance up in meters, negative number gives a lower height |

#### Returns

[`Point`](interfaces/Point.md)

#### Defined in

[index.ts:205](https://github.com/UEk/wgs84/blob/3542cf7/src/index.ts#L205)

___

### pointEastOf

▸ **pointEastOf**(`origin`, `dE`): [`Point`](interfaces/Point.md)

Gives a new point at a distance dE east of the current point
will throw for impossible input

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `origin` | [`Point`](interfaces/Point.md) | the origin point |
| `dE` | `number` | the distance along an eastern meridian, negative number gives distance to west |

#### Returns

[`Point`](interfaces/Point.md)

#### Defined in

[index.ts:179](https://github.com/UEk/wgs84/blob/3542cf7/src/index.ts#L179)

___

### pointNorthOf

▸ **pointNorthOf**(`origin`, `dN`): [`Point`](interfaces/Point.md)

Gives a new point at a distance dN north of the current point
will throw for impossible input

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `origin` | [`Point`](interfaces/Point.md) | the origin point |
| `dN` | `number` | the distance along a northern meridian, negative number gives distance to south |

#### Returns

[`Point`](interfaces/Point.md)

#### Defined in

[index.ts:157](https://github.com/UEk/wgs84/blob/3542cf7/src/index.ts#L157)
