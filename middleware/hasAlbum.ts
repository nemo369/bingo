export default function ({ store, redirect, app }: any) {
  if (!store.getters['album/hesAlbum']) {
    redirect(app.localePath('/album/public_bingos'));
  }
}
