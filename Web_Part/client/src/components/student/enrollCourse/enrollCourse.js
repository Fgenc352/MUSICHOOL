import React from "react";
import style from "./enrollCourse.module.css";
import axios from "axios";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import SaveIcon from "@mui/icons-material/Save";
import TableCourseStudent from "../../tableCourseStudent/tableCourseStudent";

export default function BasicTextFields() {
  const [students, setStudents] = React.useState([]);

  const [CourseCode, setCourseCode] = React.useState("");
  const [StudentID, setStudentID] = React.useState("");
  

  const [delStudent, setDelStudent] = React.useState("");
  const [delCourse, setDelCourse] = React.useState("");
  
  const [StudentIDErr, setStudentIDErr] = React.useState(false);
  const [CourseCodeErr, setCourseCodeErr] = React.useState(false);
  


  const handleSubmit = () => {

    if (StudentID.length < 1) {
      setStudentIDErr(true);
      return;
    } else setStudentIDErr(false);

    if (CourseCode.length < 1) {
      setCourseCodeErr(true);
      return;
    } else setCourseCodeErr(false);

    let qry =
      "INSERT INTO CourseStudent (StudentID, CourseCode)" +
      " VALUES ('" +
      StudentID +
      "', '" +
      CourseCode +
      "')";

    console.log(qry);

    axios
      .post("http://localhost:4000/createCourseStudent", { qry, CourseCode })
      .then((res) => {
        console.log(res);
        alert("Student has enrolled to "+CourseCode);
        axios
          .get("http://localhost:4000/StudentCourse")
          .then((res) => {
            console.log(res.data);
            setStudents(
              res.data.map((e, i) => {
                return { id: i + 1, e };
              })
            );
          })
          .catch((e) => {
            console.log(JSON.parse(e.request.response).error);
            alert(JSON.parse(e.request.response).error);
          });
      })
      .catch((e) => {
        console.log(e.request.response);
        alert(JSON.parse(e.request.response).error);
      });
  };

  const deleteRecord = () => {
    if (delStudent == "" || delCourse=="") return;
    axios
      .post("http://localhost:4000/deleteCourseStudent", {
        data: { StudentID: delStudent, CourseCode:delCourse },
      })
      .then((res) => {
        console.log(res);
        alert("Student doesn't take "+delCourse+"  anymore!");
        axios
          .get("http://localhost:4000/StudentCourse")
          .then((res) => {
            console.log(res.data);
            setStudents(
              res.data.map((e, i) => {
                return { id: i + 1, e };
              })
            );
          })
          .catch((e) => {
            console.log(JSON.parse(e.request.response).error);
            alert(JSON.parse(e.request.response).error);
          });
      })
      .catch((err) => {
        console.log(err.response.data.error);
        alert(err.response.data.error)
      });
  };

  

  React.useEffect(() => {
    axios
      .get("http://localhost:4000/StudentCourse")
      .then((res) => {
        console.log(res.data);
        setStudents(
          res.data.map((e, i) => {
            return { id: i + 1, e };
          })
        );
      })
      .catch((e) => {
        console.log(JSON.parse(e.request.response).error);
        alert(JSON.parse(e.request.response).error);
      });
  }, []);

  return (
    <div className={style.wrap}>
      <h1>Enroll Student to Course</h1>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "35ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          type="number"
          required
          value={StudentID}
          onChange={(ssn) => setStudentID(ssn.target.value)}
          id="outlined-basic"
          label="Student ID"
          variant="outlined"
          error={StudentIDErr}
          helperText={StudentIDErr ? "Incorrect entry. Write a proper Student ID." : ""}
        />

        <TextField
          required
          value={CourseCode}
          onChange={(name) => setCourseCode(name.target.value)}
          id="outlined-basic"
          label="Course Code"
          variant="outlined"
          error={CourseCodeErr}
          helperText={CourseCodeErr ? "Incorrect entry. Write a proper Course Code." : ""}
        />

        <Button
          id={style.but}
          variant="contained"
          size="large"
          startIcon={<SaveIcon />}
          onClick={() => handleSubmit()}
        >
          Save
        </Button>
      </Box>

      <div
        style={{ marginBottom: "100px", marginTop: "30px", marginLeft: "0" }}
      >
        <h2 style={{ marginBottom: "20px" }}>Delete Student</h2>

        <TextField
          id="outlined-disabled"
          label="Student ID"
          value={delStudent}
          onChange={(e)=>setDelStudent(e.target.value)}
          required
        />
        <TextField
          id="outlined-disabled"
          label="Course Code"
          value={delCourse}
          onChange={e=>setDelCourse(e.target.value)}
          style={{ marginLeft: "20px" }}
          required
        />
        <Button
          style={{ marginLeft: "510px", marginTop: "-82px" }}
          onClick={() => deleteRecord()}
          variant="outlined"
          size="large"
          color="secondary"
          startIcon={<DeleteIcon />}
        >
          Delete
        </Button>
      </div>

      <div className={style.tableEmp}>
        <h2 style={{ marginLeft: "20px" }}>Students</h2>
        <div>
          <TableCourseStudent rows={students}></TableCourseStudent>
        </div>
      </div>
    </div>
  );
}
