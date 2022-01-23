require('dotenv').config()
const Cloud = require('@google-cloud/storage')
const path = require('path')
const { STORAGE_BUCKET, STORAGE_ACCESS_KEY } = process.env
const { Storage } = Cloud

/*
  StorageOptions
  https://cloud.google.com/nodejs/docs/reference/google-auth-library/latest/google-auth-library/googleauthoptions

  https://googleapis.dev/nodejs/storage/latest/global.html#StorageOptions
*/
const storage = new Storage({
  keyFilename: path.join(__dirname, './keys.json'),
  // projectId: 'your project id',
})
const bucketKeyFilename = storage.bucket(STORAGE_BUCKET || 'continuumcyber_storage_bucket')


const storageCredentials = new Storage({
  credentials: JSON.parse(STORAGE_ACCESS_KEY)
})
const bucketCredentials = storageCredentials.bucket(
  STORAGE_BUCKET || 'continuumcyber_storage_bucket'
)

module.exports = { bucketKeyFilename, bucketCredentials }