import { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Main from './components/Main';

function App() {
    const [results, setResults] = useState([]);

    return (
        <>
            <Header setResults={setResults} />
            <Main results={results} setResults={setResults} />
        </>
    );
}

export default App;
