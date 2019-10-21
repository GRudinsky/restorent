![ga_cog_large_red_rgb](https://cloud.githubusercontent.com/assets/40461/8183776/469f976e-1432-11e5-8199-6ac91363302b.png)

# RESTful API

## Introduction

Your task is to build a RESTful Express API! You should include INDEX and CREATE for a single resource. There is no starter code for this assignment, so you should build everything from scratch.

There is nothing to stop you from copy / pasting from the classwork you have done today, but if you do **you will not learn anything** from this homework.

Instead we advise that you build out the API slowly and test as you go.

### Requirements

Use your lesson notes along with the classwork from today as a reference.

* You should have one model (of your choice)
* You should be able to perform full CRUD actions
* Include a seeds file

Steps to follow for tonight’s homework:
​
- $ yarn init 
Make sure you also install other required packages 
​
- index.js
create the file 
​
- config environment
Set up the file (do look up how we did it in class you're not expected to know the syntax for this)
call your database whatever you want your collection to be called
​
- index.js
require express, port - get the app running first (console.log)
​
- index.js
Set up mongoose, databaseURI - make sure this connects. If they both work don't forget about body-parser
​
- logger
Set up the logger
​
- index.js 
import the logger and check everything is working (don't worry about the router yet)
​
- models
don't forget to require mongoose
Make the schema (and model)
​
- db / seeds.js
don't forget to import your model
Make seeds file and test that it builds (3 seeds is enough)
Don't forget to run this command for the seeds to be added to the DB:
$ yarn seed 
​
CHECK IN ROBO that the seeds worked
​
- controllers
Make routes - INDEX and CREATE are required, 
SHOW, UPDATE, DELETE are bonus
Only write one route at one time and test in insomnia in between. 
​
- index.js
don't forget to import the router 
​
​
The file structure should look like this:
-> config
   -- environment.js
   -- router.js
-> controllers
   -- js file for your controllers
-> db
   -- seeds.js
-> models
   -- js file for your models
-> index.js


1. Create the user model
- Build out the basic model
- Set up the virtual field for passwordConfirmation (watch the spelling)
​
2. Set up the user methods
- .pre(‘validate’) to check for match between password and passwordConfirmation
- .pre(‘save’) to hash password using bcrypt before saving to db
- Don't add the validatePassword yet.
- Export User model
​
3. Make auth controllers
- Make the register function
- Hook up the route for register and TEST!
- If you are getting 'module' missing errors it's likely that there's an issue with your importing and exporting
- Make the login function
​
4. Validation
- Add secret to `config/environment.js` and require it
- Remember to make `validatePassword()` in the user model
- Hook up the route for login and TEST!
​
5. Make a secureRoute folder in lib
- Make a `secureRoute()` function
- Check to see if a token exists
- Check if token is valid
​
6. Import secure route to routes and add it to any routes that should be secure. Leave this as the last step so that testing can be easier

Steps for tonight's homework: 

​
1. models > Animal
Start with building comments
Build an embedded schema to embed in the model
Don’t do the user bit straight away
​
Register the schema in the parent model you want it to live in (you can keep in the same file). 
​
2. controllers > animals
In the animal controller build and test the post and delete routes for the comments (do them separately and test!)
​
3. models > Animal
Build the user reference relationship
In the animal model add the reference to the user who created it
​
4. db > seeds.js
Alter the seeds to create some users
Attribute the user to the animal (you can leave this out, but it will make building the frontend tricky). 
​
*Check the seeds run! ( $ yarn seed)*
​
5. controllers > animals
In the animal controllers populate the user fields
​
6. Insomnia
Test  the API - you should see the passwords coming through
​
7. models > User
In the user model add the transform method that stops the response from showing the password
​
8. controllers > animals
Come back to the create route
Attach a user key to the body (this needs to match the one in the secure route)
​
Repeat the same step for comments
​
In the update and delete animal controllers add the logic that checks if the person trying to edit it is the same as the one who created the resource.