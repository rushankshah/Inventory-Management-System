import React, { useEffect, useState } from 'react'
import { firestore } from '../utils/firebase'
import M from 'materialize-css'
import { useHistory } from 'react-router-dom'

export default function CuttingForm({ location }) {
    const [id, setID] = useState('')
    const [company, setCompany] = useState('')
    const [number_of_pieces, setNumber_of_pieces] = useState()
    const [quality, setQuality] = useState('')
    const [thickness, setThickness] = useState()
    const [width, setWidth] = useState()
    const [loading, setLoading] = useState(false)
    const [totalWeight, setTotalWeight] = useState()
    const [inputList, setInputList] = useState([{
        date: '',
        page_no: '',
        width: '',
        weight: '',
        number_of_pieces: '',
        isScrap: false
    },])

    const history = useHistory()

    useEffect(() => {
        const params = new URLSearchParams(location.search)
        const id = params.get('id')
        const company = params.get('company')
        const number_of_pieces = params.get('number_of_pieces')
        const quality = params.get('quality')
        const thickness = params.get('thickness')
        const weight = params.get('weight')
        const width = params.get('width')

        setID(id)
        setCompany(company)
        setNumber_of_pieces(number_of_pieces)
        setQuality(quality)
        setThickness(thickness)
        setTotalWeight(weight)
        setWidth(width)
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        M.AutoInit()
    })

    function handleChange(e, i) {
        const { name, value } = e.target
        console.log(value);
        const list = [...inputList]
        list[i][name] = value
        list[i]['weight'] = ((parseInt(list[i]['width'])*parseInt(list[i]['number_of_pieces'])*parseInt(totalWeight))/(parseInt(width))).toFixed().toString()
        setInputList(list)
        console.log(inputList)
    }

    function handleAddEvent() {
        setInputList([...inputList, {
            date: '',
            page_no: '',
            width: '',
            weight: '',
            number_of_pieces: '',
            isScrap: false
        }])
    }

    function handleRemoveEvent(i) {
        const list = [...inputList]
        list.splice(i, 1)
        setInputList(list)
    }

    async function handleSubmit(e) {
        e.preventDefault()
        setLoading(true)
        var tWeight = 0
        inputList.forEach((item)=>{
            tWeight += parseInt(item['weight'])
        })
        var r = true;
        if(tWeight !== parseInt(totalWeight)){
            r = window.confirm('Total weight doesnt match. Do you still want to add?');
        }
        if(r === true){
            try {
                const CuttingRef = firestore.collection('/Item Cut')
                inputList.forEach(async (item, index) => {
                    // console.log(item['isScrap'])
                    await CuttingRef.add({
                        Item_ID: id,
                        cutting_date: item['date'],
                        page_no: item['page_no'],
                        Number_of_pieces: item['number_of_pieces'],
                        Sell_Company: null,
                        Sold: false,
                        Weight: item['weight'],
                        Width: item['isScrap'] ? 'scrap' : item['width']
                    })
                })
                const ItemRef = firestore.collection('/Item')
                const docRef = ItemRef.doc(id)
                await docRef.update({
                    cutted: true
                })
                M.toast({ html: 'Document added', classes: 'rounded' })
                setLoading(false)
                history.push('/purchase-history-table')
            } catch (error) {
                M.toast({ html: 'Error' })
            }
        } else{
            setLoading(false)
            M.toast({html: 'Operation Cancelled', classes: 'rounded'})
        }
    }

    return (
        <div className='container'>
            <div className='container center'>
            <div className="row card hoverable-p">
                            <div className="card-content">
                <h4 className='center'>{company}</h4><br></br>
                <div className='row s6'>
                    <div>
                        <h6>Quality: {quality}</h6>
                        <h6>Number of pieces: {number_of_pieces}</h6>
                        <h6>Thickness: {thickness}</h6>
                        <h6>Width: {width}</h6>
                    </div>
                    <div>
                        <h6>Total weight: {totalWeight}</h6>
                    </div>
                </div></div></div>
                <div className="row">
                    <input type='button' className='btn waves-effect waves-light deep-purple' value='add' onClick={handleAddEvent} />
                </div>
                {
                    inputList.map((item, i) => {
                        return (
                            <div key={i} className='container'>
                <div className="row">
                    <div className="col l12 m12 s12"></div>
                    <div className="col l12 m12 s12">
                        <div className="row card hoverable-p">
                            <div className="card-content">
                                <h3> <div className="center">Cut</div></h3>
                                <form  className="row s12">
                                    <div className="col s8 offset-s1">
                                <div className="input-field">
                                    <input type='date' name='date' value={item.date} required onChange={e => handleChange(e, i)} />
                                    <label>Date</label>
                                </div>
                                <div className="input-field">
                                    <input type="number" name="page_no" min='0' value={item.page_no} required onChange={e => handleChange(e, i)} />
                                    <label>Page Number</label>
                                </div>
                                <div className="input-field">
                                    <input type="number" name="width" step='0.01' min='0' value={item.width} onChange={e => handleChange(e, i)} />
                                    <label>Width</label>
                                </div>
                                <div>
                                    <label>
                                        <input type="checkbox" name='isScrap' className="purple" onChange={()=>{item.isScrap = !item.isScrap}} value={item.isScrap} />
                                        <span>Scrap</span>
                                    </label>
                                </div>
                                <div className="input-field">
                                    <input type="number" name='number_of_pieces' step='0.01' min='0' value={item.number_of_pieces} required onChange={e => handleChange(e, i)} />
                                    <label>Number of pieces</label>
                                </div>
                                <div className="input-field">
                                    <input type="number" name='weight' step='0.01' min='0' value={item.weight} required onChange={e => handleChange(e, i)} />
                                    <label>Weight</label>
                                </div>
                                <input type='button' value='remove' className='btn  waves-effect waves-light deep-purple'onClick={() => handleRemoveEvent(i)} />
                            </div> </form></div></div>
                        </div></div></div>
                        )
                    })
                }
                <div className="col s12 center">
                    <button onClick={handleSubmit} disabled={loading} className="btn  waves-effect waves-light deep-purple ">Submit<i className="material-icons right">send</i></button>
                </div>
            </div>
        </div>
    )
}
