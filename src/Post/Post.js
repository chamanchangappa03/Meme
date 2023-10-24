import React,{useEffect} from "react";
import styles from './styles.css'
import { post,getStatus } from "../Api/FirestoreAPI";
import PostsCard from "./PostCards";
// import { getCurrentTimeStamp } from "../Helpers/useMoment";
import { ModalComponent } from "./Modal";
import { useState,useMemo } from "react";
import { getCurrentTimeStamp } from "../Helpers/useMoment";
import {app} from '../firebaseConfig'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db,imgDB,txtDB } from '../firebaseConfig'
import {ref,uploadBytesResumable,getDownloadURL} from 'firebase/storage'
import { collection, doc, getDoc, getDocs,updateDoc, where, getFirestore, orderBy, query,arrayUnion} from "firebase/firestore";
// import {  } from "../authentication/Signin"
import { uploadPostImage } from "../Api/Image";

export const Post  = () =>{ 
    const [modalOpen, setModalOpen] = useState(false);
    const [status,setStatus]=useState('')
    const [allStatuses,setAllStatus]=useState([])
    const [user,setUser]=useState('')
    // const [currentImage,setCurrentImage]=useState({})
    const [postImage,setPostImage]=useState('')
    // console.log(postImage)
    const sendStatus=async()=>{
        let url;
        console.log(postImage)
          // console.log(data);
          const storageRef = ref(imgDB, postImage.name);
      
          const uploadTask = uploadBytesResumable(storageRef, postImage);
      
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              // Observe state change events such as progress, pause, and resume
              // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
              console.log(snapshot)
            },
            (error) => {
              // Handle unsuccessful uploads
              console.log(error)
            },
            () => {
              // Handle successful uploads on complete
              // For instance, get the download URL: https://firebasestorage.googleapis.com/...
              getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                url=downloadURL
                console.log("File available at", downloadURL);
              });
            }
          );
        

        let object={
            status:status,
            timestamp:getCurrentTimeStamp('LLL'),
            userEmail:user.email,
            image:null||getDownloadURL
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
        setPostImage={setPostImage}
        uploadPostImage={uploadPostImage}
        />
        <div>







        {allStatuses.map((posts)=>{
            return (
                <PostsCard posts={posts} />
            )
        }
    )}
    </div> 
    
        
    </div>
);


};



function Getuserdetails(user,setUser){
	
    const fetchUserDetails = async (email) => {
      // const db = getFirestore(app);
      const usersCollection = collection(db, 'users'); 
    
      const q = query(usersCollection, where('email', '==', email));
    
      try {
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
            querySnapshot.forEach((doc) => {
            const userData = doc.data();
            setUser(userData);
            console.log(userData)
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