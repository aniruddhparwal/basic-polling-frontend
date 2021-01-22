import React, { useState } from 'react'

function Polling() {

    const [name, setName] = useState('')
    const [vote, setVote] = useState("1")
    const [time, setTime] = useState()

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(
                'http://localhost:5000/vote',
                {
                    method: "post",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        "name": name,
                        "voting_choice": vote,
                        "casted_at": time
                    })
                }
            ).then(res => res.json())

            console.log("signin response : ", response)
        } catch (err) {
            console.log("signup fetch error: ", err)
        }
        setName('')
        setTime('')
        setVote('')
    }



    return (
        <div className="polling">
            <form>
                <div>
                    Name: <input type="text" value={name} onChange={e => { setName(e.target.value) }} /></div>
                <div>
                    Vote:
                    <select name="" id="" value={vote} onChange={e => { setVote(e.target.value) }}>
                        <option value="1">Yes</option>
                        <option value="0">No</option>
                    </select>
                </div>
                <div>
                    Date: <input type="date" value={time} onChange={e => { setTime(e.target.value) }} />
                </div>
                <button onClick={onSubmit}>Submit</button>
            </form>
        </div>
    )
}

export default Polling
