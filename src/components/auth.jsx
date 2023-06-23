import React from "react";
import {auth,provider} from '../firebase-config'
import {signInWithPopup} from 'firebase/auth'
import Cookies from "universal-cookie";
const cookie=new Cookies()
function Auth(props)
{
   
    const signin=async()=>
    {
        try {
            const result= await signInWithPopup(auth,provider)
            cookie.set('auth-token',result.user.refreshToken);
            props.setIsAuth(true)
        } catch (error) {
            console.error(error)
        }

       
    }
    return(
        <div className=" flex justify-center w-1/2 h-64 items-center flex-col border-2 border-slate-500 shadow-md shadow-indigo-500/50 rounded-lg text-center m-auto p-5 my-48 font-bold  ">
            <p className="my-5 text-2xl">Sign in using Google to continue !!</p>
            <button className="my-5  text-lg bg-indigo-600 hover:bg-indigo-500 border-3 rounded-lg p-3 text-white" onClick={signin}> Sign in with Google</button>
        </div>
    )
}


export default Auth