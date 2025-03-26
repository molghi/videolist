import { useEffect, useContext } from 'react';
import MyContext from '../context/MyContext';
import './styles/Main.css';
import './styles/utilities.css';
import VideoBox from './VideoBox'; // video as a video element to click and play
import { formatDuration } from '../utilities/formatDurationReleased';
import Stats from './Stats';
import Table from './Table';
import SearchResults from './SearchResults';
import SearchVideoResults from './SearchVideoResults';
import AboveButtons from './AboveButtons';
import handleFetchMore from '../utilities/handleFetchMore';
import TopButtons from './TopButtons';

// ================================================================================================

function Main() {
    const {
        results,
        setResults,
        resultsUnfiltered,
        setResultsUnfiltered,
        totalVideos,
        setTotalVideos,
        nextPageToken,
        setNextPageToken,
        channelId,
        setStatusesRatings,
        accentColor,
        setAccentColor,
        setIsInSaved,
        shortsVisible,
        savedChannels,
        setSavedChannels,
        searchType,
        searchQuery,
    } = useContext(MyContext); // pulling from context

    // =======================================

    // RUNNING USE-EFFECT'S:

    useEffect(() => {
        // upon initial load: fetch things from LS and set them
        const fromLS = JSON.parse(localStorage.getItem('videolistUserData')); // fetching statuses and ratings
        const colorFromLS = JSON.parse(localStorage.getItem('videolistAccentColor')); // fetching the interface color
        if (fromLS) setStatusesRatings((prev) => ({ ...prev, ...fromLS })); // conditionally setting statuses and ratings
        if (colorFromLS) setAccentColor(colorFromLS); // conditionally setting the interface color
        const savedChannelsFromLS = localStorage.getItem('videolistSaved') ? JSON.parse(localStorage.getItem('videolistSaved')) : null;
        if (savedChannelsFromLS) setSavedChannels((prev) => [...prev, ...savedChannelsFromLS]);
    }, [setAccentColor, setStatusesRatings, setSavedChannels]);

    useEffect(() => {
        // upon change of 'accentColor': set interface accent color and push to LS
        setTimeout(() => {
            document.documentElement.style.setProperty('--accent', accentColor);
            localStorage.setItem('videolistAccentColor', JSON.stringify(accentColor));
        }, 10); // small timeout so it could update
    }, [accentColor]);

    useEffect(() => {
        // upon change of 'shortsVisible': toggle shorts visibility
        if (!shortsVisible) {
            setResults(
                results.filter((entry) => {
                    const duration = formatDuration(entry.duration);
                    return duration.split(':')[1] > 1;
                })
            );
        } else {
            setResults(resultsUnfiltered);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [shortsVisible]);

    useEffect(() => {
        console.log(results);
        // upon change of 'results': if results are not search results but some channel's videos, figure out if this channel was previously saved to Saved
        if (results && results.length > 0 && results[0]?.videoUrl) {
            const fromLS = JSON.parse(localStorage.getItem('videolistSaved'));
            if (!fromLS) return;
            setSavedChannels((prev) => [...fromLS]);
            const inSaved = savedChannels.map((x) => x[0]).includes(channelId);
            setIsInSaved(inSaved);
            if (searchType === 'channels') document.title = `Videolist \u2014 ${results[0].channelTitle}`;
        }
        if (results && results.length > 0 && results[0]?.kind === 'youtube#searchResultVideo' && searchType === 'videos' && searchQuery)
            document.title = `Videolist \u2014 ${searchQuery.trim()}`;
        if (results && results.length > 0 && results[0]?.kind === 'youtube#searchResult' && searchType === 'channels' && searchQuery)
            document.title = `Videolist \u2014 ${searchQuery.trim()}`;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [results, channelId, setIsInSaved, setSavedChannels, searchQuery, searchType]);

    // =======================================

    // THINGS TO RENDER:

    const searchResultsContent = results && results[0]?.kind === 'youtube#searchResult' ? <SearchResults /> : ''; // when searchign channels

    const searchVideoResultsContent = results && results[0]?.kind === 'youtube#searchResultVideo' ? <SearchVideoResults /> : ''; // when searching videos

    const videosContent =
        results && results[0]?.videoUrl ? (
            <>
                {searchType !== 'videos' && (
                    <div className="main__above">
                        <Stats />
                        <AboveButtons />
                    </div>
                )}
                <Table />
                <VideoBox />
            </>
        ) : (
            ''
        );

    const fetchMoreBtn = (
        <button
            className="main__fetch-more"
            title="Fetch another batch of videos"
            onClick={(e) => handleFetchMore(e, channelId, nextPageToken, setResults, setTotalVideos, setNextPageToken, setResultsUnfiltered, shortsVisible, results)}
        >
            Fetch More
        </button>
    );

    // =======================================

    // RETURNING JSX:

    return (
        <main className="main">
            <div className="container-big">
                <div className="main__inner">
                    <TopButtons />

                    {results && results[0]?.kind === 'youtube#searchResult' && <div className="container">{searchResultsContent}</div>}
                    {results && results[0]?.kind === 'youtube#searchResultVideo' && <div className="container">{searchVideoResultsContent}</div>}
                    {results && results[0]?.videoUrl && videosContent}

                    {document.querySelectorAll('.video-item').length < totalVideos && results[0]?.videoUrl && searchType !== 'videos' && fetchMoreBtn}
                </div>
            </div>
        </main>
    );
}

export default Main;
