import './styles/SearchResults.css';
import fetchVideos from '../utilities/fetchVideos';

// ================================================================================================

function SearchResults({ results, setResults, setTotalVideos, setChannelId, setNextPageToken }) {
    const handleClick = (result) => {
        setChannelId(result.id.channelId);
        fetchVideos(result.id.channelId, '', setResults, setTotalVideos, setNextPageToken);
    };

    return results.map((x, i) => (
        <div key={x.id.channelId} className="result" id={x.id.channelId}>
            <div className="result__index">Result {i + 1}</div>

            <div className="result__title">
                <span>Channel Title:</span>{' '}
                <span
                    onMouseEnter={(e) => e.target.querySelector('img')?.classList.remove('hidden')}
                    onMouseLeave={(e) => e.target.querySelector('img')?.classList.add('hidden')}
                    title="Click to view this channel's videos"
                    onClick={() => handleClick(x)}
                >
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
