import { FunctionalComponent, h } from "preact";
import Canvas from "./canvas";

// import "./app.scss";

const App: FunctionalComponent = () => {
	return (
		<div id="app">
			<Canvas cWidth={1920} cHeight={1080} />
		</div>
	);
};

export default App;
