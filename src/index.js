document.addEventListener("DOMContentLoaded", () => {
loadImage();
});


function loadImage() {
    fetch('http://localhost:3000/images/1')
        .then(res => res.json())
        .then(json => {
    imageOne = json;
    addImageToCard(imageOne);
    });
}

function addImageToCard(imageOne) {
    let h2 = document.getElementsByTagName('h2');
    h2.item(0).innerText = imageOne.title;

    let img = document.getElementsByClassName('image');
    img.item(0).src = imageOne.image;

    let like = document.getElementsByClassName('likes').item(0);
    like.innerText = `${imageOne.likes} likes`;

    let commentSec = document.getElementsByClassName('comments').item(0);
    for (let i = 0; i < imageOne.comments.length; i++) {
        commentSec.getElementsByTagName('li')[i].innerText = imageOne.comments[i].content;
    };

    const likeBtn = document.getElementsByClassName('like-button').item(0);
    likeBtn.addEventListener('click', (e) => {
        addLike(e);
    });


    const form = document.getElementsByTagName('form').item(0);
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        addComment(e.target);
    })
}

function addLike(e) {
    e.preventDefault();
    let currentLike = document.getElementsByClassName('likes').item(0);
    let oneMoreLike = parseInt(currentLike.innerText) + 1;
    
    fetch(`http://localhost:3000/images/1`, {
        method: 'PATCH',
        headers: {
          'Content-Type': "application/json",
          Accept: "application-json"
        },
        body: JSON.stringify({
          "likes": oneMoreLike
        })
      })
        .then(res => res.json())
        .then(image => {
      currentLike.innerText = `${oneMoreLike} likes`;
    })
};


function addComment(input_data) {
    const form = document.getElementsByTagName('form').item(0);
    let commentSec = document.getElementsByClassName('comments').item(0);
    let li = document.createElement('li');

    li.innerText = input_data.comment.value;
    commentSec.append(li);
    form.reset();
}
