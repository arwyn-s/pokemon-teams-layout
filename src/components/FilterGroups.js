import React, { useState, useContext } from "react";
import { FormControl, MenuItem, Select } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";

import { FilterContext } from "../context/FilterContext";

const useStyles = makeStyles((theme) => ({
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120,
	},
}));

export default function FilterGroups() {
	const theme = useTheme();
	const [state, setState] = useState({ type: "", gen: "" });
	const classes = useStyles(theme);
	const {setQuery} = useContext(FilterContext);
	const types = [
		"bug",
		"dark",
		"dragon",
		"electric",
		"fairy",
		"fighting",
		"fire",
		"flying",
		"ghost",
		"grass",
		"ground",
		"ice",
		"normal",
		"poison",
		"psychic",
		"rock",
		"steel",
		"water",
	];
	const handleChange = (key, value ) => {
		if(key === "type"){
			setQuery(query =>({ ...query, type:value }));
			setState(state =>({ ...state, type:value }));
		} else if( key === "gen"){
			setQuery(query =>({ ...query, gen:value }));
			setState(state =>({ ...state, gen:value }));
		}
	};
	return (
		<>
			<FormControl variant="outlined" className={classes.formControl}>
				<Select
					id="select-type"
					value={state.type}
					onChange={(e) => handleChange("type",e.target.value) }
					displayEmpty
				>
					<MenuItem value="">ALL TYPES</MenuItem>
					{ types.map((type, index) => (
						<MenuItem value={type} key={index}>{type.toUpperCase()}</MenuItem>
					))}
				</Select>
			</FormControl>
			<FormControl variant="outlined" className={classes.formControl}>
				<Select
					id="select-generation"
					value={state.gen}
					onChange={(e) => handleChange("gen",e.target.value)}
					displayEmpty
				>
					<MenuItem value="">ALL GENS</MenuItem>
					<MenuItem value={1}>GEN I</MenuItem>
					<MenuItem value={2}>GEN II</MenuItem>
					<MenuItem value={3}>GEN III</MenuItem>
					<MenuItem value={4}>GEN IV</MenuItem>
					<MenuItem value={5}>GEN V</MenuItem>
					<MenuItem value={6}>GEN VI</MenuItem>
				</Select>
			</FormControl>
		</>
	);
}
