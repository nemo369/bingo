export default function ({ store, redirect }: any) {
    if (!store.getters['album/getAlbum']) {
        redirect('/');
    }
}
