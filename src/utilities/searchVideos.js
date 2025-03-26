import axios from 'axios';
import typewriterEffect from './typewriterEffect';
// import YOUTUBE_API_KEY from '../config';
const YOUTUBE_API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;
let timer;

// ================================================================================================

async function searchVideos(searchTerm, setResults) {
    if (!searchTerm.trim()) return;
    try {
        document.querySelector('.main__inner').insertAdjacentHTML('afterbegin', '<div class="container"><span class="loading" data-list="...">Loading</span></div>'); // the 'Loading...' element
        typewriterEffect(timer);

        const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
            params: {
                part: 'snippet',
                type: 'video',
                q: searchTerm,
                key: YOUTUBE_API_KEY,
                maxResults: 50,
                order: 'relevance',
            },
        });

        clearInterval(timer); // clearing and removing "Loading" after fetching is done
        document.querySelector('.loading').parentElement.remove();

        setResults(
            response.data.items.map((result) => {
                result.kind += 'Video';
                return result;
            })
        );
    } catch (error) {
        console.error('💥💥💥 Error fetching videos:', error);
    }
}

export default searchVideos;
