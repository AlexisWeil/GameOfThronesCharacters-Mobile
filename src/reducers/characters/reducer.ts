import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Character, CharacterAPI } from '../../models/Character';
import { addCharacterAction, deleteCharacterAction, setCharactersAction, updateCharacterAction } from './actions';
import axios from 'axios';
import { THRONES_API } from '../../index';

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
      )
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

  }
});

export const { setCharacters, addCharacter, deleteCharacter, updateCharacter } = reducer.actions;
export default reducer.reducer;