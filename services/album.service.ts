import axios from 'axios';
import { Album, NewAlbum } from '~/app/types/album';

export class AlbumService {
  private baseUrl = '/api/game/albums/';
  private headers = { headers: { 'Content-Type': 'application/json' } };

  public async getPublic(): Promise<Album[]> {
    const { data } = await axios.get<
      Promise<{ albums: Album[]; response: string }>
    >(`${this.baseUrl}`);
    const res = await data.albums.map((album) => this.serverToAlbum(album));
    return res;
  }

  public async getBingos(): Promise<Album[]> {
    const { data } = await axios.get<
      Promise<{ albums: Album[]; response: string }>
    >(`${this.baseUrl}`);
    const res = await data.albums.map((album) => this.serverToAlbum(album));
    return res;
  }

  public async getAlbum(albumId: number): Promise<Album> {
    const { data } = await axios.get<Promise<Album>>(
      `/api/game/pictures?albumId=${albumId}`
    );
    return data;
  }

  public async createAlbum(album: NewAlbum): Promise<Album> {
    try {
      const albumAsServer = this.albumToServer(album);
      const { data } = await axios.post<Promise<Album>>(
        `${this.baseUrl}`,
        albumAsServer
      );
      return data;
    } catch (error) {
      throw new Error(
        JSON.stringify({
          ...error.response.data,
          status: error.response.status,
        })
      );
    }
  }

  private serverToAlbum(album: any): Album {
    const pictures: any = [];
    if (album.pictures[0]) {
      Object.keys(album.pictures[0]).forEach((key) => {
        pictures.push(album.pictures[0][key]);
      });
    }
    return {
      ...album,
      isPublic: album.is_public,
      id: album.albumId,
      numberOfPictures: album.number_of_pictures,
      pictures,
    };
  }

  private albumToServer(album: NewAlbum) {
    const picObj: any = {};
    album.pictures.forEach((pic) => {
      if (pic.name) {
        picObj[pic.name] = pic;
      } else {
        picObj[pic.asset_id] = pic;
      }
    });
    return {
      ...album,
      pictures: [
        {
          ...picObj,
        },
      ],
    };
  }
}

export const albumService = new AlbumService();
