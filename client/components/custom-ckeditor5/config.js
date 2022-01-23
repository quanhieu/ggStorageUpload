const fatherToolbar = {
  items: [
    'heading',
    '|',
    'alignment',
    'horizontalLine',
    'outdent',
    'indent',
    '|',
    'bold',
    'italic',
    'underline',
    'strikethrough',
    '|',
    'fontFamily',
    'fontSize',
    'fontColor',
    'fontBackgroundColor',
    '|',
    'bulletedList',
    'numberedList',
    '-',
    'removeFormat',
    '|',
    'codeBlock',
    'htmlEmbed',
    'sourceEditing',
    '|',
    'insertTable',
    'imageUpload',
    'mediaEmbed',
    'link',
    'imageInsert',
    '|',
    'specialCharacters',
    '|',
    'blockQuote',
    'highlight',
    '|',
    'undo',
    'redo'
  ],
  shouldNotGroupWhenFull: true,
}

const imageToolbar = {
  toolbar: [
    'imageTextAlternative',
    'imageStyle:inline',
    'imageStyle:block',
    'imageStyle:side',
    'linkImage'
  ],
}

const tableToolbar = {
  contentToolbar: [
    'tableColumn',
    'tableRow',
    'mergeTableCells',
    'tableCellProperties',
    'tableProperties'
  ],
}

export { fatherToolbar, imageToolbar, tableToolbar }
