"use client"

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'

import Profile from '@components/Profile'

export default function UserProfile({ params }) {

    const searchParams = useSearchParams()
    const userName = searchParams.get("name");

    const [userPosts, setUserPosts] = useState([])

    useEffect(() => {
        const fetchPosts = async () => {
          const response = await fetch(`/api/users/${params?.id}/posts`)
          const data = await response.json();
    
          setUserPosts(data)
        }

        if(params?.id) fetchPosts()
    }, [params.id]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Profile
          name={userName}
          desc={`Welcome to ${userName}'s personalized profile page`}
          data={userPosts}
      />
    </Suspense>
  )
}
