import { NativeRouter, Route, Routes } from 'react-router-native';
import Home from './pages/Home';
import CharactersList from './pages/CharactersList';
import { Provider } from 'react-redux';
import store from './store';
import CharacterDetails from './pages/CharacterDetails';
import AddCharacter from './pages/AddCharacter';
import { initializeDatabase } from './utils/Database';
import 'react-native-reanimated';
import 'react-native-gesture-handler';

initializeDatabase();

const App = () => {
  return (
    <Provider store={store}>
      <NativeRouter>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/list" element={<CharactersList />} />
          <Route path="/character/:id" element={<CharacterDetails />} />
          <Route path="/add-character" element={<AddCharacter />} />
        </Routes>
      </NativeRouter>
    </Provider>
  );
};

export default App;
