import { useAppDispatch, useAppSelector } from '../../store';
import { useState } from 'react';
import { Character } from '../../models/Character';
import { addCharacter, addNewCharacter } from '../../reducers/characters/reducer';
import Title from '../../components/Title';
import { Link, useNavigate } from 'react-router-native';
import { Button, Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { MediaTypeOptions } from 'expo-image-picker';
import { CharacterImage, CharacterImageSelector, FormInput, FormWrapper } from './styles';

const AddCharacter = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const idNextCharacter = useAppSelector((state) => state.characters.list.length);

  const [nameToAdd, setNameToAdd] = useState('');
  const [titleToAdd, setTitleToAdd] = useState('');
  const [familyToAdd, setFamilyToAdd] = useState('');
  const [imageURLToAdd, setImageURLToAdd] = useState('');

  const onAddCharacter = () => {
    const characterToAdd =
      Character(
        idNextCharacter,
        nameToAdd,
        imageURLToAdd,
        titleToAdd,
        familyToAdd
      );

    dispatch(addNewCharacter(characterToAdd));

    navigate('/list');
  };

  const pickImage = () => {
    ImagePicker.launchImageLibraryAsync({
      mediaTypes: MediaTypeOptions.Images,
      quality: 1
    }).then((result) => {
      if (result.assets && result.assets[0])
        setImageURLToAdd(result.assets[0].uri);
    });
  };

  return (
    <View>
      <Title>Add character</Title>

      <FormWrapper>
        <FormInput
          placeholder="Name"
          value={nameToAdd}
          onChangeText={setNameToAdd}
        />

        <FormInput
          placeholder="Title"
          value={titleToAdd}
          onChangeText={setTitleToAdd}
        />

        <FormInput
          placeholder="Family"
          value={familyToAdd}
          onChangeText={setFamilyToAdd}
        />

        <CharacterImageSelector onPress={pickImage}>
          {imageURLToAdd !== '' ?
            <CharacterImage source={{ uri: imageURLToAdd }} /> :
            <Text>Pick image</Text>
          }
        </CharacterImageSelector>

        <Button
          title="Add character"
          onPress={onAddCharacter}
        />
      </FormWrapper>

      <Link to="/list"><Text>Go back to list</Text></Link>
    </View>
  );
};

export default AddCharacter;