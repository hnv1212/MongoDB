// 11. query to find the restaurants that do not prepare any cuisine of 'American' and their grade score more than 70 and latitude less than -65.754168
db.restaurants.find(
    {
        $and: [
            {"cuisine": {$ne: 'American'}},
            {"grades.score": {$gt: 70}},
            {"address.coord": {$lt: -65.754168}}
        ]
    }
)

// 12. query to find the restaurants which do not prepare any cuisine of 'American' and achieved a score more than 70 and located in the longitude less than -65.754168.
// Note : Do this query without using $and operator
db.restaurants.find({
    "cuisine": {$ne: "American"},
    "grades.score": {$gt: 70},
    "address.coord": {$lt: -65.754168}
})

// 13. query to find the restaurants which do not prepare any cuisine of 'American ' and achieved a grade point 'A' not belongs to the borough Brooklyn. The document must be displayed according to the cuisine in descending order
db.restaurants.find({
    "cuisine": {$ne: "American"},
    "grades.grade": "A",
    "borough": {$ne: "Brooklyn"}
}).sort({"cuisine": -1})

// 14. query to find the restaurant Id, name, borough and cuisine for those restaurants which contain 'Wil' as first three letters for its name
db.restaurants.find(
    {name: /^Wil/},
    {
        "restaurant": 1,
        "name": 1,
        "borough": 1, 
        "cuisine": 1
    }
)

// 15. query to find the restaurant Id, name, borough and cuisine for those restaurants which contain 'ces' as last three letters for its name
db.restaurants.find(
    {name: /ces$/}, 
    {
        "restaurant": 1,
        "name": 1,
        "borough": 1, 
        "cuisine": 1
    }
)

// 16. query to find the restaurant Id, name, borough and cuisine for those restaurants which contain 'Reg' as three letters somewhere in its name
db.restaurants.find(
    {"name": /.*Reg.*/}, 
    {
        "restaurant": 1,
        "name": 1,
        "borough": 1, 
        "cuisine": 1
    }
)

// 17. query to find the restaurants which belong to the borough Bronx and prepared either American or Chinese dish
db.restaurants.find(
    {
        "borough": "Bronx",
        $or: [
            {"cuisine": "American"},
            {"cuisine": "Chinese"}
        ]
    }
)

// 18. query to find the restaurant Id, name, borough and cuisine for those restaurants which belong to the borough Staten Island or Queens or Bronxor Brooklyn
db.restaurants.find(
    {
        "borough": {$in: ["State Island", "Queens", "Brooklyn"]}
    },
    {
        "restaurant_id": 1, "name": 1, "borough": 1
    }
)

// 19. query to find the restaurant Id, name, borough and cuisine for those restaurants which are not belonging to the borough Staten Island or Queens or Bronxor Brooklyn
db.restaurants.find(
    {
        "borough": {$nin: ["State Island", "Queens", "Brooklyn"]}
    },
    {
        "restaurant_id": 1, "name": 1, "borough": 1
    }
)

// 20. query to find the restaurant Id, name, borough and cuisine for those restaurants which achieved a score which is not more than 10
db.restaurants.find(
    {
        "grades.score": {$not: {$gt: 10}}
    },
    {
        "restaurant_id": 1, "name": 1, "borough": 1
    }
)