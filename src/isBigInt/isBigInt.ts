/**
 * is value a big integer type
 */
export const isBigInt = (value: any): value is BigInt =>
	typeof value === "bigint";
