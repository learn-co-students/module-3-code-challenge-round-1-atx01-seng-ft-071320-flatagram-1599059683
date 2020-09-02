
document.addEventListener("DOMContentLoaded", () => {
const imageURL = "http://localhost:3000/images"

fetch(imageURL) 
.then(res => res.json())
.then(json => renderImage(json))

function renderImage(imagedata){
    //iterate the array of data and assign info to right elements
    imagedata.forEach((image => {
    document.getElementById("myImage").src = `${image.image}`
    document.getElementById("myTitle").innerText = `${image.title}`
    document.getElementById("myLikes").innerText = `${image.likes} Likes`
    let like = document.querySelector(".like-button")
    like.addEventListener("click", addLikes)
     

    
    //adding comments
    //I have to iterate over the nested hash of info 
    fetch (`http://localhost:3000/images/${image.id}`)
    .then(res => res.json())
    .then(json => renderComments(json.comments))
    
    function renderComments(comments){
        console.log(comments)
        //create an li for each comment regardless of amount of comments
        //figured I'd move onto the like button to show I understand some of the other info this could take me a while
        for (let i = 0; i < comments.length; i++) {
            // Create the list item:
            let item = document.createElement('li');
    
            // Set its contents:
            item.appendChild(document.createTextNode(comments[i]));
    
            // Add it to the list:
            list.appendChild(item);
        }
        comments.forEach((comment => {
        (comment.content[0]) 
        
         }))//comments forEach
      }//render comment
    
    })//the for each
  
    
    )}//renderImage function
    function addLikes(e){
        let likeSelection = e.target.parentElement   
        let more = parseInt(likeSelection.children[0].innerText.split(" ")[0]) + 1
        let likes = `${more}`
        console.log(likeSelection.parentElement)    
        fetch("http://localhost:3000/images/1", {
            method: 'PATCH',
            headers:
            {
                "Content-Type": 'application/json',
                "Accept": 'application/json'
            },
            body: JSON.stringify({
                "likes": likes
            }) 
        })
    }
    
});//dom ContentLoaded