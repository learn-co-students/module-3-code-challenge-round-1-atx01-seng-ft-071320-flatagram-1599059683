// write your code here
document.addEventListener("DOMContentLoaded", () => {


    const imgCard = document.querySelector(".image-card")
    const ul = document.querySelector(".comments")
    const likeButton = document.querySelector(".like-button")
    const likes = document.querySelector(".likes")
    const postButton = document.querySelector(".comment-button")
    postButton.addEventListener("submit", addComment)

    fetchImage().then(renderImage)
    fetchImage().then(renderTitle)
    fetchImage().then(renderLikes)
    fetchImage().then(renderComments)

    function fetchImage() {
        return fetch("http://localhost:3000/images/1")
            .then(r => r.json())
    }

    function renderComments(post) {
        post.comments.forEach(postComments)
    }

    function postComments(comment) {
        
        let li = document.createElement("li")
        li.innerText = comment.content
        ul.append(li)
        
    }

    function addComment(){
        console.log("hello")
    }


    function renderImage(post) {
        const img = document.querySelector(".image")
        img.src = post.image
    }

    function renderTitle(post) {
        const title = document.querySelector(".title")
        title.innerText = post.title
    }

    function renderLikes(post) {

        likes.innerText = `${post.likes} Likes`
        likeButton.addEventListener("click", addLikes)

    }

    function addLikes(arg) {
        thisLike = parseInt(likes.innerText.split(" ")[0])
        plusLike = thisLike + 1
        likes.innerText = `${plusLike} Likes`
        fetch(`http://localhost:3000/images/1`, {
            method: 'PATCH',
            headers:
            {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                "likes": plusLike
            })
        })
    };
})




