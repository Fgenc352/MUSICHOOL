const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const { conn } = require("./db");
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello");
});

app.post("/login", (req, res) => {
  conn
    .connect()
    .then((result) => {
      if (result.connected) {
        let qry =
          "Select * from Admin where UserName=" +
          "'" +
          req.body.userName +
          "'" +
          " and Password=" +
          "'" +
          req.body.password +
          "'";

        result
          .request()
          .query(qry)
          .then((res2) => {
            if (
              typeof res2.recordset != "undefined" &&
              res2.recordset.length > 0
            ) {
              res.send(res2.recordset);
            } else {
              res.status(404).json({ error: "Failed to login!" });
            }
          })
          .catch((err) => res.status(404).json({ error: err + " " }));
      }
    })
    .catch((err) => {
      console.log(err)
      res.status(404).json({ error: err })
    });
});

app.post("/EmployeeOperation", (req, res) => {
  conn
    .connect()
    .then((result) => {
      if (result.connected) {
        result
          .request()
          .query(req.body.qry)
          .then((res2) => {
            res.send(res2.recordset);
          })
          .catch((err) => res.status(404).json({ error: err + " " }));
      }
    })
    .catch((err) => res.status(404).json({ error: err + " " }));
});

app.post("/EmployeeUpdate", (req, res) => {
  conn
    .connect()
    .then((result) => {
      if (result.connected) {
        result
          .request()
          .query(req.body.qry)
          .then((res2) => {
            res.send(res2.recordset);
          })
          .catch((err) => res.status(404).json({ error: err + " " }));
      }
    })
    .catch((err) => res.status(404).json({ error: err + " " }));
});

app.post("/EmployeeInfo", (req, res) => {
  conn
    .connect()
    .then((result) => {
      if (result.connected) {
        result
          .request()
          .input("ssn", req.body.empSSN)
          .query("Select * from Employee where SSN=@ssn")
          .then((res2) => {
            if (
              typeof res2.recordset != "undefined" &&
              res2.recordset.length > 0
            ) {
              res.send(res2.recordset);
            } else {
              res.status(404).json({ error: "Failed to login!" });
            }
          })
          .catch((err) => res.status(404).json({ error: err + " " }));
      }
    })
    .catch((err) => res.status(404).json({ error: err + " " }));
});

app.post("/deleteEmployee", (req, res) => {
  console.log(req.body);
  conn
    .connect()
    .then((result) => {
      if (result.connected) {
        result
          .request()
          .input("ssn", req.body.data.empSSN)
          .query("exec sp_deleteEmployee @SSN=@ssn")
          .then((res2) => {
            res.send(res2.recordset);
          })
          .catch((err) => res.status(404).json({ error: err + " " }));
      }
    })
    .catch((err) => res.status(404).json({ error: err + " " }));
});

app.get("/course", (req, res) => {
  conn
    .connect()
    .then((result) => {
      if (result.connected) {
        result
          .request()
          .query("Select * from Course")
          .then((res2) => {
            res.send(res2.recordset);
          })
          .catch((err) => res.status(404).json({ error: err }));
      }
    })
    .catch((err) => res.status(404).json({ error: err + " " }));
});


app.post("/deleteCourse", (req, res) => {
  conn
    .connect()
    .then((result) => {
      if (result.connected) {
        result
          .request()
          .input("CourseCode", req.body.data.CourseCode)
          .query("exec sp_deleteCourse @CourseCode=@CourseCode")
          .then((res2) => {
            res.send(res2.recordset);
          })
          .catch((err) => res.status(404).json({ error: err + " " }));
      }
    })
    .catch((err) => res.status(404).json({ error: err + " " }));
});

app.post("/updateCourse", (req, res) => {
  conn
    .connect()
    .then((result) => {
      if (result.connected) {
        result
          .request()
          .query(req.body.qry)
          .then((res2) => {
            res.send(res2.recordset);
          })
          .catch((err) => res.status(404).json({ error: err + " " }));
      }
    })
    .catch((err) => res.status(404).json({ error: err + " " }));
});

app.post("/createCourse", (req, res) => {
  conn
    .connect()
    .then((result) => {
      if (result.connected) {
        result
          .request()
          .query(req.body.qry)
          .then((res2) => {
            res.send(res2.recordset);
          })
          .catch((err) => res.status(404).json({ error: err + " " }));
      }
    })
    .catch((err) => res.status(404).json({ error: err + " " }));
});

app.post("/CourseInfo", (req, res) => {
  conn
    .connect()
    .then((result) => {
      if (result.connected) {
        result
          .request()
          .input("CourseCode", req.body.courseCode)
          .query("Select * from Course where CourseCode=@CourseCode")
          .then((res2) => {
            if (
              typeof res2.recordset != "undefined" &&
              res2.recordset.length > 0
            ) {
              res.send(res2.recordset);
            } else {
              res
                .status(404)
                .json({ error: "Failed to create the CourseCode!" });
            }
          })
          .catch((err) => res.status(404).json({ error: err + " " }));
      }
    })
    .catch((err) => res.status(404).json({ error: err + " " }));
});

app.get("/Employee", (req, res) => {
  conn
    .connect()
    .then((result) => {
      if (result.connected) {
        result
          .request()
          .query("Select * from Employee")
          .then((res2) => {
            res.send(res2.recordset);
          })
          .catch((err) => res.status(404).json({ error: err }));
      }
    })
    .catch((err) => res.status(404).json({ error: err + " " }));
});

app.get("/Student", (req, res) => {
  conn
    .connect()
    .then((result) => {
      if (result.connected) {
        result
          .request()
          .query("Select * from Student")
          .then((res2) => {
            res.send(res2.recordset);
          })
          .catch((err) => res.status(404).json({ error: err }));
      }
    })
    .catch((err) => res.status(404).json({ error: err + " " }));
});

app.post("/updateStudent", (req, res) => {
  conn
    .connect()
    .then((result) => {
      if (result.connected) {
        result
          .request()
          .query(req.body.qry)
          .then((res2) => {
            res.send(res2.recordset);
          })
          .catch((err) => res.status(404).json({ error: err + " " }));
      }
    })
    .catch((err) => res.status(404).json({ error: err + " " }));
});

app.post("/deleteStudent", (req, res) => {
  console.log(req.body);
  conn
    .connect()
    .then((result) => {
      if (result.connected) {
        result
          .request()
          .input("StudentID", req.body.data.StudentID)
          .query("exec sp_deleteStudent @studentID =@StudentID")
          .then((res2) => {
            res.send(res2.recordset);
          })
          .catch((err) => res.status(404).json({ error: err + " " }));
      }
    })
    .catch((err) => res.status(404).json({ error: err + " " }));
});

app.post("/studentInfo", (req, res) => {
  conn
    .connect()
    .then((result) => {
      if (result.connected) {
        result
          .request()
          .input("StudentID", req.body.StudentID)
          .query("Select * from Student where StudentID=@StudentID")
          .then((res2) => {
            if (
              typeof res2.recordset != "undefined" &&
              res2.recordset.length > 0
            ) {
              res.send(res2.recordset);
            } else {
              res
                .status(404)
                .json({ error: "Failed to create the CourseCode!" });
            }
          })
          .catch((err) => res.status(404).json({ error: err + " " }));
      }
    })
    .catch((err) => res.status(404).json({ error: err + " " }));
});

app.post("/createStudent", (req, res) => {
  conn
    .connect()
    .then((result) => {
      if (result.connected) {
        result
          .request()
          .query(req.body.qry)
          .then((res2) => {
            res.send(res2.recordset);
          })
          .catch((err) => res.status(404).json({ error: err + " " }));
      }
    })
    .catch((err) => res.status(404).json({ error: err + " " }));
});

app.get("/Parent", (req, res) => {
  conn
    .connect()
    .then((result) => {
      if (result.connected) {
        result
          .request()
          .query("Select * from Parent")
          .then((res2) => {
            res.send(res2.recordset);
          })
          .catch((err) => res.status(404).json({ error: err }));
      }
    })
    .catch((err) => res.status(404).json({ error: err + " " }));
});

app.get("/StudentCourse", (req, res) => {
    conn
      .connect()
      .then((result) => {
        if (result.connected) {
          result
            .request()
            .query("Select * from CourseStudent")
            .then((res2) => {
              res.send(res2.recordset);
            })
            .catch((err) => res.status(404).json({ error: err }));
        }
      })
      .catch((err) => res.status(404).json({ error: err + " " }));
  });



  app.post("/deleteCourseStudent", (req, res) => {
    conn
      .connect()
      .then((result) => {
        if (result.connected) {
          let qry =
            "Select * from CourseStudent where StudentID=" +
            "'" +
            req.body.data.StudentID +
            "'" +
            " and CourseCode=" +
            "'" +
            req.body.data.CourseCode +
            "'";
  
          result
            .request()
            .query(qry)
            .then((res2) => {
              if (
                typeof res2.recordset != "undefined" &&
                res2.recordset.length > 0
              ) {
                let qry =
                  "Delete from CourseStudent where StudentID=" +
                  "'" +
                  req.body.data.StudentID +
                  "'" +
                  " and CourseCode=" +
                  "'" +
                  req.body.data.CourseCode +
                  "'";
                result
                  .request()
                  .query(qry)
                  .then((res3) => {
                    res.send(res3.recordset);
                  })
                  .catch((err) => res.status(404).json({ error: err + " " }));
              } else
                res
                  .status(404)
                  .json({
                    error:
                      "Failed to delete the Parent! You entered the wrong Student ID or Course Code or both!",
                  });
            })
            .catch((err) => res.status(404).json({ error: err + " " }));
        }
      })
      .catch((err) => res.status(404).json({ error: err + " " }));
  });

  app.post("/createCourseStudent", (req, res) => {
    conn
      .connect()
      .then((result) => {
        if (result.connected) {
          result.request().input("CourseCode",req.body.CourseCode)
          .query("select c.Quota, isnull(kota.NbrStd,0) as NbrStd from Course c left outer join(select CourseCode, count(*) as NbrStd from CourseStudent group by CourseCode) as kota on kota.CourseCode=c.CourseCode where c.CourseCode=@CourseCode").then((resp)=>{
            console.log(resp.recordset[0].Quota, resp.recordset[0].NbrStd);
            if(resp.recordset[0].Quota > resp.recordset[0].NbrStd){
              result
              .request()
              .query(req.body.qry)
              .then((res2) => {
                res.send(res2.recordset);
              })
              .catch((err) => res.status(404).json({ error: err + " " }));
            }else{
              res.status(404).json({ error: " Quota is Full! Please Create Another Course." })
            }
          })
 
        }
      })
      .catch((err) => res.status(404).json({ error: err + " " }));
  });


app.post("/updateParent", (req, res) => {
    conn
      .connect()
      .then((result) => {
        if (result.connected) {
          result
            .request()
            .query(req.body.qry)
            .then((res2) => {
              res.send(res2.recordset);
            })
            .catch((err) => res.status(404).json({ error: err + " " }));
        }
      })
      .catch((err) => res.status(404).json({ error: err + " " }));
  });



  app.post("/createParent", (req, res) => {
    conn
      .connect()
      .then((result) => {
        if (result.connected) {
                  let StudentID = req.body.StudentID
                  result.request().input("StudentID",StudentID)
                  .query("Select Age from Student where StudentID=@StudentID").then((resp)=>{
                    console.log(resp.recordset);
                    if(resp.recordset[0].Age>18) res.status(404).json({ error: "Cannot create Parent! Student is not under 18. " })
                   else{
                    result
                    .request()
                    .query(req.body.qry)
                    .then((res2) => {
                      res.send(res2.recordset);
                    })
                    .catch((err) => res.status(404).json({ error: err + " " }));
                   }
                  }).catch((err) => res.status(404).json({ error: err + " " }));                
      
        }
      })
      .catch((err) => res.status(404).json({ error: err + " " }));
  });

  app.post("/deleteParent", (req, res) => {
    conn
      .connect()
      .then((result) => {
        if (result.connected) {
          let qry =
            "Select * from Parent where StudentID=" +
            "'" +
            req.body.data.StudentID +
            "'" +
            " and ParentName=" +
            "'" +
            req.body.data.ParentName +
            "'";
  
          result
            .request()
            .query(qry)
            .then((res2) => {
              if (
                typeof res2.recordset != "undefined" &&
                res2.recordset.length > 0
              ) {
                let qry =
                  "exec sp_deleteParent  @studentID =" +
                  "'" +
                  req.body.data.StudentID +
                  "'" +
                  ", @ParentName =" +
                  "'" +
                  req.body.data.ParentName +
                  "'";
                result
                  .request()
                  .query(qry)
                  .then((res3) => {
                    res.send(res3.recordset);
                  })
                  .catch((err) => res.status(404).json({ error: err + " " }));
              } else
                res
                  .status(404)
                  .json({
                    error:
                      "Failed to delete the Parent! You entered the wrong Student ID or Parent Name or both!",
                  });
            })
            .catch((err) => res.status(404).json({ error: err + " " }));
        }
      })
      .catch((err) => res.status(404).json({ error: err + " " }));
  });

app.listen(4000, () => {
  console.log("running on port 4000");
});
