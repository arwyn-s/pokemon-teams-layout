import React, { createContext, useState } from "react";

const default_filters = {
	menu: "pokemons",
    query:  {},
    setMenu: () =>{},
    setQuery: () =>{},
};

export const FilterContext = createContext(default_filters);

export function FilterProvider({ children }) {
	const [menu, setMenu] = useState(default_filters.menu);
	const [query, setQuery] = useState(default_filters.query);
	return (
		<FilterContext.Provider
			value={{ menu: menu, query: query,setMenu: setMenu,setQuery: setQuery }}
		>
			{children}
		</FilterContext.Provider>
	);
}
