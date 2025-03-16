import { useState, useEffect, useContext } from 'react';
import MyContext from '../context/MyContext';
import './styles/VideoItem.css';
import { formatDuration } from '../utilities/formatDurationReleased';
import getVideoItemContent from '../utilities/getVideoItemContent';

// ================================================================================================

function VideoItem({ data, index }) {
    const { shortsVisible, handleStatusesRatings, statusesRatings, handleShowingVideo } = useContext(MyContext);
    const [thumb, setThumb] = useState(''); // thumbnail's jsx
    const [description, setDescription] = useState(''); // description's jsx
    const [, setStatusRating] = useState({
        status: 'unset',
        rating: 'unset',
    });

    const videoId = data.videoUrl.split('?v=')[1]; // getting video id to render iframe on click

    // happens upon change of 'statusesRatings' -- updating status and rating of this video item
    useEffect(() => {
        if (!statusesRatings[videoId]) return;
        setStatusRating((prev) => ({ ...prev, ...statusesRatings[videoId] }));
    }, [statusesRatings, videoId]);

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
        handleStatusesRatings
    ); // getting one <tr></tr>

    let toShow = '';
    if (shortsVisible || itemDuration.split(':')[1] > 1) toShow = content; // if shorts are visible or minutes in 'itemDuration' are more than 1, setting the content

    return toShow;
}

// ================================================================================================

export default VideoItem;
