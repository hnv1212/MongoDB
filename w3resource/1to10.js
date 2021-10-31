// 1. Display all the documents in the collection
db.restaurants.find()

// 2. Display the fields restaurant_id, name, borough and cuisine for all the document in the collections 
db.restaurants.find({}, {"restaurant_id": 1, "name": 1, "borough": 1, "cuisine": 1})

// 3. Display the fields restaurant_id, name, borough and cuisine, but exclude the field _id
db.restaurants.find({}, {"restaurant_id": 1, "name": 1, "borough": 1, "cuisine": 1, "_id": 0})

// 4. display the fields restaurant_id, name, borough and zip code, but exclude the field _id 
db.restaurants.find({}, {"restaurant_id": 1, "name": 1, "borough": 1, "address.zipcode": 1, "_id": 0})

// 5. display all the restaurant which is in the borough Bronx
db.restaurants.find({"borough": "Bronx"})

// 6. display the first 5 restaurant which is in the borough Bronx
db.restaurants.find({"borough": "Bronx"}).limit(5)

// 7. display the next 5 restaurants after skipping first 5 which are in the borough Bronx
db.restaurants.find({"borough": "Bronx"}).skip(5).limit(5)

// 8. query to find the restaurants who achieved a score more than 90
db.restaurants.find({grades: {$elemMatch: {"score": {$gt: 90}}}})

// 9. query to find the restaurants that achieved a score, more than 80 but less than 100
db.restaurants.find({grades: {$elemMatch: {"score": {$gt: 80, $lt: 100}}}})

// 10. query to find the restaurants which locate in latitude value less than -95.754168
db.restaurants.find({"address.coord": {$lt: -95.754168}})