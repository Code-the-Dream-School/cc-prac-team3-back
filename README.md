# NurseryFinds


### Description

NurseryFinds is a full-stack e-commerce app created with the MERN stack which allows users to buy and sell gently-used and preowned items for babies and toddlers. 



### Demo



### Technology Used
- MongoDB
- ExpressJS
- React
- NodeJS

### API Routes
- Auth Routes: Login, Register and Recover Password
- Product Routes: createProduct, deleteProduct, getProduct, getAllProducts, updateProduct

### Database Schema
- User Model
- Product Model

### Setup Instructions


#### .ENV file 

Create .env file to store mongoDB credentials 

```
MONGO_URI = mongodb+srv://<username>:<password>@cc-team3-prac.h7mkaxe.mongodb.net/NAME-API?retryWrites=true&w=majority

```

Store JWT Secret in .env file 

```
JWT_ SECRET = unique, long hard to guess string 

```

Store JWT Lifetime in .env file

```
JWT_ LIFETIME = 30d

```


#### Install NPM Packages

```
$ npm install
$ npm run dev

```
