import { TitleWrapper } from "./styles"
import { ReactNode } from 'react';

interface Props {
  children: ReactNode
}

const Title: React.FC<Props> = ({ children }) =>
  <TitleWrapper>{children}</TitleWrapper>;

export default Title;