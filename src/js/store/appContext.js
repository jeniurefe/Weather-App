import React, { useState, useEffect } from "react";
import getState from "./flux.js";

export const Context = React.createContext(null);

// Esta función inyecta el store global a cualquier vista/componente donde quieras usarlo, lo inyectaremos en layout.js.

const injectContext = PassedComponent => {
    const StoreWrapper = props => {
        // Esto se pasará como el valor del contexto
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
                try {
                    const response = await fetch('https://api.openweathermap.org/data/2.5/weather?q=London&appid=74cb3cae64fdf8e7bd4d9e9d5b4d8e70');
                    const data = await response.json();
                    
                    // Verifica si hay datos de clima disponibles
                    if (data.weather && data.weather.length > 0) {
                        const weatherCondition = data.weather[0].main;
                        // Usar la acción para actualizar el estado global
                        state.actions.setWeatherCondition(weatherCondition);
                    } else {
                        console.error("No weather data available:", data);
                    }
                } catch (error) {
                    console.error("Error fetching weather data:", error);
                }
            };

            fetchWeather();

            // Mapeo de imágenes 
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

        // El valor inicial para el contexto ya no es null, sino el estado actual de este componente.
        // El contexto ahora tendrá funciones getStore, getActions y setStore disponibles, porque fueron declaradas
        // en el estado de este componente
        return (
            <Context.Provider value={state}>
                <PassedComponent {...props} />
            </Context.Provider>
        );
    };
    return StoreWrapper;
};

export default injectContext;
