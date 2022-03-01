import React from "react";
import style from "./createParent.module.css";
import axios from "axios";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import DeleteIcon from "@mui/icons-material/Delete";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";
import SaveIcon from "@mui/icons-material/Save";
import TableParent from "../../tableParent/tableParent";

export default function BasicTextFields() {
  const [parents, setParents] = React.useState([]);

  const [ParentName, setParentName] = React.useState("");
  const [ParentSurname, setParentSurname] = React.useState("");
  const [StudentID, setStudentID] = React.useState("");
  const [Phone, setPhone] = React.useState("");

  const [StudentName, setStudentName] = React.useState("");

  const [nameErr, setNameErr] = React.useState(false);
  const [surnameErr, setSurnameErr] = React.useState(false);
  const [phoneErr, setPhoneErr] = React.useState(false);
  const [studentIdErr, setStudentIdErr] = React.useState(false);

  const [delId, setDelId] = React.useState("");
  const [delName, setDelName] = React.useState("");

  const [delIdErr, setDelIdErr] = React.useState(false);
  const [delNameErr, setDelNameErr] = React.useState(false);

  const handleSubmit = () => {
    if (StudentID.length == 0) {
      setStudentIdErr(true);
      return;
    } else setStudentIdErr(false);

    if (ParentName.length < 2) {
      setNameErr(true);
      return;
    } else setNameErr(false);

    if (ParentSurname.length < 2) {
      setSurnameErr(true);
      return;
    } else setSurnameErr(false);

  
    if (Phone.length != 10) {
      setPhoneErr(true);
      return;
    } else setPhoneErr(false);

    let qry =
      "INSERT INTO Parent (StudentID, ParentName, ParentSurname, PhoneNo)" +
      " VALUES ('" +
      StudentID +
      "', '" +
      ParentName +
      "', '" +
      ParentSurname +
      "', '" +
      Phone +
      "')";

    console.log(qry);

    axios
      .post("http://localhost:4000/createParent", { qry, StudentID })
      .then((res) => {
        console.log(res);
        alert("Parent has been created!");
        axios
          .get("http://localhost:4000/Parent")
          .then((res) => {
            console.log(res.data);
            setParents(
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



  const deleteParent = () => {

    if (delId.length <1) {
      setDelIdErr(true);
      return;
    } else setDelIdErr(false);

    if (delName.length < 2) {
      setDelNameErr(true);
      return;
    } else setDelNameErr(false);


    axios
      .post("http://localhost:4000/deleteParent", {
        data: { StudentID: delId, ParentName:delName },
      })
      .then((res) => {
        console.log(res);
        alert("Parent has been deleted!");
        setDelId("");
        setDelName("");
        setDelNameErr(false);
        setDelIdErr(false);
        axios
          .get("http://localhost:4000/Parent")
          .then((res) => {
            console.log(res.data);
            setParents(
              res.data.map((e, i) => {
                return { id: i + 1, e };
              })
            );
          })
          .catch((e) => {
            console.log(e);
            console.log(JSON.parse(e.request.response).error);
            alert(JSON.parse(e.request.response).error);
          });
      })
      .catch((err) => {
        console.log(err.response.data.error);
        alert(err.response.data.error)
      });
  };


  const handleStudentID = (e) => {
    setStudentID(e);
    console.log(e);

    axios
      .post("http://localhost:4000/studentInfo", { StudentID: e })
      .then((res) => {
        setStudentName(res.data[0].StudentName.trim());
        console.log(StudentName);
        setStudentIdErr(false);
      })
      .catch((err) => {
        console.log(err);
        setStudentName("");
        setStudentIdErr(true);
      });
  };

  React.useEffect(() => {
    axios
      .get("http://localhost:4000/Parent")
      .then((res) => {
        console.log(res.data);
        setParents(
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
      <h1>Create Parent</h1>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "35ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          value={StudentID}
          required
          onChange={(e) => handleStudentID(e.target.value)}
          id="outlined-basic"
          label="Student ID"
          variant="outlined"
          error={studentIdErr}
        />

        <TextField
          disabled
          value={StudentName}
          id="outlined-basic"
          label="Student Name"
          variant="outlined"
        />

        <TextField
          helperText={nameErr ? "Incorrect entry. Write a proper Name." : ""}
          error={nameErr}
          required
          value={ParentName}
          onChange={(name) => setParentName(name.target.value)}
          id="outlined-basic"
          label="Parent Name"
          variant="outlined"
        />
        <TextField
          helperText={
            surnameErr ? "Incorrect entry. Write a proper Surname." : ""
          }
          error={surnameErr}
          required
          value={ParentSurname}
          onChange={(surname) => setParentSurname(surname.target.value)}
          id="outlined-basic"
          label="Parent Surname"
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

      <div style={{ marginBottom: "50px", marginTop: "100px", marginLeft:"40px"}}>
        <h2 style={{ marginBottom: "20px" }}>Delete Parent</h2>
        <TextField
        style={{ marginRight: "130px" }}
          value={delId}
          onChange={(e) => setDelId(e.target.value)}
          id="standard-basic"
          label="Student ID"
          variant="standard"
          error={delIdErr}
        />
          <TextField
          value={delName}
          onChange={(e) => setDelName(e.target.value)}
          id="standard-basic"
          label="Parent Name"
          variant="standard"
          error={delNameErr}
        />




        <Button
          style={{ marginLeft: "370px", marginTop: "40px" }}
          onClick={() => deleteParent()}
          variant="outlined"
          size="large"
          color="secondary"
          startIcon={<DeleteIcon />}
        >
          Delete
        </Button>
      </div>

      <div className={style.tableEmp} style={{ marginLeft: "20px" }}>
        <h2 style={{ marginLeft: "20px" }}>Parents</h2>
        <div>
          <TableParent rows={parents}></TableParent>
        </div>
      </div>
    </div>
  );
}
