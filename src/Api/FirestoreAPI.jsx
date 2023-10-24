
import { db,imgDB } from "../firebaseConfig"
import { addDoc,collection,onSnapshot } from "firebase/firestore"
import { toast } from "react-toastify"
let dbRef=collection(db,'posts');



export const post=(object)=>{
    
addDoc(dbRef,object)
.then(()=>{
    toast.success("Document has been added succesfully");

})
.catch((err) =>{
    console.log(err);
   
});
};
 

export const getStatus=(setAllStatus)=>{
    onSnapshot(dbRef,(response)=>{
        setAllStatus(response.docs.map((docs)=>{
            return { ...docs.data(),
            id:docs.id
            }
        }))
    })
}