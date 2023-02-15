import styled from 'styled-components/native';
import { Link } from 'react-router-native';

export const HomeContent = styled.View`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const HomeTitle = styled.Text`
  font-size: 30px;
  text-align: center;
  margin-bottom: 50px;
`;

export const HomeDescription = styled.Text`
  text-align: center;
  margin-bottom: 50px;
`;

export const GoToListLink = styled.Text`
  text-align: center;
  font-weight: bold;
  color: #333;
`;