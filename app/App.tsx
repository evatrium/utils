import { useState } from "react";
import logo from "./logo.svg";
import "./app-style.css";
import {
	deepCopy,
	isObjOrArr,
	isWeb,
	memoize,
	signature,
	tryCatch,
	createLocalStore
} from "../src";

const args:any[] = [
	{ foo: "bar" },
	{
		baz: [
			"bing",
			"bang",
			"boom"
		]
	}
];

const func = (...args: any[]) => {
	return [...args, "buz"];
};

const cache = new WeakMap();

const ret = func(...args);

cache.set(args, ret);

args.push('foo')
const gotIt = cache.get(args);
console.log(gotIt);
console.log(args);
console.log(gotIt === ret);


const memoized = memoize((num, foo?, bar?) => {
	const results = `results! ${num}, ${foo}, ${bar}`;
	console.log(results);
	return results;
});

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
