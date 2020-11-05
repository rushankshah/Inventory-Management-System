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
               <div className='row s12 absolute-center'>
                    <h3>Quality: {quality}</h3>
                    <h3>Number of pieces: {number_of_pieces}</h3>
                    <h3>Thickness: {thickness}</h3>
               </div>
            </div>
        </div>
    )
}
