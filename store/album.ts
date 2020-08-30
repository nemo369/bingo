import { ActionTree } from 'vuex';
import { ALBUM } from './mutations-types';
import { Album } from '~/app/types/album';

export const state = (): AlbumState => ({
  album: undefined,
});

export const getters = {
  getAlbum: (state: AlbumState) => state.album,
};

export const mutations = {
  [ALBUM.SET_ALBUM]: (state: AlbumState, album: Album) =>
    (state.album = { ...album }),
};
export const actions: ActionTree<AlbumState, AlbumState> = {
  setAlbum: ({ commit }: any, album: Album) => {
    commit(ALBUM.SET_ALBUM, album);
  },
};

export interface AlbumState {
  album?: Album;
}
