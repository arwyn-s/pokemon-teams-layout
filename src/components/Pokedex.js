import React from "react";
import { Grid, LinearProgress } from "@material-ui/core";
import axios from "axios";

import { MenuContext } from "../context/MenuContext";
import PokemonCard from "./PokemonCard";

class Pokedex extends React.Component {
	static contextType = MenuContext;
	constructor(props) {
		super(props);
		this.state = {
			data: [],
			loading: false,
			skip: 0,
			prevY: 0,
			endReached: false,
		};
	}
    async getLimitedData(skip, limit) {
		// this.context.getAPIRequest({ skip: skip, limit: limit });
		// console.log(this.context);
		// if (!this.context.response.success) {
		// 	console.log(this.context.response.error);
		// 	return ;
		// }
		// if (this.context.response.count === 0) {
		// 	this.setState({ endReached: true });
		// }
		// this.setState({
		// 	data: [...this.state.data, ...this.context.response.data],
		// 	skip: this.state.skip + limit,
		// });
		try {
			this.setState({ loading: true });
			const response = await axios.get(
				`/api/v1/pokemons/?skip=${skip}&limit=${limit}`
			);
			console.log(response);
			if (response.count === 0) {
				this.setState({ endReached: true });
			}
			this.setState({
				data: [...this.state.data, ...response.data.data],
				loading: false,
				skip: this.state.skip + limit,
			});
		} catch (error) {
			console.log(error);
		}
	}
	componentDidMount() {
		this.getLimitedData(0, 30);
		var options = {
			root: null,
			rootMargin: "0px",
			thershold: 1.0,
		};
		this.observer = new IntersectionObserver(
			// () => console.log("Intersection Observer"),
			this.handleObserver.bind(this),
			options
		);
		this.observer.observe(this.loadingRef);
	}

	handleObserver(entities, observer) {
		const y = entities[0].boundingClientRect.y;
		if (!this.state.endReached && this.state.prevY > y) {
			this.getLimitedData(this.state.skip, 30);
		}
		this.setState({ prevY: y });
	}

	render() {
		const loading = !this.state.endReached ? (
			<LinearProgress color="primary" />
		) : (
			<div />
		);
		return (
			<>
				<Grid container>
					{this.state.data.map((value) => {
						return (
							<Grid
								item
								xl={1}
								lg={2}
								md={3}
								sm={4}
								xs={6}
								key={value.pokedex_id}
							>
								<PokemonCard data={value} />
							</Grid>
						);
					})}
					<Grid
						item
						xs={12}
						ref={(loadingRef) => (this.loadingRef = loadingRef)}
						key={999999}
					>
						{loading}
					</Grid>
				</Grid>
			</>
		);
	}
}

export default Pokedex;
