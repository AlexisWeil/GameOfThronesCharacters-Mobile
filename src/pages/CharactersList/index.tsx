import { Alert, FlatList, Text, View } from 'react-native';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import { CharactersState, fetchCharacters } from '../../reducers/characters/reducer';
import CharacterListItem from '../../components/CharacterListItem';
import Loader from '../../components/Loader';
import FloatingButton from '../../components/FloatingButton';
import { Entypo } from '@expo/vector-icons';
import Title from '../../components/Title';
import { useNavigate } from 'react-router-native';
import { CharactersListWrapper } from './styles';

const CharactersList = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // Récupère la partie "characters" du store (voir store.ts)
  const charactersState: CharactersState =
    useAppSelector((state) => state.characters);

  useEffect(() => {
    if (charactersState.list.length <= 0)
      dispatch(fetchCharacters());
  }, []);

  return (
    <CharactersListWrapper>
      <Title>Characters list</Title>

      {charactersState.isFetchingCharacters ?
        <Loader /> :
        <FlatList
          style={{ width: '100%' }}
          data={charactersState.list}
          renderItem={({ item, index }) =>
            <CharacterListItem
              id={index}
              direction="row"
              character={item}
            />
          }
        />
      }

      <FloatingButton
        onPress={() => navigate('/add-character')}
        icon={<Entypo name="plus" size={36} color="white" />}
      />
    </CharactersListWrapper>
  );
};

export default CharactersList;