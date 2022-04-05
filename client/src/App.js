import Footer from "./components/Footer/Footer";
import SearchBar from "./components/Navbar/Search";
import Header from "./components/Header/Header"
import Home from "./pages/Home";
import Post from "./pages/Post"
import { useEffect, useState } from "react";
import { Routes, Route, useNavigate} from 'react-router-dom'
import axios from 'axios'
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
  const [postTitle, setPostTitle] = useState('');
  const [postDetail, setPostDetail] = useState('');
  const [editTitle, setEditTitle] = useState('');
  const [editDetail, setEditDetail] = useState('');


  const [userList, setUserList] = useState([]);

  const navigate = useNavigate();


  // useEffect(()=>{
  //   const filteredResult = posts.filter((post)=> 
  //     ((post.detail).toLowerCase()).includes(search.toLowerCase()) ||
  //     ((post.title).toLowerCase()).includes(search.toLowerCase()));
  //     // 최신 글이 위로 올라오도록 하기 위해서 reverse 메소드 사용.
  //     setFilterData(filteredResult.reverse());
  // },[posts, search])

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const id = posts.length ? posts[posts.length-1].id + 1 : 1;
  //   const time = new Date().toLocaleString();
  //   const newPost = {id, title: postTitle, time, detail: postDetail}
  //   try{
  //     const res = await axios.post('/api/users/posts', newPost);
  //     const allPosts = [...posts, res.data];
  //     setPosts(allPosts);
  //     setPostDetail('');
  //     setPostTitle('');
  //     navigate('/');
  //   }catch(err){
  //     console.log(`Error : ${err.message}`);
  //   }
  // }

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
            element={
              <Post 
                // handleSubmit={handleSubmit}
                postTitle={postTitle}
                setPostTitle={setPostTitle}
                postDetail={postDetail}
                setPostDetail={setPostDetail}
              />
            } 
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
