import React from "react";
import style from "./updateStudent.module.css";
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
import TableStudent from "../../tableStudent/tableStudent";

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
  const [birthErr, setBirthErr] = React.useState(false);


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

    if (BirthDate.length < 1 || !BirthDate) {
      setBirthErr(true)
      return;
    } else {
      setBirthErr(false)
    }
    let qry =
    "UPDATE  Student SET  StudentID=\'" +StudentID +"'\,"+"StudentName=\'" + StudentName +"'\,"+"StudentSurname=\'" +StudentSurname +"'\,"+"Gender=\'" +Gender +"'\,"+"Email=\'"+Email +"'\,"+" PhoneNo=\'"+Phone +"'\,"+"BirthDate=\'"+BirthDate +"'\ where StudentID=\'"+StudentID+"\'"
console.log(qry);


    axios
      .post("http://localhost:4000/updateStudent", { qry })
      .then((res) => {
        console.log(res);
        alert("Student has been updated!");
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

 
  const handleDelChange = (e) => {
    setStudentID(e);

    axios
      .post("http://localhost:4000/studentInfo", { StudentID: e })
      .then((res) => {
        setDelIdErr(false);
      })
      .catch((err) => {
        console.log(err);        
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
      <h1>Update Student Information</h1>
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
          error={delIdErr}
          required
          value={StudentID}
          onChange={(e) => handleDelChange(e.target.value)}
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
            renderInput={(params) => <TextField  required {...params} />}
           
          />
        </LocalizationProvider>

        <Button
          id={style.but}
          variant="contained"
          size="large"
          startIcon={<SaveIcon />}
          onClick={() => handleSubmit()}
        >
          Update
        </Button>
      </Box>


      <div className={style.tableEmp}>
        <h2 style={{ marginLeft: "20px" }}>Students</h2>
        <div>
          <TableStudent rows={students}></TableStudent>
        </div>
      </div>
    </div>
  );
}
