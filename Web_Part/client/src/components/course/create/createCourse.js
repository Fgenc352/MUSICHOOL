import React from "react";
import style from "./createCourse.module.css";
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
import TableCourse from "./../../tableCourse/tableCourse"




export default function BasicTextFields() {
  const [courses, setCourses] = React.useState([]);

  const [CourseCode, setCourseCode] = React.useState("");
  const [InstructorSSN, setInstructorSSN] = React.useState("");
  const [InstrumentName, setInstrumentName] = React.useState("");
  const [CourseHour, setCourseHour] = React.useState("");
  const [Quota, setQuota] = React.useState("");
  const [Price, setPrice] = React.useState("");

  const [CourseCodeErr, setCourseCodeErr] = React.useState(false);
  const [InstructorSSNErr, setInstructorSSNErr] = React.useState(false);
  const [InstrumentNameErr, setInstrumentNameErr] = React.useState(false);
  const [CourseHourErr, setCourseHourErr] = React.useState(false);
  const [QuotaErr, setQuotaErr] = React.useState(false);
  const [PriceErr, setPriceErr] = React.useState(false);
  
  const [delCode, setDelCode] = React.useState("");
  const [delInstrument, setDelInstrument] = React.useState("");
  const [delInstructorSSN, setDelInstructorSSN] = React.useState("");
  const [delCodeErr, setDelCodeErr] = React.useState(false);


  const handleSubmit = () => {
    if (CourseCode.length <2) {
      setCourseCodeErr(true);
      return;
    } else setCourseCodeErr(false);

    if (InstrumentName.length < 2) {
      setInstrumentNameErr(true);
      return;
    } else setInstrumentNameErr(false);

    if (InstructorSSN.length < 1) {
      setInstructorSSNErr(true);
      return;
    } else {
      setInstructorSSNErr(false);
    }
    if (CourseHour-0 < 1) {
      setCourseHourErr(true);
      return;
    } else {
      setCourseHourErr(false);
    }
    if (Quota-0 < 1) {
      setQuotaErr(true);
      return;
    } else {
      setQuotaErr(false);
    }
    if (Price-0 < 1) {
      setPriceErr(true);
      return;
    } else {
      setPriceErr(false);
    }
    

    let qry =
      "INSERT INTO Course (CourseCode, InstructorSSN, InstrumentName, CourseHour, Quota, Price)" +
      "VALUES ('" +
      CourseCode.trim() +
      "', '" +
      InstructorSSN +
      "', '" +
      InstrumentName +
      "', '" +
      CourseHour +
      "','" +
      Quota +
      "','" +
      Price +
      "')";

      axios
      .post("http://localhost:4000/createCourse", { qry })
      .then((res) => {
          console.log(res);
          alert("Course has been created!")
          axios
          .get("http://localhost:4000/course")
          .then((res) => {
            console.log(res.data);
            setCourses(
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

  const deleteCourse = () => {
    if(delCode=="" || delCodeErr) return

    axios.post('http://localhost:4000/deleteCourse', { data:{CourseCode:delCode.trim()} }).then((res) => {
      console.log(res);
      alert("Course has been deleted!")
      setDelCode("")
      setDelInstructorSSN("")
      setDelInstrument("")
      setDelCodeErr(false)
      axios
      .get("http://localhost:4000/course")
      .then((res) => {
        console.log(res.data);
        setCourses(
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
      alert(JSON.parse(err.request.response).error)
    });



  }

  const handleDelChange = (e) => {
      setDelCode(e)

      axios
      .post("http://localhost:4000/CourseInfo",{ courseCode: e })
      .then((res) => {
        setDelCode(res.data[0].CourseCode)
        setDelInstrument(res.data[0].InstrumentName)   
        setDelInstructorSSN(res.data[0].InstructorSSN)
        setDelCodeErr(false)
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        setDelCodeErr(true)
      });

  };

  React.useEffect(() => {
    axios
      .get("http://localhost:4000/course")
      .then((res) => {
        console.log(res.data);
        setCourses(
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
      <h1>Create Course</h1>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "35ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          helperText={CourseCodeErr ? "Incorrect entry. Write a proper Name." : ""}
          error={CourseCodeErr}
          required
          value={CourseCode}
          onChange={(CourseCode) => setCourseCode(CourseCode.target.value)}
          id="outlined-basic"
          label="Course Code"
          variant="outlined"
        />
          <TextField
          helperText={InstrumentNameErr ? "Incorrect entry." : ""}
          error={InstrumentNameErr}
          required
          value={InstrumentName}
          onChange={(InstrumentName) => setInstrumentName(InstrumentName.target.value)}
          id="outlined-basic"
          label="Instrument Name"
          variant="outlined"
        />
        <TextField
          helperText={
            InstructorSSNErr ? "Incorrect entry. Write a proper Surname." : ""
          }
          error={InstructorSSNErr}
          required
          value={InstructorSSN}
          onChange={(InstructorSSN) => setInstructorSSN(InstructorSSN.target.value)}
          id="outlined-basic"
          label="Instructor SSN"
          variant="outlined"
        />
      
        <TextField
          value={CourseHour}
          error={CourseHourErr}
          onChange={(CourseHour) => setCourseHour(CourseHour.target.value)}
          id="outlined-basic"
          label="Course Hour"
          variant="outlined"
        />
        <TextField
        required
        error={QuotaErr}
          value={Quota}
          onChange={(Quota) => setQuota(Quota.target.value)}
          id="outlined-basic"
          label="Quota"
          variant="outlined"
        />


        <FormControl fullWidth sx={{ m: 1 }}>
          <InputLabel required htmlFor="outlined-adornment-amount">Price</InputLabel>
          <OutlinedInput
          required
          error={PriceErr}
            type="number"
            id="outlined-adornment-amount"
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            value={Price}
            onChange={(Price) => setPrice(Price.target.value)}
            label="Price"
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
        <h2 style={{ marginBottom: "20px" }}>Delete Course</h2>
        <TextField
          value={delCode}
          onChange={(e) => handleDelChange(e.target.value)}
          id="standard-basic"
          label="Course Code"
          variant="standard"
        />

        <TextField
          disabled
          id="outlined-disabled"
          label="Instrument Name"
        value={delInstrument}
          style={{ marginLeft: "75px" }}
          error={delCodeErr}
          helperText={
            delCodeErr ? "Incorrect Course Code" : ""
          }
        />
        <TextField
          disabled
          error={delCodeErr}
          helperText={
            delCodeErr ? "Incorrect Course Code" : ""
          }
          id="outlined-disabled"
          label="Instructor SSN"
          value={delInstructorSSN}
          style={{ marginLeft: "20px"}}
        />
             <Button style={{ marginLeft: "550px",marginTop:"50px" }}
             onClick={()=>deleteCourse()}
             disabled={delCodeErr || delCode==""}
              variant="outlined" size="large" color="secondary" startIcon={<DeleteIcon />}>
        Delete
      </Button>
      </div>

      <div className={style.tableEmp}>
        <h2 style={{ marginLeft: "20px" }}>Courses</h2>
        <div>
          <TableCourse rows={courses}></TableCourse>
        </div>
      </div>
    </div>
  );
}
