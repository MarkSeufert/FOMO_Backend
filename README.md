# FOMO_Backend
The web server + database portion of NOMOFOMO, a location based social media platform

POST comment example body:
{
    "username": "hihihi",
    "email": "hi@ih.hih",
    "comment": "this is a comment",
    "id": "my_id",
    "long": 30.5,
    "lat": 50.8
}

GET comments example body:
{
    "radius": 5000,
    "long": 30.5,
    "lat": 50.8
}