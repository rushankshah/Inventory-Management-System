import React from 'react';
import DataTable from 'react-data-table-component';
import data from '../utils/data.json';

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
    return (
        <div className="App ">
            <DataTable
                title="Employees"
                columns={columns}
                data={data}
                pagination
                responsive
                highlightOnHover
            />
        </div>
    );
}

export default App;