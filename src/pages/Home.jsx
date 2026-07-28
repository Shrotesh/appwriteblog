import React, {useEffect, useState} from 'react'
import appwriteService from '../appwrite/config'
import {Container, PostCard} from '../components'
 import {useSelector} from 'react-redux'
function Home() {
  const [posts, setPosts] = useState([])
  
  //Chai or code :-
  // useEffect(() => {
  //   appwriteService.getPosts().then((posts) => {
  //     if(posts){
  //       setPosts(posts.documents)
  //     }
  //   })
  //   .catch((error) => {
  //     console.error(error);
  //   });
  // }, [])

  //It will Refesh Home page after Logout and won't show posts if user is not logged in
 
  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
      if (authStatus) {
          appwriteService.getPosts().then((posts) => {
              if (posts) setPosts(posts.documents);
          });
      } else {
          setPosts([]);
      }
  }, [authStatus]);
  
  if(posts.length === 0){
    return (
        <div className='w-full py-8 mt-4 text-center'>
            <Container>
                <div className='flex fle-wrap'>
                    <div className='p-2 w-full'>
                        <h1 className='text-2xl font-bold hover:text-gray-500'>Login to read posts</h1>
                    </div>
                </div>
            </Container>
        </div>
    )
  }

  return (
    <div className='w-full py-8'>
        <Container>
            <div className='flex flex-wrap'>
                {posts.map((post) => (
                    <div key={post.$id} className='p-2 w-full sm:w-1/2 lg:w-1/4'>
                        <PostCard { ...post } />
                    </div>
                ))}
            </div>
        </Container>
    </div>
  )
}

export default Home