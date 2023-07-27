import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const User = () => {
  const {id} = useParams();

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [userDetails, setUserDetails] = useState([]);
  const [userAddress, setUserAddress] = useState([]);
  const [userCompany, setUserCompany] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users/" + id)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      setUserDetails(data);
      setUserAddress(data.address);
      setUserCompany(data.company)
      setIsLoaded(true);
    })
    .catch((err) => {
      setError(err.message)
    })
  }, [])

  if (error){
    return <div className='error'>An Error Occured: {error}</div>;
  } else if (!isLoaded){
    return <div className='load'>loading...</div>;
  }else{
    return(
      <div key={userDetails.id}>
          <h1>{userDetails.name}</h1>
          <div>Email: {userDetails.email}</div>
          <div>Phone: {userDetails.phone}</div>
          <div>Website: {userDetails.website}</div>
          <div>Company: {userCompany.name}</div>
          <div>Website: {userAddress.street}, 
                      {userAddress.suite}, 
                      {userAddress.city}, 
                      {userAddress.zipcode}
          </div>
      </div>
    )
  }
}

export default User