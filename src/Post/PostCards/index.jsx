import React from "react"
import "./index.css"

export default function PostsCard({ posts ,user}){
    //console.log(p)
    return(
        <div className="posts-card">
        <p className="text-status">
            {posts.status}
        </p>
        <p className="time-stamp">
            {posts.timestamp}
        </p>
        <p className="text-status">
            {user}
        </p>

        </div>
    )
}