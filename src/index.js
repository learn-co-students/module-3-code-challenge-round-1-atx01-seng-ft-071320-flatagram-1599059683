// write your code here
const dogUrl = "http://localhost:3000/images/1"
document.addEventListener("DOMContentLoaded", () => {
    const imgCard = document.querySelector('.image-card')
    const img = imgCard.querySelector('img')
    const title = imgCard.querySelector('.title')
    const likes = imgCard.querySelector('.likes-section').querySelector(".likes")
    const comments = imgCard.querySelector('.comments')
    const commentForm = imgCard.querySelector('.comment-form')
    const likeButton = document.querySelector('button')
    const commButton = document.querySelector('.comment-button')
    let firstCom = comments.getElementsByTagName('li')[0];
    let secondCom = comments.getElementsByTagName('li')[1];
    let thirdCom = comments.getElementsByTagName('li')[2];

    likeButton.addEventListener('click', addLike)
    commentForm.addEventListener('submit', addComment)


    fetchDog()
    function fetchDog() {
        fetch(dogUrl)
            .then(response => response.json())
            .then(renderDog)
    }

    function renderDog(data) {
        likes.innerText = `${data.likes} likes`
        title.innerHTML = data.title
        img.src = data.image
        firstCom.innerText = data.comments[0].content;
        secondCom.innerText = data.comments[1].content;
        thirdCom.innerText = data.comments[2].content;
    }


    function addLike(e) {
        let more = parseInt(e.target.previousElementSibling.innerText) + 1

        fetch(dogUrl, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json"
      
            },
            body: JSON.stringify({
              "likes": more
            })
          })
          .then(res => res.json())
          .then((like_obj => {
            e.target.previousElementSibling.innerText = `${more} likes`;
          }))

    }
    
    function addComment(event){
        let li = document.createElement('li')
        commentForm.comment.value = ''
        li.innertext = commContent
        comments.append(li)
        event.preventDefault()
    }


});



