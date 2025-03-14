import axios from 'axios';
import YOUTUBE_API_KEY from '../config';
import typewriterEffect from './typewriterEffect';
let timer;

// ================================================================================================

const searchChannels = async (input, setResults) => {
    if (!input) return;
    try {
        document.querySelector('.main__inner').insertAdjacentHTML('afterbegin', '<span class="loading" data-list="...">Loading</span>'); // the 'Loading...' element
        document.querySelector('.loading').style.display = 'block';
        document.querySelector('.loading').style.marbinBottom = '20px';
        document.querySelector('.loading').style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim();
        document.querySelector('.loading').style.color = `#000`;
        document.querySelector('.loading').style.padding = `3px 5px`;
        typewriterEffect(timer);

        const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
            params: {
                part: 'snippet',
                type: 'channel',
                q: input,
                key: YOUTUBE_API_KEY,
            },
        });
        clearInterval(timer);
        document.querySelector('.loading').remove();
        setResults(response.data.items);
    } catch (error) {
        console.error('Error fetching channels:', error);
    }
};

// ================================================================================================

export default searchChannels;
