import SQLite from 'react-native-sqlite-storage';

SQLite.enablePromise(true);

const database_name = "Trips.db";
const database_version = "1.0";
const database_displayname = "SQLite Trip Database";
const database_size = 200000;

export const db = () => {
  let db;
  return new Promise((resolve, reject) => {
    console.log("Plugin integrity check ...");
    SQLite.echoTest()
      .then(() => {
        console.log("Integrity check passed ...");
        console.log("Opening database ...");
        SQLite.openDatabase(
          database_name,
          database_version,
          database_displayname,
          database_size
        )
        .then(DB => {
          db = DB;
          console.log("Database OPEN");
          db.executeSql('CREATE TABLE IF NOT EXISTS Trips (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(30), date VARCHAR(30), details TEXT)').then(() => {
              console.log("Table created successfully");
              resolve(db);
          }).catch((error) => {
              console.log("Received error: ", error);
              console.log("Database not yet ready ... populating data");
              reject(error);
          });
        })
        .catch(error => {
          console.log(error);
        });
      })
      .catch(error => {
        console.log("echoTest failed - plugin not functional");
      });
    });
};

export const saveTripDetails = async (name, date, details) => {
  const dbConnection = await db();
  return new Promise((resolve, reject) => {
    dbConnection.executeSql('INSERT INTO Trips (name, date, details) VALUES (?, ?, ?)', [name, date, details])
      .then(([results]) => {
        console.log("Results", results);
        resolve(results);
      })
      .catch((error) => {
        console.log("Received error: ", error);
        reject(error);
      });
  });
};

export const fetchTrips = async () => {
  const dbConnection = await db();
  return new Promise((resolve, reject) => {
    dbConnection.executeSql('SELECT * FROM Trips', []).then(([results]) => {
      let data = [];
      for (let i = 0; i < results.rows.length; i++) {
        data.push(results.rows.item(i));
      }
      resolve(data);
    }).catch((error) => {
      console.log("Received error: ", error);
      reject(error);
    });
  });
};
