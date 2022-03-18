import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import Header from "./components/Header/Header"
import Home from "./pages/Home";
import Post from "./pages/Post"
import { useEffect, useState } from "react";
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import api from './api/posts'


function App() {
  const [search, setSearch] = useState('');
  const [posts, setPosts] = useState([]);
  const [filterData, setFilterData] = useState([]);

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

  return (
    <BrowserRouter>
      <Header />
      <Navbar 
        search={search}
        setSearch={setSearch}
      />
      <Routes>
        <Route path="/" element={<Home posts={filterData} />} />
        <Route path="/post" element={<Post />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
