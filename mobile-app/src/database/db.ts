import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('irunner.db');

export interface Trainer {
  id: number;
  name: string;
  cref?: string;
  phone?: string;
  email: string;
  password: string;
  photo?: string;
  specialty?: string;
}

export const initDatabase = () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      // Tabela Treinadores
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS trainers (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          cref TEXT,
          phone TEXT,
          email TEXT UNIQUE,
          password TEXT,
          photo TEXT,
          specialty TEXT
        );`
      );

      // Tabela Atletas
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS athletes (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          cpf TEXT UNIQUE,
          phone TEXT,
          email TEXT UNIQUE,
          birth_date TEXT,
          gender TEXT,
          modality TEXT,
          weight REAL,
          height REAL,
          objective TEXT,
          photo TEXT,
          injury_history TEXT,
          observations TEXT,
          trainer_id INTEGER,
          FOREIGN KEY (trainer_id) REFERENCES trainers (id)
        );`
      );

      // Tabela Treinos
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS workouts (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          athlete_id INTEGER,
          trainer_id INTEGER,
          date TEXT,
          exercise TEXT,
          sets INTEGER,
          reps TEXT,
          intensity TEXT,
          pace TEXT,
          duration TEXT,
          distance TEXT,
          observations TEXT,
          FOREIGN KEY (athlete_id) REFERENCES athletes (id),
          FOREIGN KEY (trainer_id) REFERENCES trainers (id)
        );`,
        [],
        () => {
          // Inserir usuário admin padrão se não existir
          tx.executeSql(
            "INSERT OR IGNORE INTO trainers (id, name, email, password) VALUES (1, 'Administrador', 'admin', 'ej99763463');"
          );
          resolve(true);
        },
        (_, error) => {
          reject(error);
          return false;
        }
      );
    });
  });
};

export const authenticateTrainer = (email: string, password: string): Promise<Trainer | null> => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM trainers WHERE email = ? AND password = ?',
        [email, password],
        (_, { rows }) => {
          if (rows.length > 0) {
            resolve(rows.item(0) as Trainer);
          } else {
            resolve(null);
          }
        },
        (_, error) => {
          reject(error);
          return false;
        }
      );
    });
  });
};

export const getTrainerById = (id: number): Promise<Trainer | null> => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM trainers WHERE id = ?',
        [id],
        (_, { rows }) => {
          if (rows.length > 0) {
            resolve(rows.item(0) as Trainer);
          } else {
            resolve(null);
          }
        },
        (_, error) => {
          reject(error);
          return false;
        }
      );
    });
  });
};

export default db;
