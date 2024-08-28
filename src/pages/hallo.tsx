

export default function HalloWorld() {

    async function handleSubmit() {


        const response = await fetch('http://localhost:3000/api/intraction', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1AZ21haWwuY29tIiwiaWF0IjoxNzI0ODU2NDIzfQ.b7wgXJshOx1Vw9hpF0trjGR9z3boVv6cnmbpK9avyyU',
            },
        })
        const res = await response.json();

        console.log(res.data);
    }

    return (
        <button onClick={handleSubmit}>hallo world</button>
    )
}
