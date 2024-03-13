import { Image, Text, View } from 'react-native';
import { Character } from '../../models/Character';
import React from 'react';
import { CharacterListItemWrapper, CharacterListItemDetails, CharacterFamily, CharacterImage, CharacterName, CharacterTitle, CharacterId } from './styles';
import { Link } from 'react-router-native';
import { MotiView } from 'moti'

interface Props {
  id?: number,
  character: Character,
  direction: 'column' | 'row'
}

const CharacterListItem: React.FC<Props> = ({ id, character, direction }) =>
  <Link to={"/character/" + character.id}>
    <MotiView
        from={{ opacity: 0, translateX: -100 }}
        animate={{ opacity: 1, translateX: 0 }}
        transition={{ type: 'timing', duration: 100 }}
        delay={(id || 0) * 100}
    >
      <CharacterListItemWrapper direction={direction}>
        <CharacterId direction={direction}>ID: {character.id}</CharacterId>

        <CharacterImage direction={direction} source={{ uri: character.imageUrl }} />

        <CharacterListItemDetails direction={direction}>
          <CharacterName>{character.name}</CharacterName>
          <CharacterFamily>{character.family}</CharacterFamily>
          <CharacterTitle>{character.title}</CharacterTitle>
        </CharacterListItemDetails>
      </CharacterListItemWrapper>
    </MotiView>
  </Link>;

export default CharacterListItem;