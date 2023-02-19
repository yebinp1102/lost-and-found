import React, {useState} from 'react'
import styled from 'styled-components'
import { conditions } from '../Section/Datas';

const RadioFilterBox = ({handleFilters}) => {
  const [Radioclicked, setRadioClicked] = useState(false);
  const [value, setValue] = useState(0);

  const handleChange = (e) => {
    setValue(e.target.value)
    handleFilters(e.target.value)
    console.log(value)
  }
  return(
    <RadioBoxWrap>
    <BoxHeader onClick={()=>setRadioClicked(!Radioclicked)}>
      <span>분류</span>
      <span>{Radioclicked ? "-" : "+"}</span>
    </BoxHeader>
    <BoxSection className={Radioclicked ? "show pd-1" : "none"}>
      <ul>
        {conditions.map((list)=>(
          <li key={list._id}>
            <input
              type='radio'
              value={list._id}
              checked={value === list._id ? true : false}
              onChange={handleChange}
            />
            <span>{list.name}</span>
          </li>
        ))}
      </ul>
    </BoxSection>
  </RadioBoxWrap>
  )
}

export default RadioFilterBox

const RadioBoxWrap = styled.div`
  flex: .5;
  margin-top: 20px;
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