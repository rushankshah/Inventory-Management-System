import React, { useEffect, useState } from 'react'

export default function CuttingForm({ location }) {
    const [id, setID] = useState('')
    const [company, setCompany] = useState('')
    const [number_of_pieces, setNumber_of_pieces] = useState()
    const [quality, setQuality] = useState('')
    const [thickness, setThickness] = useState()
    const [loading, setLoading] = useState(false)
    const [totalWeight, setTotalWeight] = useState()
    const [inputList, setInputList] = useState([{
        width: null,
        weight: null,
        number_of_pieces: null
    },])


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

    function handleChange(e, i) {
        const { name, value } = e.target
        const list = [...inputList]
        list[i][name] = value
        setInputList(list)
        console.log(inputList)
    }

    function handleAddEvent() {
        setInputList([...inputList, {
            width: null,
            weight: null,
            number_of_pieces: null
        }])
    }

    function handleRemoveEvent(i) {
        const list = [...inputList]
        list.splice(i, 1)
        setInputList(list)
    }

    function handleSubmit(e){
        e.preventDefault()
        setLoading(true)
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
                    </div>
                </div>
                <div className="row">
                    <input type="button" value='add' onClick={handleAddEvent} />
                </div>
                {inputList.map((item, i) => {
                    return (
                        <div key={i}>
                            <div className="input-field">
                                <input type="number" value={item.width} required onChange={e => handleChange(e, i)} />
                                <label>Width</label>
                            </div>
                            <div className="input-field">
                                <input type="number" value={item.number_of_pieces} required onChange={e => handleChange(e, i)} />
                                <label>Number of pieces</label>
                            </div>
                            <div className="input-field">
                                <input type="number" value={item.weight} required onChange={e => handleChange(e, i)} />
                                <label>Weight</label>
                            </div>
                            <input type='button' value='remove' onClick={() => handleRemoveEvent(i)} />
                        </div>
                    )
                })}
                <div className="col s12 center">
                    <button onClick={handleSubmit} disabled={loading} className="btn  waves-effect waves-light deep-purple ">Submit<i className="material-icons right">send</i></button>
                </div>
            </div>
        </div>
    )
}
