import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import SignUp from './Components/SignUp/SignUp';
import Login from './Components/Login/Login';
import AuthProvider from './context/AuthProvider/AuthProvider';
import UserInfo from './Components/UserInfo/UserInfo';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<SignUp />} />
          <Route exact path="/signup" element={<SignUp />} />
          <Route exact path="/user" element={<UserInfo />} />
          <Route exact path="/signin" element={<Login />} />

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
