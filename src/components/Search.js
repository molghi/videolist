import { useState, useRef, useContext } from 'react';
import MyContext from '../context/MyContext';
import './styles/Search.css';
import searchChannels from '../utilities/searchChannels';
import searchVideos from '../utilities/searchVideos';

// ================================================================================================

function Search() {
    const { setResults, searchType, setSearchType, setSearchQuery } = useContext(MyContext);
    const [input, setInput] = useState('');
    const myInput = useRef();

    const handleSubmit = (e) => {
        e.preventDefault(); // preventing form submission
        if (searchType === 'channels') {
            searchChannels(input, setResults); // fetching channels
            setSearchQuery(input);
        }
        if (searchType === 'videos') {
            searchVideos(input, setResults); // fetching videos
            setSearchQuery(input);
        }
        setInput(''); // clearing input
        myInput.current.blur(); // blurring input
    };

    const handleSearchType = (e) => {
        setSearchType(e.target.value);
        myInput.current.focus();
    };

    const placeholderText = searchType === 'channels' ? 'Search Channels' : 'Search Videos';

    return (
        <form className="search" onSubmit={handleSubmit}>
            <input autoFocus type="text" placeholder={placeholderText} ref={myInput} value={input} onChange={(e) => setInput(e.target.value)} />
            <button type="submit">Search</button>
            <div className="search-switch">
                <label>
                    Channels
                    <input type="radio" name="search-type" checked={searchType === 'channels'} value="channels" onChange={handleSearchType} />
                </label>
                <label>
                    Videos
                    <input type="radio" name="search-type" checked={searchType === 'videos'} value="videos" onChange={handleSearchType} />
                </label>
            </div>
        </form>
    );
}

// ================================================================================================

export default Search;
