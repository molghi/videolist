import './Search.css';
import { useState, useRef } from 'react';
import searchChannels from '../utilities/searchChannels';

function Search({ setResults }) {
    const myInput = useRef();
    const [input, setInput] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        searchChannels(input, setResults);
        setInput('');
        myInput.current.blur();
    };

    return (
        <form className="search" onSubmit={handleSubmit}>
            <input type="text" placeholder="Search Channels" ref={myInput} value={input} onChange={(e) => setInput(e.target.value)} />
            <button type="submit">Search</button>
        </form>
    );
}

export default Search;

/* <ul>
  {channels.map((channel) => (
    <li key={channel.id.channelId}>
      <h3>{channel.snippet.title}</h3>
      <p>{channel.snippet.description}</p>
      <img src={channel.snippet.thumbnails.default.url} alt={channel.snippet.title} />
    </li>
  ))}
</ul> */
