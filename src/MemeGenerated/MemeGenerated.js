import  React, { useState,useEffect } from 'react';
import styles from './styles.module.css';
import { useNavigate,useLocation } from 'react-router-dom';
import { useClipboard } from 'use-clipboard-copy';
import { imgDB,name,txtDB } from '../firebaseConfig';
import { v4 } from "uuid";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { addDoc, collection, getDocs } from "firebase/firestore";
// import { post } from '../post/post';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Signin } from "../authentication/Signin"

// import Skeleton from 'react-loading-skeleton';
// import addPlayer from '../Library/Library';

export const MemeGenerated=()=>{

    const[copied,setCopied]= useState(false);
    const [txt,setTxt] = useState('')
     const [img,setImg] =useState('')
    const clipboard = useClipboard();
    const history   =   useNavigate();
    const location=useLocation();
    const url=new URLSearchParams(location.search).get('url'); 
    const [data,setData] = useState([])


    const copyLink=()=>{
        clipboard.copy(url);
        setCopied(true)
    };


    const gotoLibrary=() =>{
        history("/Library")
    }
    const gotoPosts=() =>{
        history("/Post")
    }
    const handleUpload =(e)=>{
        console.log(e.target.files)
        const imgs=ref(imgDB,`images/${v4()}`)
        uploadBytes(imgs,e.target.files[0]).then(data=>{
            console.log(data,"imgs")
            getDownloadURL(data.ref).then(val=>{
                setImg(val)
            })
        })
        
    }
    const handleClick = async () =>{
        const valRef = collection(txtDB,'txtData')
        await addDoc(valRef,{txtVal:txt,imgUrl:img})
        alert("Data added successfully")
}
    const getData = async () =>{
        const valRef = collection(txtDB,'txtData')
        // const name=collection(Signin,'Email')
        const dataDb = await getDocs(valRef)
        const allData = dataDb.docs.map(val=>({...val.data(),id:val.id}))
        setData(allData)
        console.log(dataDb)
    }

    useEffect(()=>{
        getData()
})
    console.log(data,"datadata")
    
   
    
    const downloadFileAtURL=(url)=>{
        

        const fileName=url.split('/').pop()
        const aTag=document.createElement('a')
        aTag.href=url
        aTag.setAttribute('download',fileName)
        document.body.appendChild(aTag)
        aTag.click();
        aTag.remove();
    }

    return(    
       
        <div className={styles.container}  >
            <button onClick ={()=>history('/')} className={styles.home}> 
            Make more Memes
            </button>


        
            { url && <img alt='meme' src={url}/>}

            <button onClick={copyLink} className={styles.copy}>
                {copied ? `Link copied` :`copy link`}
            </button>
            


            <button className={styles.App} onClick={()=> {
                downloadFileAtURL(url)
                }}>
                Download file
            </button>



            <button className={styles.Libr} onClick={()=>{
                gotoLibrary()
            }}>
                LIBRARY
            </button>



              <input className={styles.txt} onChange={(e)=>setTxt(e.target.value)} /><br/>
            <input className={styles.img} type="file"   onChange={(e)=>handleUpload(e)}/>
            <button className={styles.add} onClick={handleClick}>Add</button>
            <button className={styles.post} onClick={()=>{
                gotoPosts()} }>post</button>








        </div>
        )
}


