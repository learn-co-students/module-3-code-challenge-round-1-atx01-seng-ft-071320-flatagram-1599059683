// write your code here
const baseURL = "http://localhost:3000";
let likes = "";

document.addEventListener("DOMContentLoaded", (e) => {
    const likeButton = document.querySelector(".like-button");
    const imgLikes = document.querySelector(".likes");
    const imgComments = document.querySelector(".comments");
    const commentForm = document.querySelector(".comment-form")

    loadImage(imgLikes, imgComments);

    likeButton.addEventListener("click", (e) => {
        likeImage(imgLikes);
    });

    commentForm.addEventListener("submit", (e) => {
        event.preventDefault();
        loadComment(commentForm.comment.value, imgComments);
        commentForm.comment.value = "";
    })
});

function loadImage(imgLikes, imgComments) {
    fetch(`${baseURL}/images/1`)
        .then(response => response.json())
        .then(data => {
            const imgTitle = document.querySelector(".title");
            const img = document.querySelector(".image");
            imgTitle.innerText = data.title;
            img.src = data.image;
            imgComments.innerHTML = "";
            data.comments.forEach(comment => {
                loadComment(comment.content, imgComments);
            })
            likes = data.likes;
            imgLikes.innerText = `${likes} likes`;
        });
};

function likeImage(imgLikes) {
    likes++;
    fetch(`${baseURL}/images/1`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "likes": likes
        }),
    })
    imgLikes.innerText = `${likes} likes`;
};

function loadComment(comment, imgComments) {
    const commentLi = document.createElement("li");
    commentLi.innerText = comment;
    imgComments.append(commentLi);
};