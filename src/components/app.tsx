import { FunctionalComponent, h } from "preact";
import { useEffect } from "preact/hooks";

import Canvas from "./canvas";

import "./app.scss";

const App: FunctionalComponent = () => {
	useEffect(() => {
		document.title = "Quick Drawing";
	}, []);
	return (
		<div id="app">
			<Canvas cWidth={1920} cHeight={1080} />
		</div>
	);
};

export default App;
