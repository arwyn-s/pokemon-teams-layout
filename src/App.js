import React from "react";
import { ThemeProvider } from "@material-ui/core/styles";

import { master } from "./context/themes";

import Topbar from "./components/Topbar";
import ShowContent from "./components/ShowContent";
import { FilterProvider } from "./context/FilterContext";

function App() {
	return (
		<ThemeProvider theme={master}>
			<FilterProvider>
				<Topbar />
				<ShowContent />
			</FilterProvider>
		</ThemeProvider>
	);
}

export default App;
