import React from 'react';
import DataTable from 'react-data-table-component';
import data from '../utils/data.json';

const columns = [
    {
        name: 'Name',
        selector: 'name',
        sortable: true,
    },
    {
        name: 'Phone',
        selector: 'phone',
        sortable: true,
    },
    {
        name: 'Email',
        selector: 'email',
        sortable: true,
    },
    {
        name: 'DOB',
        selector: 'dob',
    },
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