import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import "./Home.css"

const Home = () => {
    // error state.
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState([]);

    useEffect(() => {
      setLoading(true);
      fetch("https://jsonplaceholder.typicode.com/users/")
        .then((res) => res.json())
        .then((data) => {
          setUsers(data);
          console.log(data);
        })
        .catch(err => {
          setError(err.message)
        }).finally(()=> {
          setLoading(false);
        })
    }, []);

    if (error){
      return <div className='error'>{error}</div>;
    } else if (loading){
      return <div className='load'>loading...</div>;
    }else{
      return(
        <ul>
          {
            users.map((user) => {
              return(
                <li key={user.id}>
                  <Link to={`user/${user.id}`}>{user.name}</Link>
                </li>
              )
            })
          }
        </ul>
      )
    }
}

export default Home