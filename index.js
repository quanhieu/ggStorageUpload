const express = require('express')
const bodyParser = require('body-parser')
const multer = require('multer')

const uploadImage = require('./helpers')

const app = express()

const multerMid = multer({
  storage: multer.memoryStorage(),
  limits: {
    // no larger than 15mb.
    // fileSize: 15 * 1024 * 1024,
    fieldSize: 15 * 1024 * 1024,
  },
});

app.disable('x-powered-by')
app.use(multerMid.single('file'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.post('/uploads', async (req, res, next) => {
  try {
    const myFile = req.file
    const imageUrl = await uploadImage(myFile)

    res
      .status(200)
      .json({
        message: "Upload was successful",
        data: imageUrl
      })
  } catch (error) {
    console.log(`\n error ${error} \n`)
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

app.listen(9001, () => {
  console.log('app now listening for requests!!!')
})