import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('got-characters.db');

export const initializeDatabase = () => {
  db.transaction((tx) => {
    tx.executeSql(`
        CREATE TABLE IF NOT EXISTS Characters(
            id INTEGER PRIMARY KEY NOT NULL,
            name VARCHAR(100) NOT NULL,
            title VARCHAR(255),
            family VARCHAR(100),
            image_url VARCHAR(255)
        )
    `);
  });
};

export const fetchSQLData =
  <T>(query: string, args: (string | number | null)[], cb: (rows: any[]) => T): Promise<T> =>
    new Promise<T>((resolve, reject) => {
      db.readTransaction((tx) =>
        tx.executeSql(
          query,
          args,
          (tx, resultSet) => {
            resolve(
              cb(resultSet.rows._array)
            );
          },
          (tx, error) => {
            reject(error);
            return true;
          }
        )
      )
    });

export const executeSQL =
  (query: string, args: (string | number | null)[]): Promise<number> =>
    new Promise<number>((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          query,
          args,
          (tx, resultSet) => {
            if (resultSet.insertId)
              resolve(resultSet.insertId);
            else
              resolve(resultSet.rowsAffected);
          },
          (tx, error) => {
            reject(error);
            return true;
          }
        )
      })
    });

export default db;