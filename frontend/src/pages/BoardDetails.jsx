import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

const BoardDetails = () => {
    const { id } = useParams();

    const { isFetching, error, data: board } = useQuery({
        queryKey: ['board', id],
        queryFn: async () => {
            const response = await fetch(`http://localhost:3001/boards/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                }
            });
            if (!response.ok) throw new Error('Bad Request');
            return response.json();
        },
    })

    if (isFetching) return <p>Loading...</p>
    if (error) return <p>Error: {error.message}</p>

    return (
        <div>
            <h1>Board {board.name}</h1>

            { board.lists?.map(list => (
                <div key={list._id}>
                    <h2>{list.name}</h2>
                    {list.cards?.map(card => (
                        <div key={card._id}>
                            <p>{card.name}</p>
                        </div>
                    ))}
                </div>
            ))}
            {/* <h1>{board.name}</h1> */}
            {/* <h2>Lists:</h2>
            {lists?.map(list => (
                <div key={list._id}>
                    <Link className="text-blue-600 underline" to={`/lists/${list._id}`}>{list.name}</Link>
                </div>
            ))} */}
        </div>
    )
}

export default BoardDetails;