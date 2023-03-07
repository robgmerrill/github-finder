import React from 'react'
import { useState, useEffect } from 'react'
import Spinner from '../layout/Spinner'
import UserItem from './UserItem'

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
        <div className='grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:grid-cols-3 xl:grid-cols-4'>
         {users && users.map((user) => (
              <UserItem key={user.id} user={user} />
            ))}
        </div>
      )
  } else {
    return <Spinner />
  }
}

export default UserList
