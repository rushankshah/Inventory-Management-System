import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { firestore } from '../utils/firebase'

const columns = [
    {
        name: 'Company',
        selector: 'Company',
        sortable: true,
    },
    {
        name: 'Date',
        selector: 'Date',
        sortable: true,
    },
    {
        name: 'Number of pieces',
        selector: 'Number of pieces',
        sortable: true,
    },
    {
        name: 'Quality',
        selector: 'Quality',
        sortable: true
    },
    {
        name: 'Thickness',
        selector: 'Thickness',
        sortable: true
    },
    {
        name: 'Width',
        selector: 'Width',
        sortable: true
    },
    {
        name: 'Weight',
        selector: 'Weight',
        sortable: true
    }
];

function App() {
    const [purchaseHistoryData, setPurchaseData] = useState([])
    const [loading, setLoading] = useState(true)
    function addData(snapshot){
        snapshot.forEach(function (childSnapshot) {
            var data = childSnapshot.data()
            setPurchaseData((prevData) => {
                prevData.push(JSON.stringify({
                    Company: data.Company,
                    Date: data.Date,
                    'Number of pieces': data.Number_of_pieces,
                    Quality: data.Quality,
                    Thickness: data.Thickness,
                    Width: data.Width,
                    Weight: data.Weight
                }))
                return prevData
            })
        })
        return true;
    }
    async function getData() {
        const ItemRef = firestore.collection('/Item')
        const snapshot =  ItemRef.get();
        if(addData(snapshot))
            setLoading(false)
    }
    useEffect(() => {
        getData()
    })

    return (
        <div className="App">
            {!loading && <DataTable
                title="Purchase History"
                columns={columns}
                data={purchaseHistoryData}
                pagination
                responsive
                highlightOnHover
            />}
        </div>
    );
}

export default App;