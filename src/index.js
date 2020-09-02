// write your code here

const imgURl = 'http://localhost:3000/images/1';
const cmntURl = 'http://localhost:3000/comments';

document.addEventListener('DOMContentLoaded', () => {

    document.getElementById("comment-button").addEventListener("click", (e)=>{
        e.preventDefault()

        postComment();
    });
    // console.log('hello')

    fetch(imgURl)
    .then((res) => res.json())
    .then((json) => renderImg(json));
  })
  
function renderImg(img){
    // console.log(img)
    title = document.getElementById('title')
    title.innerText = img.title;
    // console.log(img.title)
    document.getElementById('image').src = img.image;

    renderComments(img)
    renderLikes(img)
}

function renderComments(data){
    //console.log(data.comments);
    data.comments.forEach(comment => {
        listComment(comment.content)
    });
}
function listComment(comment){
    //console.log(comment);
    const word = document.getElementById('comments');
    let li = document.createElement('li');
    li.innerText = comment;
    word.appendChild(li);
}

function postComment(){
    comment = document.getElementById("comment-input")
    //console.log(comment.value)
    words = comment.value
    listComment(words)
    addLike(words);
    document.getElementById("comment-form").reset();
}

function renderLikes(data){
    //console.log(data.likes);
    const like = document.getElementById('likes');
    like.innerText = data.likes;

    const btn = document.getElementById('like-button');
    const dis_btn = document.getElementById('dislike-button');

    btn.addEventListener("click", (e)=>{
        like.innerText = data.likes++;
        //console.log(like.innerText)
        addLike(data.likes);
    })

    dis_btn.addEventListener("click", (e)=>{
        like.innerText = data.likes--;
        //console.log(like.innerText)
        addLike(data.likes);
    })
}

function addLike(data){
  fetch ('http://localhost:3000/images/1', {
    method: "PATCH",
    headers: {
      "Accept": 'application/json',
      "Content-Type": 'application/json'
    },
    body: JSON.stringify ({"likes":data})
  });
}
