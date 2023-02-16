import styled from 'styled-components/native';

export const FloatingButtonWrapper = styled.TouchableOpacity`
  height: 50px;
  width: 50px;
  background-color: #1B8CD8;
  border-radius: 25px;
  position: absolute;
  bottom: 30px;
  right: 30px;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
`;