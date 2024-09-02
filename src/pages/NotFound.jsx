import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFound() {
    return(
        <div>
            <h1>404 Not Found Page</h1>
            <Link to={"/petAlert_deploy"}>Redirect to Home</Link>

        </div>
    )
}