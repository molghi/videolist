import { useState } from 'react';
import './Main.css';
import './videoPlaybox.css';
import data from './data';
import VideoItem from './VideoItem'; // video as a table row (its meta data)
import VideoBox from './VideoBox'; // video as a video element to click and play

function Main() {
    const [videoBoxShown, setVideoBoxShown] = useState(false);
    const [videoData, setVideoData] = useState();

    const handleShowingVideo = (index) => {
        setVideoData(data[index]);
        setVideoBoxShown(true);
    };

    const videoItems = data.map((x, i) => {
        return <VideoItem key={i} data={x} index={i} showVideo={() => handleShowingVideo(i)} />;
    });

    const headers = ['index', 'channel', 'title', 'released', 'duration', 'thumbnail', 'description', 'watch', 'status', 'rating'];

    return (
        <main className="main">
            <div className="container-big">
                <div className="main__inner">
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
