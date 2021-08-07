db.universities.insert([
    {
        country: 'Spain',
        city: 'Salamanca',
        name: 'USAL',
        location: {
            type: 'Point',
            coordinates: [ -5.6722512,17, 40.9607792 ]
        },
        students: [
            { year: 2014, number: 24774 },
            { year: 2015, number: 23166 },
            { year: 2016, number: 21913 },
            { year: 2017, number: 21715 }
        ]
    },
    {
        country: 'Spain',
        city: 'Salamanca',
        name: 'UPSA',
        location: {
            type: 'Point',
            coordinates: [ -5.6691191,17, 40.9631732 ]
        },
        students: [
            { year: 2014, number: 4788 },
            { year: 2015, number: 4821 },
            { year: 2016, number: 6550 },
            { year: 2017, number: 6125 }
        ]
    },
])

db.courses.insert([
    {
        university: 'USAL',
        name: 'Computer Science',
        level: 'Excellent'
    },
    {
        university: 'USAL',
        name: 'Electronics',
        level: 'Intermediate',
    },
    {
        university: 'USAL',
        name: 'Communication',
        level: 'Execellent'
    }
])

/**
 * Aggregation stages
 */
// $match: The $match stage allows us to choose just those documents from a collection that we want to work with. It does this by filtering out those that do not follow our requirements.
db.universities.aggregate([
    { $match: {country: 'Spain', city: 'Salamanca'}}
])

// $project: The $project() stage is used to return only those fields you need so as to avoid processing more data than is necessary and to add calculated fields that you need.
db.universities.aggregate([
    { $project: { _id: 0, country: 1, city: 1, name: 1}}
])

// $group: With the $group() stage, we can perform all the aggregation or summary queries that we need, such as finding counts, totals, averages or maximums.
db.universities.aggregate([
    { $group: { _id: '$name', totaldocs: {$sum: 1}}}
])

// $out: This is an unusual type of stage because it allows you to carry the results of your aggregation over into a new collection, or into an existing one after dropping it, or even adding them to the existing documents(new in 4.1.2 version).
// The $out() operator must be the last stage in the pipeline.
db.universities.aggregate([
    { $group: { _id: '$name', totaldocs: {$sum: 1}}},
    { $out: 'aggResults'}
])

// $unwind
// The $unwind() stage in MongoDB is commonly found in a pipeline because it is a means to an end.
// You cannot work directly on the elements of an array within a document with stages such as $group(). The $unwind() stage enables us to work with the values of the fields within an array.
db.universities.aggregate([
    { $match: { name: 'USAL'}},
    { $unwind: '$students'}
])

// $sort
// You need the $sort() stage to sort your results by the value of a specific field.
db.universities.aggregate([
    { $match: { name: 'USAL'}},
    { $unwind: '$students'},
    { $project: { _id: 0, 'students.year': 1, 'students.number': 1}},
    { $sort: {'students.number': -1}}
])

// $limit: Notice that when you need to limit the number of sorted documents, you must use the $limit stage just after the $sort.
db.universities.aggregate([
    { $match: { name: 'USAL'}},
    { $unwind: '$students'},
    { $project: { _id: 0, 'students.year': 1, 'students.number': 1}},
    { $sort: { 'students.number': -1}},
    { $limit: 2}
])

// $addFields: It is possible that you need to make some changes to your output in the way of new fields.
db.universities.aggregate([
    { $match: { name: 'USAL'}},
    { $addFields: { foundation_year: 1218}}
])

// $count: The $count() stage provides an easy way to check the number of documents obtained in the output of the previous stages of the pipeline.
db.universities.aggregate([
    { $unwind: '$students'},
    { $count: 'total_documents'}
])

// $lookup: Because MongDB is document-based, we can shape our documents the way we need. However, there is often a requirement to use information from more than one collection.
db.universities.aggregate([
    { $match: { name: 'USAL'}},
    { $project: { _id: 0, name: 1}},
    { $lookup: {
        from: 'courses',
        localField: 'name',
        foreignField: 'university',
        as: 'courses'
    }}
])

// $sortByCount: This stage is a shortcut for grouping, counting and then sorting in descending order the number of different values in a field.
db.courses.aggregate([
    { $sortByCount: '$level'}
])

// $facet: ???
db.universities.aggregate([
    { $match: { name: 'USAL'}},
    { $lookup: {
        from: 'courses',
        localField: 'name',
        foreignField: 'university',
        as: 'courses'
    }},
    { $facet: {
        'countingLevels': 
        [
            { $unwind: '$courses'},
            { $sortByCount: '$courses.level'}
        ],
        'yearWithLessStudents': 
        [
            { $unwind: '$students'},
            { $project: { _id: 0, students: 1}},
            { $sort: { 'students.number': 1}},
            { $limit: 1}
        ]
    }}
])
// What we have done is to create two reports from our database of university courses. CountingLevels and YearWithLessStudents. They both used the output from the first two stages, the $match and the $lookup

/**
 * Exercise
 */
// Get the total number of students that have ever belonged to each one of the universities ?
db.universities.aggregate([
    { $unwind: '$students'},
    { $group: { _id: '$name', totalalumi: { $sum: '$students.number'}}}
])

// Build the query that sorts the output by the totalalumi field in a descending order.
db.universities.aggregate([
    { $unwind: 'students'},
    { $group: { _id: '$name', totalalumi: { $sum: '$students.number'}}},
    { $sort: { totalalumi: -1 }}
])