import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import Header from "./components/Header/Header"
import Home from "./pages/Home";
import Post from "./pages/Post"
import { useEffect, useState } from "react";
import { Routes, Route, useNavigate} from 'react-router-dom'
import api from './api/posts'
import DetailPage from "./pages/DetailPage";

function App() {
  const [search, setSearch] = useState('');
  const [posts, setPosts] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [postTitle, setPostTitle] = useState('');
  const [postDetail, setPostDetail] = useState('');
  const navigate = useNavigate();

  useEffect(()=>{
    const fetchPosts = async () => {
      try{
        const res = await api.get('/posts');
        setPosts(res.data);
      }catch(err){
        console.log(`Error : ${err.message}`);
      }
    }
    fetchPosts();
  },[])

  useEffect(()=>{
    const filteredResult = posts.filter((post)=> 
      ((post.detail).toLowerCase()).includes(search.toLowerCase()) ||
      ((post.title).toLowerCase()).includes(search.toLowerCase()));
      // 최신 글이 위로 올라오도록 하기 위해서 reverse 메소드 사용.
      setFilterData(filteredResult.reverse());
  },[posts, search])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = posts.length ? posts[posts.length-1].id + 1 : 1;
    const time = new Date().toLocaleString();
    const newPost = {id, title: postTitle, time, detail: postDetail}
    try{
      const res = await api.post('/posts', newPost);
      const allPosts = [...posts, res.data];
      setPosts(allPosts);
      setPostDetail('');
      setPostTitle('');
      navigate('/');
    }catch(err){
      console.log(`Error : ${err.message}`);
    }
  }

  const handleDelete = async (id) => {
    try{
      await api.delete(`/posts/${id}`);
      const postsList = posts.filter(post=>post.id!==id);
      setPosts(postsList);
      navigate('/');
    }catch(err){
      console.log(`Err : ${err.message}`);
    }
  }


  return (
    <div className="App">
      <Header />
      <Navbar 
        search={search}
        setSearch={setSearch}
      />
      <Routes>
        <Route path="/" element={<Home posts={filterData} />} />
        <Route 
          path="/post" 
          element={
            <Post 
              handleSubmit={handleSubmit}
              postTitle={postTitle}
              setPostTitle={setPostTitle}
              postDetail={postDetail}
              setPostDetail={setPostDetail}
             />
          } 
        />
        <Route path="/post/:id" element={<DetailPage posts={posts} handleDelete={handleDelete} />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
