import React, { useState, useEffect } from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import CustomEditor from './custom-build-ckeditor-upload/ckeditor'
import { fatherToolbar, imageToolbar, tableToolbar } from './config'

const CKEditorCustom = ({ data, updateContent }) => {
  const [isLayoutReady, setIsLayoutReady] = useState(false)
  // const [configEditor, setConfigEditor] = useState({})

  useEffect(() => {
    setIsLayoutReady(true)
  }, [])

  return (
    <div className="ckeditorCustom">
      {isLayoutReady ? (
        <CKEditor
          data={data}
          // eslint-disable-next-line no-unused-vars
          onReady={editor => {
            console.log('Editor is ready to use!')
            // editor.setData(data)
            // setConfigEditor(editor)
          }}
          onError={err => {
            console.log('Error ', err)
            if (err.willEditorRestart) {
              // editor.setData( 'Something when wrong.' )
            }
          }}
          config={{
            // ...configEditor,
            // placeholder: '.',
            // removePlugins: ['ImageInsert'],
            toolbar: fatherToolbar,
            image: imageToolbar,
            table: tableToolbar,
            simpleUpload: {
              // The URL that the images are uploaded to.
              uploadUrl: 'http://localhost:9001/upload',
              // Enable the XMLHttpRequest.withCredentials property.
              withCredentials: false,
              // Headers sent along with the XMLHttpRequest to the upload server.
              headers: {
                // 'Access-Control-Allow-Origin': '*',
                // 'Access-Control-Allow-Credentials': '*',

                // 'X-CSRF-TOKEN': 'CSRF-Token',
                Authorization: 'Bearer <JSON Web Token>'
              }
            },
          }}
          onChange={(event, editor) => {
            updateContent(editor.getData())
          }}
          editor={CustomEditor}
        />
      ) : (
        <div>Editor loading...</div>
      )}
    </div>
  )
}

export default CKEditorCustom
