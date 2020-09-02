// write your code here
const baseURL = "http://localhost:3000";
let likes = "";

document.addEventListener("DOMContentLoaded", (e) => {
    const likeButton = document.querySelector(".like-button");
    const dislikeButton = document.querySelector(".dislike-button");
    const imgLikes = document.querySelector(".likes");
    const imgComments = document.querySelector(".comments");
    const commentForm = document.querySelector(".comment-form")

    //view image
    loadImage(imgLikes, imgComments);

    //press button to increase likes
    likeButton.addEventListener("click", (e) => {
        likeImage(imgLikes);
    });

    //press button to downvote
    dislikeButton.addEventListener("click", (e) => {
        dislikeImage(imgLikes);
    });

    //add comment
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
    //make change to backend
    fetch(`${baseURL}/images/1`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "likes": likes
        }),
    })
    //make change to frontend
    imgLikes.innerText = `${likes} likes`;
};

function dislikeImage(imgLikes) {
    likes--;
    //make change to backend
    fetch(`${baseURL}/images/1`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "likes": likes
        }),
    })
    //make change to frontend
    imgLikes.innerText = `${likes} likes`;
};

function loadComment(comment, imgComments) {
    const commentLi = document.createElement("li");
    commentLi.innerText = comment.content;
    const deleteButton = document.createElement("button");
    deleteButton.innerText = "delete";
    commentLi.append(deleteButton);
    imgComments.append(commentLi);
    //delete comments
    deleteButton.addEventListener("click", (e) => {
        //make change to backend
        fetch(`${baseURL}/comments/${comment.id}`, {
            method: 'DELETE'
        })
        //make change to frontend
        commentLi.remove();
    })
};

function addComment(commentForm, imgComments) {
    let comment = ""
    //make change to backend
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
            //make change to frontend
            comment = data;
            loadComment(comment, imgComments);
            commentForm.comment.value = "";
        });
};