import { S3 } from 'aws-sdk'
import { randomUUID } from 'crypto'
const s3 = new S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
})

async function uploadImage(file: Express.Multer.File, urlKey: string) {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME || '',
    Key: `${urlKey}/${randomUUID()}`,
    Body: file.buffer,
    ContentType: file.mimetype,
  }

  const data = await s3
    .upload(params, (err: Error, data: S3.ManagedUpload.SendData) => {
      if (err) {
        throw err
      }
      return data
    })
    .promise()
  return data.Location
}

async function uploadImages(files: Express.Multer.File[], userId: string) {
  const promises = files.map((file) => uploadImage(file, userId))
  return Promise.all(promises)
}
export { uploadImages }
