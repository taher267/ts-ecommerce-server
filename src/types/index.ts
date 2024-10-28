import { ObjectId } from "mongodb";
interface Image {
  url: string;
}
export interface newProductProps {
  name: string;
  slug: string;
  description: string;
  features?: string[];
  sku: string;
  model?: string;
  brand?: string;
  regular_price: number;
  sale_price?: number;
  currency?: string;
  images: Image[];
}
export interface newCategoryProps {
  name: string;
  _id?: ObjectId;
}
export interface newProductCategoryProps {
  category_ids: ObjectId[];
  product_id: ObjectId;
  _id?: ObjectId;
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

export interface newProductSizeProps {
  _id?: ObjectId;
  product_id: ObjectId;
  size_ids: ObjectId[];
  stock?: Number;
}

export interface newColorProps {
  _id?: ObjectId;
  name?: string;
  code: string;
}

export interface newProductColorProps {
  _id?: ObjectId;
  product_id: ObjectId;
  color_ids: ObjectId[];
}

export interface newTagProps {
  _id?: ObjectId;
  name: string;
}

export interface newProductTagProps {
  _id?: ObjectId;
  product_id: ObjectId;
  tag_ids: ObjectId[];
}
