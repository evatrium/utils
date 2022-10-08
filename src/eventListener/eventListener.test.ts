import { describe, it, expect } from "vitest";
import { eventListener } from "~/eventListener";
import { wait } from "lib";

describe("eventListener", () => {
	it("listens and unlistens to events", async () => {
		const spyOnMe = {
			func: () => undefined
		};
		const funcSpy = vi.spyOn(spyOnMe, "func");

		const unlisten = eventListener(window, "click", spyOnMe.func);

		window.dispatchEvent(new Event("click"));

		await wait(10);

		expect(funcSpy).toBeCalledTimes(1);

		unlisten();

		window.dispatchEvent(new Event("click"));

		await wait(10);

		expect(funcSpy).toBeCalledTimes(1);
	});
});
