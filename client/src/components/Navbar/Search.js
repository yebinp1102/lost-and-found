import React from 'react'
import styled from 'styled-components';

const SearchBar = ({search, setSearch, isLoggedIn}) => {


  return (
    <Search>
      <form>
        <label htmlFor='searchItem' />
        <input
          id='searchItem'
          type='text'
          placeholder='찾는 물건을 입력하세요...'
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
        />
      </form>
    </Search>
  )
}

export default SearchBar

const Search = styled.nav`
  padding: 20px;

  form{
    input{
    width: 100%;
    padding: 15px;
    outline: none;
    font-size: 18px;
    border-radius: 5px;
    }
  }
`;