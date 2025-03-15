import axios from 'axios';
import typewriterEffect from './typewriterEffect';
import YOUTUBE_API_KEY from '../config';
let timer;

// ================================================================================================

const searchChannels = async (input, setResults) => {
    if (!input) return;
    try {
        document.querySelector('.main__inner').insertAdjacentHTML('afterbegin', '<div class="container"><span class="loading" data-list="...">Loading</span></div>'); // the 'Loading...' element
        typewriterEffect(timer);

        const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
            params: {
                part: 'snippet',
                type: 'channel',
                q: input,
                key: YOUTUBE_API_KEY,
            },
        });

        clearInterval(timer); // clearing and removing "Loading" after fetching is done
        document.querySelector('.loading').parentElement.remove();

        setResults(response.data.items);
    } catch (error) {
        console.error('💥💥💥 Error fetching channels:', error);
    }
};

// ================================================================================================

export default searchChannels;
