import { Text, TouchableOpacity } from 'react-native';
import { FloatingButtonWrapper } from './styles';
import { ReactNode } from 'react';

interface Props {
  onPress: () => void,
  icon: ReactNode
}

const FloatingButton: React.FC<Props> = ({ onPress, icon }) =>
  <FloatingButtonWrapper onPress={onPress}>
    {icon}
  </FloatingButtonWrapper>;

export default FloatingButton;