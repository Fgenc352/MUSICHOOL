import React from "react";
import style from "./updateEmp.module.css";
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
import TableEmp from "../../tableEmployee/tableEmployee";

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
  const [employee, setEmployee] = React.useState([]);
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
      setDelSsnErr(true);
      return;
    } else {
      setDelSsnErr(false);
    }

    if (Phone.length != 10) {
      setPhoneErr(true);
      return;
    } else setPhoneErr(false);
    console.log(ssn);
    let qry =
      "UPDATE  Employee SET  SSN=\'" +ssn +"'\,"+"Name=\'" + name +"'\,"+"Surname=\'" +surname +"'\,"+"Salary=\'" +salary +"'\,"+"Gender=\'"+gender +"'\,"+" PhoneNo=\'"+Phone +"'\,"+"Address=\'"+Address +"'\,"+"Email=\'"+Email +"'\,"+"EmployeeType=\'"+emptype+"'\ where SSN=\'"+ssn+"\'"
  console.log(qry);

      axios
      .post("http://localhost:4000/EmployeeUpdate", { qry })
      .then((res) => {
          console.log(res);
          alert("Employee has been updated!")
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
        console.log(e.request.response);
        alert(JSON.parse(e.request.response).error);
      });
  };

  const handleDelChange = (e) => {
    setSSN(e)
    console.log(e);

    axios
    .post("http://localhost:4000/EmployeeInfo",{ empSSN: e })
    .then((res) => {   
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
      <h1>Update Employee Info</h1>
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
          value={ssn}
          onChange={(e) => handleDelChange(e.target.value)}
          id="standard-basic"
          label="Employee SSN"
          variant="standard"
          error={delSsnErr}
          required
          helperText={
            delSsnErr ? "Incorrect SSN" : ""
          }
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
          disabled={delSsnErr}
        >
          Save
        </Button>
      </Box>


    

      <div className={style.tableEmp}>
        <h2 style={{ marginLeft: "20px" }}>Employee</h2>
        <div>
          <TableEmp rows={employee}></TableEmp>
        </div>
      </div>
    </div>
  );
}
