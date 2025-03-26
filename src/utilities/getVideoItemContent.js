import { formatReleased, pad } from '../utilities/formatDurationReleased';
import { handleRadioClick, showThumb, showDescription, handleVideo } from '../utilities/videoItemFunctions';
import fetchVideos from './fetchVideos';

// ================================================================================================

// returns one <tr></tr>
function getVideoItemContent(
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
) {
    // console.log(data);

    let durationPretty = '';
    if (searchType === 'channels' && data?.kind === 'youtube#searchResultVideo') return;
    if (searchType === 'channels' && data?.kind !== 'youtube#searchResultVideo')
        durationPretty =
            `${itemDuration.split(':')[0][0] === '0' ? itemDuration.split(':')[0].slice(1) : itemDuration.split(':')[0]} ` +
            `${itemDuration.split(':')[0] === '01' ? 'hour' : 'hours'}` +
            ` ${itemDuration.split(':')[1][0] === '0' ? itemDuration.split(':')[1].slice(1) : itemDuration.split(':')[1]} ` +
            `${itemDuration.split(':')[1] === '01' ? 'minute' : 'minutes'}` +
            ` ${itemDuration.split(':')[2][0] === '0' ? itemDuration.split(':')[2].slice(1) : itemDuration.split(':')[2]} ` +
            `${itemDuration.split(':')[2] === '01' ? 'second' : 'seconds'}`;
    let myId = searchType === 'channels' ? data.videoUrl.slice(data.videoUrl.indexOf('?v=') + 3) : data.id.videoId;

    const fetchIt = (e) => {
        fetchVideos(e.target.id, '', setResults, setTotalVideos, setNextPageToken, setResultsUnfiltered);
        setChannelId(e.target.id);
        setSearchType('channels');
    };

    return (
        <tr className={`video-item`} id={myId}>
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
                <td className="video-item__duration" title={durationPretty}>
                    {itemDuration}
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
}

export default getVideoItemContent;
