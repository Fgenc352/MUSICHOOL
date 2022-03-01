import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'ParentName', headerName: 'Parent Name', width: 150,
  valueGetter: (params) =>{
       console.log(params.row);
        return params.row.e.ParentName.trim()
      } , },
  
  { field: 'ParentSurname', headerName: 'Parent Surname', width: 150 ,
  valueGetter: (params) =>{
    //    console.log(params.row);
        return params.row.e.ParentSurname.trim()
      } ,
},
  { field: 'PhoneNo', headerName: 'Phone Number', width: 150,
  valueGetter: (params) =>{
    //console.log(params.row.e.InstrumentName.trim()+"d");
           return params.row.e.PhoneNo
         } ,
 },
  {
    field: 'StudentID',
    headerName: 'Student ID',
    type:"number",
    width: 100,
    valueGetter: (params) =>{
   //console.log(params.row.e.InstrumentName.trim()+"d");
          return params.row.e.StudentID
        } ,
  }
];


export default function DataTable(props) {
  return (
    <div style={{ height: 370, width: '100%'  }}>
      <DataGrid
            style={{paddingLeft:"15px"}}
        rows={props.rows}
        columns={columns}
        pageSize={5}
        disableSelectionOnClick
        rowsPerPageOptions={[5]}
        
      />
    </div>
  );
}
