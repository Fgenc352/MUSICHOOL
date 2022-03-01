import * as React from "react";
import style from "./admin.module.css";
import axios from "axios";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import TableCourse from "./../components/tableCourse/tableCourse";
import TableEmployee from "./../components/tableEmployee/tableEmployee";
import TableStudent from "./../components/tableStudent/tableStudent";
import CreateEmployee from "./../components/employee/create/createEmp"
import CreateCourse from "./../components/course/create/createCourse"
import TableParent from "./../components/tableParent/tableParent"
import UpdateEmployee from "./../components/employee/update/updateEmp"
import UpdateCourse from "./../components/course/update/updateCourse"
import CreateStudent from "./../components/student/create/createStudent"
import UpdateStudent from "./../components/student/update/updateStudent"
import CreateParent from "./../components/parent/create/createParent"
import UpdateParent from "./../components/parent/update/updateParent"
import StudentEnrollCourse from "./../components/student/enrollCourse/enrollCourse"

const pages = [ "Course","Parent","Staff"];
const pages3 = ["Student"]
const settings = ["Create/Delete", "Update"];
const staffPages =  ["Create/Delete", "Update","Assaing Course"];
const studentPages =  ["Create/Delete", "Update","Enroll Course"];

const Admin = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [anchorElStudent, setAnchorElStudent] = React.useState(null);
  const [anchorElStaff, setAnchorElStaff] = React.useState(null);
  const [isSelected, setIsSelected] = React.useState(false);
  const [selectedTable, setSelectedTable] = React.useState(false);
  const [selectedOperation, setSelectedOperation] = React.useState(false);
  const [courses, setCourses] = React.useState([]);
  const [students, setStudents] = React.useState([]);
  const [employee, setEmployee] = React.useState([]);
  const [parents, setParent] = React.useState([]);

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
      .catch((e) => console.log(JSON.parse(e.request.response).error));


      axios
      .get("http://localhost:4000/Parent")
      .then((res) => {
        console.log(res.data);  
        setParent(  res.data.map((e, i) => {
          return { id: i + 1, e };
        }))  
      })
      .catch((e) => console.log(JSON.parse(e.request.response).error));


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
      .catch((e) => console.log(JSON.parse(e.request.response).error));

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
      .catch((e) => console.log(JSON.parse(e.request.response).error));
  }, []);


  const handleOpenStaffMenu = (event) => {
    setAnchorElStaff(event.currentTarget);
  };

  const handleOpenStudentMenu = (event) => {
    setAnchorElStudent(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleLogout = () => {
    localStorage.removeItem("admin");
    window.location = "/";
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
    setAnchorElStaff(null)
    setAnchorElStudent(null)
    
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
    setAnchorElStaff(null)
    setAnchorElStudent(null)
  };

const generalView = isSelected?null:( <div>
    <h1 style={{ textAlign: "center", marginTop: "100px" }}>
      General view of the tables
    </h1>

    <div className={style.tableCourse}>
      <h2 style={{ marginLeft: "20px" }}>Courses</h2>
      <div>
        <TableCourse rows={courses}></TableCourse>
      </div>
    </div>

    <div className={style.tableEmp}>
      <h2 style={{ marginLeft: "20px" }}>Employee</h2>
      <div>
        <TableEmployee rows={employee}></TableEmployee>
      </div>
    </div>

    <div className={style.tableEmp}>
      <h2 style={{ marginLeft: "21px" }}>Student</h2>
      <div>
        <TableStudent rows={students}></TableStudent>
      </div>
    </div>
    
    
    <div className={style.tableParent}>
      <h2 style={{ marginLeft: "25px" }}>Parent</h2>
      <div>
        <TableParent rows={parents}></TableParent>
      </div>
    </div>

    </div>)

  return (
    <div>
      <div>
        <AppBar
          position="static"
          style={{ backgroundColor: "#0c82d1", paddingLeft: "50px" }}
        >
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
              >
                <div className={style.msc} style={{ marginRight: "60px" }} onClick={()=>   window.location = "/"} > MUSICHOOL</div>
              </Typography>
              <Box sx={{ flexGrow: 0, display: { xs: "none", md: "flex" } }}>
                {pages.map((e, i) => (
                  <div key={i * 99} >
                    <Tooltip title="Open Options">
                      <Button
                        variant="contained"
                        onClick={(event)=>{
                            handleOpenUserMenu(event)
                            setSelectedTable(event.nativeEvent.srcElement.innerText)
                             console.log(event.nativeEvent.srcElement.innerText);                                
                            }}
                        sx={{
                          my: 2,
                          marginRight: "25px",
                          color: "white",
                          display: "block",
                          backgroundColor: "transparent",
                          boxShadow: "none",
                        }}
                      >
                        {e}
                      </Button>
                    </Tooltip>
                    <Menu
                      sx={{ mt: "45px" }}
                      id="menu-appbar"
                      anchorEl={anchorElUser}
                      anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      open={Boolean(anchorElUser)}
                      onClose={handleCloseUserMenu}
                    >
                      {settings.map((setting, i) => (
                          <MenuItem
                            key={setting}
                            key={i * 71}
                            onClick={(event)=>{
                              handleCloseNavMenu(event)
                              setSelectedOperation(event.nativeEvent.srcElement.innerText)
                              console.log(event.nativeEvent.srcElement.innerText);
                              setIsSelected(true)                                    
                              }}
                          >        
                            <Typography textAlign="center">{ setting}
                            </Typography>
                          </MenuItem>
                        ))
                      }
                    </Menu>
                  </div>
                ))}

              </Box>

            
              <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                {pages3.map((e, i) => (
                  <div key={i * 99} >
                    <Tooltip title="Open Options">
                      <Button
                        variant="contained"
                        onClick={(event)=>{
                          handleOpenStudentMenu(event)
                            setSelectedTable(event.nativeEvent.srcElement.innerText)
                             console.log(event.nativeEvent.srcElement.innerText);                                
                            }}
                        sx={{
                          my: 2,
                          marginRight: "25px",
                          color: "white",
                          display: "block",
                          backgroundColor: "transparent",
                          boxShadow: "none",
                        }}
                      >
                        {e}
                      </Button>
                    </Tooltip>
                    <Menu
                      sx={{ mt: "45px" }}
                      id="menu-appbar"
                      anchorEl={anchorElStudent}
                      anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      open={Boolean(anchorElStudent)}
                      onClose={handleCloseUserMenu}
                    >
                      {studentPages.map((setting, i) => (
                          <MenuItem
                            key={setting}
                            key={i * 71}
                            onClick={(event)=>{
                              handleCloseNavMenu(event)
                              setSelectedOperation(event.nativeEvent.srcElement.innerText)
                              console.log(event.nativeEvent.srcElement.innerText);
                              setIsSelected(true)                                    
                              }}
                          >        
                            <Typography textAlign="center">{ setting}
                            </Typography>
                          </MenuItem>
                        ))
                      }
                    </Menu>
                  </div>
                ))}

              </Box>

              <Box sx={{ flexGrow: 0 }}>
                <Button
                  onClick={handleLogout}
                  id={style.logout}
                  sx={{ p: 0.6, width: "120px", color: "white" }}
                >
                  Log out
                </Button>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </div>
    
    {generalView}
    
    {selectedTable=="STAFF"? selectedOperation=="Create/Delete"? <CreateEmployee></CreateEmployee>:null:null}
    {selectedTable=="STAFF"? selectedOperation=="Update"? <UpdateEmployee></UpdateEmployee>:null:null}
    {selectedTable=="COURSE"? selectedOperation=="Create/Delete"? <CreateCourse></CreateCourse>:null:null}
    {selectedTable=="COURSE"? selectedOperation=="Update"? <UpdateCourse></UpdateCourse>:null:null}
    {selectedTable=="STUDENT"? selectedOperation=="Create/Delete"? <CreateStudent></CreateStudent>:null:null}
    {selectedTable=="STUDENT"? selectedOperation=="Update"? <UpdateStudent></UpdateStudent>:null:null}
    {selectedTable=="PARENT"? selectedOperation=="Create/Delete"? <CreateParent></CreateParent>:null:null}
    {selectedTable=="PARENT"? selectedOperation=="Update"? <UpdateParent></UpdateParent>:null:null}
    {selectedTable=="STUDENT"? selectedOperation=="Enroll Course"? <StudentEnrollCourse></StudentEnrollCourse>:null:null}
   
   
    </div>
  );
};

export default Admin;
