import { useContext } from 'react';
import MyContext from '../context/MyContext';
import './styles/SearchResults.css';
import fetchVideos from '../utilities/fetchVideos';

// ================================================================================================

function SearchResults() {
    const { results, setResults, setTotalVideos, setChannelId, setNextPageToken, setResultsUnfiltered } = useContext(MyContext);

    const handleResultClick = (result) => {
        setChannelId(result.id.channelId); // setting channel id
        fetchVideos(result.id.channelId, '', setResults, setTotalVideos, setNextPageToken, setResultsUnfiltered); // fetching videos from that channel
    };
    const handleHoverOver = (e) => e.target.querySelector('img')?.classList.remove('hidden'); // show channel profile picture on hover
    const handleHoverOut = (e) => e.target.querySelector('img')?.classList.add('hidden'); // hide it on un-hover

    return results.map((x, i) => (
        <div key={x.id.channelId} id={x.id.channelId} className="result">
            <div className="result__index">Result {i + 1}</div>

            <div className="result__title">
                <span>Channel Title:</span>{' '}
                <span onMouseEnter={handleHoverOver} onMouseLeave={handleHoverOut} onClick={() => handleResultClick(x)} title="Click to view this channel's videos">
                    {x.snippet.channelTitle}
                    <img src={x.snippet.thumbnails.default.url} alt="result thumbnail" className="result__thumb hidden" />
                </span>
            </div>

            <div className="result__description">
                <span>Channel Description:</span> {x.snippet.description || '(no description)'}
            </div>
        </div>
    ));
}

// ================================================================================================

export default SearchResults;
