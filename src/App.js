import { useActionCreator } from 'helpers/actionCreator';
import React,{ Suspense, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postFetch } from 'store/slices/postSlice';
import InfiniteScroll from 'react-infinite-scroll-component';
import './App.css';

function Exm(){
  
  useEffect(()=>{
    console.log('RENDER EXM')
  },[])
  return (
    <h1>Hello</h1>
  )
}
const AboutPageChunk = React.lazy(()=> import('./pages/AboutPage'));
const NewsPageChunk = React.lazy(()=> import('./pages/NewsPage'));
const MainPageChunk = React.lazy(()=> import('./pages/MainPage'));
function App() {
  const dispatch = useDispatch()
  const getPostsCreator = useActionCreator(postFetch)
  const posts = useSelector(state => state.post.post)

  const [value, setValue] = useState('')
  const [value2, setValue2] = useState('')
  const [more, setMore] = useState(true)

  function infiniteGetPosts(){
    if(posts.length > 30){
      setMore(false)
      return
    }
    const params = {
      _limit: 10,
      page: 1
    }
    getPostsCreator(params)
  }

  // const loginUser = () => {
  //   const body = {
  //     username: value,
  //     password: value2
  //   }
  //   dispatch(authThunkToken(body))
  // }

  // const getPostsFetch = () => {
  //   dispatch(postThunk())
  // }

  return (
    <Suspense fallback={<h1>Faiting...</h1>}>
      <div className="App">
        <Exm/>
        <div className='page_wrapper'>
          <input value={value} onChange={(e) => setValue(e.target.value)}/>
          <input value={value2} onChange={(e) => setValue2(e.target.value)}/>
          {/* <button onClick={loginUser}>AUTH</button> */}
        </div>
        <button onClick={infiniteGetPosts}>get posts</button>
        <InfiniteScroll
          dataLength = {posts.length}
          next = {infiniteGetPosts}
          hasMore= {more}
        >
          {posts?.map((item) =>
            <div key={item.id} className="itemCard">
              {item.title}
            </div>)}
        </InfiniteScroll>
        <AboutPageChunk/>
        <NewsPageChunk/>
        <MainPageChunk/>
      </div>
    </Suspense>
  );
}

export default App;
