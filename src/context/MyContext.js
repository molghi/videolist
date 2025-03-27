import { createContext, useState } from 'react';
import handleEnlarge from '../utilities/handleEnlarge';
import { handleFilterChange, handleValue } from '../utilities/videoboxInputsHandler';

const MyContext = createContext();

// ================================================================================================

function Provider({ children }) {
    const [results, setResults] = useState([]); // search results or fetched videos (after search results)
    const [resultsUnfiltered, setResultsUnfiltered] = useState([]);
    const [totalVideos, setTotalVideos] = useState(0);
    const [nextPageToken, setNextPageToken] = useState();
    const [channelId, setChannelId] = useState();
    const [statusesRatings, setStatusesRatings] = useState({});
    const [shortsVisible, setShortsVisible] = useState(true);
    const [isInSaved, setIsInSaved] = useState(false); // is the current video list (some channel's videos; precisely: this channel's id) in Saved or not?
    const [accentColor, setAccentColor] = useState('grey');
    const [videoBoxShown, setVideoBoxShown] = useState(false);
    const [videoData, setVideoData] = useState();
    const [userVideoSettings, setUserVideoSettings] = useState({
        brightness: 100,
        contrast: 100,
        grayscale: 0,
        sepia: 0,
        vignette: false,
        noise: false,
    });
    const [enlarged, setEnlarged] = useState(false);
    const [savedChannels, setSavedChannels] = useState([]);
    const [searchType, setSearchType] = useState('channels');
    const [searchQuery, setSearchQuery] = useState();
    const iframeWidth = window.innerWidth > 1024 ? '960' : '100%';
    const iframeHeight = window.innerWidth > 768 ? '540' : '100%';

    // ===============================================

    const toggleShorts = () => setShortsVisible(!shortsVisible); // toggling shorts visibility

    const handleStatusesRatings = (obj) => {
        setTimeout(() => {
            setStatusesRatings((prev) => {
                localStorage.setItem('videolistUserData', JSON.stringify({ ...prev, ...obj })); // runs upon clicking Status or Rating radio btns
                return { ...prev, ...obj };
            });
        }, 0); // deferring the state update to finish its current work without triggering the warning about updating state while rendering -- state update is postponed until React has finished the current render -- this allows React to complete the render before applying the state change, which resolves the warning.
    };

    const handleShowingVideo = (data) => {
        setVideoData(data); // runs upon clicking Play btn (of VideoItem)        // setVideoData(results[data]);
        setVideoBoxShown(true);
    };

    // ===============================================

    const toExport = {
        results,
        setResults,
        resultsUnfiltered,
        setResultsUnfiltered,
        totalVideos,
        setTotalVideos,
        nextPageToken,
        setNextPageToken,
        channelId,
        setChannelId,
        statusesRatings,
        setStatusesRatings,
        toggleShorts,
        shortsVisible,
        setShortsVisible,
        isInSaved,
        setIsInSaved,
        accentColor,
        setAccentColor,
        handleStatusesRatings,
        videoBoxShown,
        setVideoBoxShown,
        videoData,
        setVideoData,
        handleShowingVideo,
        handleFilterChange,
        handleValue,
        handleEnlarge,
        iframeWidth,
        iframeHeight,
        userVideoSettings,
        setUserVideoSettings,
        enlarged,
        setEnlarged,
        savedChannels,
        setSavedChannels,
        searchType,
        setSearchType,
        searchQuery,
        setSearchQuery,
    };

    return <MyContext.Provider value={toExport}>{children}</MyContext.Provider>;
}

export default MyContext;
export { Provider };
