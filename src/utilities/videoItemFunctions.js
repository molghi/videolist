import { getReleased } from './formatDurationReleased';

// ================================================================================================

// handle Status or Rating radio btns click
const handleRadioClick = (grouping, value, setStatusRating, videoId, handleStatusesRatings) => {
    let obj;
    setStatusRating((prev) => {
        obj = { [videoId]: { ...prev, [grouping]: value } };
        handleStatusesRatings(obj);
        return { ...prev, [grouping]: value };
    });
};

// ================================================================================================

// close thumbnail
const closeThumb = (setThumb) => setThumb('');

// ================================================================================================

// show thumbnail
const showThumb = (setThumb, data, searchType) => {
    setThumb(
        <span className="thumbnail">
            <img
                src={searchType === 'channels' ? data.thumbnail : data.snippet.thumbnails.medium.url}
                alt="video thumbnail"
                title={searchType === 'channels' ? data.title : data.snippet.title}
            />
            <button onClick={() => closeThumb(setThumb)} className="thumbnail__close">
                close
            </button>
        </span>
    );
};

// ================================================================================================

// close description
const closeDescription = (setDescription) => setDescription('');

// ================================================================================================

// show description
const showDescription = (setDescription, data, searchType) => {
    const released = searchType === 'channels' ? getReleased(data.publishedAt) : getReleased(data.snippet.publishedAt);
    const description = searchType === 'channels' ? data.description : data.snippet.description;
    setDescription(
        <span className="description">
            <span className="italic">Video title: {searchType === 'channels' ? data.title : data.snippet.title}</span>
            <br />
            <span className="italic">
                Released: {released[0]} − {released[1]}
            </span>
            <br />
            <span className="italic">Channel: {searchType === 'channels' ? data.channelTitle : data.snippet.channelTitle}</span>
            <br />
            <br />
            <span>{description || '(no description)'}</span>
            <button onClick={() => closeDescription(setDescription)} className="description__close">
                close
            </button>
        </span>
    );
};

// ================================================================================================

// happens upon clicking Play btn
const handleVideo = (handleShowingVideo, data) => handleShowingVideo(data);

// ================================================================================================

export { handleRadioClick, closeThumb, showThumb, closeDescription, showDescription, handleVideo };
