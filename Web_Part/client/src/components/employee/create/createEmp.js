import React from "react";
import style from "./createEmp.module.css";
import axios from "axios";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import DeleteIcon from '@mui/icons-material/Delete';
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";
import SaveIcon from "@mui/icons-material/Save";
import Select from "@mui/material/Select";
import TableEmp from "../../../components/tableEmployee/tableEmployee";

export default function BasicTextFields() {
  const [gender, setGender] = React.useState("");
  const [emptype, setEmptype] = React.useState("");
  const [name, setName] = React.useState("");
  const [surname, setSurname] = React.useState("");
  const [ssn, setSSN] = React.useState("");
  const [Address, setAddress] = React.useState("");
  const [Email, setEmail] = React.useState("");
  const [Phone, setPhone] = React.useState("");
  const [salary, setSalary] = React.useState("");
  const [nameErr, setNameErr] = React.useState(false);
  const [surnameErr, setSurnameErr] = React.useState(false);
  const [phoneErr, setPhoneErr] = React.useState(false);
  const [ssnErr, setSsnErr] = React.useState(false);
  const [employee, setEmployee] = React.useState([]);
  const [delSsn, setDelSsn] = React.useState("");
  const [delName, setDelName] = React.useState("");
  const [delSurname, setDelSurname] = React.useState("");
  const [delSsnErr, setDelSsnErr] = React.useState(false);


  const handleSubmit = () => {
    if (name.length < 2) {
      setNameErr(true);
      return;
    } else setNameErr(false);

    if (surname.length < 2) {
      setSurnameErr(true);
      return;
    } else setSurnameErr(false);

    if (ssn.length < 1) {
      setSsnErr(true);
      return;
    } else {
      setSsnErr(false);
    }

    if (Phone.length != 10) {
      setPhoneErr(true);
      return;
    } else setPhoneErr(false);
    console.log(ssn);
    let qry =
      "INSERT INTO Employee (SSN, Name, Surname, Salary, Gender, PhoneNo, Address,Email,EmployeeType)" +
      "VALUES ('" +
      ssn +
      "', '" +
      name +
      "', '" +
      surname +
      "', '" +
      salary +
      "','" +
      gender +
      "','" +
      Phone +
      "','" +
      Address +
      "','" +
      Email +
      "','" +
      emptype +
      "')";

      axios
      .post("http://localhost:4000/EmployeeOperation", { qry })
      .then((res) => {
          console.log(res);
          alert("Employee has been created!")
          axios
          .get("http://localhost:4000/Employee")
          .then((res) => {
            console.log(res.data);
            setEmployee(
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
        console.log(JSON.parse(e.request.response).error);
        alert(JSON.parse(e.request.response).error);
      });
  };

  const deleteEmployee = () => {
    if(delSsn=="" || delSsnErr) return

    axios.post('http://localhost:4000/deleteEmployee', { data:{empSSN:delSsn} }).then((res) => {
      console.log(res);
      alert("Employee has been deleted!")
      setDelSsn("")
      setDelName("")
      setDelSurname("")
      setDelSsnErr(false)
      axios
      .get("http://localhost:4000/Employee")
      .then((res) => {
        console.log(res.data);
        setEmployee(
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



  }

  const handleDelChange = (e) => {
      setDelSsn(e)
      console.log(e);

      axios
      .post("http://localhost:4000/EmployeeInfo",{ empSSN: e })
      .then((res) => {
        setDelName(res.data[0].Name)
        setDelSurname(res.data[0].Surname)        
        setDelSsnErr(false)
      })
      .catch((err) => {
        console.log(err);
        setDelSsnErr(true)
      });

  };

  React.useEffect(() => {
    axios
      .get("http://localhost:4000/Employee")
      .then((res) => {
        console.log(res.data);
        setEmployee(
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
      <h1>Create Employee </h1>
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
          value={name}
          onChange={(name) => setName(name.target.value)}
          id="outlined-basic"
          label="Name"
          variant="outlined"
        />
        <TextField
          helperText={
            surnameErr ? "Incorrect entry. Write a proper Surname." : ""
          }
          error={surnameErr}
          required
          value={surname}
          onChange={(surname) => setSurname(surname.target.value)}
          id="outlined-basic"
          label="Surname"
          variant="outlined"
        />
        <TextField
          type="number"
          helperText={ssnErr ? "Incorrect entry. Write a proper SSN." : ""}
          error={ssnErr}
          required
          value={ssn}
          onChange={(ssn) => setSSN(ssn.target.value)}
          id="outlined-basic"
          label="SSN"
          variant="outlined"
        />
        <TextField
          value={Address}
          onChange={(Address) => setAddress(Address.target.value)}
          id="outlined-basic"
          label="Address"
          variant="outlined"
        />
        <TextField
          value={Email}
          onChange={(Email) => setEmail(Email.target.value)}
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
            onChange={(Phone) => setPhone(Phone.target.value)}
            id="outlined-adornment-amount"
            startAdornment={
              <InputAdornment position="start">+90</InputAdornment>
            }
            label="Phone Number *"
          />
        </FormControl>

        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Employee Type</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={emptype}
            label="Employee Type"
            onChange={(emptype) => setEmptype(emptype.target.value)}
          >
            <MenuItem value={"I"}>Instructor</MenuItem>
            <MenuItem value={"C"}>Cleaner</MenuItem>
            <MenuItem value={"S"}>Security</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Gender</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={gender}
            label="Gender"
            onChange={(gender) => setGender(gender.target.value)}
          >
            <MenuItem value={"F"}>Female</MenuItem>
            <MenuItem value={"M"}>Male</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth sx={{ m: 1 }}>
          <InputLabel htmlFor="outlined-adornment-amount">Salary</InputLabel>
          <OutlinedInput
            type="number"
            id="outlined-adornment-amount"
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            value={salary}
            onChange={(salary) => setSalary(salary.target.value)}
            label="Salary"
          />
        </FormControl>
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
        <h2 style={{ marginBottom: "20px" }}>Delete Employee</h2>
        <TextField
          value={delSsn}
          onChange={(e) => handleDelChange(e.target.value)}
          id="standard-basic"
          label="Employee ID"
          variant="standard"
        />

        <TextField
          disabled
          id="outlined-disabled"
          label="Name"
        value={delName}
          style={{ marginLeft: "75px" }}
          error={delSsnErr}
          helperText={
            delSsnErr ? "Incorrect SSN" : ""
          }
        />
        <TextField
          disabled
          error={delSsnErr}
          helperText={
            delSsnErr ? "Incorrect SSN" : ""
          }
          id="outlined-disabled"
          label="Surname"
          value={delSurname}
          style={{ marginLeft: "20px"}}
        />
             <Button style={{ marginLeft: "550px",marginTop:"50px" }}
             onClick={()=>deleteEmployee()}
             disabled={delSsnErr || delSsn==""}
              variant="outlined" size="large" color="secondary" startIcon={<DeleteIcon />}>
        Delete
      </Button>
      </div>

      <div className={style.tableEmp}>
        <h2 style={{ marginLeft: "20px" }}>Employee</h2>
        <div>
          <TableEmp rows={employee}></TableEmp>
        </div>
      </div>
    </div>
  );
}
