import SQLite from 'react-native-sqlite-storage';
import Navigation from '../../navigation';

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
            console.log("Trips table created successfully");
            resolve(db);
          }).catch((error) => {
            console.log("Received error while creating Trips table: ", error);
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
                console.log("Column user_id added successfully");
                resolve(db);
              }).catch((error) => {
                console.log("Error adding user_id column: ", error);
                reject(error);
              });
            } else {
              resolve(db);
            }
          }).catch((error) => {
            console.log("Error checking Trips table info: ", error);
            reject(error);
          });
        }
      }).catch((error) => {
        console.log("Error checking Trips table existence: ", error);
        reject(error);
      });

      // Ensure the UserProfile table is created
      db.executeSql(`
        CREATE TABLE IF NOT EXISTS UserProfile (
          user_id VARCHAR(50) PRIMARY KEY,
          biography TEXT,
          socialWork TEXT
        );
      `)
      .then(() => {
        console.log("UserProfile table created successfully");
        resolve(db);
      })
      .catch(error => {
        console.log("Error creating UserProfile table: ", error);
        reject(error);
      });

    })
    .catch(error => {
      console.log("Error opening database: ", error);
      reject(error);
    });
  });
};

export const saveTripDetails = async (userId, name, date, details) => {
  const dbConnection = await db();
  return new Promise((resolve, reject) => {
    dbConnection.executeSql('INSERT INTO Trips (user_id, name, date, details) VALUES (?, ?, ?, ?)', [userId, name, date, details])
      .then(([results]) => {
        console.log("Trip details saved successfully", results);
        resolve(results);
      })
      .catch((error) => {
        console.log("Error saving trip details: ", error);
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
        console.log("Error fetching trips: ", error);
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
        console.log("Error fetching trip by ID: ", error);
        reject(error);
      });
  });
};

export const deleteTrip = async (tripId) => {
  const dbConnection = await db();
  return new Promise((resolve, reject) => {
    dbConnection.executeSql('DELETE FROM Trips WHERE id = ?', [tripId])
      .then((result) => resolve(result))
      .catch((error) => {
        console.log("Error deleting trip: ", error);
        reject(error);
      });
  });
};

// Ensure the UserProfile table is created
export const setupUserProfileTable = async () => {
  const dbConnection = await db();
  return new Promise((resolve, reject) => {
    dbConnection.executeSql(`
      CREATE TABLE IF NOT EXISTS UserProfile (
        user_id VARCHAR(50) PRIMARY KEY,
        biography TEXT,
        socialWork TEXT
      );
    `)
    .then(() => {
      console.log("UserProfile table created successfully");
      resolve(dbConnection);
    })
    .catch(error => {
      console.log("Error creating UserProfile table: ", error);
      reject(error);
    });
  });
};

// Functions to handle UserProfile CRUD operations
export const saveUserProfile = async (userId, biography, socialWork) => {
  const dbConnection = await db();
  
  return new Promise((resolve, reject) => {
    dbConnection.executeSql(
      'INSERT OR REPLACE INTO UserProfile (user_id, biography, socialWork) VALUES (?, ?, ?);',
      [userId, biography, socialWork]
    )
    .then(([results]) => {
      console.log("UserProfile updated successfully", results);
      resolve(results);
    })
    .catch((error) => {
      console.log("Error saving user profile: ", error);
      reject(error);
    });
  });
};


export const fetchUserProfile = async (userId) => {
  const dbConnection = await db();
  return new Promise((resolve, reject) => {
    dbConnection.executeSql('SELECT * FROM UserProfile WHERE user_id = ?', [userId])
    .then(([results]) => {
      if (results.rows.length > 0) {
        resolve(results.rows.item(0));
      } else {
        reject(new Error('User profile not found'));
      }
    })
    .catch((error) => {
      console.log("Error fetching user profile: ", error);
      reject(error);
    });
  });
};
