import React from "react";
import { Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
// import Pokedex from "./Pokedex";
import { DataProvider } from "../context/DataContext";
import PokemonsContent from "./PokemonsContent";

const useStyles = makeStyles((theme) => ({
	root: {
		marginTop: theme.spacing(10),
	},
}));
export default function ShowContent() {
	const classes = useStyles();
	return (
		<Container className={classes.root}>
			<DataProvider>
				<PokemonsContent />
			</DataProvider>
		</Container>
	);
}
