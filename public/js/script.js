// APlayer
const aplayer = document.querySelector("#aplayer")
if(aplayer) {
  const songInfo = JSON.parse(aplayer.getAttribute("song-info"))
  const singer = aplayer.getAttribute("singer")
  const innerAvatar = document.querySelector(".inner-avatar")

  const ap = new APlayer({
    container: document.getElementById('aplayer'),
    autoplay: true,
    audio: [{
        name: songInfo.title,
        artist: singer,
        url: songInfo.audio,
        cover: songInfo.avatar,
    }]
  });

  ap.on("play", () => {
    innerAvatar.style.animationPlayState = "running"
  })
  ap.on("pause", () => {
    innerAvatar.style.animationPlayState = "paused"
  })
}
// End APlayer