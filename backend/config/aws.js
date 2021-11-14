import AWS from 'aws-sdk';
import {
  AWS_ACCESS_KEY,
  AWS_SECRET_KEY,
  BUCKET,
} from './env-var';

const awsConfig = {
  accessKeyId: AWS_ACCESS_KEY,
  secretAccessKey: AWS_SECRET_KEY,
  signatureVersion: 'v4',
};
AWS.config.update(awsConfig);
const s3bucket = new AWS.S3(awsConfig);
const foldername = 'user_profile';

/**
 * Download file function
 *
 * @param {Buffer} file
 */
export const downloadFilehandler = (file) => new Promise((resolve, reject) => {
  const params = {
    Bucket: `${BUCKET}`,
    Key: `${foldername}/${file}`,
    Expires: 60 * 60 * 24, // link will be expired after 24 hours
  };
  s3bucket.getSignedUrl(
    'getObject',
    params,
    (err, url) => {
      if (err) {
        return reject(new TypeError({ message: 'Error uploading file', status: 500 }));
      }
      return resolve(url);
    },
  );
});

/**
 * Upload file function
 *
 * @param {filename} filename
 * @param {Buffer} file
 */
export const uploadData = async (filename, file) => {
  const base64Data = new Buffer.from(file.replace(/^data:image\/\w+;base64,/, ''), 'base64');
  const type = file.split(';')[0].split('/')[1];
  const params = {
    Bucket: `${BUCKET}`,
    Key: `${foldername}/${filename}.${type}`, // File name you want to save as in S3
    Body: base64Data,
    ContentEncoding: 'base64',
    ContentType: `image/${type}`,
  };
  const result = s3bucket.upload(params, (s3Err, data) => {
    if (s3Err) throw s3Err;
    return data.Location;
  });
  return result;
};

export default { uploadData, downloadFilehandler };
