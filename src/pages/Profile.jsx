import React from "react";
import {useEffect, useState} from 'react'
import appwrite from "../appwrite/config";
import {useSelector} from   "react-redux";
import {Container, PostCard} from '../components'
import {Link} from 'react-router-dom'
import { Query } from "appwrite";

function Profile() {
  const [posts, setPosts] = useState([]);
    const authStatus = useSelector((state) => state.auth.userData);
    useEffect(() => {
        if (authStatus) {
            appwrite.getPosts([Query.equal("userId", authStatus.$id)]).then((posts) => {
                if(posts) setPosts(posts.documents);
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
                            <Link to='/add-post' className='text-2xl font-bold hover:text-gray-500'>Add Posts</Link>
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

export default Profile
