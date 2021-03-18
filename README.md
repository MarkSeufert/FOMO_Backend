# FOMO_Backend
The web server + database portion of NOMOFOMO, a location based social media platform

Must add '2dsphere' index for the 'location' property of the 'Posts' table

Images are uploaded to the /uploads folder of the root directory of this project (may need to manually create the folder)

------------------------------------------------------------------------------------------

POST createUser<br />
example endpoint: http://localhost:3000/api/createUser<br />
example body:
```json
{
    "email": "email@hotmail.com",
    "name": "firstname lastname"
}
```
Content-Type: application/json

------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------

GET getUser<br />
example endpoint: http://localhost:3000/api/getUser?email=hi@gmail.com<br />
Query Params:
```
"email": "email@hotmail.com"
OR
"userId": "6052927f3205ca3c40f08ca8"
```

------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------

POST createPost<br />
example endpoint: http://localhost:3000/api/createPost<br />
example body:
```json
{
    "message": "My message",
    "messageType": "regular message",
    "userId": "6052927f3205ca3c40f08ca8",
    "long": 40,
    "lat": 55
}
```
Content-Type: application/json

------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------

(I know it's quite different from regular posting without an image, but I didn't know how to send both the image and the JSON in the body, so I used query parameters instead)<br />

POST createPostWithImage<br />
example endpoint: http://localhost:3000/api/createPostWithImage?message=This message will have an image!&userId=605292e2e0c0d12d604c588e&long=40&lat=55

Query Params:
```
"message": "This message will have an image!"
"messageType": "ad"
"userId": "605292e2e0c0d12d604c588e"
"long": 40,
"lat": 55
```
Body: form-data with a single key-value pair where the key is "image" and the value is the image file

Content-Type: multipart/form-data

------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------

GET posts<br />
example endpoint: http://localhost:3000/api/posts?radius=50&long=40.0&lat=55.0&expiry=24<br />
Query Params:
```
"radius": 50, // in meters
"long": 40.0,
"lat": 55.0
"expiry": 24 // in hours - OPTIONAL 
```

Returns: array of posts<br />
Example return:
```json
[
    {
        "_id": "605292b0e0c0d12d604c588c",
        "message": "My message",
        "messageType": "ad",
        "user": {
            "_id": "6052927f3205ca3c40f08ca8",
            "email": "email@hotmail.com",
            "name": "firstname lastname",
            "dateCreated": "2021-03-17T23:36:31.681Z",
            "__v": 0
        },
        "imageFile": "",
        "location": {
            "long": 40,
            "lat": 55
        },
        "date": "2021-03-17T23:37:20.467Z",
        "__v": 0
    },
    {
        "_id": "605292f7e0c0d12d604c588f",
        "message": "Another user's message",
        "messageType": "ad",
        "user": {
            "_id": "605292e2e0c0d12d604c588e",
            "email": "email2@hotmail.com",
            "name": "firstname2 lastname2",
            "dateCreated": "2021-03-17T23:38:10.060Z",
            "__v": 0
        },
        "imageFile": "",
        "location": {
            "long": 40,
            "lat": 55
        },
        "date": "2021-03-17T23:38:31.929Z",
        "__v": 0
    }
]
```

------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------

GET allPosts<br />
example endpoint: http://localhost:3000/api/allPosts?expiry=24<br />
Query Params:
```
"expiry": 24 // in hours - OPTIONAL 
```

Returns: array of posts<br />
Example return:
```json
[
    {
        "_id": "605292b0e0c0d12d604c588c",
        "message": "My message",
        "messageType": "ad",
        "user": {
            "_id": "6052927f3205ca3c40f08ca8",
            "email": "email@hotmail.com",
            "name": "firstname lastname",
            "dateCreated": "2021-03-17T23:36:31.681Z",
            "__v": 0
        },
        "imageFile": "",
        "location": {
            "long": 40,
            "lat": 55
        },
        "date": "2021-03-17T23:37:20.467Z",
        "__v": 0
    },
    {
        "_id": "605292f7e0c0d12d604c588f",
        "message": "Another user's message",
        "messageType": "ad",
        "user": {
            "_id": "605292e2e0c0d12d604c588e",
            "email": "email2@hotmail.com",
            "name": "firstname2 lastname2",
            "dateCreated": "2021-03-17T23:38:10.060Z",
            "__v": 0
        },
        "imageFile": "",
        "location": {
            "long": 40,
            "lat": 55
        },
        "date": "2021-03-17T23:38:31.929Z",
        "__v": 0
    }
]
```

------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------

POST addCommment<br />
example endpoint: http://localhost:3000/api/addComment<br />
example body:
```json
{
    "message": "Now this is a comment",
    "userId": "6052927f3205ca3c40f08ca8",
    "postId": "605292b0e0c0d12d604c588c"
}
```
Content-Type: application/json

------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------

GET comments<br />
example endpoint: http://localhost:3000/api/comments<br />
Query Params:
```
"postId": "605292b0e0c0d12d604c588c"
```

Returns: array of post comments<br />
Example return:
```json
[
    {
        "_id": "6052932de0c0d12d604c5894",
        "message": "Now this is a comment",
        "user": {
            "_id": "6052927f3205ca3c40f08ca8",
            "email": "email@hotmail.com",
            "name": "firstname lastname",
            "dateCreated": "2021-03-17T23:36:31.681Z",
            "__v": 0
        },
        "postId": "605292b0e0c0d12d604c588c",
        "location": {
            "long": 40,
            "lat": 55
        },
        "date": "2021-03-17T23:39:25.583Z",
        "__v": 0
    },
    {
        "_id": "60529343e0c0d12d604c5897",
        "message": "This second comment is a better comment!",
        "user": {
            "_id": "605292e2e0c0d12d604c588e",
            "email": "email2@hotmail.com",
            "name": "firstname2 lastname2",
            "dateCreated": "2021-03-17T23:38:10.060Z",
            "__v": 0
        },
        "postId": "605292b0e0c0d12d604c588c",
        "location": {
            "long": 40,
            "lat": 55
        },
        "date": "2021-03-17T23:39:47.747Z",
        "__v": 0
    }
]
```