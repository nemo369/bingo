export default function ({ store, redirect, app }: any) {
  if (
    !store.getters['album/hesAlbum'] ||
    !store.getters['album/getAlbum'].pictures.length
  ) {
    redirect(app.localePath('/album/public_bingos'));
  }
}
