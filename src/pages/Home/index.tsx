import { Link } from 'react-router-native';
import { GoToListLink, HomeContent, HomeDescription, HomeTitle } from './styles';

const Home = () =>
  <HomeContent>
    <HomeTitle>Game of Thrones Characters</HomeTitle>

    <HomeDescription>Mobile application listing Game of Thrones characters</HomeDescription>

    <Link to="/list" >
      <GoToListLink>Go to characters list</GoToListLink>
    </Link>
  </HomeContent>;

export default Home;