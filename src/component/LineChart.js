import React, { useEffect, useState } from 'react'
// import { Chart } from 'react-charts'
import { Line } from "react-chartjs-2";

function LineChart() {



    const [dateData, setDateData] = useState([])
    const [trueVote, setTrueVote] = useState([])
    const [falseVote, setFalseVote] = useState([])
    const [valuesArr, setValuesArr] = useState([])
    const [dataAva, setDataAva] = useState(false)

    function onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
    }
    useEffect(async () => {
        try {
            const response = await fetch(
                'http://localhost:5000/counts?voting_choice=true',
            ).then(res => res.json())

            console.log("Result response : ", response)
            response.map(eachdata => {
                trueVote.push(eachdata.count)
                valuesArr.push(eachdata.casted_at)
                console.log("True Push Val:>", eachdata.count)
            })
            // setData(response)
            console.log("Truedata:", trueVote)
        } catch (err) {
            console.log("True fetch error: ", err)
        }

        try {
            const response = await fetch(
                'http://localhost:5000/counts?voting_choice=false',
            ).then(res => res.json())

            console.log("False response : ", response)
            response.map(eachdata => {
                falseVote.push(eachdata.count)
                valuesArr.push(eachdata.casted_at)
                console.log(" False Push Val:>", eachdata.count)
            })
            console.log("Falsedata:", falseVote)
            console.log("ARR Data", valuesArr)
            console.log("Filter ARR Data", valuesArr.filter(onlyUnique))
            setValuesArr(valuesArr.filter(onlyUnique))
            console.log("Filter ARR Data vaaa", valuesArr.filter(onlyUnique))

        } catch (err) {
            console.log("false fetch error: ", err)
        }


        console.log("eachdata", trueVote, falseVote)
        if (trueVote.length != 0 && falseVote.length != 0) {
            setDataAva(true)
        }
    }, [])



    const data = {
        labels: valuesArr,
        datasets: [
            {
                label: "True",
                data: trueVote,
                // data: [10, 53, 85, 41, 44, 65],
                fill: false,
                backgroundColor: "rgba(75,192,192,0.2)",
                borderColor: "rgba(75,192,192,1)"
            },
            {
                label: "False",
                data: falseVote,
                // data: [36, 25, 35, 51, 54, 76],
                fill: false,
                borderColor: "#742774"
            }
        ]
    };
    const options = {
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true,
                        precision: 0,
                    }
                }
            ]
        }
    };

    return (
        <div>
            {dataAva && <Line data={data} options={options} />}
        </div>
    )
}

export default LineChart
