import React from "react";
import {
	Card,
    CardActionArea,
    // CardMedia,
	CardContent,
	Grid,
	Typography,
	Container,
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	root: {
		margin: theme.spacing(2),
	},
	cardImage:{
		width:"100%",
	},
	image: {
		margin: "5px auto",
	},
	label: {
		fontSize: "0.8rem",
		textTransform: "uppercase",
		textAlign: "center",
	},
	types: {
		textTransform: "capitalize",
		justifyContent: "space-evenly",
	},
}));

export default function PokemonCard(props) {
	const { data } = props;
	const classes = useStyles();
	let types;
	if (data.types.secondary) {
		types = (
			<Grid container className={classes.types}>
				<Typography display="inline">{data.types.primary}</Typography>
				<Typography display="inline">{data.types.secondary}</Typography>
			</Grid>
		);
	} else {
		types = (
			<Grid container className={classes.types}>
				<Typography display="inline">{data.types.primary}</Typography>
			</Grid>
		);
	}
	return (
		<Card className={classes.root}>
			<CardActionArea>
				{/* <CardMedia
					className={classes.media}
					component="img"
					image={
						process.env.PUBLIC_URL +
						"/imgs/x120/png/" +
						data.pokedex_id +
						".png-120x.png"
					}
				/> */}
				<Container className={classes.cardImage}>
					<img
						className={classes.image}
						src={
							process.env.PUBLIC_URL +
							"/imgs/x120/png/" +
							data.pokedex_id +
							".png-120x.png"
						}
						alt={
							process.env.PUBLIC_URL +
							"/imgs/x120/png/" +
							data.pokedex_id +
							".png-120x.png"
						}
						loading="lazy"
					/>
				</Container>

				<CardContent>
					<Typography className={classes.label}>
						{" "}
						{"#" + data.pokedex_id + " " + data.name}
					</Typography>
					{types}
				</CardContent>
			</CardActionArea>
		</Card>
	);
}
