import { useState } from 'react';
import { createPortal } from 'react-dom';
import './Main.css';
import data from './data';
import VideoItem from './VideoItem';
// console.log(data);

function Main() {
    const [video, setVideo] = useState('');

    const closeVideo = () => {
        setVideo('');
        document.body.classList.remove('o-h');
    };

    const showVideo = (data) => {
        const url = `https://www.youtube.com/embed/${data.videoUrl.slice(data.videoUrl.indexOf('?v=') + 3)}`;
        setVideo(
            <div className="video-playbox">
                <button onClick={closeVideo} className="video-playbox__close">
                    close
                </button>
                <div className="video-playbox__video-place">The video will be here...</div>
                <iframe
                    width="1280"
                    height="720"
                    src={url}
                    title={data.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                ></iframe>
            </div>
        );
        document.body.classList.add('o-h'); // overflow hidden
    };

    const videoItems = data.map((x, i) => {
        return <VideoItem key={i} data={x} index={i} showVideo={showVideo} />;
    });

    const headers = [
        'index',
        'channel',
        'title',
        'released',
        'duration',
        'thumbnail',
        'description',
        'watch',
        'status',
        'rating',
    ];

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
                    {video}
                    {video !== '' && createPortal(document.querySelector('.video-playbox'), document.querySelector('.modal'))}
                </div>
            </div>
        </main>
    );
}

export default Main;
