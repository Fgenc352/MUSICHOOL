import './App.css';
import React, {useEffect, useState} from 'react';
import { BrowserRouter, Route, Routes, Navigate  } from "react-router-dom";




const Admin = React.lazy(()=> import('./pages/admin'))
const Login = React.lazy(()=> import('./components/login'))

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(()=>{
    const user=localStorage.getItem('admin')
    if(user) setLoggedIn(true)
  },[])
  return (
    <div>
      <BrowserRouter>
      <Routes>
      <Route exact path="/"
       element={ 
        loggedIn?<React.Suspense fallback={<div></div>}>
        <Admin />
      </React.Suspense>:<React.Suspense fallback={<div></div>}>
        <Login />
      </React.Suspense>
      }
      />
      <Route path="/Admin" element={loggedIn?<React.Suspense fallback={<div></div>}>
        <Admin />
      </React.Suspense>:<React.Suspense fallback={<div></div>}>
        <Login />
      </React.Suspense>} />
      </Routes>
      </BrowserRouter>
     </div>
  );
}

export default App;
