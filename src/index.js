const URL = "http://localhost:3000";
const imageURL = `${URL}/images/1`;
const commentsURL = `${URL}/comments`;

let likes = 0;
let comments = [];

const headers = {
  Accepts: "application/json",
  "Content-type": "application/json",
};

document.addEventListener("DOMContentLoaded", () => {
  fetch(imageURL)
    .then((res) => res.json())
    .then((image) => renderImage(image));

  fetch(commentsURL)
    .then((res) => res.json())
    .then((comments) => populateComments(comments));

  getClass("like-button").addEventListener("click", addLike);
  getClass("comment-form").addEventListener("submit", submitComment);
});

function getClass(c) {
  return document.querySelector(`.${c}`);
}

function renderImage(img) {
  likes = img.likes;
  getClass("title").innerText = img.title;
  getClass("image").src = img.image;
  renderLikes();
}

function renderLikes() {
  getClass("likes").innerText = `${likes} likes`;
}

function populateComments(myComments) {
  comments = myComments;
  renderComments();
}

function renderComments() {
  getClass("comments").innerHTML = comments
    .map((comment) => `<li>${comment.content}</li>`)
    .join("");
}

function addLike() {
  likes += 1;

  fetch(imageURL, {
    method: "PATCH",
    headers,
    body: JSON.stringify({ likes }),
  });
  renderLikes();
}

function submitComment(e) {
  e.preventDefault();

  const comment = { content: e.target.comment.value };
  comments.push(comment);

  fetch(commentsURL, {
    method: "POST",
    headers,
    body: JSON.stringify(comment),
  });

  e.target.comment.value = "";
  renderComments();
}
