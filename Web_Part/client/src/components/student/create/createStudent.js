import React from "react";
import style from "./createStudent.module.css";
import axios from "axios";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import DeleteIcon from "@mui/icons-material/Delete";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateTimePicker from "@mui/lab/DateTimePicker";
import DateAdapter from "@mui/lab/AdapterDateFns";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";
import SaveIcon from "@mui/icons-material/Save";
import Select from "@mui/material/Select";
import TableStudent from "./../../tableStudent/tableStudent";

export default function BasicTextFields() {
  const [students, setStudents] = React.useState([]);

  const [StudentName, setStudentName] = React.useState("");
  const [StudentSurname, setStudentSurname] = React.useState("");
  const [StudentID, setStudentID] = React.useState("");
  const [Gender, setGender] = React.useState("");
  const [Email, setEmail] = React.useState("");
  const [date, setDate] = React.useState();
  const [Phone, setPhone] = React.useState("");
  const [BirthDate, setBirthDate] = React.useState(false);

  const [nameErr, setNameErr] = React.useState(false);
  const [surnameErr, setSurnameErr] = React.useState(false);
  const [phoneErr, setPhoneErr] = React.useState(false);
  const [ssnErr, setSsnErr] = React.useState(false);

  const [delId, setDelId] = React.useState("");
  const [delName, setDelName] = React.useState("");
  const [delSurname, setDelSurname] = React.useState("");

  const [delIdErr, setDelIdErr] = React.useState(false);

  const handleSubmit = () => {
    if (StudentName.length < 2) {
      setNameErr(true);
      return;
    } else setNameErr(false);

    if (StudentSurname.length < 2) {
      setSurnameErr(true);
      return;
    } else setSurnameErr(false);

    if (StudentID.length == 0) {
      setSsnErr(true);
      return;
    } else setSsnErr(false);

    if (Phone.length != 10) {
      setPhoneErr(true);
      return;
    } else setPhoneErr(false);

    if (BirthDate.length < 1) {
      return;
    } else {
      //setSsnErr(false);
    }

    let qry =
      "INSERT INTO Student (StudentID, StudentName, StudentSurname, Gender, Email, PhoneNo,BirthDate)" +
      " VALUES ('" +
      StudentID +
      "', '" +
      StudentName +
      "', '" +
      StudentSurname +
      "', '" +
      Gender +
      "','" +
      Email +
      "','" +
      Phone +
      "','" +
      BirthDate +
      "')";

    console.log(qry);

    axios
      .post("http://localhost:4000/createStudent", { qry })
      .then((res) => {
        console.log(res);
        let age =2022-BirthDate.substring(0,4);
        if(age<18)
          alert("PLEASE CREATE A PARENT RECORD FOR THIS "+age+" YEARS OLD CHILD AND DON'T FORGET TO WANT THEM PREPARE PERMISSION DOCUMENTS.");
        alert("STUDENT HAS BEEN CREATED !");        
        axios
          .get("http://localhost:4000/Student")
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

  const deleteEmployee = () => {
    if (delId == "" || delIdErr) return;
    axios
      .post("http://localhost:4000/deleteStudent", { data: { StudentID: delId } })
      .then((res) => {
        console.log(res);
        alert("Student has been deleted!");
        setDelId("");
        setDelName("");
        setDelSurname("");
        setDelIdErr(false);
        axios
          .get("http://localhost:4000/Student")
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
        console.log(err);
      });
  };

  const handleDelChange = (e) => {

    setDelId(e);
    console.log(e);

    axios
      .post("http://localhost:4000/studentInfo", { StudentID: e })
      .then((res) => {
        
        setDelName(res.data[0].StudentName.trim());
        setDelSurname(res.data[0].StudentSurname.trim());
        setDelIdErr(false);
      })
      .catch((err) => {
        console.log(err);
        setDelName("");
        setDelSurname("");
        setDelIdErr(true);
      });
  };

  React.useEffect(() => {
    axios
      .get("http://localhost:4000/Student")
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
      <h1>Create Student </h1>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "35ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          helperText={nameErr ? "Incorrect entry. Write a proper Name." : ""}
          error={nameErr}
          required
          value={StudentName}
          onChange={(name) => setStudentName(name.target.value)}
          id="outlined-basic"
          label="Student Name"
          variant="outlined"
        />
        <TextField
          helperText={
            surnameErr ? "Incorrect entry. Write a proper Surname." : ""
          }
          error={surnameErr}
          required
          value={StudentSurname}
          onChange={(surname) => setStudentSurname(surname.target.value)}
          id="outlined-basic"
          label="Student Surname"
          variant="outlined"
        />
        <TextField
          type="number"
          helperText={ssnErr ? "Incorrect entry. Write a proper SSN." : ""}
          error={ssnErr}
          required
          value={StudentID}
          onChange={(ssn) => setStudentID(ssn.target.value)}
          id="outlined-basic"
          label="Student ID"
          variant="outlined"
        />
        <TextField
          value={Email}
          onChange={(Address) => setEmail(Address.target.value)}
          id="outlined-basic"
          label="Email"
          variant="outlined"
        />
  

        <FormControl fullWidth sx={{ m: 1 }}>
          <InputLabel required htmlFor="outlined-adornment-amount">
            Phone Number
          </InputLabel>
          <OutlinedInput
            error={phoneErr}
            type="number"
            value={Phone}
            onChange={(e) => {
              setPhone(e.target.value);
            }}
            id="outlined-adornment-amount"
            startAdornment={
              <InputAdornment position="start">+90</InputAdornment>
            }
            label="Phone Number *"
          />
        </FormControl>

        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Gender</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={Gender}
            label="Gender"
            onChange={(gender) => setGender(gender.target.value)}
          >
            <MenuItem value={"F"}>Female</MenuItem>
            <MenuItem value={"M"}>Male</MenuItem>
          </Select>
        </FormControl>
        <LocalizationProvider dateAdapter={DateAdapter}>
          <DateTimePicker
            label="Date&Time picker"
            value={date}
            onChange={(e) => {            
              let str = e.toLocaleDateString()
              let day = str[0] + str[1];
              let month = str[3] + str[4];
              let year = str[6] + str[7] + str[8] + str[9];
              console.log(year+month+day+" "+e.toLocaleTimeString());
              let dt = year+month+day+" "+e.toLocaleTimeString()
              setDate(e);
              setBirthDate(dt);
            }}
            renderInput={(params) => <TextField required {...params} />}
          />
        </LocalizationProvider>

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

      <div style={{ marginBottom: "100px", marginTop: "100px" }}>
        <h2 style={{ marginBottom: "20px" }}>Delete Student</h2>
        <TextField
          value={delId}
          onChange={(e) => handleDelChange(e.target.value)}
          id="standard-basic"
          label="Student ID"
          variant="standard"
        />

        <TextField
          disabled
          id="outlined-disabled"
          label="Name"
          value={delName}
          style={{ marginLeft: "75px" }}
          error={delIdErr}
          helperText={delIdErr ? "Incorrect SSN" : ""}
        />
        <TextField
          disabled
          error={delIdErr}
          helperText={delIdErr ? "Incorrect SSN" : ""}
          id="outlined-disabled"
          label="Surname"
          value={delSurname}
          style={{ marginLeft: "20px" }}
        />
        <Button
          style={{ marginLeft: "550px", marginTop: "50px" }}
          onClick={() => deleteEmployee()}
          disabled={delIdErr || delId == ""}
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
          <TableStudent rows={students}></TableStudent>
        </div>
      </div>
    </div>
  );
}
