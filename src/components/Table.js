import { useContext } from 'react';
import MyContext from '../context/MyContext';
import './styles/Table.css';
import VideoItem from './VideoItem';

// ================================================================================================

function Table() {
    const { results, searchType } = useContext(MyContext);
    let headers = ['index', 'channel', 'title', 'released', 'duration', 'thumbnail', 'description', 'watch', 'status', 'rating']; // table header names
    if (searchType === 'videos') headers = ['index', 'channel', 'title', 'released', 'thumbnail', 'description', 'watch'];

    const hasDuration = Boolean(results[0].duration);

    return (
        <div className="table-wrapper">
            <table>
                {searchType === 'videos' && hasDuration ? (
                    ''
                ) : (
                    <thead>
                        <tr>
                            {headers.map((headerName, i) => (
                                <th key={i}>{headerName}</th>
                            ))}
                        </tr>
                    </thead>
                )}
                <tbody>
                    {results.map((result, i) => (
                        <VideoItem key={i} index={i} data={result} />
                    ))}
                </tbody>
            </table>
        </div>
    );
}

// ================================================================================================

export default Table;
