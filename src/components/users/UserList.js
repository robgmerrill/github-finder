import React from 'react'
import { useState, useEffect } from 'react'
import Spinner from '../layout/Spinner'

function UserList() {
  const [users, setUsers ] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchUsers();
  }, []) 


  const fetchUsers = async () => {
    const response = await fetch(`${process.env.REACT_APP_GITHUB_URL}/users`, {headers: {
        Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`
    }})
    const data = await response.json();
    setUsers(data)
    setIsLoading(false)
  }

  console.log(users)
  if (!isLoading) {
      return (
        <div className='grid sm:grid-cols-1 gap-8 lg:grid-cols-3'>
         {users && users.map((user) => (
              <h3 key={user.login}>{user.login}</h3>
            ))}
        </div>
      )
  } else {
    return <Spinner />
  }
}

export default UserList
