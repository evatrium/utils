import { debounce } from "~/_needs_docs_and_tests/debounce";
import {wait} from "~/_needs_docs_and_tests/wait";
import { describe, expect, it, vi } from "vitest";


describe("debounce", () => {
	it("debounces multiple sequential calls", async () => {

		const spyOnMe = {
			func: () => void 0
		};
		const funcSpy = vi.spyOn(spyOnMe, "func");

		const debouncedFunc = debounce(spyOnMe.func, 10);

		debouncedFunc();
		debouncedFunc();
		debouncedFunc();
		debouncedFunc();
		await wait(100);

		expect(funcSpy).toBeCalledTimes(1);
	});

	it("debounce is cancelable", async () => {

		const spyOnMe = {
			func: () => void 0
		};
		const funcSpy = vi.spyOn(spyOnMe, "func");

		const debouncedFunc = debounce(spyOnMe.func, 10);

		debouncedFunc();
		debouncedFunc();
		debouncedFunc();
		debouncedFunc();
		debouncedFunc.cancel();
		await wait(100);

		expect(funcSpy).toBeCalledTimes(0);
	});

});
