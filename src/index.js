
const baseURL = "http://localhost:3000";
let likes = "";


document.addEventListener("DOMContentLoaded", (event) => {
    const likeB = document.querySelector(".like-button");
    const dislikeB = document.querySelector(".dislike-button");
    const imgLikes = document.querySelector(".likes");
    const imgComments = document.querySelector(".comments");
    const cForm = document.querySelector(".comment-form")
    

    showImg(imgLikes, imgComments);

    likeB.addEventListener("click", (event) => {
        likeI(imgLikes);
    });

    dislikeB.addEventListener("click", (event) => {
        dislikeI(imgLikes);
    });

    cForm.addEventListener("submit", (event) => {
        event.preventDefault();
        addComment(cForm, imgComments);
    })
});

function showImg(imgLikes, imgComments) {
    fetch(`${baseURL}/images/1`)
        .then(response => response.json())
        .then(info => {
            const imgTitle = document.querySelector(".title");
            const img = document.querySelector(".image");
            imgTitle.innerText = info.title;
            img.src = info.image;
            imgComments.innerHTML = "";
            info.comments.forEach(comment => {
                showComment(comment, imgComments);
            })
            likes = info.likes;
            imgLikes.innerText = `${likes} likes`;
        });
};



function showComment(comment, imgComments) {

    const li = document.createElement("li");
    li.innerText = comment.content;


    const deleteB = document.createElement("button");
    deleteB.innerText = "delete";
    li.append(deleteB);
    imgComments.append(li);
    
    deleteB.addEventListener("click", (e) => {
        
        fetch(`${baseURL}/comments/${comment.id}`, {
            method: 'DELETE'
        })
        
        li.remove();
    })
};

function addComment(cForm, imgComments) {
    let comment = ""
    
    fetch(`${baseURL}/comments`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "imageId": 1,
            "content": cForm.comment.value
        }),
    })
        .then(response => response.json())
        .then(info => {
            
            comment = info;
            showComment(comment, imgComments);
            cForm.comment.value = "";
        });
};

function likeI(imgLikes) {
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

function dislikeI(imgLikes) {
    likes;
    
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