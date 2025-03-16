import './styles/Stats.css';
import { useState, useEffect, useContext } from 'react';
import MyContext from '../context/MyContext';
import calcStats from '../utilities/calcStats';

// ================================================================================================

function Stats() {
    const [stats, setStats] = useState('...');
    const { results, totalVideos, statusesRatings, resultsUnfiltered } = useContext(MyContext);

    // calculating Quick Stats (happens upon change of 'results' and 'statusesRatings'):
    useEffect(() => {
        if (results[0]?.kind === 'youtube#searchResult') return; // because 'results' can be either search results (to ignore) or channel's videos (what I need here)

        const [videosNumber, average, totalDurationHours, totalDurationMinutes, howManyWatched, watched] = calcStats(results); // getting data that Quick Stats should display

        setStats(
            <>
                <span className="main__stats-all" title={`Currently shown – ${videosNumber}, Total number – ${totalVideos}`}>
                    Videos Shown – {videosNumber}/{totalVideos}
                </span>{' '}
                |<span className="main__stats-average">Average video – {average} min</span> |
                <span className="main__stats-duration" title="Total duration of the currently displayed videos">
                    Total duration – {totalDurationHours} hr {totalDurationMinutes} min
                </span>{' '}
                |
                <span className="main__stats-watched">
                    Watched – {howManyWatched}/{videosNumber} ({watched}%)
                </span>
            </>
        );
    }, [results, resultsUnfiltered, statusesRatings, totalVideos]);

    return (
        <div className="main__stats">
            <span>Quick Stats:</span>
            {stats}
        </div>
    );
}

// ================================================================================================

export default Stats;
