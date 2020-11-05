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
        setID(id)
        setCompany(company)
        // eslint-disable-next-line
    }, [])

    return (
        <div>
            Hello From Cutting Form. The id of the request is {id} & company is {company}
        </div>
    )
}
