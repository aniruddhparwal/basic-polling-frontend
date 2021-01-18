import React, { useEffect, useState } from 'react'

function Dashboard() {

    const [data, setData] = useState([])

    useEffect(async () => {
        try {
            const response = await fetch(
                'http://localhost:5000/data',
            ).then(res => res.json())

            console.log("signin response : ", response)
            setData(response)
            console.log("data", data)
        } catch (err) {
            console.log("signup fetch error: ", err)
        }
    }, [])
    return (
        <div className="dashboard">
            <table>
                <tr>
                    <th>Name</th>
                    <th>Vote</th>
                    <th>Time</th>
                </tr>
                {data.map((each) => (
                    <tr key={each.id}>
                        <td>{each.name}</td>
                        <td>{each.voting_choice}</td>
                        <td>{each.casted_at}</td>
                    </tr>
                ))}
            </table>
        </div>
    )
}

export default Dashboard
