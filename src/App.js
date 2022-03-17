import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import Header from "./components/Header/Header"
import Home from "./pages/Home";
import { useEffect, useState } from "react";
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Post from "./pages/Post";
import api from './api/posts'


function App() {
  const [search, setSearch] = useState('');
  const [posts, setPosts] = useState([]);

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

  return (
    <BrowserRouter>
      <Header />
      <Navbar 
        search={search}
        setSearch={setSearch}
      />
      <Routes>
        <Route path="/" element={<Home posts={posts} />} />
        <Route 
          path="/post" 
          element={<Post/>} 
        />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
