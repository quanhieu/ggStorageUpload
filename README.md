### I. Config GCP - GCS
#### A. GCP
##### 1. [Create a Google Cloud project](https://cloud.google.com/apigee/docs/hybrid/v1.6/precog-gcpproject)
##### 2. [Create Service accounts](https://console.cloud.google.com/iam-admin/serviceaccounts)
> Enter service account name -> Done

##### 3. [Assign role for Service account (ADD IAM)](https://console.cloud.google.com/iam-admin/iam)
```
  New principals:  project_name@project@.iam.gserviceaccount.com
  Select a role: Editor (View, create, update, and delete most Google Cloud resources. See the list of included permissions.)
```
##### 4. Generate Service account key
> Create new key -> json

#### B. GCS
##### 1. [Create Bucket](https://cloud.google.com/storage/docs/creating-buckets)
> Enter bucket name -> Create
##### 2. Update permission
```
  If you want to Direct upload and view
  - Chose your bucket
  - Select [PERMISSIONS] tab
  - Add permissions
    New principal: allUsers-(without authentication) / allAuthenticatedUsers-(authenticator)
    Role: Storage Object Viewer
```
##### 3. Update CORS (cross-origin resource sharing)
> If you want to use [signed Urls](https://cloud.google.com/storage/docs/access-control/signed-urls) locally, you need to [Configure CORS](https://cloud.google.com/storage/docs/configuring-cors#gsutil)

---
### II. How to use this example

>Config
##### - Use storage option ``keyFilename``
Add GCP Service Account key into folder ``config`` as ``keys.json``
##### - Use storage option ``credentials``
Transform GCP Service account key json to string and update ``.env`` variable ``STORAGE_ACCESS_KEY`` 

>Start
```bash
Start backend and frontend: 
  yarn dev
Only start backend:
  yarn start
Only start frontend
  cd client && yarn dev
```

>API
###### - Upload ``http://localhost:7000/uploads`` 
```
Method: Post
Body: form-data
  type: file
  key: file
```

###### - Create SignedUrl to upload at frontend ``http://localhost:7000/preSignedUrl?fileName=loneliness_lonely_castle_164012_1920x1080.jpg``
```
Method: Get
Query params: fileName
Value test: loneliness_lonely_castle_164012_1920x1080.jpg
```

###### - Get resource by path name ``http://localhost:7000/getResourceByPreSignedUrl?pathName=images/20220105200185_loneliness_lonely_castle_164012_1920x1080.jpg``
```
Method: Get
Query params: pathName
Value test: images/20220105200185_loneliness_lonely_castle_164012_1920x1080.jpg
```

###### - Remove resource ``http://localhost:7000/removeResource?pathName=images/20220105200185_loneliness_lonely_castle_164012_1920x1080.jpg``
```
Method: Delete
Query params: pathName
Value test: images/20220105200185_loneliness_lonely_castle_164012_1920x1080.jpg
```

###### - CORS GCS

```
Method: GET
View: http://localhost:7000/viewCors`
Enable Cors: http://localhost:7000/enableCors
Disable Cors: http://localhost:7000/disableCors

```

###### - Transform access_key json to string
```
Method: POST
Body: Raw - JSON
  {
    jsonKey: YOUR_JSON_KEY
  }
```

### III. Reference

##### GCP Upload

[Medium Article](https://medium.com/@olamilekan001/image-upload-with-google-cloud-storage-and-node-js-a1cf9baa1876)

##### GCP Pre-signed url

[Presign Url - signed Url](https://cloud.google.com/storage/docs/access-control/signing-urls-with-helpers#code-samples)

[Delete resource](https://cloud.google.com/storage/docs/samples/storage-delete-file)

[Get Signed URL of Private File in GCS](https://www.woolha.com/tutorials/node-js-get-signed-url-of-private-file-in-google-cloud-storage)

##### GCS CORS

[GCP CORS](https://cloud.google.com/storage/docs/configuring-cors#storage_cors_configuration-nodejs)

[GCP Uploading images React](https://ryanbethel.org/uploading-user-images-to-google-cloud-storage)

[GCP CORS React](https://stackoverflow.com/questions/62353634/cors-policy-with-google-storage-allows-from-my-origin-but-no-access-control-al)

~~[GCP CORS React another](https://www.youtube.com/watch?v=hxyp_LkKDdk)~~
