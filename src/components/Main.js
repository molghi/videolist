import { useState, useEffect, useContext } from 'react';
import MyContext from '../context/MyContext';
import './styles/Main.css';
import './styles/utilities.css';
import data from './data';
import VideoBox from './VideoBox'; // video as a video element to click and play
import { formatDuration } from '../utilities/formatDurationReleased';
import Stats from './Stats';
import Table from './Table';
import SearchResults from './SearchResults';
import AboveButtons from './AboveButtons';
import saveCurrentList from '../utilities/saveCurrentList';
import handleFetchMore from '../utilities/handleFetchMore';
import TopButtons from './TopButtons';

// ================================================================================================

function Main() {
    const { results, setResults } = useContext(MyContext);

    const [videoBoxShown, setVideoBoxShown] = useState(false);
    const [videoData, setVideoData] = useState();
    const [shortsVisible, setShortsVisible] = useState(false);
    const [myData, setMyData] = useState(data);
    const [statusesRatings, setStatusesRatings] = useState({});
    const [accentColor, setAccentColor] = useState('grey');
    const [totalVideos, setTotalVideos] = useState(0);
    const [nextPageToken, setNextPageToken] = useState();
    const [channelId, setChannelId] = useState();
    const [isInSaved, setIsInSaved] = useState(false); // is the current video list (some channel's videos; precisely: this channel's id) in Saved or not?

    // =======================================

    useEffect(() => {
        // upon initial load: fetch things from LS
        const fromLS = JSON.parse(localStorage.getItem('videolistUserData')); // fetching statuses and ratings
        const colorFromLS = JSON.parse(localStorage.getItem('videolistAccentColor')); // fetching the interface color
        if (fromLS) setStatusesRatings((prev) => ({ ...prev, ...fromLS }));
        if (colorFromLS) setAccentColor(colorFromLS);
    }, []);

    useEffect(() => {
        // set interface accent color
        setTimeout(() => {
            document.documentElement.style.setProperty('--accent', accentColor);
            localStorage.setItem('videolistAccentColor', JSON.stringify(accentColor));
        }, 100);
    }, [accentColor]);

    useEffect(() => {
        // filter out shorts
        if (!shortsVisible) {
            setMyData(
                myData.filter((entry) => {
                    const duration = formatDuration(entry.duration);
                    if (duration.split(':')[1] > 1) return entry;
                })
            );
        } else {
            setMyData(data);
        }
    }, [shortsVisible]);

    useEffect(() => {
        if (results[0]?.videoUrl) {
            const fromLS = JSON.parse(localStorage.getItem('videolistSaved'));
            if (!fromLS) return;
            const isInSaved = Object.keys(fromLS).includes(channelId);
            setIsInSaved(isInSaved);
        }
    }, [results]);

    // =======================================

    const handleStatusesRatings = (obj) => {
        setStatusesRatings((prev) => {
            localStorage.setItem('videolistUserData', JSON.stringify({ ...prev, ...obj }));
            return { ...prev, ...obj };
        });
    };

    const toggleShorts = () => setShortsVisible(!shortsVisible);

    const searchResultsContent =
        results && results[0]?.kind === 'youtube#searchResult' ? (
            <SearchResults results={results} setResults={setResults} setTotalVideos={setTotalVideos} setChannelId={setChannelId} setNextPageToken={setNextPageToken} />
        ) : (
            ''
        );

    const videosContent =
        results && results[0]?.videoUrl ? (
            <>
                <div className="main__above">
                    <Stats results={results} statusesRatings={statusesRatings} totalVideos={totalVideos} />
                    <AboveButtons
                        toggleShorts={toggleShorts}
                        shortsVisible={shortsVisible}
                        saveCurrentList={() => saveCurrentList(channelId, results)}
                        isInSaved={isInSaved}
                    />
                </div>
                <Table
                    results={results}
                    setVideoData={setVideoData}
                    setVideoBoxShown={setVideoBoxShown}
                    shortsVisible={shortsVisible}
                    handleStatusesRatings={handleStatusesRatings}
                    statusesRatings={statusesRatings}
                />
                <VideoBox isShown={videoBoxShown} data={videoData} setShown={setVideoBoxShown} />
            </>
        ) : (
            ''
        );

    // =======================================

    return (
        <main className="main">
            <div className="container-big">
                <div className="main__inner">
                    <TopButtons setAccentColor={setAccentColor} setResults={setResults} setTotalVideos={setTotalVideos} setNextPageToken={setNextPageToken} />

                    {results && results[0]?.kind === 'youtube#searchResult' && <div className="container">{searchResultsContent}</div>}
                    {results && results[0]?.videoUrl && videosContent}

                    {document.querySelectorAll('.video-item').length < totalVideos && results[0]?.videoUrl && (
                        <button
                            className="main__fetch-more"
                            title="Fetch another batch of videos"
                            onClick={(e) => handleFetchMore(e, channelId, nextPageToken, setResults, setTotalVideos, setNextPageToken)}
                        >
                            Fetch More
                        </button>
                    )}
                </div>
            </div>
        </main>
    );
}

export default Main;
