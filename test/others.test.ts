import { describe, it, expect } from "vitest";
import { jsonParse, JsonParseResults, signature } from "../src";

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

describe("simpleStringify", () => {
	it("should convert data into a stringified signature ", () => {
		const jss = {
			width: {
				xs: "100%",
				sm: "50%"
			},
			color: ["blue", "red", "purple"]
		};
		expect(signature(jss)).toBe("widthxs100%sm50%color0blue1red2purple");
		expect(signature([jss])).toBe("0widthxs100%sm50%color0blue1red2purple");
		expect(signature(null)).toBe('null')
	});
});
