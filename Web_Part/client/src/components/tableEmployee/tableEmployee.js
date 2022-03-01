import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'SSN', headerName: 'SSN', width: 100,
  valueGetter: (params) =>{
    //    console.log(params.row);
        return params.row.e.SSN
      } , },
  
  { field: 'Name', headerName: 'Name', width: 85 ,
  valueGetter: (params) =>{
    //    console.log(params.row);
        return params.row.e.Name
      } ,
},
  { field: 'Surname', headerName: 'Surname', width: 85,
  valueGetter: (params) =>{
    //console.log(params.row.e.InstrumentName.trim()+"d");
           return params.row.e.Surname
         } ,
 },
  {
    field: 'Address',
    headerName: 'Address',
    width: 90,
    valueGetter: (params) =>{
   //console.log(params.row.e.InstrumentName.trim()+"d");
          return params.row.e.Address.trim()
        } ,
  },
  {
    field: 'Salary',
    headerName: 'Salary',
    sortable: true,
    width: 80,
    valueGetter: (params) =>{
      //console.log(params.row.e.InstrumentName.trim()+"d");
             return params.row.e.Salary+"$"
           } ,
  },
  { field: 'PhoneNo', headerName: 'PhoneNo', width: 100,
  valueGetter: (params) =>{
    //console.log(params.row.e.InstrumentName.trim()+"d");
           return params.row.e.PhoneNo
         } ,
},
{ field: 'Gender', headerName: 'Gender', width: 75,
type:"number",
  valueGetter: (params) =>{
    //console.log(params.row.e.InstrumentName.trim()+"d");
           return params.row.e.Gender
         } ,
},
{ field: 'Email', headerName: 'Email', width: 150,
  valueGetter: (params) =>{
    //console.log(params.row.e.InstrumentName.trim()+"d");
           return params.row.e.Email
         } ,
},
{ field: 'EmployeeType', headerName: 'Type', width: 85,
type:"number",
  valueGetter: (params) =>{
    //console.log(params.row.e.InstrumentName.trim()+"d");
           return params.row.e.EmployeeType
         } ,
}

];


export default function DataTable(props) {
  return (
    <div style={{ height: 370, width: '100%'  }}>
      <DataGrid
        rows={props.rows}
        columns={columns}
        style={{paddingLeft:"5px"}}
        pageSize={5}
        disableSelectionOnClick
        rowsPerPageOptions={[5]}
      />
    </div>
  );
}
