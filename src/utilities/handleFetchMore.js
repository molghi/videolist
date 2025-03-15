import fetchVideos from './fetchVideos';

// fetching more videos -- happens upon clicking 'Fetch More' btn
const handleFetchMore = (e, channelId, nextPageToken, setResults, setTotalVideos, setNextPageToken) => {
    e.target.disabled = true; // temporarily disabling the button
    e.target.classList.add('disabled');

    fetchVideos(channelId, nextPageToken, setResults, setTotalVideos, setNextPageToken); // fetching

    setTimeout(() => {
        e.target.disabled = false; // enabling the button back
        e.target.classList.remove('disabled');
    }, 2000);
};

export default handleFetchMore;
