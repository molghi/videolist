import fetchVideos from './fetchVideos';

// fetching more videos -- happens upon clicking 'Fetch More' btn
const handleFetchMore = (e, channelId, nextPageToken, setResults, setTotalVideos, setNextPageToken, setResultsUnfiltered, shortsVisible) => {
    if (!nextPageToken) return console.log('No fetching. No nextPageToken.');

    e.target.disabled = true; // temporarily disabling the button
    e.target.classList.add('disabled');

    fetchVideos(channelId, nextPageToken, setResults, setTotalVideos, setNextPageToken, setResultsUnfiltered, shortsVisible); // fetching

    setTimeout(() => {
        e.target.disabled = false; // enabling the button back
        e.target.classList.remove('disabled');
    }, 5000);
};

export default handleFetchMore;
