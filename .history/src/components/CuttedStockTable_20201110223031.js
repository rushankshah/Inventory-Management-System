import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { firestore } from '../utils/firebase'
import { useHistory } from 'react-router-dom'
import M from 'materialize-css/dist/js/materialize.min.js'

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

export default function CuttedStockTable() {

    const [cuttingHistoryData, setCuttingHistoryData] = useState([])
    const [loading, setLoading] = useState(false)
    const history = useHistory()
    async function getData() {
        const CuttingRef = firestore.collection('Item Cut')
        await CuttingRef.get().then(function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                var data = childSnapshot.data()
                var id = childSnapshot.id
                setCuttingHistoryData((prevData) => {
                    const ItemRef = firestore.collection('/Item/' + data.Item_ID)
                    ItemRef.get().then((snap)=>{
                        snap.forEach((s)=>{
                            var data = s.data()
                            console.log(data)
                        })
                    })
                    prevData.push({
                        id: id,
                        Company: data.Company,
                        Number_of_pieces: data.Number_of_pieces,
                        Quality: data.Quality,
                        Thickness: data.Thickness,
                        Width: data.Width,
                        Weight: data.Weight
                    })
                    return prevData
                })
            })
        })
        setLoading(false)

        return (
            <div>

            </div>
        )
    }
}
