import React, { useState } from 'react'
 import Dropzone from 'react-dropzone'
 import styled from 'styled-components'
 import axios from 'axios';

 const FileUpload = ({refreshFunction}) => {
   const [images, setImages] = useState([]);

   const handleDrop = (files) => {
     let formData = new FormData();
     const config = {
       header: {'content-type' : 'multipart/form-data'}
     }
     formData.append('file', files[0])
     axios.post('/api/item/image', formData, config)
       .then(res=>{
         if(res.data.success){
           setImages([...images, res.data.filePath])
           refreshFunction([...images, res.data.filePath])
         }else{
           alert('파일 업로드에 실패 했습니다.')
         }
       })
   }
   
   const handleDelete = (image) =>{
    const currentIdx = images.indexOf(image)
    let newImages = [...images]
    newImages.splice(currentIdx, 1)
    setImages(newImages)
    refreshFunction(newImages)
  }

   return (
     <FileWrap >
       <Dropzone onDrop={handleDrop}>
         {({getRootProps, getInputProps}) => (
           <section>
             <div className='flex-center imageBox' {...getRootProps()}>
               <input {...getInputProps()} />
               <p>+</p>
             </div>
           </section>
         )}
       </Dropzone>
       <ImageWrap>
         {images.map((image, idx)=>(
           <div onClick={()=>handleDelete(image)} className='imageCard' key={idx}>
             <img src={`http://localhost:5000/${image}`}></img>
           </div>
         ))}
       </ImageWrap>
     </FileWrap>
   )
 }

 export default FileUpload

const FileWrap = styled.article`
  display: flex;
  justify-content: space-between;

  section{
    padding: 0;
    margin: 0;
  }

  .imageBox{
    width: 300px;
    height: 240px;
    border: 1px solid #ddd;

    p{
      margin-bottom: 15px;
      font-size: 3rem;
      color: gray;
    }
  }
   
  .imageBox:hover{
    cursor:pointer;
  }
`;

const ImageWrap = styled.div`
  display: flex;
  width: 350px;
  height: 240px;
  overflow-x: scroll;

  .imageCard{
    margin-right: 10px;
  }

  img{
    min-width: 300px;
    width: 300px;
    height: 240px;
  }
`; 