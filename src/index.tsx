import { NativeRouter, Route, Routes } from 'react-router-native';
import Home from './pages/Home';
import CharactersList from './pages/CharactersList';
import { Provider } from 'react-redux';
import store from './store';
import CharacterDetails from './pages/CharacterDetails';

export const THRONES_API = 'https://thronesapi.com/api/v2';

const App = () => {
  return (
    <Provider store={store}>
      <NativeRouter>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/list" element={<CharactersList />} />
          <Route path="/character/:id" element={<CharacterDetails />} />
        </Routes>
      </NativeRouter>
    </Provider>
  );
};

export default App;
