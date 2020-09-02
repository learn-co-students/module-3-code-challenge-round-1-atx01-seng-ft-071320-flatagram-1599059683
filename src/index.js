// write your code here
const IMGURL = "http://localhost:3000/images"

document.addEventListener("DOMContentLoaded", ()=>{
    fetch(IMGURL).then(res=>res.json()).then(json=>images(json));

    function images(imgs){
        imgs.forEach(img => renderImage(img));
    }; //function images

    function renderImage(img){
        const imageTitle = document.querySelector(".title");
        imageTitle.innerText = img.title

        const imageSrc = document.querySelector(".image");
        imageSrc.src = img.image

        const imageLike = document.querySelector(".likes");
        imageLike.innerText = `${img.likes} Likes`

        const imageComment = document.querySelector(".comments");  
        imageComment.innerHTML = "";
        fetchComment(img)

        const imageLikeButton = document.querySelector(".like-button");
        imageLikeButton.addEventListener("click", addlike);

        const form = document.querySelector(".comment-form");
        form.addEventListener("submit", addComment);

    }; //function renderImage

    function fetchComment(img){
        let id = img.id
        fetch(`http://localhost:3000/images/${id}`).then(res=>res.json()).then(json=>comments(json));
    }; //function fetchComment

    function comments(commentArray){
        commentArray.comments.forEach(comment => addComments(comment))
    }; //function comments

    function addComments(comment){
        const li = document.createElement("li");
        const imageComment = document.querySelector(".comments");
        li.innerHTML = comment.content
        imageComment.append(li)        
    }

    function addlike(arg){
        let like = arg.target.parentElement.children[0].innerText
        const newValue = parseInt(like) +1
        console.log(newValue)
        like = `${newValue} Likes`
        let id = 
        fetch(`http://localhost:3000/images/${id}`, {
        method: 'PATCH',
        headers:
        {
        "Content-Type": "application/json",
        "Accept": "application/json"
        },
        body: JSON.stringify({
        "likes": newValue
        }) //body
      }) //fetch
        
    }

    function addComment(e){
        e.preventDefault();
        const commentInput = document.querySelector(".comment-input");
        addComments(commentInput.value)
    }

}); //DOM