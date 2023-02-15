import { Text, View } from 'react-native';
import { Link, useNavigate, useParams } from 'react-router-native';
import { Character } from '../../models/Character';
import { useAppDispatch, useAppSelector } from '../../store';
import { useEffect } from 'react';
import { fetchCharacters } from '../../reducers/characters/reducer';
import Loader from '../../components/Loader';
import CharacterListItem from '../../components/CharacterListItem';

const CharacterDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { list, isFetchingCharacters } = useAppSelector((state) => state.characters);

  const id = Number(params.id);

  const character: Character | undefined =
    isNaN(id) ?
      undefined :
      list.find((c: Character) => c.id === id);

  useEffect(() => {
    if (isNaN(id)) {
      navigate('/list');
    }
    else if (list.length <= 0) {
      dispatch(fetchCharacters());
    }
  }, []);

  return (
    <View>
      {isFetchingCharacters && <Loader />}

      {/*
        Si isFetchingCharacters est faux et que character
        est undefined ou null alors j'affiche le texte
        Unknown character
      */}
      {!isFetchingCharacters && !character &&
        <Text>Unknown character</Text>
      }

      {!isFetchingCharacters && character &&
        <CharacterListItem character={character} />
      }

      <Link to="/list">
        <Text>Go back to list</Text>
      </Link>
    </View>
  );
};

export default CharacterDetails;