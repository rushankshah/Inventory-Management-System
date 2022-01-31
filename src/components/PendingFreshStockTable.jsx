import React, { useEffect, useRef, useState } from 'react';
import DataTable from 'react-data-table-component';
import { firestore } from '../utils/firebase'
import { useHistory } from 'react-router-dom'
import M from 'materialize-css/dist/js/materialize.min.js'
import { CSVLink } from 'react-csv';

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
    const [excelData, setExcelData] = useState([])
    
    const csvLinkRef = useRef(null);
    const history = useHistory()
    const getDate = () => {
        let today = new Date();
        let date = parseInt(today.getMonth()+1) + "-" + today.getDate()  + "-" + today.getFullYear();
        return date;
      }
    const csvReport = {
        filename: `${getDate()}-fresh-stock.csv`,
        data: excelData,
      };
    async function getData() {
        const ItemRef = firestore.collection('/Item')
        await ItemRef.get().then(function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                var data = childSnapshot.data()
                var id = childSnapshot.id
                if (data.cutted === false) {
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
                    setExcelData((prevData) => {
                        prevData.push({
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

    const [q, setQ] = useState('')
    useEffect(() => {
        getData()
    }, [])

    useEffect(() => {
        M.AutoInit()
    })

    function handleClick(row) {
        history.push('/cutting-form?id=' + row.id + '&company=' + row.Company + '&number_of_pieces=' + row.Number_of_pieces + '&quality=' + row.Quality + '&thickness=' + row.Thickness + '&weight=' + row.Weight + '&width=' + row.Width)
    }
    function handleSubmit(e){
        e.preventDefault();
        console.log(excelData);
        csvLinkRef.current.link.click();
      } 

    function search(rows) {
        const cols = rows[0] && Object.keys(rows[0])
        return rows.filter((row) =>
            cols.some((c) => row[c].toString().toLowerCase().indexOf(q.toLowerCase()) > -1)
        )
    }

    return (
        <div >
            <div className="row">
            <div className="col s8 offset-s2">
                
                <div className="input-field ">
                    <input type="text" value={q} onChange={(e) => { setQ(e.target.value) }} />
                    <label>Enter your query</label></div>
                </div><div className="col"></div>
               <div className="col s8 offset-s2"><div className="purple darken-4" > <div className="row"></div><h4 className="center white-text">Pending Fresh Stock</h4>
               <div className="col s12 center">
                                        <form onSubmit={handleSubmit}>
                                        <button type="submit" disabled={loading} className="btn  waves-effect waves-light deep-purple">Download Excel<i className="material-icons right">download</i></button>
                                        </form>
                                    </div>
                                    <br />
                                    <br />
                               <div className="bg">
                {!loading && <DataTable
                    
                    columns={columns}
                    data={search(purchaseHistoryData)}
                    pagination
                    responsive
                    highlightOnHover
                    striped
                    onRowClicked={handleClick}
                />}</div>
            </div></div></div>
            <CSVLink 
          {...csvReport}
          ref={csvLinkRef}
        > 
        </CSVLink></div>
        
    )
}
