export declare function guessSerializerType<T extends (string | number | boolean | object | null)>(rawInit: T): "object" | "string" | "any" | "set" | "map" | "date" | "boolean" | "number";
