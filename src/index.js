// write your code here
document.addEventListener("DOMContentLoaded", () => {

    const imagesUrl = "http://localhost:3000/images"
    const commentsUrl = "http://localhost:3000/comments"
    const likeBtn = document.querySelector(".like-button")
    const likes = document.querySelector(".likes")
    let likeCount = likes.innerText.slice(0, -6)
    likeCount = parseInt(likeCount)
    // console.log(likeBtn)
    likeBtn.addEventListener("click", addLike)

    getImages().then(separateImages)
    getComments().then(separateComments)
    
    function getImages(){
        // console.log("!!!")
        return fetch(imagesUrl)
        .then(response => response.json())
    }

    function getComments(){
        return fetch(commentsUrl)
        .then(response => response.json())
    }

    function separateImages(images){
        images.forEach(image => {
            renderImage(image)
        })
    }

    function separateComments(comments){
        const commentsDiv = document.querySelector(".comments")
        commentsDiv.textContent = ""
        comments.forEach(comment => {
            // console.log(comment)
            const li = document.createElement("li")
            li.innerText = comment.content
            commentsDiv.appendChild(li)
        })
    }

    function renderImage(image){
        // console.log(image)
        const imageCard = document.querySelector(".image-card")
        imageCard.setAttribute("data-id", image.id)
        const imageTag = document.querySelector(".image")
        imageTag.src = image.image

        const imageTitle = document.querySelector(".title")
        imageTitle.textContent = image.title
        
        // const likes = document.querySelector(".likes")
        likes.textContent = `${image.likes} Likes`
        
    }

    function addLike(event){
        event.preventDefault()
        // console.log("Listener connecting")
        // console.log(likes.innerText.slice(0, -6))
        // let likeCount = likes.innerText.slice(0, -6)
        // likeCount = parseInt(likeCount)
        // console.log(typeof likeCount)

        //*********** likeCount works */
        likeCount ++
        likes.innerText = `${likeCount} Likes`
        //*****************************/
        const targetId = event.target.parentElement.parentElement.dataset.id
        
        // console.log(likeCount)

        fetch(`http://localhost:3000/images/${targetId}`, {
            method: 'PATCH',
                headers: {
                  'Content-Type': "application/json",
                  Accept: "application-json"
                },
                body: JSON.stringify({
                  "likes": likeCount
                })
              })
                .then(res => res.json())
                .then(image => {
                    console.log(image.likes)
                    likes.innerText = `${likeCount} Likes`;
              })
        
    }
    
})