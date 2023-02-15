import { CharactersState } from './reducer';
import { PayloadAction } from '@reduxjs/toolkit';
import { Character } from '../../models/Character';

export const setCharactersAction = (state: CharactersState, action: PayloadAction<Character[]>): CharactersState =>
  ({
    list: action.payload,
    isFetchingCharacters: false
  });

export const addCharacterAction = (state: CharactersState, action: PayloadAction<Character>): CharactersState =>
  ({
    ...state,
    // Ajoute un personnage à la fin de la liste de personnages déjà existants
    list: state.list.concat(action.payload)
  });

export const deleteCharacterAction = (state: CharactersState, action: PayloadAction<number>): CharactersState =>
  ({
    ...state,
    // Retourner la liste des personnages moins celui dont l'ID correspond au contenu de l'action
    list: state.list.filter((c: Character) => c.id !== action.payload)
  });

export const updateCharacterAction = (state: CharactersState, action: PayloadAction<Character>): CharactersState =>
  ({
    ...state,
    // Modifie un personnage de la liste qui aura comme ID celui du personnage passé
    // en donnée à l'action
    // Les autres personnages de la liste ne seront pas modifiés
    list: state.list.map((c: Character) => {
      if (c.id === action.payload.id)
        return action.payload;

      return c;
    })
  });