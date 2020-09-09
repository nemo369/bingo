import axios from 'axios';
import { Album, NewAlbum } from '~/app/types/album';

export class AlbumService {
  private baseUrl = '/api/game/albums/';
  private headers = { headers: { 'Content-Type': 'application/json' } };

  public async getPublic(): Promise<{ albums: Album[]; response: string }> {
    const { data } = await axios.get<
      Promise<{ albums: Album[]; response: string }>
    >(`${this.baseUrl}`);
    return data;
  }

  public async getBingos(): Promise<{ albums: Album[]; response: string }> {
    const { data } = await axios.get<
      Promise<{ albums: Album[]; response: string }>
    >(`${this.baseUrl}`);
    return data;
  }

  public async getAlbum(albumId: number): Promise<Album> {
    const { data } = await axios.get<Promise<Album>>(
      `${this.baseUrl}/${albumId}/`
    );
    return data;
  }

  public async createAlbum(album: NewAlbum): Promise<Album> {
    const { data } = await axios.post<Promise<Album>>(`${this.baseUrl}`, album);
    return data;
  }
}

export const albumService = new AlbumService();
