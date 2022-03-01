import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'StudentID', headerName: 'Student ID', width: 160 ,
  valueGetter: (params) =>{
    //    console.log(params.row);
        return params.row.e.StudentID
      } ,
},
  { field: 'CourseCode', headerName: 'Course Code', width: 160,
  valueGetter: (params) =>{
    //    console.log(params.row);
        return params.row.e.CourseCode
      } , }
  
];


export default function DataTable(props) {
  return (
    <div style={{ height: 370, width: '100%'  }}>
      <DataGrid
        rows={props.rows}
        columns={columns}
        style={{paddingLeft:"15px"}}
        pageSize={5}
        disableSelectionOnClick
        rowsPerPageOptions={[5]}
      />
    </div>
  );
}
