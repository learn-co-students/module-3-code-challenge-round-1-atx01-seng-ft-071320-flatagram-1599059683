document.addEventListener("DOMContentLoaded", () => {
  console.log("yes")
})

const nLikes =  document.getElementById("likes")
const title = document.getElementById("title")
const imageTag =  document.getElementById('image')
const comments = document.getElementById("comments")
const button = document.getElementById("like-button")
const input =  document.getElementById("comment-value")
const form = document.getElementById("form")
let newArray = []

function requestImage() {
  return fetch("http://localhost:3000/images/1").then(res => res.json())
}

function renderData(data) {
  title.innerText =  data.title
  imageTag.setAttribute('src', data.image)
  comments.innerHTML = ''
  nLikes.innerText = data.likes
  button.addEventListener('click', event => like(event))
  form.addEventListener('submit', event => {
  newArray.push(input.value)
  commentOnImage(event)})
  newArray = data.newComment
  newArray.forEach(e => {
  const li = document.createElement('li')
  li.innerText = e
  comments.append(li)
  })
}

function like(event) {
  event.preventDefault()
  let addLike = parseInt(event.target.previousElementSibling.innerText) + 1
  fetch("http://localhost:3000/images/1", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"

    },
    body: JSON.stringify({
      "likes": addLike
    })
  })
  .then(res => res.json())
  .then((like_obj => {
    event.target.previousElementSibling.innerText = addLike;
  }))
}

function commentOnImage(event) {
  fetch("http://localhost:3000/images/1", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"

    },
    body: JSON.stringify({
      "newComment": newArray
    })
  })
  .then(res => res.json())
  .then((comment_obj => {

    renderData(comment_obj)
  }))
}

requestImage().then(image => renderData(image))
