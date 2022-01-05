>Config

Add GCP Service Account key into folder ``config`` as ``keys.json``

>Start

- Upload ``http://localhost:9001/uploads`` 
```
Method: Post
Body: form-data
  type: file
  key: file
```

- Create SignedUrl to upload at frontend ``http://localhost:9001/preSignedUrl?fileName=loneliness_lonely_castle_164012_1920x1080.jpg``
```
Method: Get
Query params: fileName
Value test: loneliness_lonely_castle_164012_1920x1080.jpg
```

- Get resource by path name ``http://localhost:9001/getResourceByPreSignedUrl?pathName=images/20220105200185_loneliness_lonely_castle_164012_1920x1080.jpg``
```
Method: Get
Query params: pathName
Value test: images/20220105200185_loneliness_lonely_castle_164012_1920x1080.jpg
```

- Remove resource ``http://localhost:9001/removeResource?pathName=images/20220105200185_loneliness_lonely_castle_164012_1920x1080.jpg``
```
Method: Delete
Query params: pathName
Value test: images/20220105200185_loneliness_lonely_castle_164012_1920x1080.jpg
```

>Reference

[Medium Article](https://medium.com/@olamilekan001/image-upload-with-google-cloud-storage-and-node-js-a1cf9baa1876)

[Presign Url - signed Url](https://cloud.google.com/storage/docs/access-control/signing-urls-with-helpers#code-samples)

[Delete resource](https://cloud.google.com/storage/docs/samples/storage-delete-file)

[Get Signed URL of Private File in GCS](https://www.woolha.com/tutorials/node-js-get-signed-url-of-private-file-in-google-cloud-storage)