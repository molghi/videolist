import { useState, useEffect, useContext } from 'react';
import MyContext from '../context/MyContext';
import './styles/VideoItem.css';
import { formatDuration } from '../utilities/formatDurationReleased';
import getVideoItemContent from '../utilities/getVideoItemContent';

// ================================================================================================

function VideoItem({ data, index }) {
    const {
        shortsVisible,
        handleStatusesRatings,
        statusesRatings,
        handleShowingVideo,
        searchType,
        setSearchType,
        setResults,
        setTotalVideos,
        setNextPageToken,
        setResultsUnfiltered,
        setChannelId,
    } = useContext(MyContext);
    const [thumb, setThumb] = useState(''); // thumbnail's jsx
    const [description, setDescription] = useState(''); // description's jsx
    const [, setStatusRating] = useState({
        status: 'unset',
        rating: 'unset',
    });

    let videoId;
    // console.log(data);
    const isChannelAllVideosItem = Boolean(data.duration);
    const isSearchVideoResult = data.kind === 'youtube#searchResultVideo';
    if (searchType === 'channels' && isChannelAllVideosItem) videoId = data.videoUrl.split('?v=')[1]; // getting video id to render iframe on click
    if (searchType === 'videos' && isSearchVideoResult) videoId = data.id.videoId;

    // happens upon change of 'statusesRatings' -- updating status and rating of this video item
    useEffect(() => {
        if (!statusesRatings[videoId]) return;
        setStatusRating((prev) => ({ ...prev, ...statusesRatings[videoId] }));
    }, [statusesRatings, videoId]);

    if (searchType === 'videos' && !isSearchVideoResult) return console.log(`early return`);

    const itemDuration = formatDuration(data.duration); // getting the duration of this video item

    const content = getVideoItemContent(
        data,
        itemDuration,
        index,
        setThumb,
        thumb,
        setDescription,
        description,
        handleShowingVideo,
        statusesRatings,
        videoId,
        setStatusRating,
        handleStatusesRatings,
        searchType,
        setResults,
        setTotalVideos,
        setNextPageToken,
        setResultsUnfiltered,
        setSearchType,
        setChannelId
    ); // getting one <tr></tr>

    let toShow = '';
    if (shortsVisible || itemDuration.split(':')[1] > 1) toShow = content; // if shorts are visible or minutes in 'itemDuration' are more than 1, setting the content

    return toShow;
}

// ================================================================================================

export default VideoItem;
