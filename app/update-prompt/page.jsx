"use client";

import { useEffect, useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

import Form from '@components/Form';


export default function EditPrompt() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const promptId = searchParams.get('id')

    useEffect(() => {
      const getPromptDetails = async() => {
        const response = await fetch(`/api/prompt/${promptId}`)

        const data = await response.json();

        setPost({
          prompt: data.prompt,
          tag: data.tag
        })
      }

      if(promptId) getPromptDetails();
    
    }, [promptId])

    const [submitting, setSubmitting] = useState(false)
    const [post, setPost] = useState({
        prompt: "",
        tag: "",
    });

    const updatePrompt = async (e) => {
         e.preventDefault();
         setSubmitting(true);

        if(!promptId) return alert("Prompt ID not found!")
         try {
            const response = await fetch(`/api/prompt/${promptId}`, 
        {
            method: 'PATCH',
            body: JSON.stringify({
                prompt: post.prompt,
                tag: post.tag,
            })
        })

        if(response.ok) {
            router.push('/')
        }
         } catch (error) {
            console.log(error);
         } finally{
            setSubmitting(false)
         }
    }
  return (
    <Suspense>
      <Form
          type="Edit"
          post={post}
          setPost={setPost}
          submitting={submitting}
          handleSubmit={updatePrompt}
      />
    </Suspense>

  )
}
