// write your code here
document.addEventListener('DOMContentLoaded', () => {
    console.log('up and running');
    const imgUrl = 'http://localhost:3000/images/1'
    const likeBtn = document.querySelector('button.like-button')
    const commentForm = document.querySelector('form.comment-form')
    const commentBtn = document.querySelector('button.comment-button')

    function fetchImage() {
        return fetch(imgUrl)
            .then(res => res.json())
            .then(img => renderImage(img))
    };
    fetchImage();

    function renderImage(img) {
        console.log(img);
        let card = document.querySelector('div.image-card');
        //card.innerHTML = ""
        let title = document.querySelector('h2.title');
        title.innerText = img.title;
        let image = document.querySelector('img.image');
        image.src = img.image;
        let span = document.querySelector('span.likes')
        span.innerText = `${img.likes} likes`
        let commentList = document.querySelector('ul.comments');
        //console.log(img.comments)
        img.comments.forEach((comment) => {
            //console.log(comment);
            let li = document.createElement('li');
            li.setAttribute('data-id', comment.id);
            //console.log(comment.content);
            li.innerText = comment.content;
            commentList.append(li);
        }); //end forEach
        likeBtn.addEventListener("click", () => patchLikes(img));
        commentForm.firstElementChild.setAttribute('data-id', img.id)
        commentForm.addEventListener('submit', (e) => addComment(e, img))
    }; //end renderImage

    function patchLikes(img) {
        let span = document.querySelector('span.likes')
        let numLikes = parseInt(span.innerText.split(" ")[0])
        img.likes = numLikes + 1
        console.log(numLikes)
        console.log(img.likes)
        let configObj = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accepts": "application/json"
            },//end head
            body: JSON.stringify(img)//end json
        }//end config
        return fetch(imgUrl, configObj)
            .then(res => res.json())
           // .then(document.querySelector('span.likes').innerText = `${img.likes} likes`)
            .then(img => document.querySelector('span.likes').innerText = `${img.likes} likes`)
        
    }//end function

   

    

    function addComment(e, img) {
        e.preventDefault()
        //console.log(img.comments)
        let content = e.target['comment'].value
        //let imgId = e.target['comment'].dataset.id
        let comments = img.comments
        let comment = {content: content, imageId: img.id}
        console.log(comment)
        comments.push(comment)
        console.log(comments)
        // let imgData = {
        //     comments: comments
        // }
        // console.log(imgData)
        
        // console.log(comments)
        let configObj = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accepts": "application/json"
            },
            body: JSON.stringify({
                comments: comments
            })
        }

        let ul = document.querySelector('ul.comments')
        return fetch('http://localhost:3000/comments', configObj)
        .then(res => res.json())
        //.then(img.comments = [])
        .then(comments => console.log(comments))
        //.then(ul.innerHTML ='')
        //.then(console.log(ul))
        .then(comments => img.comments.forEach((comment) => {
            console.log(comment)
            let li = document.createElement('li');
            li.innerText = comment.content
            console.log(li)
            document.querySelector('ul.comments').innerHTML = ''
            document.querySelector('ul.comments').append(li)
        }))
        .then(renderImage(img))
        .then(commentForm.reset())
    }

    function removeAllChildren(parent) {
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild)
        }
    }





    //end DOM EL
});