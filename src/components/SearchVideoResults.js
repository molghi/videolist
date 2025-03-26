import { useContext } from 'react';
import MyContext from '../context/MyContext';
import Table from './Table';
import VideoBox from './VideoBox';

// ================================================================================================

function SearchVideoResults() {
    const { searchType } = useContext(MyContext);

    return (
        <>
            {searchType === 'videos' && <Table />}
            <VideoBox />
        </>
    );
}

export default SearchVideoResults;
