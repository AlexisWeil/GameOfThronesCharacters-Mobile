import { Image, Text, View } from 'react-native';
import { Character } from '../../models/Character';
import React from 'react';
import { CharacterListItemWrapper, CharacterListItemDetails, CharacterFamily, CharacterImage, CharacterName, CharacterTitle, CharacterId } from './styles';
import { Link } from 'react-router-native';

interface Props {
  character: Character
}

const CharacterListItem: React.FC<Props> = ({ character }) =>
  <Link to={"/character/" + character.id}>
    <CharacterListItemWrapper>
      <CharacterId>ID: {character.id}</CharacterId>

      <CharacterImage source={{ uri: character.imageUrl }} />

      <CharacterListItemDetails>
        <CharacterName>{character.name}</CharacterName>
        <CharacterFamily>{character.family}</CharacterFamily>
        <CharacterTitle>{character.title}</CharacterTitle>
      </CharacterListItemDetails>
    </CharacterListItemWrapper>
  </Link>;

export default CharacterListItem;