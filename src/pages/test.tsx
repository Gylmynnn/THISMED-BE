import { FormEvent, useState } from 'react'
import { useRouter } from 'next/router'

export default function Testing() {
  const router = useRouter()

  const [data, setData] = useState([]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()


    await fetch('/api/post', {
        method: 'GET',
        // credentials: 'include', // Kirim cookies bersama dengan request
      })
      .then((res) => res.json())
      .then((res) => setData(res.data))
      .catch((error) => console.error('Error:', error));


    // if (response.ok) {
    //   router.push('/profile')
    // } else {
    //   // Handle errors
    // }
  }

  return (
    <form onSubmit={handleSubmit} className='flex flex-col w-1/2 mx-auto pt-32 gap-6'>
      <button type="submit">Login</button>
      <div>
        {data.map((item : any) => (
            <div key={item.id}>
                <p>{item.image}</p>
                <p>{item.createdAt}</p>
                <p>{item.updatedAt}</p>
                <p>{item.title}</p>
            </div>
        ))}
      </div>
    </form>
  )
}
