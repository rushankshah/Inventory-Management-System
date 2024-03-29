import React, { useEffect, useRef, useState } from 'react';
import DataTable from 'react-data-table-component';
import { firestore } from '../utils/firebase'
import { useHistory } from 'react-router-dom'
import M from 'materialize-css/dist/js/materialize.min.js'
import { CSVLink } from 'react-csv';

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
    const sellingDate = useRef()
    const [excelData, setExcelData] = useState([])
    const csvLinkRef = useRef(null);

    useEffect(() => {
        getData()
    }, [])

    useEffect(() => {
        M.AutoInit()
    })

    const [cuttingHistoryData, setCuttingHistoryData] = useState([])
    const [loading, setLoading] = useState(true)

    const history = useHistory()

    const [itemSelected, setItemSelected] = useState({
        id: '',
        soldCompany: ''
    })

    const [q, setQ] = useState('')

    function search(rows) {
        const cols = rows[0] && Object.keys(rows[0])
        return rows.filter((row) =>
            cols.some((c) => row[c].toString().toLowerCase().indexOf(q.toLowerCase()) > -1)
        )
    }

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
                if (data.Sold !== true && data.Width !== 'scrap') {
                    setCuttingHistoryData((prevData) => {
                        prevData.push({
                            cutting_id: id,
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
                    setExcelData((prevData) => {
                        prevData.push({
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
                }
            })
        })
        setLoading(false)
    }
    function handleRowClick(row) {
        setItemSelected((prevData) => {
            prevData.id = row.cutting_id
            return prevData
        })
        console.log(itemSelected)
        var elem = document.getElementById('modal1')
        var instance = M.Modal.getInstance(elem)
        instance.open()
    }
    async function handleSell(e) {
        e.preventDefault()
        const company = sellingCompany.current.value
        const date = sellingDate.current.value
        setItemSelected({
            soldCompany: company
        })
        const CuttingRef = firestore.collection('/Item Cut')
        const docRef = CuttingRef.doc(itemSelected['id'])
        await docRef.update({
            Sold: true,
            Sell_Company: company,
            Sell_Date: date
        })
        history.push('/selling-history')
    }
    const getDate = () => {
    let today = new Date();
    let date = parseInt(today.getMonth()+1) + "-" + today.getDate()  + "-" + today.getFullYear();
    return date;
  }

  const csvReport = {
    filename: `${getDate()}-cutted-stock.csv`,
    // headers: headers,
    data: excelData,
  };
    function handleSubmit(e){
        e.preventDefault();
        csvLinkRef.current.link.click();
      }
    function handleCancel() {
    }
    return (
        <div className="center">
            <div id="modal1" className="modal">
                <form onSubmit={handleSell}>
                    <div className="modal-content">
                        
                        <h4>Are you sure you want to sell this item?</h4>
                        <p>Please enter the selling following details</p>
                        <div className="input-field">
                            <input type='date' ref={sellingDate} required />
                            <label>Selling Date</label>
                        </div>
                        <div className="input-field">
                            <input type="text" ref={sellingCompany} required />
                            <label>Company Name</label>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type='reset' onClick={handleCancel} className="modal-close waves-effect waves-purple darken-4 btn-flat">Cancel</button>
                        <button type='submit' className="modal-close waves-effect waves-purple darken-4 btn-flat">Sell</button>
                    </div>
                </form>
            </div>
            <div>
            <div className="row">
            <div className="col s8 offset-s2">
                
                <div className="input-field ">
                    <input type="text" value={q} onChange={(e) => { setQ(e.target.value) }} />
                    <label>Enter your query</label></div>
                </div><div className="col"></div>
               <div className="col s8 offset-s2"><div className="purple darken-4" > <div className="row"></div><h4 className="center white-text">Pending Cut Stock</h4>
               <form onSubmit={handleSubmit}>
                                        <button type="submit" disabled={loading} className="btn  waves-effect waves-light deep-purple">Download Excel<i className="material-icons right">download</i></button>
                                        </form>
                                        <br />
                {!loading && <DataTable
                   
                    columns={columns}
                    data={search(cuttingHistoryData)}
                    pagination
                    responsive
                    highlightOnHover
                    striped
                    onRowClicked={handleRowClick}
                />}
            </div>
        </div></div></div>
        <CSVLink 
          {...csvReport}
          ref={csvLinkRef}
        > 
        </CSVLink></div>
    )
}
