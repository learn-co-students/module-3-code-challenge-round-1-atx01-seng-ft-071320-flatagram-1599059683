// write your code here



document.addEventListener("DOMContentLoaded", function() {
  let commentHash = {}

  let likeButton = document.getElementsByClassName("like-button")[0];
  let commentForm = document.getElementsByClassName("comment-form")[0];
  let commentsList = document.getElementsByClassName('comments')[0];

  console.log(commentForm)

  fetch("http://localhost:3000/images/1")
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      let dogImage = document.getElementsByClassName("image")[0];
      dogImage.src = data.image

      let dogTitle = document.getElementsByClassName("title")[0];
      dogTitle.textContent = data.title

      let dogLikes = document.getElementsByClassName("likes")[0];
      dogLikes.textContent = `${data.likes} likes`;

      commentsList.innerHTML = "";

      let dataComments = data.comments
      dataComments.forEach(function(comment) {
        let listElement = document.createElement("li")
        listElement.textContent = comment.content
        commentsList.append(listElement)
        let deleteButton = document.createElement("button")
        deleteButton.textContent = "Remove"
        commentsList.append(deleteButton)

        commentHash[comment.content] = comment.id
      })

    })


    likeButton.addEventListener("click", function(e) {
      let imageLikes = ++e.target.parentNode.children[0].textContent.split(" ")[0]
      e.target.parentNode.children[0].textContent = `${imageLikes} likes`

      let data = {
        likes: imageLikes
      }

      let configObj = {
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json",
          "Accepts": "application/json"
        },
        body: JSON.stringify(data)
      }

      fetch("http://localhost:3000/images/1", configObj)
        .then(function(response) {
          return response.json();
        })
        .then(function(data) {
          console.log(data)
        })
    })

    commentForm.addEventListener('submit', function(e) {
      e.preventDefault();
      let comment = e.target.children[0].value
      console.log(comment)

      let commentListElement = document.createElement("li")
      commentListElement.textContent = comment
      commentsList.append(commentListElement)
      let deleteButton = document.createElement("button")
      deleteButton.textContent = "Remove"
      commentsList.append(deleteButton)

      e.target.children[0].value = ""
//////////////////////////////////////////////////////////////////
      let data = {
        imageId: 1,
        content: comment
      }

      let configObj = {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Accepts": "application/json"
        },
        body: JSON.stringify(data)
      }

      fetch("http://localhost:3000/comments", configObj)
        .then(function(response) {
          return response.json();
        })
        .then(function(data) {
          console.log(data)
        })
//////////////////////////////////////////////////////////////////

    })

    commentsList.addEventListener("click", function(e) {
      if (e.target.tagName == "BUTTON") {
        let listElement = e.target.previousSibling
        let commentId = commentHash[e.target.previousSibling.textContent]
        console.log(commentId)
        listElement.remove();
        e.target.remove();

        fetch(`http://localhost:3000/comments/${commentId}`, {
          method: "DELETE"
        })

      }
    })

})
