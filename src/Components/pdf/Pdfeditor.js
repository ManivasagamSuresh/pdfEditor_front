import React, { useRef, useEffect, useState } from 'react';
import WebViewer from '@pdftron/webviewer';
import "./Pdfeditor.css"
import axios from 'axios';
import { Config } from '../../Config';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import { appfire } from '../../Firebase';

const Pdfeditor = () => {
  const[pdf,setPdf]=useState(undefined);
  const [pdflink,setPdflink]=useState('');
  const viewer = useRef(null);

// console.log(pdflink);



  const uploadfirebase = (file)=>{
  


  const storage = getStorage(appfire);
  
  // Create the file metadata

  const fileName = new Date().getTime() + file.name;
  // Upload file and metadata to the object 'images/mountains.jpg'
  const storageRef = ref(storage, 'images/' + file.name);
  const uploadTask = uploadBytesResumable(storageRef, file);
  
  // Listen for state changes, errors, and completion of the upload.
  uploadTask.on('state_changed',
    (snapshot) => {
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
        case 'paused':
          console.log('Upload is paused');
          break;
        case 'running':
          console.log('Upload is running');
          break;
      }
    }, 
    (error) => {
      // A full list of error codes is available at
      // https://firebase.google.com/docs/storage/web/handle-errors
      switch (error.code) {
        case 'storage/unauthorized':
          // User doesn't have permission to access the object
          break;
        case 'storage/canceled':
          // User canceled the upload
          break;
  
        // ...
  
        case 'storage/unknown':
          // Unknown error occurred, inspect error.serverResponse
          break;
      }
    }, 
    () => {
      // Upload completed successfully, now we can get the download URL
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        console.log('File available at', downloadURL);
        setPdflink(downloadURL);
        // console.log(pdflink);
      });
    }
  );

  }




  useEffect(() => {
    pdf && uploadfirebase(pdf);
  }, [pdf]);

  // if using a class, equivalent of componentDidMount 
  useEffect(() => {
    pdflink && (WebViewer(
      {
        path: '/webviewer/lib',
        // initialDoc: '/files/PDFTRON_about.pdf',
        initialDoc: `${pdflink}`,
      },
      viewer.current,
    ).then((instance) => {
      instance.UI.loadDocument(`${pdflink}`, { filename: 'myfile.pdf' });

    // const { documentViewer } = instance.Core;
      const { documentViewer, annotationManager, Annotations } = instance.Core;

      documentViewer.addEventListener('documentLoaded', () => {
        const rectangleAnnot = new Annotations.RectangleAnnotation({
          PageNumber: 1,
          // values are in page coordinates with (0, 0) in the top left
          X: 100,
          Y: 150,
          Width: 200,
          Height: 50,
          Author: annotationManager.getCurrentUser()
        });

        annotationManager.addAnnotation(rectangleAnnot);
        // need to draw the annotation otherwise it won't show up until the page is refreshed
        annotationManager.redrawAnnotation(rectangleAnnot);
      });
    }))
  }, [pdflink,pdf]);



  return (
    <div className="pdfeditor">
      <div className="pdfeditor-header">PDF EDITOR</div>
      
    {pdf ?<div className="pdfeditor-webviewer" ref={viewer}></div> :
    
    <>
    <div>
        <input type='file' className='addpdf-input' onChange={(e)=>{setPdf(e.target.files[0])}}/>
        
      </div>
      <span className='nopdf'>PLEASE ADD A PDF FILE TO CONTINUE</span>
    </>
    }  
    </div>
  );
};

export default Pdfeditor;
