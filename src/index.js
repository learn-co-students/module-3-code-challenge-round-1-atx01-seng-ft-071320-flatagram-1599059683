document.addEventListener("DOMContentLoaded", ()=> {
    const card = document.querySelector('.image-card')
    const likeButton = document.querySelector('.like-button')
    const form = document.querySelector('.comment-form')
    dislikeButton()
    fetchImage()
    fetchComments()
    likeButton.addEventListener("click", addLike)
    form.addEventListener("submit", addComment)


    function fetchImage(){
        fetch("http://localhost:3000/images/1")
            .then(resp=> resp.json())
            .then(image => renderImage(image))
    }

    function renderImage(image){
        const imageTitle = document.querySelector('.title')
        imageTitle.textContent= image.title
        const imagePhoto = document.querySelector('.image')
        imagePhoto.src = image.image
        const imageLikes = document.querySelector('.likes')
        imageLikes.textContent = `${image.likes} likes`
    }

    function fetchComments(){
        fetch("http://localhost:3000/comments")
            .then(resp=> resp.json())
            .then(comments=> addComments(comments))
    }

    function addComments(comments){
        const list = document.querySelector('.comments')
        list.textContent = ''
        comments.forEach(comment=> {
            addEachComment(comment)
        })
    }

    function addEachComment(comment){
        const list = document.querySelector('.comments')

        let li = document.createElement('li')
        li.textContent = comment.content
        let button = document.createElement('button')
        button.textContent = "Delete"
        button.classList.add('delete-button')
        button.addEventListener("click", (e)=> {
            deleteComment(e, comment.id)
        })
        li.append(button)
        list.append(li)
    }

    function addLike(e){
        let numberLikes = parseInt(e.target.parentNode.childNodes[1].textContent.split(' ')[0])
        numberLikes += 1
        
        let configObj = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({"likes": numberLikes})
        }
    
        fetch("http://localhost:3000/images/1", configObj)
        .then(resp => resp.json())
        .then(image=> updateLikes(image))
    }

    function updateLikes(image){
        const imageLikes = document.querySelector('.likes')
        imageLikes.textContent = `${image.likes} likes`
    }

    function addComment(e){
        e.preventDefault()
        const content = e.target.comment.value
        
        let configObj = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                "imageId": 1,
                "content": content 
            })
        }
    
        fetch("http://localhost:3000/comments", configObj)
        .then(resp => resp.json())
        .then(comment=> addEachComment(comment))

        e.target.comment.value = ""
    }

    function deleteComment(e, commentId){
        let configObj = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
        }
    
        fetch(`http://localhost:3000/comments/${commentId}`, configObj)
        .then(resp => resp.json())
        .then(comment => fetchComments())
    }

    function dislikeButton(){
        let div = document.querySelector('.likes-section')
        let unlike = document.createElement('button')
        unlike.textContent = "Dislike"
        unlike.addEventListener("click", dislikeComment)
        div.append(unlike)
    }

    function dislikeComment(e){
        let numberLikes = parseInt(e.target.parentNode.childNodes[1].textContent.split(' ')[0])
        if (numberLikes >0){
            numberLikes -= 1
        }
        
        let configObj = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({"likes": numberLikes})
        }
    
        fetch("http://localhost:3000/images/1", configObj)
        .then(resp => resp.json())
        .then(image=> updateLikes(image))
    }
})