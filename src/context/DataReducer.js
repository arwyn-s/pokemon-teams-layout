export default (state, action) => {
	switch (action.type) {
		case "start":
			return action.payload;
		case "continue": 
			return {...state, loading: true};
		case "error":
			return { ...action.payload, loading: false };
		case "append":
			let noMore = action.payload.count < state.limit;
			let skip = noMore ? state.skip : state.skip + action.payload.count;
			return {
				...state,
				data: [...state.data, ...action.payload.data],
				loading: false,
				noMore: noMore,
				skip: skip,
			};
		default:
			return state;
	}
};
