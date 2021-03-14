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
    "email": "hi@gmail.com",
    "name": "hihihi"
}
```
Content-Type: application/json

------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------

GET getUser<br />
example endpoint: http://localhost:3000/api/getUser<br />
example body:
```json
{
    "email": "hi@gmail.com"
}
```
Content-Type: application/json

------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------

POST createPost<br />
example endpoint: http://localhost:3000/api/createPost<br />
example body:
```json
{
    "username": "hihihi",
    "email": "hi@ih.hih",
    "message": "this is a comment",
    "id": "my_id",
    "long": 30.5,
    "lat": 50.8
}
```
Content-Type: application/json

------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------

(I know it's quite different from regular posting without an image, but I didn't know how to send both the image and the JSON in the body, so I used query parameters instead)<br />

POST createPostWithImage<br />
example endpoint: http://localhost:3000/api/createPostWithImage?username=hihihi&email=hi@gmail.com&message=sh1t&userId=my_id&long=30.5&lat=55.8

Query Params:
```
"username": "hihihi",
"email": "hi@gmail.com",
"message": "sh1t",
"userId": "my_id",
"long": 30.5,
"lat": 50.8
```
Body: form-data with a single key-value pair where the key is "image" and the value is the image file

Content-Type: multipart/form-data

------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------

GET posts<br />
example endpoint: http://localhost:3000/api/posts<br />
example body:
```json
{
    "radius": 50, // in meters
    "long": 30.5,
    "lat": 50.8
}
```
Content-Type: application/json

Returns: array of posts<br />
Example return:
```json
[
    {
        "_id": "604bf9e2ec7e2943b8c17278",
        "name": "hihihi",
        "email": "hi@ih.hih",
        "message": "****",
        "imageFile": "image-1615591903964.png",
        "location": {
            "coordinates": [
                30.5,
                55.8
            ],
            "_id": "604bf9e2ec7e2943b8c17279",
            "type": "Point"
        },
        "date": "2021-03-12T23:31:46.301Z",
        "__v": 0
    },
    {
        "_id": "60471956fb5f011ca85cdcd6",
        "name": "hihihi",
        "email": "hi@ih.hih",
        "message": "ahahahaha",
        "location": {
            "coordinates": [
                30.5,
                55.8
            ],
            "_id": "60471956fb5f011ca85cdcd7",
            "type": "Point"
        },
        "date": "2021-03-09T06:44:38.342Z",
        "__v": 0
    }
]
```

------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------

GET image<br />
example endpoint: http://localhost:3000/api/file/image-1615272242006.png

Returns image file

Files such as "image-1615272242006.png" can be obtained from the "imageFile" property of a post from GET posts.

------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------

POST addCommment<br />
example endpoint: http://localhost:3000/api/addComment<br />
example body:
```json
{
    "username": "hihihi",
    "email": "hi@ih.hih",
    "message": "ahahahaha",
    "userId": "my_id",
    "postId": "6049b8a039bb5a60481f76ae"
    // "long": 30.5,    //Use long/lat if you don't have postId, but you should, so ignore long/lat in the body.
    // "lat": 55.8,    
}
```
Content-Type: application/json

------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------

GET comments<br />
example endpoint: http://localhost:3000/api/comments<br />
example body:
```json
{
    "postId": "604d6a09f119973e94f2893d"
}
```
Content-Type: application/json

Returns: array of post comments<br />
Example return:
```json
[
    {
        "postLocation": [
            80,
            80
        ],
        "_id": "604d6a70f119973e94f28943",
        "name": "hihihi",
        "email": "hi@ih.hih",
        "message": "ahahahaha",
        "userId": "604d694d2825be4e18a32fb4",
        "postId": "604d6a09f119973e94f2893d",
        "date": "2021-03-14T01:44:16.762Z",
        "__v": 0
    },
    {
        "postLocation": [
            80,
            80
        ],
        "_id": "604d6b3666f28762dca31467",
        "name": "hihihi",
        "email": "hi@ih.hih",
        "message": "second comment",
        "userId": "604d694d2825be4e18a32fb4",
        "postId": "604d6a09f119973e94f2893d",
        "date": "2021-03-14T01:47:34.494Z",
        "__v": 0
    }
]
```