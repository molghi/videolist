import { useState, useEffect, useContext } from 'react';
import MyContext from '../context/MyContext';
import './styles/VideoItem.css';
import { formatDuration, formatReleased, pad } from '../utilities/formatDurationReleased';
import { handleRadioClick, showThumb, showDescription, handleVideo } from '../utilities/videoItemFunctions';
import fetchVideos from '../utilities/fetchVideos';

// ================================================================================================

// this function component returns one <tr> of a table
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

    // ================================================================================================

    let videoId;
    const isChannelAllVideosItem = Boolean(data.duration); // it is an item shown on the page with all channel's videos
    const isSearchVideoResult = data.kind === 'youtube#searchResultVideo'; // it is a search result when searching for videos
    if (searchType === 'channels' && isChannelAllVideosItem) videoId = data.videoUrl.split('?v=')[1]; // getting video id to render iframe on click
    if (searchType === 'videos' && isSearchVideoResult) videoId = data.id.videoId;

    useEffect(() => {
        if (!statusesRatings[videoId]) return; // happens upon change of 'statusesRatings' -- updating status and rating of this video item
        setStatusRating((prev) => ({ ...prev, ...statusesRatings[videoId] }));
    }, [statusesRatings, videoId]);

    if (searchType === 'videos' && !isSearchVideoResult) return console.log(`early return`); // early return

    const itemDuration = formatDuration(data.duration); // getting the duration of this video item

    if (searchType === 'channels' && data?.kind === 'youtube#searchResultVideo') return console.log(`early return 2`);

    let durationPretty = '';
    if (searchType === 'channels' && data?.kind !== 'youtube#searchResultVideo' && itemDuration) {
        durationPretty =
            `${itemDuration.split(':')[0][0] === '0' ? itemDuration.split(':')[0].slice(1) : itemDuration.split(':')[0]} ` +
            `${itemDuration.split(':')[0] === '01' ? 'hour' : 'hours'}` +
            ` ${itemDuration.split(':')[1][0] === '0' ? itemDuration.split(':')[1].slice(1) : itemDuration.split(':')[1]} ` +
            `${itemDuration.split(':')[1] === '01' ? 'minute' : 'minutes'}` +
            ` ${itemDuration.split(':')[2][0] === '0' ? itemDuration.split(':')[2].slice(1) : itemDuration.split(':')[2]} ` +
            `${itemDuration.split(':')[2] === '01' ? 'second' : 'seconds'}`; // shown in the title attr
    }

    const fetchIt = (e) => {
        fetchVideos(e.target.id, '', setResults, setTotalVideos, setNextPageToken, setResultsUnfiltered); // happens upon clicking channel's name when searching for videos
        setChannelId(e.target.id);
        setSearchType('channels');
    };

    // ================================================================================================

    // GETTING JSX:

    const content = (
        <tr className={`video-item`} id={videoId}>
            <td className="video-item__index">{pad(index + 1)}</td>

            <td className="video-item__channel">
                {searchType === 'channels' ? (
                    data.channelTitle
                ) : (
                    <button id={data.snippet.channelId} onClick={fetchIt} title="Click to view all videos from this channel">
                        {data.snippet.channelTitle}
                    </button>
                )}
            </td>

            <td className="video-item__title">{searchType === 'channels' ? data.title : data.snippet.title}</td>

            <td className="video-item__released">{searchType === 'channels' ? formatReleased(data.publishedAt) : formatReleased(data.snippet.publishedAt)}</td>

            {searchType === 'channels' && (
                <td className="video-item__duration" title={durationPretty || 'Duration is undefined'}>
                    {itemDuration || '00:00:00'}
                </td>
            )}

            <td className="video-item__thumbnail">
                <button onClick={() => showThumb(setThumb, data, searchType)}>View</button>
                {thumb}
            </td>

            <td className="video-item__description">
                <button onClick={() => showDescription(setDescription, data, searchType)}>View</button>
                {description}
            </td>

            <td className="video-item__watch" title="Play an embedded video here">
                <button onClick={() => handleVideo(handleShowingVideo, data, searchType)}>Play</button>
            </td>

            {searchType === 'channels' && (
                <td className="video-item__status" title="Unwatched, Started, Watched">
                    <label className="radio-wrapper">
                        <input
                            name={`status-${index}`}
                            type="radio"
                            value="unwatched"
                            checked={statusesRatings[videoId]?.status === 'unwatched' ? true : false}
                            onChange={() => {}}
                            onClick={() => handleRadioClick('status', 'unwatched', setStatusRating, videoId, handleStatusesRatings)}
                        />
                        <label className="radio-choice">U</label>
                    </label>
                    <label className="radio-wrapper">
                        <input
                            name={`status-${index}`}
                            type="radio"
                            value="started"
                            checked={statusesRatings[videoId]?.status === 'started' ? true : false}
                            onChange={() => {}}
                            onClick={() => handleRadioClick('status', 'started', setStatusRating, videoId, handleStatusesRatings)}
                        />
                        <label className="radio-choice">S</label>
                    </label>
                    <label className="radio-wrapper">
                        <input
                            name={`status-${index}`}
                            type="radio"
                            value="watched"
                            checked={statusesRatings[videoId]?.status === 'watched' ? true : false}
                            onChange={() => {}}
                            onClick={() => handleRadioClick('status', 'watched', setStatusRating, videoId, handleStatusesRatings)}
                        />
                        <label className="radio-choice">W</label>
                    </label>
                </td>
            )}

            {searchType === 'channels' && (
                <td className="video-item__rating" title="Liked, Disliked">
                    <label className="radio-wrapper">
                        <input
                            name={`rating-${index}`}
                            type="radio"
                            value="liked"
                            checked={statusesRatings[videoId]?.rating === 'liked' ? true : false}
                            onChange={() => {}}
                            onClick={() => handleRadioClick('rating', 'liked', setStatusRating, videoId, handleStatusesRatings)}
                        />
                        <label className="radio-choice">L</label>
                    </label>
                    <label className="radio-wrapper">
                        <input
                            name={`rating-${index}`}
                            type="radio"
                            value="disliked"
                            checked={statusesRatings[videoId]?.rating === 'disliked' ? true : false}
                            onChange={() => {}}
                            onClick={() => handleRadioClick('rating', 'disliked', setStatusRating, videoId, handleStatusesRatings)}
                        />
                        <label className="radio-choice">D</label>
                    </label>
                </td>
            )}
        </tr>
    );

    // ================================================================================================

    // RETURNING IT:

    let toShow = '';
    if (shortsVisible || itemDuration.split(':')[1] > 1) toShow = content; // if shorts are visible or minutes in 'itemDuration' are more than 1, setting the content
    return toShow;
}

export default VideoItem;
