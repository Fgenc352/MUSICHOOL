import React, { useState } from "react";
import style from "./hello.module.css";
import Button from "@mui/material/Button";
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import axios from "axios";

const Greet = (props) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errorID, setErrorID] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);

  
//   useEffect(() => {
//     axios
//       .get("http://localhost:4000/course")
//       .then((res) => {
//         console.log(res.data);
//         setCourses(res.data);
//       })
//       .catch((e) => console.log(JSON.parse(e.request.response).error));
//   }, []);


  function handleClickShowPassword(){
      if(showPassword) setShowPassword(false);
      else setShowPassword(true);
  }


  function login() {
    if (userName == "") {
      setErrorID(true);
    
       if (password == "")   setErrorPassword(true);
       else setErrorPassword(false);
      
      return;
    }

    if (password == "") {
      setErrorPassword(true);
      
      if (userName == "") setErrorID(true);
      else setErrorID(false);
      
      return;
    }

    setErrorPassword(false);
    setErrorID(false);


    axios
      .post("http://localhost:4000/login", {
        userName,
        password
      })
      .then(response => {
        console.log(...response.data)
        alert("success!")
        let key = ""+response.data[0].UserName.trim()
        let value = ""+response.data[0].Password.trim()
        localStorage.setItem(key,value);
        window.location = 'Admin';
      })
      .catch((err) => {
          setErrorPassword(true)
          setErrorID(true)
          alert(JSON.parse(err.request.response).error)
          console.log(JSON.parse(err.request.response).error)
      });
  }

  return (
    <div className={style.hello}>
        <div><h1>MUSICHOOL</h1></div>
      <FormGroup >
          <TextField 
          sx={{ marginTop: 4, marginLeft:"auto",marginRight:"auto"}} 
            error={errorID}
            id="outlined-basic"
            label="User Name"
            size="small"
            variant="outlined"
            value={userName}
            className={style.inputs}
            onChange={(e) => setUserName(e.target.value)}
          />
        <FormControl  size="small"
         sx={{ marginTop: 2, marginLeft:"auto", marginRight:"auto",width: '500px'}} 
        variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            error={errorPassword}
            onChange={e=>setPassword(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={e=>e.preventDefault()}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
    
        <Button variant="contained" id={style.Buttons} onClick={login}>
          Sign In
        </Button>
        {/* <FormControl>

        <InputLabel htmlFor="my-input">Email address</InputLabel>
        <Input id="my-input" aria-describedby="my-helper-text" />
         <FormHelperText id="my-helper-text">
          We'll never share your email.
        </FormHelperText> 
      </FormControl> */}
      </FormGroup>
    </div>
  );
};

export default Greet;
