# Camp-Vuiw
![image](https://user-images.githubusercontent.com/91040918/236347624-93494445-8117-494b-9cce-79aa04d450ef.png)

Camp-Vuiw is a web application built using Vue.js as a frontend, and Express, Node, and Mongoose for the backend. The purpose of the project is to practice building a full-stack web application from end to end, including frontend development, backend development, and database integration.

##Demo
https://tranquil-tarsier-9e2453.netlify.app/

### Frontend

- Vue js
- CSS

### Backend

- Express
- MongoDB

### Hosting

- Netlify for the Frontend
- Heroku for Node js
- MongoDB Atlas

## Installation

To install Camp-Vuiw, you can clone the repository and install all the dependencies using npm:

```
git clone https://github.com/Cywus98213/Camp-Vuiw.git
cd Camp-Vuiw
npm install
```

Note: This assumes that you have Node.js and npm already installed on your system.

## Usage

For the server side:

Generate dummy data by running the following command in the server directory:

```
cd server/
node seeds/seeds.js
```

To run the application, you can use the following command:

This will start the server and make the application available at http://localhost:3000.

```
npm start
```

For the client side:

To run the application, you can use the following command:

```
npm run dev
```

This will start the server and make the application available at http://127.0.0.1:5173.

Note: Addresses may vary depends on your setting

## Features

Camp-Vuiw currently supports the following features:

- Basic single-page routing
- RESTful API for adding, deleting, and updating data in the database
- Form validation using the VueValidate library
- user creation, authentication and account validation.

In the future, additional features may be added, such as different login method using Google, facebook, twitter etc, and social media intergation.

## Known Issues

- The application may not be optimized for performance and may have some slow loading times or other performance issues.
- There may be some bugs or errors that have not yet been identified or fixed.
- As this is my first full-stack project, there is likely room for improvement in terms of best practices, coding standards, and overall quality of the code.

Please feel free to report any issues or bugs that you encounter while using the application.

## What I learned

- Building a full-stack web application using Node.js and MongoDB for the backend and Vue.js for the frontend.
- Using Axios to make HTTP requests from the client-side to the server-side API.
- Implementing user authentication and authorization using JSON Web Tokens (JWTs).
- Configuring and deploying a web application on Heroku.
- Creating and managing a GitHub repository for version control and collaboration.
- Using Git and GitHub to manage code changes, merge pull requests, and resolve conflicts.
- Using Vue Router to implement client-side routing for a single-page application.
- Implementing CRUD (Create, Read, Update, Delete) functionality for data stored in a MongoDB database.
- Writing clean and maintainable code, following best practices and standards for naming, formatting, and commenting.
- Troubleshooting and debugging issues in both the server-side and client-side code using debugging tools and console logs.

## Reflection

- Overall, this project helped me improve my skills as a full-stack developer , gave me valuable experience working with popular tools and technologies used in modern web development, and also give some basic understanding of how to build a website.

## Contributing

Camp-Vuiw is a self-practice project and is not currently accepting contributions.

## License

Camp-Vuiw is released under the MIT License.
