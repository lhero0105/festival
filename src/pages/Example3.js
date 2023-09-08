import React, { useState } from 'react'

import Example3_ from '../components/Example3'
import { styled } from 'styled-components';

function Example3() {
    
    const [data, setData] = useState(Example3_);
    const [animal, setAnimal] = useState("전체");
    const [gender, setGender] =useState("전체");

    const FilterAnimal = data.filter(e =>{
        
        let isAnimal = animal === "전체" || e.animal === animal;
        let isGender = gender === "전체" || e.gender === gender;
        return isAnimal && isGender

        // return (animal === "전체" ? e.animal : e.animal === animal);

        // if(animal === "전체"){
            return e.animal
        // }else{
            return e.animal === animal;
        // }
    })
    const filterCate = [...new Set(data.map(e => e.animal))];
    const filterGender = [...new Set(data.map(e => e.gender))];
  return (
    <>
        <div>
            <ul>
                <li>전체</li>
                {
                    filterCate.map((e,i)=>{
                        return (
                            <li key={i} onClick={()=>{setAnimal(e)}}>{e}</li>
                        )
                    })
                }
            </ul>
            <ul>
                <li>전체</li>
                {
                    filterGender.map((e,i)=>{
                        return (
                            <li key={i} onClick={()=>{setGender(e)}}>{e}</li>
                        )
                    })
                }
            </ul>
        </div>
        <div>
            <ul>
                {
                    FilterAnimal.map((e,i)=>{
                        return(
                            // 데이터 한줄만 쓸 때 소괄호 안써도 됨
                            <li key={i}>{e.animal} - {e.gender} - {e.height}</li>
                        )
                    })
                }
            </ul>
        </div>
    </>
  )
}

export default Example3