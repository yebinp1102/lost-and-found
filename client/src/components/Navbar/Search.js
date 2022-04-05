import React from 'react'
import styled from 'styled-components';

const SearchBar = ({search, setSearch}) => {


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

  form{
    input{
      width: 400px;
      border: 1px solid #ddd;
      padding: 15px;
      outline: none;
      font-size: 12px;
      border-radius: 5px;
    }
  }
`;