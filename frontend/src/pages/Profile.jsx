import { useQuery } from "@tanstack/react-query";

const Profile = ({user}) => {

    const { isFetching, error, data: boards } = useQuery({
        queryKey: ['boards', user._id],
        queryFn: async () => {
            const response = await fetch('http://localhost:3001/boards', {
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
            <h1>Profile</h1>
            <p>Email: {user.email}</p>
            {user.name && <p>Name: {user.name }</p>}

            <h2>Boards:</h2>
            {/* <ul>
                {user.boards && user.boards.map(board => (
                    <li key={board.id}>{board.name}</li>
                ))}
            </ul> */}
            {boards?.map(board => (
                <div key={board._id}>
                    <h3>{board.name}</h3>
                </div>
            ))}

        </div>
    )
}

export default Profile