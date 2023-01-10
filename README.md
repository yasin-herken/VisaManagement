IF you open this repository first time, you need to install some technologies.
    -node.js (https://nodejs.org/en/)
    -nodemon (https://www.npmjs.com/package/nodemon)
    -npm (npm install -g npm)
After installation you need to install also dependencies for each frontend and backend folders.
    -frontend folder 
        ```
            npm install
        ```
    -backend folder
        ```
            npm install
        ```
Now you can run website in the localhost but you also must some arrangement for Json Web Token and Mongodb connection.
    You need to create file which is called .env in backend folder.
        in .env file, set the variables and fill the empty string for your website 
            ``` 
                MONGO_ATLAS_PASSWORD = ""
                JWT_KEY = ""
            ```