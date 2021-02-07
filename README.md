# run mysql server
# create database in mysql server (e.g. - XAMP, LAMP)

####  configure database in ./config/db.js file in a project.  ###

--------------------------------------------

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "### database name ###",
});

---------------------------------------------

# go to folder called - ./DATABASE
# import [ test.sql ] file in your database.


#### to get start this program ###
# locate this folder in command line interface and hit command :: npm install
# make sure your mysql server is running otherwise you'll get error.


### API endpoints ###

==================================================================

# Signup   ---   http://localhost:8080/auth/signup
    
  request body
    {
        "username":"your username",
        "email":"your email",
        "password":"your password"
    }

# Signin   --- http://localhost:8080/auth/signin

   request body
    {
        "email":"your correct email",
        "password":"your correct password"
    }

# Check    --- http://localhost:8080/auth/check

    # grab the token when you successfully logged in or signed in.
    # use for authorization Check endpoint (e.g. - Authorization - token)