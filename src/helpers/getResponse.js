import axios from "axios";

const baseURI = "api/v1/";
export function getResponse(menu, query) {
	let uri = baseURI + menu;
	return () =>
		axios.request({ method: "GET", url: uri, params: query });
}
