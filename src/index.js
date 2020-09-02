
document.addEventListener("DOMContentLoaded", () => {
    let configObject= {
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({"dislikes": 0})
      }
    fetch(`http://localhost:3000/images/1`, configObject)
    .then(r=> r.json())
    .then(renderDislikes)


    fetch('http://localhost:3000/images')
    .then(r=> r.json())
    .then(renderImage)
    let comments=document.querySelector('.comments')
    comments.innerHTML=''
    renderComments()
    const likeBtn=document.querySelector('.like-button').addEventListener('click', addLike)
    const commentBtn=document.querySelector('.comment-button').addEventListener('click', addComment)


    function renderImage(data){
        const card=document.querySelector('.image-card')
        let h2=card.querySelector('h2')
        h2.innerText=data[0].title
        let img=card.querySelector('img')
        img.setAttribute('src', data[0.].image)
        renderLikes(data[0].likes)
    }

    function renderComments(){
    fetch('http://localhost:3000/comments')
    .then(r=> r.json())
    .then(comments=> {
        comments.forEach(showComment)
    })
    }

    function renderLikes(count){
        let likes=document.querySelector('.likes-section span')
        likes.innerText=`${count} likes`
    }

    function showComment(comment){
        let li= document.createElement('li')
        li.innerText=comment.content
        li.setAttribute('data-id', comment.id)
        let deleteBtn= document.createElement('button')
        deleteBtn.innerText="delete"
        deleteBtn.addEventListener('click', deleteComment)
        li.append(deleteBtn)

        comments.append(li)
    }

    function addLike(e){
        let likesSection= e.target.parentElement
        let likes=likesSection.querySelector('span')
        let count=likes.innerText.split(" ")[0]
        count=parseInt(count)
        count+=1
        likes.innerText=`${count} likes`

        let configObject= {
            method: 'PATCH',
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json"
            },
            body: JSON.stringify({"likes": count})
          }
          
          fetch(`http://localhost:3000/images/1`, configObject)  
    }

    function addComment(e){
        let comment={"content": e.target.parentElement.comment.value}
        showComment(comment)

        let configObject= {
            method: 'POST',
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json"
            },
            body: JSON.stringify({"imageId": 1, "content": e.target.parentElement.comment.value})
          }
          
          fetch(`http://localhost:3000/comments`, configObject) 
    }

    function deleteComment(e){
        const id=e.target.parentElement.getAttribute('data-id')
        e.target.parentElement.remove()

        let configObject= {
            method: 'DELETE',
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json"
            }
          }
          
          fetch(`http://localhost:3000/comments/${id}`, configObject) 
    }

    function renderDislikes(data){
        let likesSection=document.querySelector('.likes-section')
        let div=document.createElement('div')
        div.setAttribute('class', 'dislikes-section')
        div.innerHTML=`
        <span class="dislikes">${data.dislikes} dislikes</span>
        <button class="dislike-button">♡</button>`
        likesSection.after(div)
        div.querySelector('.dislike-button').addEventListener('click',addDislike)

    }

    function addDislike(e){
        let dislikes=e.target.parentElement.querySelector('span')
        let count=dislikes.innerText.split(" ")[0]
        count=parseInt(count)
        count+=1 
        dislikes.innerText=`${count} dislikes`

        let configObject= {
            method: 'PATCH',
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json"
            },
            body: JSON.stringify({"dislikes": count})
          }
          
          fetch(`http://localhost:3000/images/1`, configObject) 
    }


});
