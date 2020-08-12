import React, { createContext, useContext, useEffect, useReducer } from "react";
import { FilterContext } from "./FilterContext";
import axios from "axios";
import  DataReducer from "./DataReducer";

const default_state = {
	data: [],
	skip: 0,
	loading: true,
	limit: 30,
	noMore: true,
};

export const DataContext = createContext(default_state);

export function DataProvider({ children }) {
	const [state, dispatch] = useReducer(DataReducer, default_state);

	const { menu, query } = useContext(FilterContext);
	const getData = async (menu, query, skip = default_state.skip, limit = default_state.limit) => {
		try {
			const apiURI = "api/v1/" + menu;
			const res = await axios.request({
				method: "GET",
				url: apiURI,
				params: { ...query, skip: skip, limit: limit },
			});
			dispatch({type: "append", payload: res.data });
		} catch (error) {
			dispatch({type: "error", payload: default_state });
		}
	};

	const loadMore= () =>{
		// console.log(`Has more ${(!state.noMore)}`);
		// console.log(state);
		if(state.noMore){ return}

		dispatch({type: "continue", payload: state});
		getData(menu, query, state.skip, state.limit);
	}

	useEffect(() => {
		dispatch({type: "start", payload: default_state});
		getData(menu, query);
	}, [menu, query]);
	return (
		<DataContext.Provider
			value={{
				data: state.data,
				loading: state.loading,
				noMore: state.noMore,
				skip: state.skip,
				loadMore,
			}}
		>
			{children}
		</DataContext.Provider>
	);
}
