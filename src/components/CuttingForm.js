import React, { useEffect, useState } from 'react'

export default function CuttingForm({ location }) {
    const [id, setID] = useState('')

    useEffect(()=>{
        const params = new URLSearchParams(location.search)
        const id = params.get('id')
        setID(id)
        // eslint-disable-next-line
    }, [])

    return (
        <div>
            Hello From Cutting Form. The id of the request is {id}
        </div>
    )
}
