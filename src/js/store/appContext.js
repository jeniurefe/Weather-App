import React, { useState, useEffect } from "react";
import getState from "./flux.js";


export const Context = React.createContext(null);

// This function injects the global store to any view/component where you want to use it, we will inject the context to layout.js, you can see it here:
// https://github.com/4GeeksAcademy/react-hello-webapp/blob/master/src/js/layout.js#L35
const injectContext = PassedComponent => {
	const StoreWrapper = props => {
		//this will be passed as the context value
		const [state, setState] = useState(
			getState({
				getStore: () => state.store,
				getActions: () => state.actions,
				setStore: updatedStore =>
					setState({
						store: Object.assign(state.store, updatedStore),
						actions: { ...state.actions }
					})
			})
		);

		useEffect(() => {
			const fetchWeather = async () => {
				const response = await fetch('');
				const data = await response.json();
				
				// Usar la acción para actualizar el estado global
				state.actions.setWeatherCondition(data.weather[0].main);
			};
		
			fetchWeather();
		
			// Mapeo de imágenes basado en el clima
			const weatherImages = {
				Clear: 'https://www.softwareheritage.org/wp-content/uploads/2017/12/clearsky.png',
				Rain: 'https://images.unsplash.com/photo-1511634829096-045a111727eb?q=80&w=1934&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
				Snow: 'https://images.unsplash.com/photo-1457269449834-928af64c684d?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
				Clouds: 'https://images.unsplash.com/photo-1495933925743-bb94d1d4ea4c?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
				Thunderstorm: 'https://images.unsplash.com/photo-1600377927594-ceae8f8981a6?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
				Drizzle: 'https://images.unsplash.com/photo-1677236591161-569fe4fd3601?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
			};
		
			const weatherCondition = state.store.weatherCondition;
			
			if (weatherCondition) {
				const todayElement = document.querySelector('.today');
				const weatherImage = weatherImages[weatherCondition] || 'https://example.com/default.jpg';
				
				if (todayElement) {
					todayElement.style.backgroundImage = `url(${weatherImage})`;
				}
			}
		}, [state.store.weatherCondition]);
		
		
		// The initial value for the context is not null anymore, but the current state of this component,
		// the context will now have a getStore, getActions and setStore functions available, because they were declared
		// on the state of this component
		return (
			<Context.Provider value={state}>
				<PassedComponent {...props} />
			</Context.Provider>
		);
		
	};
	return StoreWrapper;
};

export default injectContext;
