import React from "react";
import styles from './styles.css'
import { post,getStatus } from "../Api/FirestoreAPI";
import PostsCard from "./PostCards";
// import { getCurrentTimeStamp } from "../Helpers/useMoment";
import { ModalComponent } from "./Modal";
import { useState,useMemo } from "react";

import { getCurrentTimeStamp } from "../Helpers/useMoment";



export const Post  = () =>{ 
    const [modalOpen, setModalOpen] = useState(false);
    const [status,setStatus]=useState('')
    const [allStatuses,setAllStatus]=useState([])
    const sendStatus=async()=>{

        let object={
            status:status,
            timestamp:getCurrentTimeStamp('LLL')
        }
    await post(object);
    await setModalOpen(false);
    await setStatus("");    

    }
    
    useMemo(()=>{
        getStatus(setAllStatus);    
    },[])


return(
    <div className="post-status-main"> 
        <div className="post">
        <button className="open-post-modal" onClick={() => setModalOpen(true)}>Post your meme</button>
        </div>
        <ModalComponent 
        setStatus={setStatus} 
        modalOpen={modalOpen} 
        setModalOpen={setModalOpen}
        status={status}
        sendStatus={sendStatus}
        />
        <div>
        {allStatuses.map((posts)=>{
            return (
                <PostsCard posts={posts}/>
            )
        }
    )}
    </div> 
    
        
    </div>
);


};