import React, { useState } from 'react';
import './index.css';
import {  Button, Modal } from 'antd';
import { db,imgDB,txtDB } from '../../firebaseConfig'
import {ref,uploadBytesResumable,getDownloadURL} from 'firebase/storage'


export const ModalComponent = ({modalOpen
  ,setModalOpen
  ,setStatus
  ,status
  ,sendStatus
  ,setPostImage
  
}) => {



  function setpostimg(e) {
    setPostImage(e.target.files[0]);
  }
//const [imageUpload,setImageUp]=useState(null)
  
  return (
    <>
      
      
     
      <Modal
        title="post your meme"
        centered
        open={modalOpen}
        onOk={() => setModalOpen(false)}
        onCancel={() => setModalOpen(false)}
        
      
        footer={[
          <Button 
          onClick={sendStatus}
          key="submit" type='primary' disabled={status.length<=0}>
            Post
          </Button>
        ]}

>

        <input className="modal-input" 
        placeholder="your meme your text"
        onChange={(event) => setStatus(event.target.value)}
        value={status}
        />

       <input className="img" type="file"  onChange={setpostimg}/>
      </Modal>
    </>
  );
};

