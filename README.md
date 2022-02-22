# Silent Auction

#### Current Authors: Pranav Kadekodi and Edward Wawrzynek

#### Past Authors: Donovan Allen, Jackson Chen, Kyle Pfromer, Gernene Tan

## Installing

*Silent auction* should work on any system that has `npm` and `node` installed. Once you clone the repo you must install the dependencies for the frontend and the backend.
They have separate package.json. In order to install go into `frontend` and run `npm install` and go into `backend` and run `npm install`.

### MongoDB

In order to run the backend you must have mongodb installed. Mongodb is a [no sql](https://medium.com/xplenty-blog/the-sql-vs-nosql-difference-mysql-vs-mongodb-32c9980e67b2) based database and stores it's data like json (which is easier for programmers to use).

To install mongodb go [here](https://docs.mongodb.com/manual/administration/install-community/).

Make sure you have the mongo database running by executing `mongo` in the terminal. `mongo` will connect you to the database.

### Configuration

Make sure that once you are ready to deploy the backend to heroku (or any server) that you have the environment variables already defined.
See [the config file](backend/src/config.ts) for information on which environment variables you need to define.

### Using Mongo on the server

- SSH into the deploy server (for the Fairview website server: do ssh your_username@ssh.fairviewhs.org)
- Open up the Mongo Shell (type in "mongo" without quotes)
- Type in "show dbs" to show the databases
- Type in "use database_name" to select the database you want to change 
- Type in "show collections" to show collections of documents within the database
- Type in "db.collection_name.find()" to see the all of the documents within the collection
- Type in "db.collection_name.find({"attribute": "attribute_name"})" to find a specific document by an attribute name
- Type in "db.collection_name.remove({"attribute": "attribute_name"})" to remove a specific document by an attribute name
- Type in "db.collection_name.update({"attribute": "attribute_name"}, {$set:{"other_attribute": new_value}})" to select a collection by an attribute and update another attribute with a different value


### Additional Information

For more information on the frontend go [here](frontend/README.md).

For more information on the backend go [here](backend/README.md).

For more information on manipulating collections in Mongo go [here](https://docs.mongodb.com/manual/reference/method/js-collection/)
