import "./App.css";
import { BrowserRouter } from "react-router-dom";

//components
import Main from "./components/main/index";
import "bootstrap/dist/css/bootstrap.min.css";

//redux
import { Provider } from "react-redux";
import { ConfigureStore } from "./redux/configureStore";

const store = ConfigureStore();

function App() {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<Main />
			</BrowserRouter>
		</Provider>
	);
}

export default App;
