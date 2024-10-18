import express from 'express';
import { UploadedFile } from 'express-fileupload';
import {
  UploadWithPublicPermission,
  fileDelete,
  getAccessToken,
  getAllFiles,
  manageAccessToken,
} from './fileUpload.helpers';
import fs from 'fs';
import {
  createCredential,
  getCredential,
  updateCredential,
} from './credential.mode';
// createCredential({
//   name: 'accessToken',
//   token: acc,
//   expiry: Date.now() + 3000 * 1000,
// })

// updateCredential(
//   { name: 'accessToken' },
//   { expiry: Date.now() + 180 * 1000 }
// ).then(console.log);
// manageAccessToken().then(console.log).catch(console.error);
// const location = `/home/ubuntu/Desktop/Taher/GoogleDrive/img.png`;
// getAllFiles(acc).then(console.log).catch(console.error);

// UploadWithPublicPermission({location, mimeType:"image/jpeg",name:'one.jpg'}).then(console.log).catch(console.error)
// import fileUpload from "express-fileupload";
// console.log(fs.createReadStream('tmp/tmp-1-1691158159611'))
// UploadWithPublicPermission
const fileUnlink = (filePath?: string) => {
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
};
// getAllFiles().then(console.log).catch(console.error);
export default {
  imageUpload: async (req: express.Request, res: express.Response) => {
    let filePath = '';
    try {
      const image = <UploadedFile>req.files.image;
      const { tempFilePath, mimetype, name } = image;
      // console.log(image);
      filePath = tempFilePath;
      // const stream = fs.createReadStream(filePath);
      const accessToken = await manageAccessToken();
      const uploaded = await UploadWithPublicPermission({
        location: filePath,
        mimeType: mimetype,
        name,
        accessToken,
      });
      fileUnlink(filePath);
      res.json({ message: 'message', uploaded });
    } catch (e) {
      fileUnlink(filePath);
      let status = e?.status || e?.statusCode || 500,
        message =
          e?.response?.data?.message || e?.response?.data?.error || e.message;
      res.status(status).json({ message, success: false });
    }
  },
  imageDelete: async (req: express.Request, res: express.Response) => {
    try {
      const { id: fileId } = req.params;
      const accessToken = await manageAccessToken();
      const deleted = await fileDelete({ fileId, accessToken });
      console.log(deleted);
      res.json({ message: 'message', deleted });
    } catch (e) {
      let status = e?.status || e?.statusCode || 500,
        message =
          e?.response?.data?.message || e?.response?.data?.error || e.message;
      res.status(status).json({ message, success: false });
    }
  },
  allImages: async (req: express.Request, res: express.Response) => {
    try {
      const accessToken = await manageAccessToken();
      const files = await getAllFiles(accessToken);
      res.json({ message: 'message', files });
    } catch (e) {
      let status = e?.status || e?.statusCode || 500,
        message =
          e?.response?.data?.message || e?.response?.data?.error || e.message;
      res.status(status).json({ message, success: false });
    }
  },
};
