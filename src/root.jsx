import {
  BrowserRouter as Router, 
  Route, 
  Routes 
} from 'react-router-dom';

import Login from './pages/Login';
import List from './pages/List';
import New from './pages/New';
import Book from './pages/Book';

export default function Root() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Login />} />
        <Route path="/list" element={ <List />} />
        <Route path="/new" element={ <New/>} />
        <Route path="/book/:id" element={ <Book/>} />
      </Routes>
    </Router>
  );
}