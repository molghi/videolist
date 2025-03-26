import fetchVideos from './fetchVideos';

// fetching more videos -- happens upon clicking 'Fetch More' btn
const handleFetchMore = async (e, channelId, nextPageToken, setResults, setTotalVideos, setNextPageToken, setResultsUnfiltered, shortsVisible, results) => {
    if (!nextPageToken) return console.log('No fetching. No nextPageToken.');

    e.target.disabled = true; // temporarily disabling the button
    e.target.classList.add('disabled');
    e.target.textContent = 'Fetching...';

    await fetchVideos(channelId, nextPageToken, setResults, setTotalVideos, setNextPageToken, setResultsUnfiltered, shortsVisible); // fetching

    e.target.disabled = false; // enabling the button back
    e.target.classList.remove('disabled');
    e.target.textContent = 'Fetch More';
};

export default handleFetchMore;
