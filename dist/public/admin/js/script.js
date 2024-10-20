// Upload image preview
const uploadImageInput = document.querySelector("input[upload-image-input]")
if(uploadImageInput){
  const uploadImagePreview = document.querySelector("[upload-image-preview]")
  
  uploadImageInput.addEventListener("change", () => {
    const file = uploadImageInput.files[0]
    const url = URL.createObjectURL(file)
    uploadImagePreview.src = url
  })
}
// End Upload image preview

// upload-audio
const uploadAudio = document.querySelector("[upload-audio]");
if(uploadAudio) {
  const uploadAudioInput = uploadAudio.querySelector("[upload-audio-input]");
  const uploadAudioPlay = uploadAudio.querySelector("[upload-audio-play]");
  const uploadAudioSource = uploadAudioPlay.querySelector("source");
  uploadAudioInput.addEventListener("change", () => {
    const file = uploadAudioInput.files[0];
    if(file) {
      uploadAudioSource.src = URL.createObjectURL(file);
      console.log(uploadAudioPlay)
      uploadAudioPlay.classList.remove("d-none")
      uploadAudioPlay.load();
    }
  });
}
// End Upload audio preview