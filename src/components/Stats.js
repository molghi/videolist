import './styles/Stats.css';
import { useState, useEffect } from 'react';
import calcStats from '../utilities/calcStats';

// ================================================================================================

function Stats({ results, statusesRatings, totalVideos }) {
    const [stats, setStats] = useState('...');

    useEffect(() => {
        // calc Quick Stats:
        if (results[0]?.kind === 'youtube#searchResult') return;
        // console.log(results);
        const [videosNumber, average, totalDurationHours, totalDurationMinutes, howManyWatched, watched] = calcStats(results);
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
    }, [results, statusesRatings]);

    return (
        <div className="main__stats">
            <span>Quick Stats:</span>
            {stats}
        </div>
    );
}

// ================================================================================================

export default Stats;
