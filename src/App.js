import React, {useContext} from 'react';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';
import AuthContext from './store/auth-context';

function App() {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  // useEffect(()=>{
  //   const loggedInfoUsers=localStorage.getItem('isLoggedIn')
  //   if(loggedInfoUsers==='1'){
  //     setIsLoggedIn(true);
  //   }
  // },[])

  const ctx= useContext(AuthContext)

  // const loginHandler = (email, password) => {
  //   // We should of course check email and password
  //   // But it's just a dummy/ demo anyways
  //   setIsLoggedIn(true);
  //   localStorage.setItem('isLoggedIn','1');
  // };

  // const logoutHandler = () => {
  //   localStorage.removeItem("isLoggedIn");
  //   setIsLoggedIn(false);
  // };

  return (
    
    <React.Fragment>
      <MainHeader/>
      <main>
        {!ctx.isLoggedIn && <Login  />}
        {ctx.isLoggedIn && <Home />}
      </main>
    </React.Fragment>
  
  );
}

export default App;