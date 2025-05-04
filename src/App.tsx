import React from 'react';
import {
    QueryClient,
    QueryClientProvider,
  } from '@tanstack/react-query'
import './App.css';
import Character from './components/Character';
import AppInitLoader from './components/AppInitLoader';

const queryClient = new QueryClient()
function App() {
    console.log(process.env.REACT_APP_OPEN_API_KEY)
    return (
        <QueryClientProvider client={queryClient}>
            <div className="App">
                <AppInitLoader />
                <Character />
            </div>
        </QueryClientProvider>
    );
}

export default App;
