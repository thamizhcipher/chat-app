import { useRef, useState } from 'react';
import './App.css';
import Auth from './components/auth';
import Cookies from 'universal-cookie'
import { Chat } from './components/chat';
import { signOut } from 'firebase/auth';
import {auth} from './firebase-config'
const cookie=new Cookies()
function App() {

  const [isAuth,setIsAuth]=useState(cookie.get("auth-token"))
  const [room,setRoom]=useState(null)
  const roomInpRef=useRef(null)
  const signoutUser=async()=>{
    await signOut(auth);
    cookie.remove('auth-token')
    setIsAuth(false)
    setRoom(null)
  }
  if(!isAuth)
  {
    return (
      <>
        <Auth setIsAuth={setIsAuth} />
      </>
    );
  }

  return <>
  {room ? <Chat room={room} /> : <div className='room flex flex-col m-auto justify-center w-1/2 items-center my-52 border-5 border-indigo-700 shadow-md shadow-grey rounded-lg p-5'>
    <label className='font-bold text-2xl my-2'>Enter Room Name:</label>
    <input className='border-2 p-2 my-5 border-blue-400 rounded-lg' ref={roomInpRef}></input>
    <button className='border-4 border-blue-200 hover:border-blue-300 active:border-blue-200 my-10 p-2 rounded-lg bg-sky-600 text-lg font-bold text-white' onClick={()=>setRoom(roomInpRef.current.value)}>Enter chat</button>
    </div>
  }
  <div className='relative '>
    <button  className='sign-out border-4 rounded-lg p-2 absolute bottom-[3rem] left-[45rem] border-sky-300 bg-blue-800  text-white font-bold' onClick={signoutUser}>Sign Out</button>
  </div>
  </>
 
}

export default App;
