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
    return (
        <QueryClientProvider client={queryClient}>
            <div className="App">
                <AppInitLoader />
                <Character />
                <p className="nexon-credit">Data based on NEXON Open API</p>
            </div>
        </QueryClientProvider>
    );
}

export default App;
