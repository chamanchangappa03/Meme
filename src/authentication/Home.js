import React from "react"
import {useLocation, useNavigate} from 'react-router-dom';
import  styles from './styles.module.css';
// import  from '../Library/Library';
export function Home (){
    const location=useLocation()
    const navigate=useNavigate()
    const gotoMeme=()=>{
        navigate("/Meme")
    }
    const gotolib=()=>{
        navigate("/Library")
    }
    return (
        <div className="homepage">
            <h1>Hello   welcome to the home</h1>
            <button onClick={() => gotoMeme()} className={styles.genmeme}>Generate Meme</button>
            <button onClick={()=>gotolib()} className={styles.lib}>Library</button>
            
        </div>
    )
}

