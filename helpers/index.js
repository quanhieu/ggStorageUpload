const moment = require('moment')
const util = require('util')
const gc = require('../config')
const bucket = gc.bucket('continuumcyber_storage_bucket')
const { format } = util

/**
 *
 * @param { File } object file object that will be uploaded
 * @description - This function does the following
 * - It uploads a file to the image bucket on Google Cloud
 * - It accepts an object as an argument with the
 *   "originalname" and "buffer" as keys
 */

const uploadImage = async (file) => {
  const { originalname, buffer, mimetype } = file

  const markDownDate = `images/${moment().format('YYYYMMDDHHMMSS')}_`;
  const storageFileName = `${markDownDate}${originalname.replace(/ /g, "_")}`
  const blob = bucket.file(storageFileName)

  const data = await new Promise((resolve, reject) => {
    const blobStream = blob.createWriteStream({
      // resumable: false
      metadata: { contentType: mimetype },
      // public: true
    })
  
    blobStream.on('finish', () => {
      const publicUrl = format(
        `https://storage.googleapis.com/${bucket.name}/${blob.name}`
      )
      resolve(publicUrl)
    })
    // .on('error', (err) => {
    //   reject(`Unable to upload image, something went wrong`, err)
    // })
    .on('error', err => reject(err))
    .end(buffer)
  
  })

  const [signedUrl] = await blob.getSignedUrl({
    version: 'v4',
    expires: moment().add(24, 'hours').utc().format("YYYY-MM-DD HH:mm:ss"),
    action: 'read'
  });

  return {
    publicUrl: data,
    storageFileName: storageFileName,
    signedUrl: signedUrl,
  }
}

module.exports = uploadImage