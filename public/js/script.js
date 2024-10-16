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

    const songId = likeButton.getAttribute("song-id")

    const type = likeButton.classList.contains("active") ? "true" : "false"

    fetch(`/songs/like/${type}/${songId}`, {
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

// Fav Song
const favButtons = document.querySelectorAll(".inner-heart")
if (favButtons.length > 0) {
  favButtons.forEach(favButton => {
    favButton.addEventListener("click", () => {
      favButton.classList.toggle("active")
  
      const songId = favButton.getAttribute("song-id")
  
      const type = favButton.classList.contains("active") ? "true" : "false"
  
      fetch(`/songs/favorite/${type}/${songId}`, {
        method: "PATCH",
      })
        .then(res => res.json())
        .then(data => {
          // if(data.code === 200) {
          //   const likeCount = likeButton.querySelector(".like-count")
          //   likeCount.textContent = data.totalLike
          // }
        })
    })
  })
}
// Fav Song
