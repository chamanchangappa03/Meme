import React from "react"
import "./index.css"

export default function PostsCard({ posts }){
    return(
        <div className="posts-card">
<p className="text-status">
    {posts.status}
</p>
        </div>
    )
}