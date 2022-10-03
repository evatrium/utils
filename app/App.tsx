import { useState } from "react";
import logo from "./logo.svg";
import "./app-style.css";
import { deepCopy, isObjOrArr, memoize, signature, tryCatch } from "../src";
import { createData, createSerializableData } from "../test/_testUtils";

const memoized = memoize((num, foo?, bar?) => {
	const results = `results! ${num}, ${foo}, ${bar}`;
	console.log(results);
	return results;
});
const nested = true;
const obj = { undfnd: undefined, void: void 0 };

const originalData = createData(true);

const copy = deepCopy(originalData);

console.log(
	originalData,
	"\n",
	"\n",
	copy
	// typeof (void 0)

);



function App() {
	const [count, setCount] = useState(0);

	const clicky = () => {
		setCount(count => count + 1);
	};
	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<p>
					<button type="button" onClick={clicky}>
						count is: {count}
					</button>

					<button type="button" onClick={() => memoized(count, "bar")}>
						call memo
					</button>

					<button type="button" onClick={() => memoized.clear()}>
						clear cache
					</button>
				</p>
			</header>
		</div>
	);
}

export default App;
