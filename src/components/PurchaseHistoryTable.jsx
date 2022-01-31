import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { firestore } from '../utils/firebase'
import M from 'materialize-css/dist/js/materialize.min.js'
import { useRef } from 'react';
import { CSVLink } from 'react-csv';

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

function App() {
    const [purchaseHistoryData, setPurchaseData] = useState([])
    const [excelData, setExcelData] = useState([])
    const [loading, setLoading] = useState(true)
    const [itemSelected, setItemSelected] = useState({
        id: '',
    })
    const [q, setQ] = useState('')
    const csvLinkRef = useRef(null);
    async function getData() {
        const ItemRef = firestore.collection('/Item')
        await ItemRef.get().then(function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                var data = childSnapshot.data()
                var id = childSnapshot.id
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
                setExcelData((prevData)=> {
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

    function search(rows) {
        const cols = rows[0] && Object.keys(rows[0])
        console.log(cols);
        return rows.filter((row) =>
            cols.some((c) => row[c].toString().toLowerCase().indexOf(q.toLowerCase()) > -1)
        )
    }

    const getDate = () => {
    let today = new Date();
    let date = parseInt(today.getMonth()+1) + "-" + today.getDate()  + "-" + today.getFullYear();
    return date;
  }

  const csvReport = {
    filename: `${getDate()}-purchase-history.csv`,
    // headers: headers,
    data: excelData,
  };

  function handleRowClick(row) {
        setItemSelected((prevData) => {
            prevData.id = row.id
            return prevData
        })
        var elem = document.getElementById('modal1')
        var instance = M.Modal.getInstance(elem)
        instance.open()
    }

  function handleCancel() {
    }
  function handleSubmit(e){
    e.preventDefault();
    csvLinkRef.current.link.click();
  }

  async function handleDelete(e){
      e.preventDefault()
      console.log(itemSelected);
      const ItemRef = firestore.collection('/Item')
      const docRef = ItemRef.doc(itemSelected['id'])
      await docRef.delete()
      window.location.reload()
    }
    return ( <div className='center'>
        <div id="modal1" className="modal">
                <form onSubmit={handleDelete}>
                    <div className="modal-content">
                        
                        <h4>Are you sure you want delete this item?</h4>
                        <p>This cannot be undone</p>
                    </div>
                    <div className="modal-footer">
                        <button type='reset' onClick={handleCancel} className="modal-close waves-effect waves-purple darken-4 btn-flat">No</button>
                        <button type='submit' className="modal-close waves-effect waves-purple darken-4 btn-flat">Yes</button>
                    </div>
                </form>
            </div>
        <div className="row">
        <div className="col s8 offset-s2">
            
        <div className="input-field ">
                    <input type="text" value={q} onChange={(e) => { setQ(e.target.value) }} />
                    <label>Enter your query</label></div>
                </div><div className="col"></div>
               <div className="col s8 offset-s2"><div className="purple darken-4" ><div className="row"></div><h4 className="center white-text">Purchase History</h4><div className="col s12 center">
                                        <form onSubmit={handleSubmit}>
                                        <button type="submit" disabled={loading} className="btn  waves-effect waves-light deep-purple">Download Excel<i className="material-icons right">download</i></button>
                                        </form>
                                    </div>
                                    <br />
                                    <br />
            {!loading && <DataTable
               
                columns={columns}
                data={search(purchaseHistoryData)}
                pagination
                responsive
                highlightOnHover
                striped
                onRowClicked={handleRowClick}
            />}
        </div></div></div>
        <CSVLink 
          {...csvReport}
          ref={csvLinkRef}
        > 
        </CSVLink></div>
    );
}

export default App;