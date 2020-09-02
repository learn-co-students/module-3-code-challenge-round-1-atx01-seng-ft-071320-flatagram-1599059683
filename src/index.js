

    document.addEventListener("DOMContentLoaded", () => {

        const likeBtn = document.querySelector(".like-button");
        console.log(likeBtn)

        fetch("http://localhost:3000/images/1")
            .then(function(response) {
                return response.json();
            })
            .then(function(image){
                renderImg(image)
            })

        function renderImg(image){
            const title = document.querySelector(".title");
            const img = document.querySelector(".image");
            let likes = document.querySelector(".likes");
            const imgComments = image.comments;
            let comments = document.querySelector(".comments");
            
            title.innerText = image.title;
            img.src = image.image;
            const likesNum = likes.innerHTML.split(" ")[0] = image.likes;
            likes.innerText = `${likesNum} likes`;

            for (var i = 0; i < imgComments.length; i++ ) {
                var comment = document.createElement("li");
                comment.innerHTML = imgComments[i].content;
                comments.appendChild(comment);
            }
        }
    
        likeBtn.addEventListener("click", (event) => {
        
        })
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    })


