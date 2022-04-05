import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header"
import Home from "./pages/Home";
import Post from "./pages/Post"
import { useState } from "react";
import { Routes, Route, useNavigate} from 'react-router-dom'
import DetailPage from "./pages/DetailPage";
import EditPost from "./pages/EditPost";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Auth from "./hoc/Auth";

import { UserContext } from "./context/UserContext";

function App() {
  const [search, setSearch] = useState('');
  const [posts, setPosts] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [editTitle, setEditTitle] = useState('');
  const [editDetail, setEditDetail] = useState('');


  const [userList, setUserList] = useState([]);

  const navigate = useNavigate();

  // const handleDelete = async (id) => {
  //   try{
  //     await axios.delete(`/api/users/posts/${id}`);
  //     const postsList = posts.filter(post=>post.id!==id);
  //     setPosts(postsList);
  //     navigate('/');
  //   }catch(err){
  //     console.log(`Err : ${err.message}`);
  //   }
  // }

  // const handleEdit = async (id) => {
  //   const time = new Date().toLocaleString();
  //   const updatedPost = {id, title: editTitle, time, detail: editDetail};
  //   try{
  //     const res = await axios.put(`/api/user/posts/${id}`, updatedPost);
  //     const postsList = posts.map(post=> post.id === id ? {...res.data} : post);
  //     setPosts(postsList);
  //     setEditDetail('');
  //     setEditTitle('');
  //     navigate('/');
  //   }catch(err){
  //     console.log(`Err : ${err.message}`);
  //   }
  // }

  return (
    <div className="App">
      <Header />
      <UserContext.Provider value={{userList, setUserList}}>
        <Routes>
          <Route path="/" element={Auth(Home, null)} />
          <Route 
            path="/post" 
            element={Auth(Post, true)} 
          />
          <Route 
            path="/post/:id" 
            element={
              <DetailPage 
                posts={posts} 
                // handleDelete={handleDelete} 
              />
            } 
          />
          <Route
            path="/edit/:id"
            element={
              <EditPost 
                posts={posts}
                // handleEdit={handleEdit}
                editTitle={editTitle}
                setEditTitle={setEditTitle}
                editDetail={editDetail}
                setEditDetail={setEditDetail}
              />
            }
          />
          <Route path="/login" element={Auth(Login, false)} />
          <Route path="/sign-up" element={Auth(SignUp, false)}/>
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </UserContext.Provider>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
