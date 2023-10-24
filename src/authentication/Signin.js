import React, { useState } from "react";

import { useNavigate,Link } from "react-router-dom";
import { app,db } from '../firebaseConfig'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import styles from './styles.module.css';
import { doc } from "firebase/firestore";
import { setDoc } from "firebase/firestore"
import { imgDB } from '../firebaseConfig'


export function Signin(){
   
    const history=useNavigate();
    const[email,setEmail]=useState('')
    const[password,setPassword]=useState('')
   
   async function submit(e){
    e.preventDefault();
  
  

       const auth = getAuth(app);
       signInWithEmailAndPassword(auth, email, password)

       .then(async (userCredential) => {
        // Signed up 
        const userData = {
            uid: userCredential.user.uid,
            email:email,
            //displayName: 
            createdAt: Date.now(),
            posts: [],
        };
        await setDoc(doc(db, "users", userCredential.user.uid), userData);
        console.log(userData)
        history("home")
    


        // ...
    })
         .then(async(result)=>{
            console.log(result.user);
            const ref=doc(imgDB,"usersInformation",result.user.uid)
            const docRef=await setDoc(ref,{ email })
            console.log("Document written with ID: ", docRef.id);
        })
         .catch((error) => {
           const errorCode = error.code;
           const errorMessage = error.message;
         });
}
   
   
    return(
        <div className="login">
            <h1>Login</h1>
            <form action="POST">
                <input type="email" onChange={(e)=>{setEmail(e.target.value)}}   placeholder="Email" name="" id="" className={styles.email}/>
                <input type="password" onChange={(e)=>{setPassword(e.target.value)}}   placeholder="Password" name="" id=""  className={styles.password}/>
                <input type="submit" onClick={submit} className={styles.submit}/>
            </form>
            <br/>
            <p>or</p>
            <br/>
            <Link to="/signup">Signup page</Link>
        </div>
    )
}