import { ObjectId } from "mongodb";

export interface newProductProps {
  name?: string;
  description?: string;
  prod_code: string;
  drive_id: string;
}
export interface AccessTokenProps {
  access_token: string;
  expires_in: number;
  token_type: string;
  id_token: string;
}

export interface UploadWithPublicPermissionProps {
  location: string;
  mimeType: string;
  name: string;
  accessToken?: string;
}

export interface FileIdAccessTokenProps {
  fileId: string;
  accessToken?: string;
}

export interface newSizeProps {
  name: string;
  _id?: ObjectId;
}

export interface newCategoryProps {
  name: string;
  _id?: ObjectId;
}
export interface newProductSizeProps {
  name: string;
  _id?: ObjectId;
  size_id: ObjectId;
  product_id: ObjectId;
  stock?: Number;
}

export interface newColorProps {
  _id?: ObjectId;
  name?: string;
  code: string;
}

export interface newProductColorProps {
  _id?: ObjectId;
  name?: string;
  code: string;
}
