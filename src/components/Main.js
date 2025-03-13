import { useState, useEffect } from 'react';
import './Main.css';
import './videoPlaybox.css';
import data from './data';
import VideoItem from './VideoItem'; // video as a table row (its meta data)
import VideoBox from './VideoBox'; // video as a video element to click and play
import { formatDuration } from '../utilities/formatDurationReleased';

// ================================================================================================

function Main() {
    const [videoBoxShown, setVideoBoxShown] = useState(false);
    const [videoData, setVideoData] = useState();
    const [shortsVisible, setShortsVisible] = useState(false);
    const [myData, setMyData] = useState(data);
    const [stats, setStats] = useState('');
    const [statusesRatings, setStatusesRatings] = useState({});

    const handleStatusesRatings = (obj) => {
        setStatusesRatings((prev) => {
            localStorage.setItem('videolistUserData', JSON.stringify({ ...prev, ...obj }));
            return { ...prev, ...obj };
        });
    };

    const calcStats = () => {
        const videosNumber = myData.length;
        const durationsInSeconds = myData
            .map((entry) => formatDuration(entry.duration).split(':'))
            .map((x) =>
                x.reduce((a, x, i) => {
                    if (i === 0) return +x * 60 * 60 + a;
                    if (i === 1) return +x * 60 + a;
                    if (i === 2) return +x + a;
                }, 0)
            );
        const averageInSeconds = Math.floor(durationsInSeconds.reduce((a, x) => a + x, 0) / videosNumber);
        const average = Math.floor(averageInSeconds / 60);
        const totalDurationHours = Math.floor(durationsInSeconds.reduce((a, x) => a + x, 0) / 60 / 60);
        const totalDurationMinutes = Math.floor(durationsInSeconds.reduce((a, x) => a + x, 0) / 60) - totalDurationHours * 60;
        const howManyWatched = [...document.querySelectorAll('.video-item__status .radio-wrapper:nth-child(3) input')].filter((x) => x.checked).length;
        const watched = Math.floor((howManyWatched / videosNumber) * 100);
        return [videosNumber, average, totalDurationHours, totalDurationMinutes, howManyWatched, watched];
    };

    useEffect(() => {
        //
    }, []);

    useEffect(() => {
        const fromLS = JSON.parse(localStorage.getItem('videolistUserData'));
        if (!fromLS) return;
        setStatusesRatings((prev) => ({ ...prev, ...fromLS }));
    }, []);

    useEffect(() => {
        // calc Quick Stats:
        const [videosNumber, average, totalDurationHours, totalDurationMinutes, howManyWatched, watched] = calcStats();
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
    }, [myData, statusesRatings]);

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
        setVideoData(myData[index]);
        setVideoBoxShown(true);
    };

    const toggleShorts = () => {
        setShortsVisible(!shortsVisible);
    };

    const videoItems = myData.map((x, i) => {
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

    const headers = ['index', 'channel', 'title', 'released', 'duration', 'thumbnail', 'description', 'watch', 'status', 'rating'];

    return (
        <main className="main">
            <div className="container-big">
                <div className="main__inner">
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
                </div>
            </div>
        </main>
    );
}

export default Main;
