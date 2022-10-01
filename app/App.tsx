import { useState } from "react";
import logo from "./logo.svg";
import "./app-style.css";
import { isObjOrArr, memoizeArgs, signature } from "../src";

const memoized = memoizeArgs((num, foo, bar) => {
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

					<button type="button" onClick={() => memoized(count, "foo", "bar")}>
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
