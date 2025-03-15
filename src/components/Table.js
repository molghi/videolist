import './styles/Table.css';
import VideoItem from './VideoItem';

// ================================================================================================

function Table({ results, setVideoData, setVideoBoxShown, shortsVisible, handleStatusesRatings, statusesRatings }) {
    const headers = ['index', 'channel', 'title', 'released', 'duration', 'thumbnail', 'description', 'watch', 'status', 'rating'];

    const handleShowingVideo = (index) => {
        setVideoData(results[index]);
        setVideoBoxShown(true);
    };

    // ========================================

    return (
        <div className="table-wrapper">
            <table>
                <thead>
                    <tr>
                        {headers.map((headerName, i) => (
                            <th key={i}>{headerName}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {results.map((result, i) => {
                        return (
                            <VideoItem
                                key={i}
                                data={result}
                                index={i}
                                showVideo={() => handleShowingVideo(i)}
                                shortsAreVisible={shortsVisible}
                                handleStatusesRatings={handleStatusesRatings}
                                statusesRatings={statusesRatings}
                            />
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

// ================================================================================================

export default Table;
