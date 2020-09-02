## Endpoints

Your base URL for your API will be: http://localhost:3000

The endpoints you will need are:

- GET `/images/1`
- PATCH `/images/1`
- POST `/comments`
- DELETE `/comments/:id`


As a user, I can:

- Downvote an image
- Still see the comments written after reloading the page
  > For this one, you want to make a POST request to the `/comments` endpoint.
  > Your comment object must have an `imageId` key with a value of `1` for it to work.
- Delete a comment
  > To persist this, you will have to make a DELETE request to the `/comments/:id` endpoint.






