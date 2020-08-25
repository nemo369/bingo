import axios from 'axios';
import { Album } from '~/app/types/album';

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
}

export const albumService = new AlbumService();
