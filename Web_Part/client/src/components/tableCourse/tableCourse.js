import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'id', headerName: 'CourseCode', width: 130,
  valueGetter: (params) =>{
    //    console.log(params.row);
        return params.row.e.CourseCode
      } , },
  
  { field: 'CourseHour', headerName: 'CourseHour', width: 120 ,
  valueGetter: (params) =>{
    //    console.log(params.row);
        return params.row.e.CourseHour
      } ,
},
  { field: 'InstructorSSN', headerName: 'InstructorSSN', width: 145,
  valueGetter: (params) =>{
    //console.log(params.row.e.InstrumentName.trim()+"d");
           return params.row.e.InstructorSSN
         } ,
 },
  {
    field: 'InstrumentName',
    headerName: 'InstrumentName',
    width: 140,
    valueGetter: (params) =>{
   //console.log(params.row.e.InstrumentName.trim()+"d");
          return params.row.e.InstrumentName.trim()
        } ,
  },
  {
    field: 'Price',
    headerName: 'Price',
    type:"number",
    width: 100,
    valueGetter: (params) =>{
      //console.log(params.row.e.InstrumentName.trim()+"d");
             return params.row.e.Price+"$"
           } ,
  },
  { field: 'Quota', headerName: 'Quota', width: 100,
  type:"number",
  valueGetter: (params) =>{
    //console.log(params.row.e.InstrumentName.trim()+"d");
           return params.row.e.Quota
         } ,
}

];


export default function DataTable(props) {
  return (
    <div style={{ height: 375, width: '100%',  }}>
      <DataGrid
      style={{paddingLeft:"5px"}}
        rows={props.rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
      />
    </div>
  );
}
