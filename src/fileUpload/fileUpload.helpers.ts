import { google } from 'googleapis';
import fs from 'fs';
import path from 'path';
import axios from 'axios';
import {
  AccessTokenProps,
  FileIdAccessTokenProps,
  UploadWithPublicPermissionProps,
} from 'types';
import { getCredential, updateCredential } from './credential.mode';
const client_id = process.env.G_DRIVE_CLIENT_ID,
  client_secret = process.env.G_DRIVE_CLIENT_SECRET,
  redirect_uri = process.env.G_DEIVE_REDIRECT_URI,
  refresh_token = process.env.G_DRIVE_REFRESH_TOKEN as string;
const oauth2Client = new google.auth.OAuth2(
  client_id,
  client_secret,
  redirect_uri
);

const filePath = path.resolve('/home/ubuntu/Desktop/Taher/GoogleDrive/img.png');
// console.log(fs.createReadStream(Buffer.from(fs.readFileSync(filePath)).toString('base64url')))
// const filePath = path.resolve("/home/ubuntu/Desktop/pz.com/All Product With Code & Full pic/586.jpg");
// console.log(fs.createReadStream(filePath))
export const getAccessToken = (): Promise<AccessTokenProps> => {
  const client_id = process.env.G_DRIVE_CLIENT_ID as string,
    client_secret = process.env.G_DRIVE_CLIENT_SECRET as string,
    refresh_token = process.env.G_DRIVE_REFRESH_TOKEN as string,
    url = 'https://accounts.google.com/o/oauth2/token',
    body = new URLSearchParams({
      client_id,
      client_secret,
      refresh_token,
      grant_type: 'refresh_token',
    }).toString();
  console.log({
    client_id,
    client_secret,
    refresh_token,
    grant_type: 'refresh_token',
  });
  return axios(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: body,
  }).then((d) => d.data);
};
// getAccessToken()
//   .then((d) => console.log(d, 'data'))
//   .catch(console.error);
export const manageAccessToken = async () => {
  const cred = await getCredential({ name: 'accessToken' });
  if (!cred) {
    throw new Error(`Image credentials miss on DB`);
  }
  if (cred.expiry > new Date()) {
    return cred.token;
  }
  const { access_token } = await getAccessToken();
  await updateCredential(
    { name: 'accessToken' },
    { token: access_token, expiry: Date.now() + 3000 * 1000 }
  );
  return access_token;
};
const driveInit = async (accessToken?: string) => {
  try {
    if (!accessToken) {
      const { access_token } = await getAccessToken();
      accessToken = access_token;
      console.log(access_token);
    }
    oauth2Client.setCredentials({ access_token: accessToken });
    return google.drive({
      version: 'v3',
      auth: oauth2Client,
    });
  } catch (e) {
    throw new Error(e.message);
  }
};
export async function UploadWithPublicPermission({
  location,
  mimeType,
  name,
  accessToken,
}: UploadWithPublicPermissionProps) {
  try {
    const drive = await driveInit(accessToken);
    const folder_id = process.env.G_DRIVE_FOLDER_ID;
    const { data } = await drive.files.create({
      requestBody: {
        name,
        mimeType,
        parents: [folder_id],
      },
      media: {
        mimeType,
        body: fs.createReadStream(path.resolve(location)),
      },
    });
    await drive.permissions.create({
      fileId: data.id,
      requestBody: {
        role: 'reader',
        type: 'anyone',
      },
    });
    return data;
  } catch (e) {
    throw new Error(e.message);
  }
}

// UploadWithPublicPermission({location:filePath, mimeType:"image/jpeg",name:'one'}).then(console.log).catch(console.error)
// https://developers.google.com/drive/api/guides/folder#node.js

export async function fileDelete({
  fileId,
  accessToken,
}: FileIdAccessTokenProps) {
  const drive = await driveInit(accessToken);
  return drive.files
    .delete({
      fileId,
    })
    .then((resp) => resp.status);
}
// fileDelete({ fileId: "1G1bEGRj_hCSNqFSm4iOno6WLRUE6iIoS", accessToken: acc })
//   .then(console.log)
//   .catch(console.error);

export async function getPublicUrl({
  fileId,
  accessToken,
}: FileIdAccessTokenProps) {
  try {
    const drive = await driveInit(accessToken);
    const resp = await drive.permissions.create({
      fileId,
      requestBody: {
        role: 'reader',
        type: 'anyone',
      },
    });
    const result = await drive.files.get({
      fileId,
      fields: 'webViewLink,webContentLink',
    });
    console.log(resp.data, resp.status, result.data);
  } catch (e) {
    console.log(e.message);
  }
}

export async function folderCreate({
  name,
  accessToken,
}: {
  name: string;
  accessToken?: string;
}) {
  try {
    const drive = await driveInit(accessToken);
    const fileMetadata = {
      name,
      mimeType: 'application/vnd.google-apps.folder',
    };
    return drive.files
      .create({
        requestBody: fileMetadata,
        fields: 'id',
      })
      .then((resp) => resp.data);
  } catch (e) {
    console.log(e.message);
  }
}

// folderCreate({ name: "All Images", accessToken: acc })
//   .then(console.log)
//   .catch(console.error);

export async function getAllFiles(accessToken?: string) {
  let drive;
  try {
    drive = await driveInit(accessToken);
  } catch (e) {
    throw new Error(e.message);
  }
  return drive.files.list().then((resp) => resp.data);
}
// getfolder();
// getPublicUrl('10TK4j6Cky34pxpDlCjwHzcfRfKfrM_dn')

// const credentials = {
//   client_id,
//   client_secret,
//   refresh_token: refresh_token[0],
//   grant_type: 'refresh_token',
// };
// const queryString = `client_id=${client_id}&client_secret=${client_secret}&refresh_token=${refresh_token}&grant_type=refresh_token`;
// console.log(queryString)

// https://accounts.google.com/o/oauth2/v2/auth?scope=https://www.googleapis.com/auth/gmail.readonly https://www.googleapis.com/auth/userinfo.profile
// https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fdrive%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fdrive.file%20 https://www.googleapis.com/auth/userinfo.email&access_type=offline&redirect_uri=http://localhost:4001&response_type=code&client_id=740145274102-mrfccanbkf4c6ab46rglmu5n3s608pl7.apps.googleusercontent.com

// https://accounts.google.com/o/oauth2/auth/oauthchooseaccount?response_type=code&client_id=740145274102-mrfccanbkf4c6ab46rglmu5n3s608pl7.apps.googleusercontent.com&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fdrive%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fdrive.file%20&redirect_uri=https%3A%2F%2Foauth.pstmn.io%2Fv1%2Fcallback&service=lso&o2v=1&flowName=GeneralOAuthFlow

// const code =
//   '4/0Adeu5BUlro-LhX4Pjr9Ib29fZNmxmTW5aRlQxyzq5BcTpfU-HptdPp7oqqUvX2aHgFhPjg';
// function tokenObj({ code = '' }) {
//   const redirect_uri = 'http://localhost:4001';
//   // process.env.NODE_ENV === 'development'
//   //   ? process.env.GOOGLE_REDIRECT_URI_LOCAL
//   //   : process.env.GOOGLE_REDIRECT_URI_LIVE;
//   const body = {
//     code,
//     client_id: process.env.G_DRIVE_CLIENT_ID,
//     client_secret: process.env.G_DRIVE_CLIENT_SECRET,
//     redirect_uri,
//     // grant_type: 'refresh_token',
//     grant_type: 'authorization_code',
//   };

//   const qs = new URLSearchParams(body).toString();
//   return qs;
// }
