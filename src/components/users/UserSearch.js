import React, {useState, useContext} from 'react'
import GithubContext from '../../context/github/GithubContext'

function UserSearch() {
    const [text, setText] = useState('')
    console.log(text)

    const {users} = useContext(GithubContext)

    function handleChange(e) {
        console.log(e.target.value)
        setText(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (text === '') {
            alert('Please enter a search value')
        } else {
            // @todo -search users
            setText('')
        }
    }

  return (
    <div className='grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 mb-8 gap-8'>
      <div>
        <form onSubmit={handleSubmit}>
            <div className='form-control'>
                <div className='relative'>
                    <input className='w-full pr-40 bg-gray-200 input input-lg text-black' placeholder='Search' onChange={handleChange} value={text} />
                    <button className='absolute top-0 right-0 rounded-l-none w-36 btn btn-lg' type='submit'>
                        Go
                    </button>
                </div>
            </div>
        </form>
      </div>
      {users.length > 0 && (<div>
        <button className='btn btn-ghost btn-lg'>Clear</button>
      </div>)}
    </div>
  )
}

export default UserSearch
