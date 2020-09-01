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
