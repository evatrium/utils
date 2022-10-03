import { describe, it, expect, vi } from "vitest";
import { jsonParse, JsonParseResults, memoize, pluck, signature } from "../src";

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
		expect(signature(null)).toBe("null");
	});
});


describe("memoize", () => {
	it("should only call the source function if its called with new arguments, and when cache is cleared", () => {

		const spyOnMe = {
			func: (a: any = "", b: any = "", c: any = ""): string => {
				return `${a}${b}${c}`;
			}
		};

		const funcSpy = vi.spyOn(spyOnMe, "func");

		const memoizedFunc = memoize(spyOnMe.func);

		let res = memoizedFunc("a", "b", "c");

		expect(res).toBe("abc");
		expect(funcSpy).toBeCalledTimes(1);

		let arg: Record<string, any> = { id: "asdf", users: ["bob", "joe"] };
		res = memoizedFunc(arg);

		expect(res).toBe(`${arg}`);
		expect(funcSpy).toBeCalledTimes(2);

		//should hit cache
		res = memoizedFunc(arg);
		expect(res).toBe(`${arg}`);
		expect(funcSpy).toBeCalledTimes(2);

		//should hit cache
		res = memoizedFunc(arg);
		expect(res).toBe(`${arg}`);
		expect(funcSpy).toBeCalledTimes(2);

		//should call func
		arg.foo = "bar";
		res = memoizedFunc(arg);
		expect(res).toBe(`${arg}`);
		expect(funcSpy).toBeCalledTimes(3);

		//should hit cache
		res = memoizedFunc(arg);
		expect(res).toBe(`${arg}`);
		expect(funcSpy).toBeCalledTimes(3);

		//should hit cache
		delete arg.foo;
		res = memoizedFunc(arg);
		expect(res).toBe(`${arg}`);
		expect(funcSpy).toBeCalledTimes(3);

		// clear cache
		memoizedFunc.clear();
		expect(memoizedFunc.cache).toMatchObject({});

		// should call func
		res = memoizedFunc(arg);
		expect(res).toBe(`${arg}`);
		expect(funcSpy).toBeCalledTimes(4);

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
