// APlayer
const aplayer = document.querySelector("#aplayer")
if(aplayer) {
  const songInfo = JSON.parse(aplayer.getAttribute("song-info"))
  console.log(aplayer.getAttribute("song-info"))
  const ap = new APlayer({
    container: document.getElementById('aplayer'),
    audio: [{
        name: songInfo.title,
        artist: songInfo.singer,
        url: songInfo.audio,
        cover: songInfo.avatar,
    }]
  });
}
// End APlayer