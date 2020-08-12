import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Grid, Toolbar, AppBar } from "@material-ui/core";
import TemporaryDrawer from "./Drawer";
import FilterGroups from "./FilterGroups";

const useStyles = makeStyles((theme) => ({
	root: {
		justifyContent: "space-between",
		alignItems: "center",
	},
}));

export default function Topbar() {
	const theme = useTheme();
	const classes = useStyles(theme);
	return (
		<div>
			<AppBar position="fixed">
				<Toolbar>
					<Grid container className={classes.root}>
						<Grid item>
							<TemporaryDrawer />
						</Grid>
						<Grid item>
							<FilterGroups />
						</Grid>
					</Grid>
				</Toolbar>
			</AppBar>
		</div>
	);
}
