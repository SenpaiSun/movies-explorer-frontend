import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from '../Header/Header';
import Promo from '../Promo/Promo';
import AboutProject from '../AboutProject/AboutProject'
import Techs from '../Techs/Techs';

function App() {
  return (
    <div className='root'>
      <Routes>
        <Route path='/' element={
          <>
            <Header/>
            <Promo/>
            <AboutProject/>
            <Techs/>
          </>
        }/>

        <Route path='/movies' element={
        <Header/>
        }/>

        <Route path='/saved-movies' element={
        <Header/>
        }/>

        <Route path='/profile' element={
        <Header/>
        }/>

        <Route path='/signin' element={
        <Header/>
        }/>

        <Route path='/signup' element={
        <Header/>
        }/>
      </Routes>
    </div>
  );
}

export default App;
