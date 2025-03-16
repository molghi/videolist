import { createContext, useState } from 'react';

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
    const iframeWidth = window.innerWidth > 1024 ? '960' : '100%';
    const iframeHeight = window.innerWidth > 768 ? '540' : '100%';

    // ===============================================

    const toggleShorts = () => setShortsVisible(!shortsVisible); // toggling shorts visibility

    const handleStatusesRatings = (obj) => {
        // runs upon clicking Status or Rating radio btns
        setTimeout(() => {
            setStatusesRatings((prev) => {
                localStorage.setItem('videolistUserData', JSON.stringify({ ...prev, ...obj }));
                return { ...prev, ...obj };
            });
        }, 0); // deferring the state update to finish its current work without triggering the warning about updating state while rendering; state update is postponed until React has finished the current render; this allows React to complete the render before applying the state change, which resolves the warning
    };

    const handleShowingVideo = (data) => {
        // runs upon clicking Play btn (of VideoItem)
        // setVideoData(results[data]);
        setVideoData(data);
        setVideoBoxShown(true);
    };

    const handleFilterChange = (e, inputName, vignetteEl, noiseEl) => {
        // runs upon change of input value in VideoBox (iframe renderer)
        if (inputName === 'brightness') setUserVideoSettings((prev) => ({ ...prev, brightness: e.target.value }));
        if (inputName === 'contrast') setUserVideoSettings((prev) => ({ ...prev, contrast: e.target.value }));
        if (inputName === 'grayscale') setUserVideoSettings((prev) => ({ ...prev, grayscale: e.target.value }));
        if (inputName === 'sepia') setUserVideoSettings((prev) => ({ ...prev, sepia: e.target.value }));
        if (inputName === 'vignette') {
            setUserVideoSettings((prev) => ({ ...prev, vignette: !prev.vignette }));
            vignetteEl.current.classList.toggle('hidden');
        }
        if (inputName === 'noise') {
            setUserVideoSettings((prev) => ({ ...prev, noise: !prev.noise }));
            noiseEl.current.classList.toggle('hidden');
        }
    };

    const handleValue = (inputName) => {
        // passing 'value' attr to input range (video effects)
        if (inputName === 'brightness') return userVideoSettings.brightness;
        if (inputName === 'contrast') return userVideoSettings.contrast;
        if (inputName === 'grayscale') return userVideoSettings.grayscale;
        if (inputName === 'sepia') return userVideoSettings.sepia;
    };

    const handleEnlarge = (myIframe, myWrapper) => {
        // make the iframe occupy 100% of window width and height
        setEnlarged((prev) => {
            if (!prev) {
                myIframe.current.width = window.innerWidth;
                myIframe.current.height = window.innerHeight;
                myIframe.current.parentElement.style.width = '100%';
                myIframe.current.parentElement.style.height = '100%';
                [...myWrapper.current.querySelectorAll('button')].forEach((btn) => btn.classList.add('btn-vid-enlarged'));
            } else {
                myIframe.current.width = iframeWidth;
                myIframe.current.height = iframeHeight;
                myIframe.current.parentElement.style.width = iframeWidth + 'px';
                myIframe.current.parentElement.style.height = iframeHeight + 'px';
                [...myWrapper.current.querySelectorAll('button')].forEach((btn) => btn.classList.remove('btn-vid-enlarged'));
            }
            return !prev;
        });
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
    };

    return <MyContext.Provider value={toExport}>{children}</MyContext.Provider>;
}

// ================================================================================================

export default MyContext;
export { Provider };
