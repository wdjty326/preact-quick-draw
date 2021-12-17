import { FunctionalComponent, h } from "preact";
import QuickDrawCanvas from "./canvas";

const App: FunctionalComponent = () => {
	return (
		<div id="app">
			<QuickDrawCanvas />
		</div>
	);
};

export default App;
