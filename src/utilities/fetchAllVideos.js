import axios from 'axios';
import YOUTUBE_API_KEY from '../config';
import typewriterEffect from './typewriterEffect';
let data, timer;

// ================================================================================================

async function fetchAllVideos(channelId, setResults) {
    document.querySelector('.main__inner').insertAdjacentHTML('afterbegin', '<span class="loading" data-list="...">Loading</span>'); // the 'Loading...' element
    document.querySelector('.loading').style.display = 'block';
    document.querySelector('.loading').style.marbinBottom = '20px';
    document.querySelector('.loading').style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim();
    document.querySelector('.loading').style.color = `#000`;
    document.querySelector('.loading').style.padding = `3px 5px`;
    typewriterEffect(timer);

    const response1 = await axios.get(`https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${channelId}&key=${YOUTUBE_API_KEY}`);
    const uploadsPlaylistId = response1.data.items[0].contentDetails.relatedPlaylists.uploads;

    let nextPageToken = '';
    const response2 = await axios.get(
        `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${uploadsPlaylistId}&key=${YOUTUBE_API_KEY}&pageToken=${nextPageToken}`
    );

    const videoIds = response2.data.items.map((item) => item.snippet.resourceId.videoId);

    const data = await getVideoDetails(videoIds);

    clearInterval(timer);
    document.querySelector('.loading').remove();

    setResults(data);
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
            // console.log('No video details found.');
            return null;
        }
    } catch (error) {
        console.error('Error fetching video details:', error);
    }
}

// ================================================================================================

export default fetchAllVideos;
