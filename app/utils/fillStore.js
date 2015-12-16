export default function(redux, nextState, components) {
	return Promise.all(components.map(async Component => {
		Component = Component && Component.WrappedComponent || Component;

		if (!Component || !Component.fillStore) { return; }
		console.log(Component.fillStore(redux, nextState))
		
		await Component.fillStore(redux, nextState);
	}));
}