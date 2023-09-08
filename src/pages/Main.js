import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { styled } from 'styled-components'
import { NavLink } from 'react-router-dom';

const Content = styled.div`
  background-color: ${(props) => props.theme.colors.BgColor};
  width: 100%;
  padding: 120px 0 50px 0;
  overflow: hidden;
`
const ContentWrap = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  gap: 20px 1.2%;
  padding: 0 2%;
`
const ContentItem = styled.div`
  background-color: #fff;
  flex-basis: 32.5%;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 20px;
  box-sizing: border-box;
  cursor: pointer;
  white-space: break-spaces;// 줄이길어지면 자동으로 줄바꿈
  img{width:100%; display:block; margin-bottom:24px;}
  h3{margin-bottom:24px;}
  li{line-height : 1.5; margin-bottom: 6px;}
  @media screen and (max-width:1200px){
    flex-basis: 49%;
  }
  @media screen and (max-width: 640px){
    flex-basis: 100%;
  }
`
// https://apis.data.go.kr/6260000/FestivalService/getFestivalKr?serviceKey=HhUuyRMLOZkVbqM8OklwqPpavpWqFLKka4nzu3rxdPuy8lBMBSOlLLkEnqgV5hACLkHWFIKg%2FijiebzwMKH9Nw%3D%3D&pageNo=1&numOfRows=10&resultType=json

// useEffect
// useState
// axios
// import용
const Category = styled.div`
  width: 100%;
  margin-bottom: 1.2%;
  ul{
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    li{
      border: 1px solid #ddd;
      padding: 5px 20px;
      border-radius: 5px;
      cursor: pointer;
      background-color: ${(props) => props.theme.colors.BgColor};
      color: #e9e9e9;
      &.on{
        background-color: violet;
        font-weight: bold;
        color: #fff;
      }
    }
  }
`
const Pagination = styled.div`
  background-color: ${(props) => props.theme.colors.BgColor};
  padding: 20px;
  border-radius: 5px;
  border: 1px solid #ddd;
  ul{
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    column-gap: 20px;
    justify-content: center;
    align-items: center;
    li{
      border: 1px solid #ddd;
      padding: 5px 20px;
      border-radius: 5px;
      cursor: pointer;
      background-color: #fff;
      padding: 5px 20px;
      &.on{
        background-color: violet;
        font-weight: bold;
        color: #fff;
      }
    }
  }
`




function Main() {

  const [data, setData] = useState();
  const [allData, setAllData] = useState();
  const list = 10;
  const [page, setpage] = useState(1);
  const [totalCnt, setTotalCnt] = useState(0);
  const [gugun, setGugun] = useState("전체");
  const pagination = 5;
  const totalPage = Math.floor(totalCnt / list);
  let startPage, endPage ;
  const currentBlock = Math.ceil(page / pagination)
  // ceil - 소수점을 올립니다.
  // 현재 페이지가 1 / 5 > 0.2 1 2 3 4 5
  startPage = (currentBlock - 1) * pagination + 1;
  endPage = startPage + pagination - 1;

  if(endPage > totalPage){
    endPage = totalPage;
  }
  const PrevBlock = () =>{
    if(startPage > 1){
      setpage(startPage - pagination);
    }
  }
  const NextBlock = () =>{
    if(endPage < totalPage){
      setpage(startPage + pagination)
    }
  }



  const pageList = [];
  for(let i = startPage; i <= endPage; i++){
    pageList.push(
      <li key={i} className={(page === i ? "on" : "")} onClick={()=>{
        setpage(i)
      }}>
        {i}
      </li>
    )
  }
  

  useEffect(()=>{
    axios.get(`https://apis.data.go.kr/6260000/FestivalService/getFestivalKr?serviceKey=${process.env.REACT_APP_APIKEY}&pageNo=1&numOfRows=100&resultType=json
    `)
    .then(function(res){
        setAllData(res.data.getFestivalKr.item);
      })
    },[])
    useEffect(()=>{
      axios.get(`https://apis.data.go.kr/6260000/FestivalService/getFestivalKr?serviceKey=${process.env.REACT_APP_APIKEY}&pageNo=${page}&numOfRows=10&resultType=json
      `)
      .then(function(res){
          setData(res.data.getFestivalKr.item);
          setTotalCnt(res.data.getFestivalKr.totalCount);
        })
      },[page])
    // 서비스키 부터 &까지 잘래냅니다
    // console.log(data)
    
  const FilterData = data && data.filter(e =>{
    return gugun === "전체" || gugun === e.GUGUN_NM
  })
  const FilterGugun = [...new Set(allData && allData.map(e=>e.GUGUN_NM))]
  // console.log(FilterGugun)
  const [isActive, setIsActive] = useState(-1);

  return (
    <>
      
      <Content>
        <Category>
        <div onClick={()=>{
          setIsActive(isActive === "on" ? "off" : "on")
        }}>인덱스 번호 : -1</div>
          {
          Array(5).fill().map((e,i)=>{
            return (
              <div style={{color : isActive === "on" ? "orange" : "blue"}} key={i}>{`인덱스 번호 : ${i}`}</div>
            )
          })
        }
          <ul>
            <li className={isActive === -1 ? 'on' : ''} onClick={
                    ()=>{
                      // setIsActive(isActive === false ? true : false)
                      setIsActive(-1);
                      setGugun("전체");
                      // true false 일 때만 딱한번 사용할수 있습니다.
                    }
                  }>전체</li>
            {data && FilterGugun.map((e,i)=>{
              return (
                  
                  <li className={isActive === i ? 'on' : ''} onClick={
                    ()=>{
                      // setIsActive(isActive === false ? true : false)
                      setIsActive(i);
                      setGugun(e);
                      // true false 일 때만 딱한번 사용할수 있습니다.
                    }
                  } key={i}>{e}</li>
                
              )
            })}
          </ul>
        </Category>
        <ContentWrap>
          
          {
            data && FilterData.map((e,i)=>{
              return (
                <ContentItem key={i}>
                  {/* e.UC_SEQ 고유코드입니다 */}
                  <NavLink to={`detail/${e.UC_SEQ}`}
                    state={
                      e
                    }
                    >
                      {/* data.js반복문을 돌려 e값으로 데이터를 담고 있으니 e를 쓰면됩니다. */}
                  <h3>{e.TITLE}</h3>
                  <img src={e.MAIN_IMG_THUMB} alt={e.MAIN_TITLE} />
                  <ul>
                    <li>구군 : {e.GUGUN_NM}</li>
                    <li>운영 및 시간 : {e.USAGE_DAY_WEEK_AND_TIME}</li>
                    {
                      e.MIDDLE_SIZE_RM1 !== "" && 
                      <li>편의 시설 : {e.MIDDLE_SIZE_RM1}</li>
                    }
                    <li>이용요금 : {e.USAGE_AMOUNT}</li>
                    <li>교통편 : {e.TRFC_INFO}</li>
                    <li>주요장소 : {e.MAIN_PLACE}</li>
                  </ul>
                  </NavLink>
                </ContentItem>
              )
            })
          }
        </ContentWrap>
      </Content>
      <Pagination>
        <ul>
          <li onClick={PrevBlock}>이전</li>
          {pageList}
          <li onClick={NextBlock}>다음</li>
        </ul>
      </Pagination>
    </>
  )
}

export default Main