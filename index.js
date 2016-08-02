var mongodb = require('mongodb');

var uri = "mongodb://localhost:27017/example";
mongodb.MongoClient.connect(uri, function(error, db){
    if (error) {
        console.log(error);
        process.exit(1);
    }

    var doc = {
        title: "Jaws",
        year: 1975,
        director: "Steven Spielberg",
        rating: "PG",
        ratings: {
            critics: 80,
            audience: 97
        },
        screenplay: ['Peter Benchley', 'Carl Gotlieb']
    };

    db.collection("movies").insert(doc, function(error, result){
        if (error) {
            console.log(error);
            process.exit(1);
        }
        console.log("Inserted to sample collection.");

        // when used with Node.js driver directly, the "find()" needs to be chained
        // together with ".toArray()" function so that you can work with an array of
        // documents rather than iterate through a cursor, which is what is returned if ".toArray()"
        // is not used.
        var query = {screenplay: 'Peter Benchley'};
        db.collection("movies").find(query).toArray(function (error, docs) {
            if (error) {
                console.log(error);
                process.exit(1);
            }

            console.log("Found docs");
            docs.forEach(function(doc){
                console.log(JSON.stringify(doc));
            });
            process.exit(0);
        });
    });
});
