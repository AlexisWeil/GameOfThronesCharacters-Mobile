import { Character, CharacterAPI } from '../../models/Character'
import axios from 'axios'
import { insertCharacter } from '../../daos/CharactersDAO'
import { THRONES_API } from '../../utils/api'

export const fetchCharactersFromAPIAndInsertInDB = (): Promise<Character[]> =>
  axios.get<CharacterAPI[]>(THRONES_API + '/Characters')
    .then((res) =>
      // Les données retournées par l'API sont converties en Character
      res.data.map((c: CharacterAPI) =>
        Character(
          c.id,
          c.fullName,
          c.imageUrl,
          c.title,
          c.family
        )
      )
    ).then((characters: Character[]) =>
    // Pour chaque personnage, l'insert en base de données
    // et retourne ce personnage avec son ID modifié en fonction
    // de celui généré à l'insertion
    Promise.all( // Transforme Array<Promise<Character>> en Promise<Array<Character>>
      characters.map((c) =>
        insertCharacter(c)
          .then((idInserted) => ({
            ...c,
            id: idInserted // ID généré à l'insertion
          }))
      )
    )
  );