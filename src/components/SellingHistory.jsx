import { firestore } from '../utils/firebase'
import React, { useEffect, useRef, useState } from 'react'
import DataTable from 'react-data-table-component'
import { CSVLink } from 'react-csv';

const columns = [
    {
        name: 'Purchase Company',
        selector: 'purchaseCompany',
        sortable: true,
        center: true,
    },
    {
        name: 'Selling Company',
        selector: 'sellingCompany',
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
        name: 'Selling Date',
        selector: 'sellingDate',
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

export default function SellingHistory() {

    const [q, setQ] = useState('')
    const [excelData, setExcelData] = useState([])
    const csvLinkRef = useRef(null);
    const getDate = () => {
        let today = new Date();
        let date = parseInt(today.getMonth()+1) + "-" + today.getDate()  + "-" + today.getFullYear();
        return date;
      }
    
      const csvReport = {
        filename: `${getDate()}-selling-history.csv`,
        // headers: headers,
        data: excelData,
      };
        function handleSubmit(e){
            e.preventDefault();
            csvLinkRef.current.link.click();
          }

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
                if (data.Sold === true) {
                    setSellingData((prevData) => {
                        prevData.push({
                            id: id,
                            purchaseCompany: comp,
                            sellingCompany: data.Sell_Company,
                            sellingDate: data.Sell_Date,
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
                    setExcelData((prevData) => {
                        prevData.push({
                            purchaseCompany: comp,
                            sellingCompany: data.Sell_Company,
                            sellingDate: data.Sell_Date,
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
                }
            })

        })
        setLoading(false)
    }

    const [loading, setLoading] = useState(true)
    const [sellingData, setSellingData] = useState([])

    useEffect(() => {
        getData()
    }, [])

    function search(rows) {
        const cols = rows[0] && Object.keys(rows[0])
        return rows.filter((row) =>
            cols.some((c) => row[c].toString().toLowerCase().indexOf(q.toLowerCase()) > -1)
        )
    }
    return (
        <div className="row">
            <div className="col s8 offset-s2">
                
                <div className="input-field ">
                    <input type="text" value={q} onChange={(e) => { setQ(e.target.value) }} />
                    <label>Enter your query</label></div>
                </div><div className="col"></div>
                <div className="col s8 offset-s2"><div className="purple darken-4" > <div className="row"></div><h4 className="center white-text">Selling History</h4>
               <div className="col s12 center">
                                        <form onSubmit={handleSubmit}>
                                        <button type="submit" disabled={loading} className="btn  waves-effect waves-light deep-purple">Download Excel<i className="material-icons right">download</i></button>
                                        </form>
                                        <br />
                                    </div>
               
            {!loading && <DataTable
                
                columns={columns}
                data={search(sellingData)}
                pagination
                responsive
                highlightOnHover
                striped
            />}
        </div></div>
        <CSVLink 
          {...csvReport}
          ref={csvLinkRef}
        > 
        </CSVLink></div>
    )
}
