import logo from './logo.svg';
import './App.css';
import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Edit from './pages/Edit';
import AddBook from './pages/AddBook';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/add' element={<AddBook />} />
      <Route path='edit/:bookId' element={<Edit />} />
    </Routes>
  );
}

export default App;
