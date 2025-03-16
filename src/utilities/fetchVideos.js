import axios from 'axios';
import typewriterEffect from './typewriterEffect';
import { formatDuration } from './formatDurationReleased';
// import YOUTUBE_API_KEY from '../config';
const YOUTUBE_API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;
let timer;
let data = [];

// ================================================================================================

async function fetchVideos(channelId, nextPageToken = '', setResults, setTotalVideos, setNextPageToken, setResultsUnfiltered, shortsVisible = true) {
    if (document.querySelector('.loading')) document.querySelector('.loading').parentElement.remove();
    document.querySelector('.main__inner').insertAdjacentHTML('afterbegin', '<div class="container"><span class="loading" data-list="...">Loading</span></div>'); // the 'Loading...' element
    typewriterEffect(timer);

    if (nextPageToken === '') data = []; // if nextPageToken === '', then I'm fetching another channel, not more vids of the same channel

    const videosPerBatch = 50;

    const response1 = await axios.get(`https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${channelId}&key=${YOUTUBE_API_KEY}`);
    const uploadsPlaylistId = response1.data.items[0].contentDetails.relatedPlaylists.uploads;

    const response2 = await axios.get(
        `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${uploadsPlaylistId}&key=${YOUTUBE_API_KEY}&pageToken=${nextPageToken}`
    );

    setTotalVideos(response2.data.pageInfo.totalResults); // setting the total number of some channel's videos

    const videoIds = response2.data.items.map((item) => item.snippet.resourceId.videoId); // getting video IDs

    const batch = await getVideoDetails(videoIds);
    data.push(batch); // pushing a batch

    setNextPageToken(response2.data.nextPageToken); // setting nextPageToken

    if (response2.data.nextPageToken && data.flat().length < videosPerBatch) {
        // if there's nextPageToken and 'data' length is less then videosPerBatch, calling this func recursively
        await fetchVideos(channelId, response2.data.nextPageToken, setResults, setTotalVideos, setNextPageToken);
    }

    clearInterval(timer); // when done, clearing and removing 'Loading'
    document.querySelector('.loading')?.parentElement.remove();

    if (shortsVisible) setResults(data.flat());
    else
        setResults(
            data.flat().filter((entry) => {
                const duration = formatDuration(entry.duration);
                return duration.split(':')[1] > 1;
            })
        ); // if shorts are invisible/hidden, filter them out
    setResultsUnfiltered(data.flat());
}

// ================================================================================================

async function getVideoDetails(videoIds) {
    try {
        const response = await axios.get(`https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&id=${videoIds.join(',')}&key=${YOUTUBE_API_KEY}`);

        if (response.data.items.length) {
            const videoDetails = response.data.items.map((item) => ({
                videoUrl: `https://www.youtube.com/watch?v=${item.id}`,
                title: item.snippet.title,
                duration: item.contentDetails.duration, // ISO 8601 format
                publishedAt: item.snippet.publishedAt,
                thumbnail: item.snippet.thumbnails.high.url,
                channelTitle: item.snippet.channelTitle,
                description: item.snippet.description,
            }));

            return videoDetails;
        } else {
            console.log('No video details found.');
            return null;
        }
    } catch (error) {
        console.error('💥💥💥 Error fetching video details:', error);
    }
}

// ================================================================================================

export default fetchVideos;
