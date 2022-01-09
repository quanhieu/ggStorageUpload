import React, { useCallback, useRef, useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import styled from 'styled-components'

const EditorCustom = dynamic(() => import('./ckeditor5'), {
  ssr: false,
})

const WrapEditorComponent = () => {
  const handleChange = useCallback(newContent => {
    console.log('newContent ', newContent)
  }, [])

  return (
    <StyledWrapEditor
      className="wrapComponent"
      isError={false}
    >
      <EditorCustom 
        updateContent={handleChange}
        data='aaa'
      />
    </StyledWrapEditor>
  )
}

const StyledWrapEditor = styled.div`
  .ckeditorCustom {
    .ck-toolbar {
      border: ${props =>
        props.isError ? '1px solid #f54d63' : '1px solid #c4c4c4'};
    }
    .ck-content {
      border: ${props =>
        props.isError ? '1px solid #f54d63 !important' : '1px solid #c4c4c4'};
    }
  }
`

export default WrapEditorComponent
