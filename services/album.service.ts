import axios from 'axios';
import { Album, NewAlbum } from '~/app/types/album';

export class AlbumService {
  private baseUrl = '/api/album';
  private headers = { headers: { 'Content-Type': 'application/json' } };

  public async getPublic(): Promise<Album[]> {
    const { data } = await axios.get<Promise<Album[]>>(
      `${this.baseUrl}/public`,
      this.headers
    );

    return data;
  }

  public async getBingos(): Promise<Album[]> {
    const { data } = await axios.get<Promise<Album[]>>(`${this.baseUrl}`);
    return data;
  }

  public async createAlbum(album: NewAlbum): Promise<Album> {
    const { data } = await axios.post<Promise<Album>>(`${this.baseUrl}`, album);
    return data;
  }
}

export const albumService = new AlbumService();
