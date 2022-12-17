import { v2 as cloudinary } from 'cloudinary';
import { UploadedFile } from 'express-fileupload';

const fileUploader = async (file: UploadedFile | UploadedFile[]) => {
  cloudinary.config({
    cloud_name: 'me-retracto',
    api_key: '381613826999381',
    api_secret: 'zstNjnStRqq-2ATDWtK5_JJcPTI',
  });
  try {
    const newFile = file as UploadedFile;
    const newFileResp = await cloudinary.uploader.upload(newFile.tempFilePath, {
      resource_type: 'auto',
      folder: 'claims',
      public_id: newFile.name,
    });

    return newFileResp;
  } catch (error) {
    console.log('Uploading ERROR: ', error);
  }
};

export default fileUploader;
