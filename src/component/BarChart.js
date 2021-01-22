import React, { useEffect, useState } from 'react'
import { Bar } from 'react-chartjs-2'




function BarChart() {
    const [data, setData] = useState([])
    // var valuesArr = []
    const [valuesArr, setValuesArr] = useState([])
    const [dataAva, setDataAva] = useState(false)

    useEffect(async () => {
        try {
            const response = await fetch(
                'http://localhost:5000/results',
            ).then(res => res.json())

            console.log("Result response : ", response)
            response.map(eachdata => {
                valuesArr.push(eachdata.count)
                console.log("Push Val:>", eachdata.count)
            })
            setData(response)
            console.log("data", data)
        } catch (err) {
            console.log("Result fetch error: ", err)
        }


        console.log("eachdata", valuesArr)
        if (valuesArr.length == 2) {
            setDataAva(true)
        }
    }, [])



    const state = {
        labels: ['True', 'False'],
        datasets: [
            {
                label: 'Counts',
                backgroundColor: 'rgba(255,99,132,0.2)',
                borderColor: 'rgba(255,99,132,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                hoverBorderColor: 'rgba(255,99,132,1)',
                data: valuesArr
            }
        ]
    }
    const options = {
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true,
                        precision: 0
                    }
                }
            ]
        }
    };

    return (
        <div className="barchart" >
            <h1>Bargraph</h1>
            {dataAva && <Bar data={state} options={options} />}
        </div >
    )
}

export default BarChart
