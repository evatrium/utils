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

// const bigint = BigInt(123);
// console.log(bigint === 123n);
// console.log(Number(bigint));
// console.log(JSON.stringify({ bigint }));

const localStore = createLocalStore({
	debounceTime: 100
});

let num = localStore.getItem("num") || 0;
localStore.subscribeToKey("num", data => {
	console.log("storage update on other tab", data);
	num = data;
});

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
		<div className='App'>
			<header className='App-header'>
				<img src={logo} className='App-logo' alt='logo' />
				<p>
					<button type='button' onClick={clicky}>
						count is: {count}
					</button>

					<button type='button' onClick={() => memoized(count, "bar")}>
						call memo
					</button>

					<button type='button' onClick={() => memoized.clear()}>
						clear cache
					</button>

					<button
						type='button'
						onClick={() => localStore.setItemDebounced("num", num + 1)}
					>
						inc local store
					</button>
				</p>
			</header>
		</div>
	);
}

export default App;
