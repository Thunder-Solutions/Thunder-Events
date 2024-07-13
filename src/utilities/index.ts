export const isDefined = <T>(value: T | null | undefined): value is T => value !== undefined && value !== null;
export const isObject = <T extends Record<PropertyKey, any>>(value: unknown): value is T =>
	typeof value === 'object' && value !== null && !Array.isArray(value);
