import { useContext } from 'react';
import MyContext from '../context/MyContext';
import './styles/Table.css';
import VideoItem from './VideoItem';

// ================================================================================================

function Table() {
    const { results } = useContext(MyContext);
    const headers = ['index', 'channel', 'title', 'released', 'duration', 'thumbnail', 'description', 'watch', 'status', 'rating']; // table header names

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
