import { ActionTree } from 'vuex';
import { ALBUM } from './mutations-types';
import { Album } from '~/app/types/album';
import { albumService } from '~/services/album.service';

export const state = (): AlbumState => ({
  album: newAlbum(),
});

export const getters = {
  getAlbum: (state: AlbumState) => state.album,
  hesAlbum: (state: AlbumState) => !!state.album.board,
};

export const mutations = {
  [ALBUM.SET_ALBUM]: (state: AlbumState, album: Album) =>
    (state.album = { ...state.album, ...album }),
};
export const actions: ActionTree<AlbumState, AlbumState> = {
  setAlbum: ({ commit }: any, album: Album) => {
    commit(ALBUM.SET_ALBUM, album);
  },
  getBingo: ({ commit }: any, albumId: number) => {
    return albumService.getAlbum(albumId).then((album: Album) => {
      commit(ALBUM.SET_ALBUM, album);
    });
  },
};

export const newAlbum = (): Album => ({ name: '', id: -1, pictures: [] });

export interface AlbumState {
  album: Album;
}
