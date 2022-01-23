import React, { useState, useCallback } from 'react'
import styled from 'styled-components'

const UploadComponent = () => {
  const [imageFile, setImageFile] = useState([])

  const getSignedUrlToWriteGoogleCloudStorage = useCallback(async(fileName) => {
    const response = await fetch(
      `http://localhost:9001/preSignedUrl?fileName=${fileName}`
    );
    const resJson = await response.json();
    if (resJson && resJson.data) {
      const { preSignedUrl } = resJson.data
      return preSignedUrl
    }
  }, [])

  const handleChange = useCallback(async e => {
    try {
      const { files: item } = e.target

      const fileInfo = {
        name: item[0].name,
        type: item[0].type,
        size: `${Math.round(item[0].size / 1000)} kB`,
      }
      console.log('fileInfo ', fileInfo)
  
      // request signed url to upload file
      const preSignedUrlWrite = await getSignedUrlToWriteGoogleCloudStorage(item[0].name)
      console.log('preSignedUrlWrite ', preSignedUrlWrite)

      // let headers = new Headers();

      // headers.append('Content-Type', 'application/octet-stream');
      // headers.append('Accept', 'application/octet-stream');

      // headers.append('Content-Type', 'image/*');
      // headers.append('Accept', 'image/*');
      
      // headers.append('Origin','http://localhost:3000');
      // headers.append('responseHeader','Content-Type');


      const responseUpload = await fetch(preSignedUrlWrite, {
        // mode: 'cors',
        // headers: headers,
        method: 'PUT',
        body: item[0],
      })
      // .then(response => response.json())
      // .then(json => console.log('Log json ', json))
      // .catch(error => console.log('Failed : ' + error.message));

      console.log('responseUpload ', responseUpload)
    } catch (error) {
      console.error('Error:', error);
    }
  }, [])

  const previewImage = useCallback(selectedImage => {
    const base64Image = selectedImage?.imageBase64 || ''
    const myWindow = window.open()
    myWindow.document.write(`
      <div style="display: flex; justify-content: center;">
        <img src=${base64Image} alt="Red dot" />
      </div>
    `)

    myWindow.focus()
    myWindow.print()
  }, [])

  return (
    <StyledInput isError={false}>
      <div className="custom-btn-upload">
        <i className="fa fa-upload" aria-hidden="true">
          Upload file
        </i>
        <input
          type="file"
          className="customFileUpload"
          onChange={e => handleChange(e)}
          multiple={false}
          accept={'image/*'}
        />
      </div>
      {imageFile.length > 0 &&
        imageFile.map((item, index) => (
          <div
            // eslint-disable-next-line react/no-array-index-key
            key={`${item.name}-${index}`}
            className="fileName"
            role="presentation"
            onClick={() => previewImage(item)}
          >
            <i className="fa fa-image" aria-hidden="true">
              {item.name}
            </i>
          </div>
        ))}
    </StyledInput>
  )
}

const StyledInput = styled.div`
  .custom-btn-upload {
    input[type='file'] {
      width: 100%;
      height: 100%;
      opacity: 0;
      z-index: 1;
      position: absolute;
    }
    i {
      margin-left: 1.4em;
      display: flex;
      gap: 1em;
      justify-items: center;
      align-items: center;
      width: 30%;
      position: relative;
    }
    position: relative;
    cursor: pointer;
    border: ${props =>
      props.isError ? '1px solid #f54d63' : '1px solid #ccc'};
    height: 5vh;
    display: flex;
    align-items: center;
    border-radius: ${props =>
      props.isError ? '0.375rem 0 0 0.375rem' : '0.375rem'};
    :hover {
      border-color: ${props => !props.isError && 'blueviolet'};
    }
    :focus-within {
      border-color: rgba(70, 21, 214, 0.5);
      box-shadow: 0 0 2px 2px rgba(69, 21, 214, 0.26);
    }
  }
  .fileName {
    margin-top: 1em;
    margin-left: 2em;
    i {
      display: flex;
      gap: 2em;
      color: #ff0000a9;
      cursor: pointer;
    }
  }
`

export default UploadComponent