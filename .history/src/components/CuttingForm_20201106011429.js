import React, { useEffect, useState } from 'react'

export default function CuttingForm({ location }) {
    const [isWeightSatisfied, setIsWeightSatisfied] = useState(false)
    const [id, setID] = useState('')
    const [company, setCompany] = useState('')
    const [number_of_pieces, setNumber_of_pieces] = useState()
    const [quality, setQuality] = useState('')
    const [thickness, setThickness] = useState()
    const [weight, setWeight] = useState(0)
    const [totalWeight, setTotalWeight] = useState()
    const [inputList, setInputList] = useState([{
        width: 0,
        weight: 0,
        number_of_pieces: 0
    }, ])


    useEffect(() => {
        const params = new URLSearchParams(location.search)
        const id = params.get('id')
        const company = params.get('company')
        const number_of_pieces = params.get('number_of_pieces')
        const quality = params.get('quality')
        const thickness = params.get('thickness')
        const weight = params.get('weight')

        setID(id)
        setCompany(company)
        setNumber_of_pieces(number_of_pieces)
        setQuality(quality)
        setThickness(thickness)
        setTotalWeight(weight)
        // eslint-disable-next-line
    }, [])

    function handleChange(e) {
        const { name, value } = e.target
        setInputList([{
            ...inputList,
            [name]: value
        }])
    }

    return (
        <div>
            <div className='container white-text'>
                <h1 className='center'>{company}</h1>
                <div className='row s12'>
                    <div>
                        <h5>Quality: {quality}</h5>
                        <h5>Number of pieces: {number_of_pieces}</h5>
                        <h5>Thickness: {thickness}</h5>
                    </div>
                    <div>
                        <h5>Total weight: {totalWeight}</h5>
                        <h5>Weight Cutted: <span style={{
                            color: isWeightSatisfied ? 'green' : 'red'
                        }}>{weight}</span></h5>
                    </div>
                </div>
                {inputList.map((x, i) => {
                    return (
                        <div>
                            <div className="input-field">
                                <input type="number" value={inputList.width} required onChange={handleChange} />
                                <label>Width</label>
                            </div>
                            <div className="input-field">
                                <input type="number" value={inputList.number_of_pieces} required />
                                <label>Number of pieces</label>
                            </div>
                            <div className="input-field">
                                <input type="number" value={inputList.weight} required />
                                <label>Weight</label>
                            </div>
                            <div className="row">
                                <input type="button" value='add' />
                                <input type='button' value='remove' />
                            </div>
                        </div>
                    )
                })}

            </div>
        </div>
    )
}
