const express = require('express')
const bodyParser = require('body-parser')
const multer = require('multer')
const cors = require('cors')

const service = require('./services')

const app = express()

const multerMid = multer({
  storage: multer.memoryStorage(),
  limits: {
    // no larger than 15mb.
    // fileSize: 15 * 1024 * 1024,
    fieldSize: 15 * 1024 * 1024,
  },
});

// app.disable('x-powered-by')
// app.use(multerMid.single('upload'))
// app.use(multerMid.single('file'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())

app.post('/upload', multerMid.single('upload'), async(req, res, next) =>{
  const myFile = req.file
  const imageUrl = await service.uploadImage(myFile)

  res.status(200).json({
    uploaded: true,
    url: imageUrl.publicUrl,
    data: imageUrl
  })
})

app.post('/uploads', multerMid.single('file'), async (req, res, next) => {
  try {
    const myFile = req.file
    const imageUrl = await service.uploadImage(myFile)

    res.status(200).json({
      message: "Upload was successful",
      data: imageUrl,
    })
  } catch (error) {
    console.log(`\n Uploads error ${error} \n`)
    next(error)
  }
})

// get sign to upload at frontend
app.get('/preSignedUrl', async (req, res, next) => {
  try {
    const fileName = req.query.fileName
    const data = await service.createSignedUrlToUpload(fileName)

    res.status(200).json({
      message: "Get pre-signed url was successful",
      data
    })
  } catch (err) {
    console.log(`\n Get pre-signed url error ${err} \n`)
    next(err)
  }
})

// get url resource by pathName
app.get('/getResourceByPreSignedUrl', async (req, res, next) => {
  try {
    const pathName = req.query.pathName
    const data = await service.getResourceBySignedUrl(pathName)

    res.status(200).json({
      message: "Get resource by pre-signed url was successful",
      data
    })
  } catch (err) {
    console.log(`\n Get resource by pre-signed url error ${err} \n`)
    next(err)
  }
})

// delete resource
app.delete('/removeResource', async (req, res, next) => {
  try {
    const pathName = req.query.pathName
    const data = await service.removeResource(pathName)

    res.status(200).json({
      message: "Remove resource was successful",
      data
    })
  } catch (err) {
    console.log(`\n Remove resource error ${err} \n`)
    next(err)
  }
})

// CORS GCP
app.get('/enableCors', async (req, res, next) => {
  try {
    const data = await service.enableCors()

    res.status(200).json({
      message: "Enable Cors was successful",
      data
    })
  } catch (err) {
    console.log(`\n Enable Cors error ${err} \n`)
    next(err)
  }
})

app.get('/viewCors', async (req, res, next) => {
  try {
    const data = await service.viewCors()

    res.status(200).json({
      message: "View Cors was successful",
      data
    })
  } catch (err) {
    console.log(`\n View Cors error ${err} \n`)
    next(err)
  }
})

app.get('/disableCors', async (req, res, next) => {
  try {
    const data = await service.disableCors()

    res.status(200).json({
      message: "Disable Cors was successful",
      data
    })
  } catch (err) {
    console.log(`\n Disable Cors error ${err} \n`)
    next(err)
  }
})

// Transform json key to string
app.post('/transformJsonKey', async (req, res, next) => {
  try {
    const { jsonKey } = req.body
    const stringKey = await service.transformJsonToString(jsonKey)

    res.status(200).json({
      message: "TransformJsonKey successful - Note: Use data-value in terminal",
      data: stringKey,
    })
  } catch (error) {
    console.log(`\n TransformJsonKey error ${error} \n`)
    next(error)
  }
})



app.use((err, req, res, next) => {
  res.status(500).json({
    error: err,
    message: 'Internal server error!',
  })
  next()
})

app.listen(process.env.PORT, () => {
  console.log(`Server is listening on port ${process.env.PORT}`)
})