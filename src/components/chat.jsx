import { useEffect, useState } from "react"
import {addDoc,collection,onSnapshot,orderBy,query,serverTimestamp, where} from "firebase/firestore"
import { auth, db } from "../firebase-config"
import {PaperPlaneTilt} from '@phosphor-icons/react'
import '../chat.css'
export const Chat=(props)=> {
    const [newMsg,setNewMsg]=useState("")
    const [msgs,setMsgs]=useState([])
    const collecref=collection(db,'messages')
    const date=new Date()
    const todayFormattedDate=date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })
    useEffect(()=>{
        const queryMsgs=query(collecref,where('room','==',props.room),orderBy('createdAt'))
       const unsunscribe= onSnapshot(queryMsgs,(snapshot)=>{
            let msgs=[]
            snapshot.forEach((doc)=>{
                msgs.push({...doc.data(),id:doc.id})
            });
            setMsgs(msgs)
        })
        return()=> unsunscribe()
    },[])

    const handleSubmit=async(e)=>
    {
        e.preventDefault();
        if(newMsg==="")
        { 
          return(
            window.alert("Enter a message to send")
          )
        }
       await addDoc(collecref,
        {
            text:newMsg,
            createdAt:serverTimestamp(),
            user:auth.currentUser.displayName,
            room:props.room
        })
        setNewMsg("")
    }
    const inpEle=document.querySelector('input')
    useEffect(()=>{
        const keyHandler=(e)=>{
            if(e.key==='Enter')
            {
                e.preventDefault();
                handleSubmit()
            }
        }
        inpEle.addEventListener('keydown',keyHandler)
        return()=>{
        inpEle.removeEventListener('keydown',keyHandler);}
    },[])
    
    return(
        <div className="view border-2 my-10 mx-5 h-[41rem] border-cyan-700 rounded-lg p-2">
            <div>
              <h1 className="text-3xl text-center font-['tilt-prism'] font-bold">Welcome to:<span className="mx-2 tracking-wider">{props.room.toUpperCase()}</span> </h1>
            </div>
            <div className="message overflow-y-scroll h-[30rem]">
              {msgs.map((msg, index) => {
                if (msg.createdAt === null) {
                    return null; 
                  }
                // Get the current message's date
                const currentDate = msg.createdAt.toDate().toLocaleDateString('en-US', { month: 'long', day: 'numeric' });

                // Get the previous message's date
                const previousDate = index > 0 ? msgs[index - 1].createdAt.toDate().toLocaleDateString('en-US', { month: 'long', day: 'numeric' } ) : '';
 
                // Check if the current date is different from the previous date
                const isNewDate = currentDate !== previousDate;

                return (
                  <>
                  {isNewDate && <h3 className="text-center mt-2 border-3 m-auto bg-blue-500 text-white w-20 rounded-lg px-2 py-1   font-bold">{currentDate===todayFormattedDate ? 'Today' : currentDate}</h3>}
                  <div className={`m-4 flex flex-row ${msg.user === auth.currentUser.displayName ? 'flex-row-reverse' : 'flex-row'}`} key={msg.id}>
                   
                    <span className="mt-7">{msg.user}</span>
                    <span className={`text-lg border-3 rounded-lg bg-sky-500 text-white px-3 py-2 m-2 ${msg.user === auth.currentUser.displayName ? 'self-end' : 'self-start'}`}>{msg.text}</span>
                    <span className="mt-6">{msg.createdAt.toDate().toLocaleTimeString().replace(/:\d+ /, ' ')}</span>
                  </div>
                  </>
                );
              })}
          </div>


  <form onSubmit={handleSubmit} className="border-3 bg-pink-300 rounded-lg relative mt-2 ">
    <input
      className="chat-inp w-5/6 text-lg text-black bg-white px-2 border-2 m-2 ml-10 border-cyan-900 rounded-md"
      placeholder="Enter your message here..."
      value={newMsg}
      onChange={(e) => { setNewMsg(e.target.value) }}
    />
    <button type="submit" className="send-btn px-4 border-2 border-cyan-900 absolute bottom-2 md: rounded-md mx-5 bg-blue-600 mt-2">
      <PaperPlaneTilt size={window.innerWidth<653 ? 20 : 28} color="#fff"  />
    </button>
  </form>
</div>

    )
}