const mongoClient = require("mongodb").MongoClient;
const fs = require("fs");

const jsonfile = require("jsonfile");
const obj = { name: "JP" };
var mi = require("mongoimport");

let exportDataBase = function (dburl, file) {
  mongoClient.connect(dburl, (err, db) => {
    if (err) throw err;
    console.log("connnected");
    db.db()
      .listCollections()
      .toArray(function (err, collections) {
        if (err) {
          console.log(err);
        } else {
          console.log(collections);
          var dbs = dburl.split("/");
          var dir = dbs[dbs.length - 1];
          if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
            //   console.log('no existe el dir: ' +dir);
          }
          console.log(
            "total number of collectons is ------------>  " + collections.length
          );
          //   var arrofcollection = [];
          collections.forEach((element, index) => {
            console.log(
              "----------- *" +
                (index + 1) +
                "*" +
                " out of " +
                collections.length +
                " are completed -----------"
            );
            // db.db()
            //   .collection(element.name)
            //   .find({})
            //   .toArray((err, data) => {
            //     if (err) throw err;
            //     // console.log(data);
            //     //   const ws = fs.createWriteStream('D://'+
            //     //     dir + "/" + element.name + ".csv"
            //     //   );
            //     //   console.log(data);
            //     //   fastcsv
            //     //     .write(data, { headers: true })
            //     //     .on("finish", function () {
            //     //   console.log("Write to "+element.name+ " successfully!");
            //     //     })
            //     //     .pipe(ws);
            //   });

            // arrofcollection.push(element.name);
          });
          jsonfile
            .writeFile(file, collections)
            .then((res) => {
              console.log("Write complete");
            })
            .catch((error) => console.error(error));
          //   console.log(arrofcollection);
        }
        db.close();
      });
  });
};

let exportImportDataBase = function (dburl, file) {
  mongoClient.connect(dburl, (err, db) => {
    if (err) throw err;
    console.log("connnected");
    db.db()
      .listCollections()
      .toArray(function (err, collections) {
        if (err) {
          console.log(err);
        } else {
          console.log(collections);
          var dbs = dburl.split("/");
          var dir = dbs[dbs.length - 1];
          if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
            //   console.log('no existe el dir: ' +dir);
          }
          console.log(
            "total number of collectons is ------------>  " + collections.length
          );
          //   var arrofcollection = [];
          collections.forEach((element, index) => {
            console.log(
              "----------- *" +
                (index + 1) +
                "*" +
                " out of " +
                collections.length +
                " are completed -----------"
            );
            // console.log(element);
            db.db()
              .collection(element.name)
              .find({})
              .toArray((err, data) => {
                if (err) throw err;
                mi({
                    fields: collections, // {array} data to import
                    db: "meteor", // {string} name of db
                    collection: element.name, // {string|function} name of collection, or use a function to
                    //  return a name, accept one param - [fields] the fields to import
                    host: "localhost:3001",
                    callback: (err, db) => {
                      err && console.error(err);
                    },
                  });
                // console.log(data);
                //   const ws = fs.createWriteStream('D://'+
                //     dir + "/" + element.name + ".csv"
                //   );
                //   console.log(data);
                //   fastcsv
                //     .write(data, { headers: true })
                //     .on("finish", function () {
                //   console.log("Write to "+element.name+ " successfully!");
                //     })
                //     .pipe(ws);
              });

            // arrofcollection.push(element.name);
          });
        //   jsonfile
        //     .writeFile(file, collections)
        //     .then((res) => {
        //       console.log("Write complete");
        //     })
        //     .catch((error) => console.error(error));
          //   console.log(arrofcollection);
        }
        db.close();
      });
  });
};

let importDataBase = function (dburl, file) {
  jsonfile
    .readFile(file)
    .then((obj) => {
      obj.forEach((item, index) => {
        console.log(item);
      });
      // mi({
      //     fields: obj, // {array} data to import
      //     db: "meteor", // {string} name of db
      //     collection: "collection", // {string|function} name of collection, or use a function to
      //     //  return a name, accept one param - [fields] the fields to import
      //     callback: (err, db) => {
      //       err && console.error(error);
      //     },
      //   });
    })
    .catch((error) => console.error(error));
};

module.exports.importDataBase = importDataBase;
module.exports.exportDataBase = exportDataBase;
module.exports.exportImportDataBase = exportImportDataBase;
