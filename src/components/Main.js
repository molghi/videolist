import { useState, useEffect } from 'react';
import './Main.css';
import './videoPlaybox.css';
import data from './data';
import VideoItem from './VideoItem'; // video as a table row (its meta data)
import VideoBox from './VideoBox'; // video as a video element to click and play
import { formatDuration } from '../utilities/formatDurationReleased';
import fetchAllVideos from '../utilities/fetchAllVideos';
import calcStats from '../utilities/calcStats';

// ================================================================================================

function Main({ results, setResults }) {
    const [videoBoxShown, setVideoBoxShown] = useState(false);
    const [videoData, setVideoData] = useState();
    const [shortsVisible, setShortsVisible] = useState(false);
    const [myData, setMyData] = useState(data);
    const [stats, setStats] = useState('');
    const [statusesRatings, setStatusesRatings] = useState({});
    const [accentColor, setAccentColor] = useState('grey');

    const handleStatusesRatings = (obj) => {
        setStatusesRatings((prev) => {
            localStorage.setItem('videolistUserData', JSON.stringify({ ...prev, ...obj }));
            return { ...prev, ...obj };
        });
    };

    useEffect(() => {
        const fromLS = JSON.parse(localStorage.getItem('videolistUserData')); // fetching statuses and ratings
        const colorFromLS = JSON.parse(localStorage.getItem('videolistAccentColor')); // fetching the interface color
        if (fromLS) setStatusesRatings((prev) => ({ ...prev, ...fromLS }));
        if (colorFromLS) setAccentColor(colorFromLS);
    }, []);

    useEffect(() => {
        setTimeout(() => {
            document.documentElement.style.setProperty('--accent', accentColor);
            localStorage.setItem('videolistAccentColor', JSON.stringify(accentColor));
        }, 100);
    }, [accentColor]);

    useEffect(() => {
        // calc Quick Stats:
        if (results[0]?.kind === 'youtube#searchResult') return;
        const [videosNumber, average, totalDurationHours, totalDurationMinutes, howManyWatched, watched] = calcStats(results);
        setStats(
            <>
                <span className="main__stats-all">Videos – {videosNumber}</span> |<span className="main__stats-average">Average video – {average} min</span> |
                <span className="main__stats-duration">
                    Total duration – {totalDurationHours} hr {totalDurationMinutes} min
                </span>{' '}
                |
                <span className="main__stats-watched">
                    Watched – {howManyWatched}/{videosNumber} ({watched}%)
                </span>
            </>
        );
    }, [results, statusesRatings]);

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

    const handleShowingVideo = (index) => {
        setVideoData(results[index]);
        setVideoBoxShown(true);
    };

    const toggleShorts = () => {
        setShortsVisible(!shortsVisible);
    };

    // checking the input accent color -- returns string (color in rgb)
    const checkNewColor = (newColor) => {
        const span = document.createElement('span'); // mimicking DOM addition to get the computed color
        document.body.appendChild(span);
        span.style.color = newColor;
        let color = window.getComputedStyle(span).color;
        document.body.removeChild(span);
        const rgbValues = color
            .slice(4, -1)
            .split(',')
            .map((x) => +x.trim()); // just the rgb values (r,g,b)
        if (rgbValues[0] < 40 && rgbValues[1] < 40 && rgbValues[2] < 40) return `rgb(0, 128, 0)`; // return green if it is too dark
        return color;
    };

    const changeColor = () => {
        const newColor = prompt('Enter your new interface accent color');
        if (!newColor) return;
        if (newColor && newColor.trim().length < 3) return;
        const checkedColor = checkNewColor(newColor);
        setAccentColor(checkedColor);
    };

    const videoItems = results.map((x, i) => {
        return (
            <VideoItem
                key={i}
                data={x}
                index={i}
                showVideo={() => handleShowingVideo(i)}
                shortsAreVisible={shortsVisible}
                handleStatusesRatings={handleStatusesRatings}
                statusesRatings={statusesRatings}
            />
        );
    });

    const searchResultsContent =
        results && results[0]?.kind === 'youtube#searchResult'
            ? results.map((x, i) => (
                  <div key={x.id.channelId} className="result" id={x.id.channelId}>
                      <div className="result__index">Result {i + 1}</div>
                      <div className="result__title">
                          <span>Channel Title:</span>{' '}
                          <span
                              onMouseEnter={(e) => e.target.querySelector('img')?.classList.remove('hidden')}
                              onMouseLeave={(e) => e.target.querySelector('img')?.classList.add('hidden')}
                              title="Click to view this channel's videos"
                              onClick={() => fetchAllVideos(x.id.channelId, setResults)}
                          >
                              {x.snippet.channelTitle}
                              <img src={x.snippet.thumbnails.default.url} alt="result thumbnail" className="result__thumb hidden" />
                          </span>
                      </div>
                      <div className="result__description">
                          <span>Channel Description:</span> {x.snippet.description || '(no description)'}
                      </div>
                  </div>
              ))
            : '';

    const headers = ['index', 'channel', 'title', 'released', 'duration', 'thumbnail', 'description', 'watch', 'status', 'rating'];

    const videosContent =
        results && results[0]?.videoUrl ? (
            <>
                <div className="main__above">
                    <div className="main__stats">
                        <span>Quick Stats:</span>
                        {stats}
                    </div>
                    <button title="Add this list of videos to your saved ones for quick access">Save This List</button>
                    <button onClick={toggleShorts}>{!shortsVisible ? 'Show Shorts' : 'Hide Shorts'}</button>
                </div>
                <table>
                    <thead>
                        <tr>
                            {headers.map((headerName, i) => (
                                <th key={i}>{headerName}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>{videoItems}</tbody>
                </table>
                <VideoBox isShown={videoBoxShown} data={videoData} setShown={setVideoBoxShown} />
            </>
        ) : (
            ''
        );

    return (
        <main className="main">
            <div className="container-big">
                <div className="main__inner">
                    <button title="Change the accent color of the interface" className="main__color-btn" onClick={changeColor}>
                        Change Color
                    </button>

                    {results && results[0]?.kind === 'youtube#searchResult' && searchResultsContent}
                    {results && results[0]?.videoUrl && videosContent}
                </div>
            </div>
        </main>
    );
}

export default Main;
