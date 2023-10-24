import { imgDB } from "../firebaseConfig";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";



export const uploadPostImage = (file, setPostImage, setProgress) => {
    const postPicsRef = ref(imgDB
      , `postImages/${file.name}`);
    const uploadTask = uploadBytesResumable(postPicsRef, file);
  
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
  
       console.log(progress);
      },
      
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((response) => {
          setPostImage(response);
        });
      }
    );
  };