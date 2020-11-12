import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { firestore } from '../utils/firebase'
import { useHistory } from 'react-router-dom'
import M from 'materialize-css/dist/js/materialize.min.js'

export default function PendingFreshStockTable() {

    const columns = [
        {
            name: 'Company',
            selector: 'Company',
            sortable: true,
            center: true,
        },
        {
            name: 'Date',
            selector: 'Date',
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

    const [purchaseHistoryData, setPurchaseData] = useState([])
    const [loading, setLoading] = useState(true)
    const history = useHistory()
    async function getData() {
        const ItemRef = firestore.collection('/Item')
        await ItemRef.get().then(function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                var data = childSnapshot.data()
                var id = childSnapshot.id
                if (data.cutted !== false && data.sold !== false) {
                    setPurchaseData((prevData) => {
                        prevData.push({
                            id: id,
                            Company: data.Company,
                            Date: data.Date,
                            Number_of_pieces: data.Number_of_pieces,
                            Quality: data.Quality,
                            Thickness: data.Thickness,
                            Width: data.Width,
                            Weight: data.Weight
                        })
                        return prevData
                    })
                }
            })
        })
        setLoading(false)
    }
    useEffect(() => {
        getData()
    }, [])

    useEffect(() => {
        M.AutoInit()
    })

    function handleClick(row) {
        history.push('/cutting-form?id=' + row.id + '&company=' + row.Company + '&number_of_pieces=' + row.Number_of_pieces + '&quality=' + row.Quality + '&thickness=' + row.Thickness + '&weight=' + row.Weight)
    }

    return (
        <div>
            <div className="center">
                <div className="App">
                    {!loading && <DataTable
                        title="Purchase History"
                        columns={columns}
                        data={purchaseHistoryData}
                        pagination
                        responsive
                        highlightOnHover
                        striped
                        onRowClicked={handleClick}
                    />}
                </div>
            </div>
        </div>
    )
}
