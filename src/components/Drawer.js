import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import MenuIcon from "@material-ui/icons/Menu";
import { Fab } from "@material-ui/core";

const useStyles = makeStyles({
	list: {
		width: 250,
	},
	fullList: {
		width: "auto",
	},
});

export default function TemporaryDrawer() {

	const classes = useStyles();
	const [state, setState] = React.useState({
		isOpen: false,
	});

	const toggleDrawer = (open) => (event) => {
		if (
			event.type === "keydown" &&
			(event.key === "Tab" || event.key === "Shift")
		) {
			return;
		}

		setState({ ...state, isOpen: open });
	};

	const list = () => (
		<div
			className={classes.list}
			role="presentation"
			onClick={toggleDrawer(false)}
			onKeyDown={toggleDrawer( false)}
		>
			<List>
				<ListItem>
					<Typography variant='h6' gutterBottom>Pokemon-Teams</Typography>
				</ListItem>
			</List>
			<Divider />
			<List>
				{["Pokedex", "Moves", "Abilites", "Types", "Nature"].map((text) => (
					<ListItem button key={text}>
						<ListItemText primary={text} />
					</ListItem>
				))}
			</List>
			<Divider />
			<List>
				{["Favorites", "Teams", "Account"].map((text, index) => (
					<ListItem button key={text}>
						<ListItemText primary={text} />
					</ListItem>
				))}
			</List>
		</div>
	);

	return (
		<div>
			<React.Fragment>
				<Fab  onClick={toggleDrawer(true)} color='secondary'>
					<MenuIcon />
				</Fab>
				<Drawer
					anchor={"left"}
					open={state["isOpen"]}
					onClose={toggleDrawer( false)}
				>
					{list()}
				</Drawer>
			</React.Fragment>
		</div>
	);
}
