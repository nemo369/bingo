/* eslint-disable camelcase */
export interface Album {
  name: string;
  id: number;
  pictures: Picture[];
  board?: {
    column: number;
    row: number;
  };
}

export interface Picture {
  url: string;
  asset_id: string;
  public_id: string;
  version: number;
  version_id: string;
  signature: string;
  width: number;
  height: number;
  format: string;
  resource_type: string;
  created_at: Date;
  tags: any[];
  bytes: number;
  type: string;
  etag: string;
  placeholder: boolean;
  secure_url: string;
  access_mode: string;
  existing: boolean;
  original_filename: string;
}

export interface NewAlbum {
  name: string;
  pictures: NewPictures[];
  card: {
    row: number;
    column: number;
    isEmptyCenter: boolean;
  };
}

interface NewPictures {
  name: string;
  blob: string;
  type: {
    type: string;
    blob: string;
    format: string;
  };
  size: number;
  isValid: boolean;
  localUrl: string;
  title: string;
}
