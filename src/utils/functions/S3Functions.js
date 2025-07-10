import {S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand, ListObjectsV2Command} from "@aws-sdk/client-s3";

export const BaseURLS3 = "https://custorybucket.s3.ap-southeast-1.amazonaws.com/";

const s3Client = new S3Client({
  region: "ap-southeast-1",
  credentials: {
    accessKeyId: "AKIA6GBMGAFUGL7EYX7L",
    secretAccessKey: "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",
  },
});

/**
 * upload pdf to S3 bucket
 * @param {pdf blob} pdfBlob
 * @param {quotation Id} quotationId
 */
export async function uploadPDFToS3(pdfBlob, quotationId) {
  try {
    const uploadParams = {
      Bucket: "custorybucket",
      Key: `Quotations/Quotaion_${quotationId}.pdf`,
      Body: pdfBlob,
      ContentType: "application/pdf",
    };
    const response = await s3Client.send(new PutObjectCommand(uploadParams));
  } catch (error) {
    console.error("Error uploading pdf:", error);
    throw error;
  }
}

/**
 * get image from S3 and convert to base64
 * @param {bucketName} bucketName
 * @param {key} key
 */
export async function getImageFromS3(bucketName, key) {
  const params = { Bucket: bucketName, Key: key };
  try {
    const response = await s3Client.send(new GetObjectCommand(params));
    const imageString =
      (await response.Body?.transformToString("base64")) || "";
    const base64 = "data:image/png;base64," + imageString;
    return base64;
  } catch (error) {
    console.error("Error fetching the image from S3:", error);
    throw error;
  }
}

/**
 * download image with base64 code of an image
 * @param {bucketName} bucketName
 * @param {key} key
 */
export const downloadImageFromS3 = async (bucketName, key, fileName) => {
  const newKey = key.includes('amazonaws.com/') ? key.split('amazonaws.com/')[1] : key;
  const base64 = await getImageFromS3(bucketName, newKey);
  if (base64) {
    var a = document.createElement("a");
    a.href = base64;
    a.download = fileName.includes('.pdf') ? fileName : `${fileName}.png`;
    a.click();
  }
};

/**
 * delete image from s3 bucket
 * @param {bucketName} bucketName
 * @param {key} key
 */
export const deleteImageFromS3 = async (bucketName, key) => {
  const newKey = key.split('amazonaws.com/')[1];
  if(newKey){
    const deleteParams = {
      Bucket: bucketName,
      Key: newKey,
    };
    try {
      await s3Client.send(new DeleteObjectCommand(deleteParams));
    } catch (error) {
      console.error(`Failed to delete ${key}:`, error);
    }
  }
};

/**
 *  delete folder with items from s3 bucket
 * @param {bucketName} bucketName
 * @param {key} key
 */
export const deleteFolderWithItemsFromS3 = async (bucketName, folderKey) => {
  if (!folderKey.endsWith("/")) folderKey += "/";

  try {
    const listResponse = await s3Client.send(
      new ListObjectsV2Command({ Bucket: bucketName, Prefix: folderKey })
    );

    if (listResponse.Contents?.length) {
      await Promise.all(
        listResponse.Contents.map(({ Key }) =>
          s3Client.send(new DeleteObjectCommand({ Bucket: bucketName, Key }))
      ));
    }
  } catch (error) {
    console.error(`Error deleting folder "${folderKey}":`, error);
  }
}; 