import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import Header from "./components/Header/Header"
import Home from "./pages/Home";
import { useState } from "react";
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Post from "./pages/Post";


function App() {
  const [search, setSearch] = useState('');
  return (
    <BrowserRouter>
      <Header />
      <Navbar 
        search={search}
        setSearch={setSearch}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post" element={<Post />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
