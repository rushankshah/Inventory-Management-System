import React, { useEffect } from 'react';
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
    var purchaseHistoryData = []

    useEffect(() => {
        const ItemRef= firestore.collection('/Item')
        ItemRef.get().then(function(snapshot){
            snapshot.forEach(function(childSnapshot){
                var data = childSnapshot.data()
                console.log(data)
                purchaseHistoryData.push({
                    Company: data.Company,
                    Date: data.Date,
                    'Number of pieces': data.Number_of_pieces,
                    Quality: data.Quality,
                    Thickness: data.Thickness,
                    Width: data.Width,
                    Weight: data.Weight
                })
            })
        })
    }, [purchaseHistoryData])

    return (
        <div className="App ">
            <DataTable
                title="Purchase History"
                columns={columns}
                data={purchaseHistoryData}
                pagination
                responsive
                highlightOnHover
            />
        </div>
    );
}

export default App;