import React, { useEffect, useRef, useState } from 'react';
import DataTable from 'react-data-table-component';
import { firestore } from '../utils/firebase'
// import { useHistory } from 'react-router-dom'
import M from 'materialize-css/dist/js/materialize.min.js'

const columns = [
    {
        name: 'Company',
        selector: 'Company',
        sortable: true,
        center: true,
    },
    {
        name: 'Purchase Date',
        selector: 'Purchase_Date',
        sortable: true,
        center: true,
    },
    {
        name: 'Cutting Date',
        selector: 'Cutting_Date',
        sortable: true,
        center: true,
    },
    {
        name: 'Page number',
        selector: 'page_no',
        sortable: true,
        center: true,
    },
    {
        name: 'Number of pieces',
        selector: 'Number_of_pieces',
        sortable: true,
        center: true,
    },
    {
        name: 'Quality',
        selector: 'Quality',
        sortable: true,
        center: true,
    },
    {
        name: 'Thickness',
        selector: 'Thickness',
        sortable: true,
        center: true,
    },
    {
        name: 'Width',
        selector: 'Width',
        sortable: true,
        center: true,
    },
    {
        name: 'Weight',
        selector: 'Weight',
        sortable: true,
        center: true,
    }
];

export default function CuttedStockTable() {

    const sellingCompany = useRef()

    useEffect(() => {
        getData()
    }, [])

    useEffect(() => {
        M.AutoInit()
    })

    const [cuttingHistoryData, setCuttingHistoryData] = useState([])
    const [loading, setLoading] = useState(true)

    const [selectedItem, setselectedItem] = useState({

    }
    )

    // const history = useHistory()
    async function getData() {
        const CuttingRef = firestore.collection('Item Cut')
        const items = []
        const ItemRef = firestore.collection('/Item')
        await ItemRef.get().then((snap) => {
            snap.forEach((s) => {
                var I_id = s.id
                var I_data = s.data()
                items.push({
                    id: I_id,
                    data: I_data
                })
            })
        })
        await CuttingRef.get().then(function (snapshot) {
            snapshot.forEach(async function (childSnapshot) {
                var data = childSnapshot.data()
                var id = childSnapshot.id
                var comp = ''
                var dat = ''
                var qual = ''
                var thick = ''
                items.forEach((item, index) => {
                    if (item['id'] === data.Item_ID) {
                        comp = item['data']['Company']
                        dat = item['data']['Date']
                        qual = item['data']['Quality']
                        thick = item['data']['Thickness']
                    }
                })
                setCuttingHistoryData((prevData) => {
                    prevData.push({
                        id: id,
                        Company: comp,
                        Purchase_Date: dat,
                        Cutting_Date: data.cutting_date,
                        page_no: data.page_no,
                        Number_of_pieces: data.Number_of_pieces,
                        Quality: qual,
                        Thickness: thick,
                        Width: data.Width,
                        Weight: data.Weight
                    })
                    return prevData
                })
            })
        })
        setLoading(false)
    }
    function handleRowClick(row) {
        var elem = document.getElementById('modal1')
        var instance = M.Modal.getInstance(elem)
        instance.open()
    }
    function handleSell() {

    }
    function handleCancel() {

    }
    return (
        <div className="center">
            <div id="modal1" className="modal">
                <form>
                    <div className="modal-content">
                        <h4>Are you sure you want to sell this item?</h4>
                        <p>Please enter the selling Company name</p>
                        <div className="input-field">
                            <input type="text" ref={sellingCompany} required />
                            <label>Company Name</label>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button onClick={handleCancel} className="modal-close waves-effect waves-red btn-flat">Cancel</button>
                        <button onClick={handleSell} className="modal-close waves-effect waves-green btn-flat">Sell</button>
                    </div>
                </form>
            </div>
            <div className="App">
                {!loading && <DataTable
                    title="Pending Cutting Stock"
                    columns={columns}
                    data={cuttingHistoryData}
                    pagination
                    responsive
                    highlightOnHover
                    striped
                    onRowClicked={handleRowClick}
                />}
            </div>
        </div>
    )
}
