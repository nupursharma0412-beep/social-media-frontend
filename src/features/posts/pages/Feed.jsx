import React, { useEffect } from 'react'
import "../style/feed.scss"
import Post from '../components/Post'
import { usePost } from '../hook/userPost'
import NavBar from '../../shared/components/NavBar'
import Loading from '../../shared/components/Loading'
const Feed = () => {
    const {feed , handleGetFeed ,loading} = usePost()

    useEffect(()=>{
        handleGetFeed()
    },[])
    if(loading || !feed){
        return (<Loading/>)
    }
    console.log(feed);
    

    return (
        <main className='feed-page'>
            <NavBar/>
            <div className="feed">
                <div className="posts">
                    {feed.map(post=>{
                        return <Post user={post.user} post={post}/>
                    })}
                </div>
            </div>
        </main>
    )
}

export default Feed