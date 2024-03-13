import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Character, CharacterAPI } from '../../models/Character';
import { addCharacterAction, deleteCharacterAction, setCharactersAction, updateCharacterAction } from './actions';
import axios from 'axios';
import { insertCharacter, listCharacters } from '../../daos/CharactersDAO';
import { fetchCharactersFromAPIAndInsertInDB } from './api';

export interface CharactersState {
  list: Character[],
  isFetchingCharacters: boolean
}

const initialState: CharactersState = {
  list: [],
  isFetchingCharacters: false
};

// Action asynchrone récupérant les personnages depuis l'API
export const fetchCharacters = createAsyncThunk(
  'tasks/fetchCharacters',
  () =>
    // Récupère les personnages depuis la base SQLite
    listCharacters()
      .then((characters) => {
        // S'il n'y a aucun personnage en base, alors les récupérer
        // depuis l'API REST et les insérer ensuite en base
        if (characters.length <= 0) {
          return fetchCharactersFromAPIAndInsertInDB();
        }

        return characters;
      })
);

export const addNewCharacter = createAsyncThunk(
  'tasks/addNewCharacter',
  (character: Character) =>
    insertCharacter(character)
      .then((idInserted) => ({
        ...character,
        id: idInserted
      }))
);

const reducer = createSlice({
  name: 'characters',
  initialState: initialState,
  reducers: {
    setCharacters: setCharactersAction,
    addCharacter: addCharacterAction,
    deleteCharacter: deleteCharacterAction,
    updateCharacter: updateCharacterAction
  },
  extraReducers: (builder) => {

    // Quand l'action asynchrone fetchCharacters est appelée,
    // modifie le state en passant isFetchingCharacters à true
    builder.addCase(
      fetchCharacters.pending,
      (state) => ({
        ...state,
        isFetchingCharacters: true
      })
    );

    // Quand l'action asynchrone fetchCharacters est appelée,
    // modifie le state en lui passant la nouvelle liste de personnages
    // et en passant isFetchingCharacters à false
    builder.addCase(
      fetchCharacters.fulfilled,
      setCharactersAction
    );

    builder.addCase(
      addNewCharacter.fulfilled,
      addCharacterAction
    );

  }
});

export const { setCharacters, addCharacter, deleteCharacter, updateCharacter } = reducer.actions;
export default reducer.reducer;