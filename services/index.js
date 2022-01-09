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

 exports.uploadImage = async (file) => {
  const { originalname, buffer, mimetype } = file
  console.log(`\n file ${file} \n`)

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

  const expiredTime = Date.now() + 60 * 60 * 1000

  const [signedUrl] = await blob.getSignedUrl({
    version: 'v4',
    action: 'read',
    expires: expiredTime, // 60 minutes
    // expires: moment().add(1, 'hours').utc().format("YYYY-MM-DD HH:mm:ss"), // 1 hour
  });

  return {
    publicUrl: data,
    storageFileName: storageFileName,
    signedUrl: signedUrl,
    expiredTime: expiredTime
  }
}

exports.createSignedUrlToUpload = async(fileName) => {
  const markDownDate = `images/${moment().format('YYYYMMDDHHMMSS')}_`;
  const storageFileName = `${markDownDate}${fileName.replace(/ /g, "_")}`
  const blob = bucket.file(storageFileName)

  const expiredTime = Date.now() + 15 * 60 * 1000

  const options = {
    version: 'v4',
    action: 'write',
    expires: expiredTime, // 15 minutes
    // contentType: 'image/*',
    // contentType: 'application/octet-stream',
    // contentType: 'application/json',
  };

  const [signedUrl] = await blob.getSignedUrl(options);
  return {
    preSignedUrl: signedUrl,
    expiredTime: expiredTime,
    fileName: fileName,
    storageFileName: storageFileName,
  };
}

exports.getResourceBySignedUrl = async(pathName) => {
  const blob = bucket.file(pathName)
  
  const expiredTime = moment().add(1, 'hours').format("YYYY-MM-DD HH:mm:ss")
  // const timezone = 'Asia/Ho_Chi_Minh';
  // const formatExpiredTime = moment(expiredTime).tz(timezone).format("YYYY-MM-DD HH:mm:ss")

  const options = {
    version: 'v4',
    action: 'read',
    expires: expiredTime, // 1 hour
  };

  const [signedUrl] = await blob.getSignedUrl(options);
  return {
    preSignedUrl: signedUrl,
    expiredTime: expiredTime,
    pathName: pathName,
  };
}

exports.removeResource = async(pathName) => {
  const blob = bucket.file(pathName)

  const removeData = await blob.delete()

  return {
    removeData: removeData,
    pathName: pathName,
  };
}

exports.enableCors = async(origin = "*") => {
  // origin = "http://localhost:3000"
  const maxAgeSeconds = 60 * 60 * 60
  const res = await bucket.setCorsConfiguration([
    {
      maxAgeSeconds: maxAgeSeconds,
      method: ["GET","HEAD","PUT"],
      origin: [origin],
      // responseHeader: ["X-Requested-With", "Access-Control-Allow-Origin", 'Content-Type'],
      responseHeader: ['*'],
    },
  ]);

  return res;
}

exports.viewCors = async() => {
  const [metadata] = await bucket.getMetadata();

  const data = [];
  for (const [key, value] of Object.entries(metadata)) {
    data.push({
      [key]: value
    })
    console.log(`${key}: ${value}`);
  }
  return data
}

exports.disableCors = async() => {
  const data = await bucket.setCorsConfiguration([]);

  return data;
}