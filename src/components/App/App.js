import { Route, Routes } from 'react-router-dom';
import './App.css';
import Main from '../Main/Main';
import Header from '../Header/Header';


function App() {
  return (
    <div className='root'>
      <Routes>
        <Route path='/' element={
          <>
            <Main/>
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
