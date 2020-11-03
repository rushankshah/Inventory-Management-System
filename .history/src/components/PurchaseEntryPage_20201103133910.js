import React, { useRef, useState } from 'react'
import { firestore } from '../utils/firebase'
import M from 'materialize-css/dist/js/materialize.min.js'

export default function () {

    const companyName = useRef()
    const date = useRef()
    const quality = useRef()
    const thickness = useRef()
    const width = useRef()
    const numberOfPieces = useRef()
    const weight = useRef()

    const [loading, setLoading] = useState(false)

    async function handleSubmit(e){
        e.preventDefault()
        try{
            setLoading(true)
            const ItemRef = firestore.collection('/Item')
            await ItemRef.add({
                Company: companyName.current.value,
                Date: date.current.value,
                'Number of pieces': numberOfPieces.current.value,
                Quality: quality.current.value,
                Thickness: thickness.current.value,
                Weight: weight.current.value,
                Width: width.current.value
            }).then(function(docRef){
                M.toast({html:'Document added', classes:'rounded'})
                companyName.current.value = ''
                date.current.value = ''
                numberOfPieces.current.value = ''
                quality.current.value = ''
                thickness.current.value = ''
                weight.current.value = ''
                width.current.value = ''
            })
            setLoading(false)
        } catch(error){
            M.toast({ html: 'Add failed. Please try again', classes: 'rounded' })
            setLoading(false)
            return
        }
    }

    return (
        <div>
            <br></br>
            <div className='container'>
                <div className="row">
                    <div className="col l3 m3 s12"></div>
                    <div className="col l6 m3 s12">
                        <div className="row card hoverable-p deep purple lighten-5">
                            <div className="card-content">
                                <h3> <div className="center">New Purchase</div></h3>
                                <h6><div className="center">Enter details of new purchase</div></h6>
                                <form onSubmit={handleSubmit} className="row s12">
                                    <div className="col s8 offset-s1">
                                        <div className="input-field">
                                            <input type="text" ref={companyName} required />
                                            <label>Company Name</label>
                                        </div>

                                        <div className="col s8">
                                            <div className="input-field">
                                                <input type='text' ref={date} className="datepicker" required />
                                                <label>Date</label>
                                            </div>
                                        </div>

                                    </div>
                                    <div className='col s4 offset-s1 '>
                                        <select required ref={quality}>
                                            <option value="H.R.">H.R.</option>
                                            <option value="C.R.">C.R.</option>
                                            <option value="G.P.">G.P.</option>
                                        </select>
                                    </div>
                                    <div className='col s4 offset-s1'>
                                        <div className="input-field">
                                            <input type="number" required ref={thickness} />
                                            <label>Thickness</label>
                                        </div>
                                    </div>
                                    <div className='col s4 offset-s1'>
                                        <div className="input-field">
                                            <input type="number" ref={width} required />
                                            <label>Width</label>
                                        </div>
                                    </div>
                                    <div className='col s4 offset-s1'>
                                        <div className="input-field">
                                            <input type="number" ref={numberOfPieces} required />
                                            <label>No. of pieces</label>
                                        </div>
                                    </div>
                                    <div className='col s4 offset-s1'>
                                        <div className='input-field'>
                                            <input type="number" ref={weight} required />
                                            <label>Weight</label>
                                        </div>
                                    </div>
                                    <div className="col s12 center">
                                        <button type="submit" disabled={loading} className="btn  waves-effect waves-light deep-purple">Submit<i className="material-icons right">send</i></button>
                                    </div>
                                </form>
                            </div>
                        </div></div></div></div>
        </div>
    )
}