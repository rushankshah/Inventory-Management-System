import React, { useEffect, useState } from 'react'

export default function CuttingForm({ location }) {
    const [id, setID] = useState('')
    const [company, setCompany] = useState('')
    const [number_of_pieces, setNumber_of_pieces] = useState()
    const [quality, setQuality] = useState('')
    const [thickness, setThickness] = useState()
    const [weight, setWeight] = useState()


    useEffect(()=>{
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
        setWeight(weight)
        // eslint-disable-next-line
    }, [])

    return (
        <div>
            <div className='container'>
               <h1 className='center'>{company}</h1>
               <div className='center'>
                    <h5>Quality: {quality}</h5>
                    <h5>Number of pieces: {number_of_pieces}</h5>
                    <h5>Thickness: {thickness}</h5>
               </div>
            </div>
        </div>
    )
}
