// write your code here
const baseURL = "http://localhost:3000";
let likes = "";

document.addEventListener("DOMContentLoaded", (e) => {
    const likeButton = document.querySelector(".like-button");
    const dislikeButton = document.querySelector(".dislike-button");
    const imgLikes = document.querySelector(".likes");
    const imgComments = document.querySelector(".comments");
    const commentForm = document.querySelector(".comment-form")

    loadImage(imgLikes, imgComments);

    likeButton.addEventListener("click", (e) => {
        likeImage(imgLikes);
    });

    dislikeButton.addEventListener("click", (e) => {
        dislikeImage(imgLikes);
    });

    commentForm.addEventListener("submit", (e) => {
        event.preventDefault();
        addComment(commentForm, imgComments);
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
                loadComment(comment, imgComments);
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

function dislikeImage(imgLikes) {
    likes--;
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
    commentLi.innerText = comment.content;
    const deleteButton = document.createElement("button");
    deleteButton.innerText = "delete";
    commentLi.append(deleteButton);
    imgComments.append(commentLi);
    deleteButton.addEventListener("click", (e) => {
        fetch(`${baseURL}/comments/${comment.id}`, {
            method: 'DELETE'
        })
        commentLi.remove();
    })
};

function addComment(commentForm, imgComments) {
    let comment = ""
    fetch(`${baseURL}/comments`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "imageId": 1,
            "content": commentForm.comment.value
        }),
    })
        .then(response => response.json())
        .then(data => {
            comment = data;
            loadComment(comment, imgComments);
            commentForm.comment.value = "";
        });
};