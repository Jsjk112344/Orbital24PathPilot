import SQLite from 'react-native-sqlite-storage';

SQLite.enablePromise(true);

const database_name = "Trips.db";
const database_version = "1.0";
const database_displayname = "SQLite Trip Database";
const database_size = 200000;

export const db = () => {
  let db;
  return new Promise((resolve, reject) => {
    SQLite.openDatabase(
      database_name,
      database_version,
      database_displayname,
      database_size
    )
    .then(DB => {
      db = DB;
      db.executeSql('SELECT name FROM sqlite_master WHERE type="table" AND name="Trips";')
      .then(([results]) => {
        if (results.rows.length === 0) {
          db.executeSql('CREATE TABLE IF NOT EXISTS Trips (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id VARCHAR(50), name VARCHAR(30), date VARCHAR(30), details TEXT)')
          .then(() => {
            console.log("Table created successfully");
            resolve(db);
          }).catch((error) => {
            console.log("Received error: ", error);
            reject(error);
          });
        } else {
          db.executeSql('PRAGMA table_info(Trips);')
          .then(([results]) => {
            let userIdColumnExists = false;
            for (let i = 0; i < results.rows.length; i++) {
              if (results.rows.item(i).name === 'user_id') {
                userIdColumnExists = true;
                break;
              }
            }
            if (!userIdColumnExists) {
              db.executeSql('ALTER TABLE Trips ADD COLUMN user_id VARCHAR(50);')
              .then(() => {
                console.log("Column added successfully");
                resolve(db);
              }).catch((error) => {
                console.log("Error adding column: ", error);
                reject(error);
              });
            } else {
              resolve(db);
            }
          }).catch((error) => {
            console.log("Error checking table info: ", error);
            reject(error);
          });
        }
      }).catch((error) => {
        console.log("Error checking table existence: ", error);
        reject(error);
      });
    })
    .catch(error => {
      console.log(error);
    });
  });
};

export const saveTripDetails = async (userId, name, date, details) => {
  const dbConnection = await db();
  return new Promise((resolve, reject) => {
    dbConnection.executeSql('INSERT INTO Trips (user_id, name, date, details) VALUES (?, ?, ?, ?)', [userId, name, date, details])
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

export const fetchTrips = async (userId) => {
  const dbConnection = await db();
  return new Promise((resolve, reject) => {
    dbConnection.executeSql('SELECT * FROM Trips WHERE user_id = ?', [userId])
      .then(([results]) => {
        let data = [];
        for (let i = 0; i < results.rows.length; i++) {
          data.push(results.rows.item(i));
        }
        resolve(data);
      })
      .catch((error) => {
        console.log("Received error: ", error);
        reject(error);
      });
  });
};

export const fetchTripById = async (tripId) => {
  const dbConnection = await db();
  return new Promise((resolve, reject) => {
    dbConnection.executeSql('SELECT * FROM Trips WHERE id = ?', [tripId])
      .then(([results]) => {
        if (results.rows.length > 0) {
          resolve(results.rows.item(0));
        } else {
          reject(new Error('Trip not found'));
        }
      })
      .catch((error) => {
        console.log("Received error: ", error);
        reject(error);
      });
  });
};

export const deleteTrip = async (tripId) => {
  const dbConnection = await db();
  return new Promise((resolve, reject) => {
    dbConnection.executeSql('DELETE FROM Trips WHERE id = ?', [tripId])
      .then((result) => resolve(result))
      .catch((error) => reject(error));
  });
};
