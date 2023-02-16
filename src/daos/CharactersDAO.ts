import { Character } from '../models/Character';
import db, { executeSQL, fetchSQLData } from '../utils/Database';

export const listCharacters = (): Promise<Character[]> => {
  return fetchSQLData(
    'SELECT * FROM Characters',
    [],
    (rows) => rows.map((row) =>
      Character(
        row['id'],
        row['name'],
        row['image_url'],
        row['title'],
        row['family']
      ))
  );
};

export const insertCharacter = (character: Character): Promise<number> => {
  return executeSQL(
    `INSERT INTO Characters(name, title, family, image_url) 
    VALUES (?, ?, ?, ?)`,
    [character.name, character.title, character.family, character.imageUrl]
  );
};