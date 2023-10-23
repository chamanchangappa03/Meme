import React, { useEffect, useState,useRouter } from "react"
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"
import { getAuth, createUserWithEmailAndPassword ,onAuthStateChanged} from "firebase/auth";
import { app,db } from '../firebaseConfig'
import styles from './styles.module.css';
// import { get onAuthStateChanged } from
import { setDoc, doc} from "firebase/firestore";
export function Signup() {
    const history=useNavigate();

    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')

    async function submit(e){
        e.preventDefault();
        const auth = getAuth(app);
        createUserWithEmailAndPassword(auth, email, password)
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
            window.location.href='/'
``
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
        });
        
    }


    return (
        <div className="login">

            <h1>Signup</h1>

            <form action="POST">
                <input type="email" onChange={(e)=>{setEmail(e.target.value)}}   placeholder="Email" name="" id="" className={styles.email}/>
                <input type="password" onChange={(e)=>{setPassword(e.target.value)}}   placeholder="Password" name="" id=""  className={styles.password}/>
                <input type="submit" onClick={submit} className={styles.submit}/>
            </form>

            <br />
            <p>OR</p>
            <br />

            <Link to="/">Login Page</Link>

        </div>
    )
}
