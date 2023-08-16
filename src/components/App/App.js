import { Route, Routes } from 'react-router-dom';
import './App.css';
import Main from '../Main/Main';
import Header from '../Header/Header';
import Movies from '../Movies/Movies'
import SavedMovies from '../SavedMovies/SavedMovies'
import Profile from '../Profile/Profile'


function App() {

  return (
    <div className='root'>
        <Routes>
          <Route path='/' element={
            <Main landing={true}/>
          }/>

          <Route path='/movies' element={
            <Movies main={true}/>
          }/>

          <Route path='/saved-movies' element={
            <SavedMovies main={true} mainSaved={true}/>
          }/>

          <Route path='/profile' element={
            <Profile main={true}/>
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
