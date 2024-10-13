// APlayer
const aplayer = document.querySelector("#aplayer")
if (aplayer) {
  const songInfo = JSON.parse(aplayer.getAttribute("song-info"))
  const singer = aplayer.getAttribute("singer")
  const innerAvatar = document.querySelector(".inner-avatar")

  const ap = new APlayer({
    container: document.getElementById("aplayer"),
    autoplay: true,
    audio: [
      {
        name: songInfo.title,
        artist: singer,
        url: songInfo.audio,
        cover: songInfo.avatar,
      },
    ],
  })

  ap.on("play", () => {
    innerAvatar.style.animationPlayState = "running"
  })
  ap.on("pause", () => {
    innerAvatar.style.animationPlayState = "paused"
  })
}
// End APlayer

// Like
const likeButton = document.querySelector(".inner-like")
if (likeButton) {
  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("active")

    const songSlug = likeButton.getAttribute("song-slug")

    const type = likeButton.classList.contains("active") ? "true" : "false"

    fetch(`/songs/like/${type}/${songSlug}`, {
      method: "PATCH",
    })
      .then(res => res.json())
      .then(data => {
        if(data.code === 200) {
          const likeCount = likeButton.querySelector(".like-count")
          likeCount.textContent = data.totalLike
        }
      })
  })
}
// End Like
