// import { useEffect,useState } from "react";
import styled from "styled-components";
import PostModal from "./PostModal"
import {useEffect, useState } from "react";
import { connect } from "react-redux";
import { getArticleAPI } from "../actions";
import ReactPlayer from "react-player";
const Main = (props) => {
  const[show,setShow]=useState("close")

  useEffect(()=>{
    props.getArticles();
  },[]);
  const handleClick=(e)=>{
    e.preventDefault();
    if(e.target!==e.currentTarget)
    {
      return;
    }
    switch(show)
    {
      case "open":
        setShow("close")
        break;
        case "close":
          setShow("open")
        break;
        default:
          setShow("close")
          break;  
    }
  }
  return (
    <>
    {
      props.articles.length===0?
      <p>There are no articles</p>
      :
    <Container>
        
        <ShareBox>
        <div>
        {props.user&&props.user.photoURL?(
          <img src={props.user.photoURL} />
        ):(<img src="/images/user.svg" alt=""/>)}
           <button onClick={handleClick} disabled={props.loading?true:false}>Start a post</button>
        </div>

        <div>
          <button>
            <img style={{height:"30px",width:"auto"}} src="/images/photo-icon.png" alt="" />
            <span>Photo</span>
          </button>

          <button>
            <img style={{height:"30px",width:"auto"}} src="/images/video-icon.png" alt="" />
            <span>Video</span>
          </button>

          <button>
            <img style={{height:"30px",width:"auto"}} src="/images/event-icon.png" alt="" />
            <span>Event</span>
          </button>

          <button>
            <img style={{height:"30px",width:"auto"}} src="/images/article-icon.png" alt="" />
            <span>Write article</span>
          </button>
        </div>
        </ShareBox>
        <Content>
          {props.loading && <img src="/images/spin_Loader.webp"/>}
        {props.articles.length>0&& props.articles.map((article,key)=>(
          <Article key={key}>          
          <SharedActor>
            <a>
              <img src={article.actor.image} alt="" />
              <div>
                <span>{article.actor.title}</span>
                <span>{article.actor.description}</span>
                <span>{article.actor.date.toDate().toLocaleDateString()}</span>
              </div>
            </a>
            <button>
              <img src="/images/ellipsis.svg" alt="" />
            </button>
          </SharedActor>
          <Description>
          {article.description}
            <SharedImage>
              <a>
                {/* <img src="https://www.pexels.com/photo/674010/download/" alt="" /> */}
                {
                  !article.sharedImg&&article.video?<ReactPlayer width={'100%'} url={article.video}/>
                :
                (article.sharedImg&&<img src={article.sharedImg}/>)}
              </a>
            </SharedImage>
            <SocialCount>
              <li>
                <button>
                  <img src="https://static-exp1.licdn.com/sc/h/d310t2g24pvdy4pt1jkedo4yb" alt="" />
                  <img src="https://static-exp1.licdn.com/sc/h/5thsbmikm6a8uov24ygwd914f" alt="" />
                  <span>
                    75
                  </span>
                  <li>
                    <a>
                      {article.comments}
                    </a>
                  </li>
                </button>
              </li>
            </SocialCount>


           <SocialActions>
           <button>
              <img src="/images/likeImg.png" alt="" />
              <span>Like</span>
            </button>
            <button>
              <img src="/images/commentImg.png" alt="" />
              <span>Comment</span>
            </button>
            <button>
              <img src="/images/shareImg.png" alt="" />
              <span>Share</span>
            </button>
            <button>
              <img src="/images/sendImg.png" alt="" />
              <span>Send</span>
            </button>
           </SocialActions>
          </Description>
          </Article>
))}
          </Content>
        <PostModal show={show} handleClick={handleClick}/>
    </Container>
    }
    </>
  )
}
const Container=styled.div`
grid-area: main;

`;
const CommonCard=styled.div`
text-align: center;
overflow: hidden;
margin-bottom: 8px;
background-color: #fff;
border-radius: 5px;
position: relative;
border: none;
box-shadow: 0 0 0 1px rgb(0 0 0/ 15%),0 0 0 rgba(0 0 0 /20%);

`;
const ShareBox=styled(CommonCard)`
display: flex;
flex-direction:column;
color: #958b7b;
margin: 0 0 8px;
background: white;
div{
  button{
    outline: none;
    color: rgba(0,0,0,0.6);
    font-size: 14px;
    line-height: 1.5;
    min-height: 48px;
    background: transparent;
    border: none;
    display: flex;
    align-items: center;
    font-weight: 600;
  }
  &:first-child{
    display: flex;
    align-items: center;
    padding: 8px 16px 0 16px;
    img{
    width: 48px;
    border-radius: 50%;
    margin-right: 8px;
  }
  button{
    margin: 4px 0;
    flex-grow:1;
    border-radius:35px;
    border: 1px solid rgba(0,0,0,0.15);
    border-radius: 35px;
    background-color: white;
    text-align: left;
  }
  }
  &:nth-child(2)
  {
    display: flex;
    flex-wrap:wrap;
    justify-content: space-around;
    padding-bottom:4px;
  }
  button{
    img{
      margin: 0 4px 0 -2px;
    }
    span{
      color:#70b5f9
    }
  }
  
}

`;
const Article=styled(CommonCard)`
padding: 0;
margin: 0 0 8px;
overflow: visible;


`;

const SharedActor=styled.div`
padding-right: 40px;
flex-wrap: nowrap;
padding: 12px 16px 0;
margin-bottom: 8px;
align-items: center;
display: flex;
a{
  margin-right: 12px;
  flex-grow: 1;
  overflow: hidden;
  display: flex;
  text-decoration: none;
img{
  width: 48px;
  height: 48px;
}
&>div{
  display:flex;
  flex-direction: column;
  flex-grow:1;
  flex-basis: 0;
  margin-left: 8px;
  overflow: hidden;
  span{
    text-align: left;
    &:first-child{
      font-size:14px;
      font-weight: 700;
      color: rgba(0,0,0,1);
    }
    &:nth-child(n+1)
    {
      font-size: 12px;
      color:rgba(0,0,0,0.6)
    }
  }

}
}

button{
  position: absolute;
  background: transparent;
  right: 8px;
  bottom: 28px;
  border: none;
  img{
    height: 20px;
    width: 20px;
  }
}

`;

const Description=styled.div`
padding: 0 16px;
overflow: hidden;
color:rgba(0,0,0,0.9);
font-size:14px;
text-align: left;

`;
const SharedImage=styled.div`
margin-top:8px;
width: 100%;
display: block;
position: relative;
background-color: #f9fafb;
img{
  object-fit: contain;
  width: 100%;
  height: 100%;
}

`;


const SocialCount=styled.ul`
line-height: 1.3;
display:flex ;
align-items:flex-start ;
overflow: auto;
margin: 0 16px;
padding: 8px 0;
border-bottom: 1px solid #e9e5df;
list-style: none;
li{
  margin-right: 5px;
  font-size: 12px;
}
button{
  display: flex;
  border:none;
  background-color: white;
}
`;
const SocialActions=styled.div`
align-items: center;
display: flex;
justify-content: flex-start;
margin: 0;
min-height: 40px;
padding:4px 8px;
img{
  height: 22px;
  width: auto
}
button{
  display: inline-flex;
  align-items: center;
  padding: 8px;
  color: #0a66c2;
  border:none;
  background-color: white;
  @media (min-width: 768px) {
    span{
      margin-left: 8px;
    }
    
  }
}

`;


const Content= styled.div`
text-align: center;
&>img{
    width: 30px;
}`;

const mapStateToProps=(state)=>{
  return{
    loading:state.articleState.loading,
    user:state.userState.user,
    articles: state.articleState.articles,
  }
}
const mapDispatchToProps=(dispatch)=>({
  getArticles:()=> dispatch(getArticleAPI()),
})

export default connect(mapStateToProps,mapDispatchToProps)(Main);