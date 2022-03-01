import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'id', headerName: 'StudentID', width: 100,
  valueGetter: (params) =>{
        return params.row.e.StudentID
      } , },
  
  { field: 'Name', headerName: 'Name', width: 100 ,
  valueGetter: (params) =>{
    //    console.log(params.row);
        return params.row.e.StudentName
      } ,
},
  { field: 'Surname', headerName: 'Surname', width: 105,
  valueGetter: (params) =>{
    //console.log(params.row.e.InstrumentName.trim()+"d");
           return params.row.e.StudentSurname
         } ,
 },
  {
    field: 'Age',
    headerName: 'Age',
    width: 100,
    valueGetter: (params) =>{
   //console.log(params.row.e.InstrumentName.trim()+"d");
          return params.row.e.Age
        } ,
  },
  {
    field: 'BirthDate',
    headerName: 'BirthDate',
    sortable: true,
    width: 120,
    valueGetter: (params) =>{
      //console.log(params.row.e.InstrumentName.trim()+"d");
             return params.row.e.BirthDate.slice(0,10)
           } ,
  },
  { field: 'PhoneNo', headerName: 'PhoneNo', width: 110,
  valueGetter: (params) =>{
    //console.log(params.row.e.InstrumentName.trim()+"d");
           return params.row.e.PhoneNo
         } ,
},
{ field: 'Gender', headerName: 'Gender', width: 80,

  valueGetter: (params) =>{
    //console.log(params.row.e.InstrumentName.trim()+"d");
           return params.row.e.Gender
         } ,
},
{ field: 'Email', headerName: 'Email', width: 140,
  valueGetter: (params) =>{
    //console.log(params.row.e.InstrumentName.trim()+"d");
           return params.row.e.Email
         } ,
},

];


export default function DataTable(props) {
  return (
    <div style={{ height: 370, width: '100%'  }}>
      <DataGrid
        rows={props.rows}
        columns={columns}
        pageSize={5}
        style={{paddingLeft:"7px"}}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
      />
    </div>
  );
}
