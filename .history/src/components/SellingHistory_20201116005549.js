import { firestore } from '../utils/firebase'
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'

export default function SellingHistory() {

    async function getData() {
        const CuttedItemRef = firestore.collection('/Item Cut')
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

        await CuttedItemRef.get().then((snapshot) => {
            snapshot.forEach((childSnapshot) => {
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
                setSellingData((prevData) => {
                    prevData.push({
                        id: id,
                        purchaseCompany: comp,
                        sellingCompany: data.Sell_Company,
                        sellingDate: data.Sell_Date,
                        purchaseDate: dat,
                        Cutting_Date: data.cutting_date,
                        page_no: data.page_no,
                        Number_of_pieces: data.Number_of_pieces,
                        Quality: qual,
                        Thickness: thick,
                        Width: data.Width,
                        Weight: data.Weight
                    })
                })
            })

        })
    }

    const [loading, setLoading] = useState(true)
    const [sellingData, setSellingData] = useState([])

    useEffect(() => {
        getData()
    }, [])


    return (
        <div className='center'>
            {!loading && <DataTable
                title="Purchase History"
                columns={columns}
                data={sellingData}
                pagination
                responsive
                highlightOnHover
                striped
            />}
        </div>
    )
}
