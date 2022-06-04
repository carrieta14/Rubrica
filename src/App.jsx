import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import User from './components/User';
import Login from './components/Login';
import Inicio from './components/Inicio';
import Navbar from './components/Navbar';
import React from 'react';
import { auth } from './firebase';
import Consultar from './components/Consultar';

function App() {
  const [firebaseUser, setFirebaseUser] = React.useState(false)
  React.useEffect(() => {
    auth.onAuthStateChanged(user => {
      console.log(user)
      if (user) {
        setFirebaseUser(user)
      } else {
        setFirebaseUser(null)
      }
    })
  }, [])
  return firebaseUser !== false ? (
    <Router>
      <div className='container'>
        <Navbar firebaseUser={firebaseUser}/>
        <Routes>
          <Route path='/' element={<Inicio />} />
          <Route path='login' element={<Login />} />
          <Route path='user' element={<User />} />
          <Route path='consultar' element={<Consultar />} />
        </Routes>
      </div>
    </Router>
  ) :
    (
      <h1 className='text-center'>Loading...</h1>
    );
}

export default App;
