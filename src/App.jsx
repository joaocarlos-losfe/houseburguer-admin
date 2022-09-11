import { useState } from 'react'
import './App.css'
import { MainPageContainer } from './components/MainPageContainer'
import { NavBar } from './components/Navbar'
import { NavigationContext } from './context/NavigationContext'
import { PopupContext } from './context/PopupContext'
import { LoginPage } from './Pages/Login'

function App() {

  const [userLoginState, setLoginState] = useState(false);

  return (
    <>
    {
      !userLoginState ? <LoginPage setLoginState={setLoginState} />
      :
      <div className="App">
        <NavigationContext>
         <NavBar/>
          <PopupContext>
           <MainPageContainer/>
          </PopupContext>
        </NavigationContext>
     </div>
    }
    </>
  )
}

export default App
