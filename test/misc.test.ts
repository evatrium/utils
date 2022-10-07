import { describe, it, expect} from "vitest";
import { jsonParse, JsonParseResults, pluck, signature } from "../src";

describe("jsonParse", () => {

	it("should parse json and return JsonParseResults", () => {
		const data = { foo: "bar" };
		const results: JsonParseResults = { data, error: undefined };
		const stringified = JSON.stringify(data);
		expect(jsonParse(stringified)).toMatchObject(results);
	});

	it("should catch the error and return JsonParseResults", () => {
		const result: JsonParseResults = {
			data: undefined,
			error: new SyntaxError("Unexpected token ! in JSON at position 1")
		};
		expect(jsonParse("{!@#$!@#%!@#^%:###****}")).toMatchObject(result);
	});

});

describe("signature", () => {
	it("should convert data into a stringified thumbprint ", () => {
		const jss = {
			width: {
				xs: "100%",
				sm: "50%"
			},
			color: ["blue", "red", "purple"]
		};
		expect(signature(jss)).toBe("widthxs100%sm50%color0blue1red2purple");
		expect(signature([jss])).toBe("0widthxs100%sm50%color0blue1red2purple");
		expect(signature(null)).toBe("null");
	});
});




describe("pluck", () => {
	it("should assign keys from pluck list to new object", () => {

		const obj = { a: "1", b: "2", c: "3" };

		const keysToPluck = ["b", "c"];

		const result = pluck(obj, keysToPluck);

		expect(obj).toMatchObject(obj);

		expect(result).toMatchObject({ b: "2", c: "3" });

	});
});
