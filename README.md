
# Movie Application

This assignment has API for a movie lobby for OTT applications

## Documentation

[Documentation](https://linktodocumentation)

## Run Locally

### Prerequisites

Ensure the following software is installed on your laptop:

- [VS Code](https://code.visualstudio.com/)
- [Node.js](https://nodejs.org/)
- [NPM](https://www.npmjs.com/)
- [MongoDB](https://www.mongodb.com/)

### Steps to Run

Please execute the following commands one by one in your terminal:

1. **Clone the repository:**

   ```bash
    git clone <repository_url>

2. **Change to the project directory**

   ```bash
    cd <project_directory>

3. **Install all the dependencies**

   ```bash
    npm install

4. **Start the Application**

   ```bash
    npm run start
## API Curl for the reference

1. Registration API

curl --location 'http://localhost:3000/api/user/register' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "Likesh Kewat User",  
    "email": "testingUser1811@gmail.com",
    "password": "leekesh1811",
    "mobile": "9823626237",
    "role": "User"
}'


2. Login API

curl --location 'http://localhost:3000/api/user/login' \
--header 'Content-Type: application/json' \
--data-raw '{
    "mobile": "8983347235",
    "email": "testingUser1811@gmail.com",
    "password": "leekesh1811"
}'


** These are the two api for the user to register and login for generating the token, depending on which the movie api will decode the token and also check for the restriction related to the Admin roles **


##Movie API

1. List all the movies in the lobby

curl --location 'http://localhost:3000/api/movie/movies' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2Njg0YjgzMzhhMDY0NWIyNzBiNWMzYzUiLCJpYXQiOjE3MTk5NzY1MTEsImV4cCI6MTcxOTk4MDExMX0.gdrA8hOfxY5ONZV1Napge6og7FMAkIwxq8LrVIryTzc'

2. Search for a movie by title or genre

curl --location 'http://localhost:3000/api/movie/search?q=Superhero%20fiction' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2Njg0YjgzMzhhMDY0NWIyNzBiNWMzYzUiLCJpYXQiOjE3MTk5NzY1MTEsImV4cCI6MTcxOTk4MDExMX0.gdrA8hOfxY5ONZV1Napge6og7FMAkIwxq8LrVIryTzc'

3. 3. Add a new movie to the lobby

curl --location 'http://localhost:3000/api/movie/movies' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2Njg0NTgxNjI5NzYwMTQ4MDc3Mjk1MDciLCJpYXQiOjE3MTk5NzI4NzAsImV4cCI6MTcxOTk3NjQ3MH0.7OpzQl6jWZ9UUXVZWBphIjcQo6yB3NoF4-ePj7fBWU4' \
--header 'Content-Type: application/json' \
--data '{
    "title": "Chota Bheem",
    "genre": "Cartoon",
    "rating": 9,
    "streamingLink": "https://www.youtube.com/watch?v=OgKl0DK4Bc4"
}'

4. Update an existing movie information (title, genre, rating, or streaming link)

curl --location --request PUT 'http://localhost:3000/api/movie/movies/668451e9b4dab3ae3edff4d9' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2Njg0NTgxNjI5NzYwMTQ4MDc3Mjk1MDciLCJpYXQiOjE3MTk5ODI1NjUsImV4cCI6MTcxOTk4NjE2NX0.Jlpe-HCKKZptooRx0ukvE1AdLPZ7Dut0GpbCb6FpE3A' \
--header 'Content-Type: application/json' \
--data '{
    "title": "Avenger",
    "genre": "Superhero fiction",
    "rating": 10,
    "streamingLink": "https://www.youtube.com/watch?v=6ZfuNTqbHE8"
}'

5. Delete a movie from the lobby

curl --location --request DELETE 'http://localhost:3000/api/movie/movies/66844dfa3e2115e66b42c184' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2Njg0YjgzMzhhMDY0NWIyNzBiNWMzYzUiLCJpYXQiOjE3MTk5NzY1MTEsImV4cCI6MTcxOTk4MDExMX0.gdrA8hOfxY5ONZV1Napge6og7FMAkIwxq8LrVIryTzc'


## Snapshots of one api

![alt text](image.png)

