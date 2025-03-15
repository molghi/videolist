import { useState, useRef, useContext } from 'react';
import MyContext from '../context/MyContext';
import './styles/Search.css';
import searchChannels from '../utilities/searchChannels';

// ================================================================================================

function Search() {
    const { setResults } = useContext(MyContext);
    const [input, setInput] = useState('');
    const myInput = useRef();

    const handleSubmit = (e) => {
        e.preventDefault(); // preventing form submission
        searchChannels(input, setResults); // fetching channels
        setInput(''); // clearing input
        myInput.current.blur(); // blurring input
    };

    return (
        <form className="search" onSubmit={handleSubmit}>
            <input autoFocus type="text" placeholder="Search Channels" ref={myInput} value={input} onChange={(e) => setInput(e.target.value)} />
            <button type="submit">Search</button>
        </form>
    );
}

// ================================================================================================

export default Search;
