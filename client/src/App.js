import Header from "./components/Header/Header"
import Home from "./pages/Home";
import Post from "./pages/Post"
import { useState } from "react";
import { Routes, Route, useNavigate} from 'react-router-dom'
import DetailPage from "./pages/DetailPage";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Auth from "./hoc/Auth";
import { UserContext } from "./context/UserContext";
import ListPage from "./pages/ListPage";

function App() {
  const [userList, setUserList] = useState([]);

  return (
    <div className="App">
      <Header />
      <UserContext.Provider value={{userList, setUserList}}>
        <Routes>
          <Route path="/" element={Auth(Home, null)} />
          <Route path="/post" element={Auth(Post, true)} />
          <Route path="/login" element={Auth(Login, false)} />
          <Route path="/sign-up" element={Auth(SignUp, false)}/>
          <Route path='/item/:itemId' element={Auth(DetailPage, null)} />
          <Route path='/user/list' element={Auth(ListPage, true)} />
        </Routes>
      </UserContext.Provider>
    </div>
  );
}

export default App;
