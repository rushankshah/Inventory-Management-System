import React, { useEffect, useState } from 'react';
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
        selector: '',
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

    useEffect(()=>{
        getData()
    }, [])

    useEffect(()=>{
        M.AutoInit()
    })

    const [cuttingHistoryData, setCuttingHistoryData] = useState([])
    const [loading, setLoading] = useState(true)
    // const history = useHistory()
    async function getData() {
        const CuttingRef = firestore.collection('Item Cut')
        await CuttingRef.get().then(function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                var data = childSnapshot.data()
                var id = childSnapshot.id
                setCuttingHistoryData((prevData) => {
                    const ItemRef = firestore.collection('/Item')
                    var comp = ''
                    var dat = ''
                    var qual = ''
                    var thick = ''
                    ItemRef.get().then((snap)=>{
                        snap.forEach((s)=>{
                            var I_id = s.id
                            var I_data = s.data()
                            console.log(I_data)
                            if(I_id === data.Item_ID){
                                comp = I_data.Company
                                dat = I_data.Date
                                qual = I_data.Quality
                                thick = I_data.Thickness
                            }
                        })
                    })
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
    return (
        <div className="center">
        <div className="App">
            {!loading && <DataTable
                title="Pending Cutting Stock"
                columns={columns}
                data={cuttingHistoryData}
                pagination
                responsive
                highlightOnHover
                striped
            />}
        </div>
        </div>
    )
}
