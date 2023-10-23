import React,{useEffect} from "react";
import styles from './styles.css'
import { post,getStatus } from "../Api/FirestoreAPI";
import PostsCard from "./PostCards";
// import { getCurrentTimeStamp } from "../Helpers/useMoment";
import { ModalComponent } from "./Modal";
import { useState,useMemo } from "react";
import { getCurrentTimeStamp } from "../Helpers/useMoment";
import {app ,db} from '../firebaseConfig'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, doc, getDoc, getDocs,updateDoc, where, getFirestore, orderBy, query,arrayUnion} from "firebase/firestore";



export const Post  = () =>{ 
    const [modalOpen, setModalOpen] = useState(false);
    const [status,setStatus]=useState('')
    const [allStatuses,setAllStatus]=useState([])
    const [user,setUser]=useState('')
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

    const temp=Getuserdetails(user,setUser)
    //console.log(temp)

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
                <PostsCard posts={posts} user={user.email}/>
            )
        }
    )}
    </div> 
    
        
    </div>
);


};



function Getuserdetails(user,setUser){
	
    const fetchUserDetails = async (email) => {
      //const db = getFirestore(app);
      const usersCollection = collection(db, 'users'); 
    
      const q = query(usersCollection, where('email', '==', email));
    
      try {
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
            querySnapshot.forEach((doc) => {
            const userData = doc.data();
            setUser(userData);
            //console.log(userData)
          });
        } else {
          console.log('No user found with this email.');
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };
    
    useEffect(() => {
      const auth = getAuth(app);
    
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        if (currentUser) {
          const userEmail = currentUser.email;
          fetchUserDetails(userEmail);
        } else {
          setUser('');
        }
      });
    
      return () => unsubscribe(); 
    }, [user]);
  
    return user;
  
  }