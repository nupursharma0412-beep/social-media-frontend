import React, { useEffect } from 'react'
import "../style/feed.scss"
import Post from '../components/Post'
import { usePost } from '../hook/userPost'
import Loading from '../../shared/components/Loading'

const Feed = () => {
    const { feed, handleGetFeed, loading } = usePost()

    useEffect(() => {
        handleGetFeed()
    }, [])

    if (loading || !feed) {
        return <Loading />
    }

    return (
        <section className='feed-page'>
            <div className="feed-header">
                <div>
                    <h2>Home</h2>
                    <p>See what’s happening right now.</p>
                </div>
            </div>

            <div className="feed">
                <div className="posts">
                    {feed.map((post) => (
                        <Post key={post._id} user={post.user} post={post} />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Feed