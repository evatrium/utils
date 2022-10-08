import { describe, it, expect } from "vitest";
import { assign } from "~/assign";

describe("assign", () => {
	it("should assign source to target and maintain the same reference", () => {
		const obj = { foo: "bar" };
		const objResult = assign(obj, { foo: "baz", bing: "boo" });

		expect(objResult).toMatchObject({ foo: "baz", bing: "boo" });
		expect(objResult === obj).toBeTruthy();

		const arr = ["asdf"];
		const arrResult = assign(arr, ["foo", "bar"]);
		expect(arrResult).toMatchObject(["foo", "bar"]);
		expect(arr === arrResult).toBeTruthy();
	});
});
