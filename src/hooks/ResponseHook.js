import { useState, useEffect, useContext } from "react";
import { FilterContext } from "../context/FilterContext";
import axios from "axios";

export function useResponse() {
	const [state, setState] = useState({ success: false, error: "WAIT!" });
	const { menu, query } = useContext(FilterContext);
	useEffect(() => {
		async function handleRequest(query, menu) {
			let uri = "api/v1/" + menu;
			const res = await axios.request({
				url: uri,
				method: "GET",
				params: query,
			});
			setState(res.data);
		}
		handleRequest(query, menu);
		return () => setState({ success: false, error: "WAIT!" });
	}, [menu, query]);
	return state;
}
