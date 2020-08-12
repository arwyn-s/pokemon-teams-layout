import React, { useContext, useEffect, useRef, useState } from "react";
import { DataContext } from "../context/DataContext";
import { Grid, LinearProgress } from "@material-ui/core";
import PokemonCard from "./PokemonCard";

export default function PokedmonsContent() {
	const { data, loading, noMore, loadMore } = useContext(DataContext);
	const [element, setElement] = useState(null);
	const loader = useRef(loadMore);
	const observer = useRef(
		new IntersectionObserver(
			(entities) => {
				const first = entities[0];
				if (first.isIntersecting) {
					// if loadMore is called here. the current snapshot with  initial states of loadMore is called which doesn't do anything.
					loader.current();
				}
			},
			{ threshold: 0.75 }
		)
	);
	useEffect(() => {
		loader.current = loadMore;
	}, [loadMore]);
	useEffect(() => {
		const currentElement = element;
		const currentObserver = observer.current;
		if (currentElement) {
			currentObserver.observe(currentElement);
		}
		return () => {
			if (currentElement) {
				currentObserver.unobserve(currentElement);
			}
		};
	}, [element]);
	const LoadingBar = loading ? (
		<LinearProgress variant="indeterminate" color="secondary" />
	) : (
		<div />
	);
	const MoreObserver = !noMore ? (
		<LinearProgress
			ref={setElement}
			variant="indeterminate"
			color="secondary"
		/>
	) : (
		<div />
	);
	return (
		<Grid container>
			{data.map((value) => {
				return (
					<Grid item xl={1} lg={2} md={3} sm={4} xs={6} key={value.pokedex_id}>
						<PokemonCard data={value} />
					</Grid>
				);
			})}
			<Grid item xs={12} key={999998}>
				{LoadingBar}
			</Grid>
			<Grid item xs={12} key={999999}>
				{MoreObserver}
			</Grid>
		</Grid>
	);
}
