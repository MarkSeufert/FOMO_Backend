# FOMO_Backend
The web server + database portion of NOMOFOMO, a location based social media platform

Must add '2dsphere' index for the 'location' property of the 'Posts' table

Images are uploaded to the /uploads folder of the root directory of this project (may need to manually create the folder)

POST createPost example body:
{
    "username": "hihihi",
    "email": "hi@ih.hih",
    "message": "this is a comment",
    "id": "my_id",
    "long": 30.5,
    "lat": 50.8
}

GET posts example body:
{
    "radius": 5000,
    "long": 30.5,
    "lat": 50.8
}

POST createUser example body:
{
    "email": "hi@ih.hih",
    "name": "hihihi"
}

GET getUser example body:
{
    "email": "hi@ih.hih"
}