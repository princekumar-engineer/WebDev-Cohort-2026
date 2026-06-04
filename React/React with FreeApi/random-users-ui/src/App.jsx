import { useEffect, useState } from 'react'


function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(()=>{
    fetch("https://api.freeapi.app/api/v1/public/randomusers")
    .then((res)=>res.json())
    .then((data)=>{
      setUsers(data.data.data);
      setLoading(false);
    })
    .catch((err)=>{
      setError("Failed to fetch users")
      setLoading(false);
    });
  }, []);

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>{error}</h2>;


  return (
    <div className='container'>
      {users.map((user)=>(
        <div key={user.id} className="card">
          <img src={user.picture.large} alt="user" />
          <h3>{user.name.first} {user.name.last}</h3>
          <p>{user.email}</p>
          <p>{user.location.country}</p>
        </div>  
      ))}
    </div>
  );
}

export default App
