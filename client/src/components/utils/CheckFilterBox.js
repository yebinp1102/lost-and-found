import React, { useState } from 'react'
import styled from 'styled-components'

const CheckFilterBox = ({lists, handleFilters}) => {
  const [clicked, setClicked] = useState(false);
  const [checked, setChecked] = useState([]);

  const handleToggle = (idx) => {
    const currentIdx = checked.indexOf(idx)
    const newChecked = [...checked]
    if(currentIdx === -1) newChecked.push(idx)
    else newChecked.splice(currentIdx, 1)
    setChecked(newChecked)
    handleFilters(newChecked)
  }
 return (
    <CheckBoxWrap>
      <BoxHeader onClick={()=>setClicked(!clicked)}>
        <span>지역</span>
        <span>{clicked ? "-" : "+"}</span>
      </BoxHeader>
      <BoxSection className={clicked ? "show pd-1" : "none"}>
        <ul>
          {lists.map((list)=>(
            <li key={list._id}>
              <input
                type="checkbox"
                checked={checked.indexOf(list._id) === -1 ? false : true} 
                onChange={()=>handleToggle(list._id)} 
              />
              <span>{list.name}</span>
            </li>
          ))}
        </ul>
      </BoxSection>
    </CheckBoxWrap>
  )
}

export default CheckFilterBox

const CheckBoxWrap = styled.div`
  flex: .5;
  border-radius: 5px;
  border: 1px solid #ddd;
  
  .show{
    height: auto;
    max-height: 999px;
    transition: all .1s;
  }
  .none{
    height: 0;
    transition: all .1s;
  }
`;

const BoxHeader = styled.div`
  background-color: #eee;
  padding: 5px 10px;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const BoxSection = styled.div`
  overflow: hidden;
  max-height: 0;
  transition: all .1s;
  padding-left: 1rem;


  ul{
    display: flex;
    flex-wrap: wrap;
    font-size: 13px;

    li{
      align-items: center;
      display: flex;
      margin-right: 10px;
      margin-top: 5px;

      input{
        margin-right: 5px;
      }
    }
  }
`;