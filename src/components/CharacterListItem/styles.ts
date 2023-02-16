import styled from 'styled-components/native';

interface DirectionProps {
  direction: 'column' | 'row'
}

export const CharacterListItemWrapper = styled.View<DirectionProps>`
  width: 100%;
  margin: 10px 0;
  display: flex;
  flex-direction: ${(props) => props.direction};
  align-items: center;
`;

export const CharacterId = styled.Text<DirectionProps>`
  margin: ${(props) => 
            props.direction === 'row' ?
              '0 10px' :
              '10px 0'
          };
`;

export const CharacterImage = styled.Image<DirectionProps>`
  width: ${(props) => props.direction === 'row' ? '100px' : '250px'};
  height: ${(props) => props.direction === 'row' ? '100px' : '250px'};
`;

export const CharacterListItemDetails = styled.View<DirectionProps>`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  
  ${(props) => props.direction === 'row' ?
    `padding: 5px 10px;` :
    `
      padding: 10px 0;
      align-items: center;
    `
  }
`;

export const CharacterName = styled.Text``;

export const CharacterFamily = styled.Text``;

export const CharacterTitle = styled.Text``;