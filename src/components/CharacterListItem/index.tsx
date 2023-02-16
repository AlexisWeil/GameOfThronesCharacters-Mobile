import { Image, Text, View } from 'react-native';
import { Character } from '../../models/Character';
import React from 'react';
import { CharacterListItemWrapper, CharacterListItemDetails, CharacterFamily, CharacterImage, CharacterName, CharacterTitle, CharacterId } from './styles';
import { Link } from 'react-router-native';

interface Props {
  character: Character,
  direction: 'column' | 'row'
}

const CharacterListItem: React.FC<Props> = ({ character, direction }) =>
  <Link to={"/character/" + character.id}>
    <CharacterListItemWrapper direction={direction}>
      <CharacterId direction={direction}>ID: {character.id}</CharacterId>

      <CharacterImage direction={direction} source={{ uri: character.imageUrl }} />

      <CharacterListItemDetails direction={direction}>
        <CharacterName>{character.name}</CharacterName>
        <CharacterFamily>{character.family}</CharacterFamily>
        <CharacterTitle>{character.title}</CharacterTitle>
      </CharacterListItemDetails>
    </CharacterListItemWrapper>
  </Link>;

export default CharacterListItem;