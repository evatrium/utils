export type ObjOrArrType = Record<string | number, any> | Array<any>;
export type PrimitiveType = null | undefined | string | number | boolean | symbol | bigint;


/** A parsed/serializable JSON value. */
// Exclude<PrimitiveType, symbol | bigint>
export type JsonLikeType =
	| string
	| number
	| boolean
	| null
	| JsonLikeType[]
	| { [key: string | number]: JsonLikeType };


export type JsonTypeWithDateMap = Json;


