import { FlatList, Text, View } from 'react-native';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import { CharactersState, fetchCharacters } from '../../reducers/characters/reducer';
import CharacterListItem from '../../components/CharacterListItem';
import Loader from '../../components/Loader';

const CharactersList = () => {
  const dispatch = useAppDispatch();

  // Récupère la partie "characters" du store (voir store.ts)
  const charactersState: CharactersState =
    useAppSelector((state) => state.characters);

  useEffect(() => {
    if (charactersState.list.length <= 0)
      dispatch(fetchCharacters());
  }, []);

  return (
    <View>
      <Text>Characters list</Text>

      {charactersState.isFetchingCharacters ?
        <Loader /> :
        <FlatList
          style={{ width: '100%' }}
          data={charactersState.list}
          renderItem={({ item }) =>
            <CharacterListItem character={item} />
          }
        />
      }
    </View>
  );
};

export default CharactersList;