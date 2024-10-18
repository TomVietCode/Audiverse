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