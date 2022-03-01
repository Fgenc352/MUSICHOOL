use MUSICHOOL

create index IX_tblEmployee_Salary on Employee (Salary desc)

-- Unique is added for Instructor table for the colums Ssn and GraduatedSchool
-- Default value is added for Employee's address as Kadiköy
-- Identity(1,1) is added for CertificateID in the Certificate table
-- Computed column is added for age column of the Student table

-- Name has to contain at least 2 letters. 
ALTER TABLE Employee
ADD CONSTRAINT CHK_NameLength CHECK (LEN(Name)>1);


-- Trigger
-- Student who is under 18 is deleted when her/his parent is deleted if she/he has 
-- only one parent record on the Parent table.

GO
Create trigger tr_StudentParent on Parent 
after delete
AS
BEGIN
	delete s
	from Student s inner join deleted d on d.StudentID= s.StudentID
	where s.Age<18 and d.StudentID not in
		  (select p.StudentID from Parent p)

END
GO


insert into Student(StudentID,StudentName,StudentSurname,BirthDate,Gender) 
values (1,'Aslý','Özdemir','2003-08-07','F')


insert into Student(StudentID,StudentName,StudentSurname,BirthDate,Gender) 
values (2,'Kerem','Kozcaz','2000-02-03','M')

insert into Student(StudentID,StudentName,StudentSurname,BirthDate,Gender) 
values (3,'Efe','Yýlmaz','2013-06-09','M')

insert into Student(StudentID,StudentName,StudentSurname,BirthDate,Gender) 
values (4,'Yeþim','Piskevitçi','2014-02-01','F')



insert into Parent(StudentID,ParentName,ParentSurname,PhoneNo)
values(4,'Ayþe','Piskevitçi',5558798671)

insert into Parent(StudentID,ParentName,ParentSurname,PhoneNo)
values(3,'Deniz','Yýlmaz',5558798671)

select * from Parent
select * from Student

	delete p
	from Parent p
	where p.StudentID=4




---------------------- Procedures

------- Update quata of a course (1)
	
	GO
	create proc sp_updateQuota
		@CourseCode char(10),
		@quota smallint
	AS
	BEGIN
	
	update Course
	set Quota = @quota
	where CourseCode = @CourseCode 

	END
	GO




------- Update phone number of employee  (2)

	GO
	create proc sp_updatePhoneNumber
	@Ssn bigint,
	@PhoneNo bigint
	AS
	BEGIN
	
	update Employee
	set PhoneNo = @PhoneNo
	where SSN = @Ssn

	END
	GO

	insert into Employee(SSN,Salary,Name,Surname,Gender,PhoneNo,Address,Email,EmployeeType)
	values(538327958,5000,'Fatih','Piskevitçioðlu','M',5558883169,'Kadýköy',NULL,'I')

	select * from Employee

	exec sp_updatePhoneNumber @Ssn=1, @PhoneNo =5371061234





-----------  Update Gender of an employee  (3)

	GO
	create proc sp_updateGender
	@Ssn bigint,
	@Gender char(1)
	AS
	BEGIN
	
	update Employee
	set Gender = @Gender
	where SSN = @Ssn

	END
	GO



------- Update phone number of a parent (4)

	GO
	create proc sp_updatePhoneNumberOfParent
	@studentID int,
	@ParentName nvarchar(25),
	@PhoneNo bigint
	AS
	BEGIN
	
	update Parent
	set PhoneNo = @PhoneNo
	where StudentID = @studentID and ParentName = @ParentName

	END
	GO


--------- Delete Parent  (5)

	GO
	create proc sp_deleteParent
	@studentID int,
	@ParentName nvarchar(25)
	AS
	BEGIN
	
	delete p
	from Parent p
	where p.StudentID= @studentID and p.ParentName=@ParentName

	END
	GO

	select * from Parent
	select * from Student
	
	exec sp_deleteParent  @studentID = 4,  @ParentName = 'Ayþe'
	




--------- Delete Student  (6)

	GO
	create proc sp_deleteStudent
	@studentID int
	AS
	BEGIN
	
	delete s
	from Student s
	where s.StudentID = @studentID

	END
	GO

	select * from Parent
	select * from Student
	
	exec sp_deleteStudent @studentID = 1






-------- Insert Certificate  (7)

	GO
	create proc sp_insertCertificate
	@CourseCode char(10),
	@StudentID int,
	@CertificationDate smalldatetime
	AS
	BEGIN
	
	insert into Certificate(CourseCode,StudentID,CertificationDate)
	values(@CourseCode,@StudentID,@CertificationDate)

	END
	GO
	


--Ýnsert Instructor  (8)

	GO
	create proc sp_insertInstructor
	@InstructorSSN bigint,
	@GraduatedSchool nvarchar(50)
	AS
	BEGIN
	
	insert into Instructor(InstructorSSN,GraduatedSchool)
	values(@InstructorSSN,@GraduatedSchool)

	END
	GO

	
	
----- Insert Caretaker  (9)

	GO
	create proc sp_insertCaretaker
	@CaretakerSSN bigint,
	@JobName nvarchar(25)
	AS
	BEGIN
	
	insert into Caretaker(CaretakerSSN,JobName)
	values(@CaretakerSSN,@JobName)

	END
	GO


------ Delete Course  (10)

	GO
	create proc sp_deleteCourse
	@CourseCode char(10)
	AS
	BEGIN
	
	delete c
	from Course c
	where c.CourseCode = @CourseCode 

	END



---- Delete Employee  (11)

	GO
	create proc sp_deleteEmployee
	@SSN bigint
	AS
	BEGIN
	
	delete e
	from Employee e
	where e.SSN = @SSN 

	END
	GO





---------------- VÝEWS

--- Get all courses that has more student enrolled than the average. (1)
	GO
	CREATE VIEW [POPULAR COURSES] AS
	select cs.CourseCode, c.InstrumentName, count(*) as NumberOfStudents
	from CourseStudent cs inner join Course c on cs.CourseCode=c.CourseCode
	group by cs.CourseCode, c.InstrumentName
	having count(*) > (select count(*) from CourseStudent)/(select count(distinct CourseCode) from CourseStudent)
	GO

	

------ Top 3 students under the age of 18 with the most enrollments. (2)
	GO
	
	CREATE VIEW [BEST CUSTOMERS] AS
	select TOP 3 cs.StudentID, s.StudentName, s.StudentSurname,  count(cs.StudentID) NumberOfCourses
	from CourseStudent cs inner join Student s on s.StudentID=cs.StudentID
	where s.Age<18
	group by  cs.StudentID, s.StudentName, s.StudentSurname 
	order by count(cs.StudentID) desc
	
	GO



---- Top 3 students who have the most certificates and are girls. (3)

	GO
	
	CREATE VIEW [BEST PREV CUSTOMERS] AS
	select TOP 3 c.StudentID, s.StudentName, s.StudentSurname, count(c.StudentID) NumberOfCertificate 
	from Certificate c inner join Student s on s.StudentID= c.StudentID
	where s.Gender='F'
	group by  c.StudentID, s.StudentName, s.StudentSurname 
	order by count(c.StudentID) desc
	
	GO



---- Top 3 most expensive instructors along with the total number of courses that they give. (4)


	GO
	
	CREATE VIEW [Most Expensive Workers] AS

	select c.InstructorSSN, e.Name, e.Surname, count(*) as TotalCourses 
	from Course c inner join Employee e on e.SSN=c.InstructorSSN
	where c.InstructorSSN in (select TOP 3 e.SSN from Employee e
	order by e.Salary desc)
	group by c.InstructorSSN, e.Name, e.Surname
	
	GO

------



-- Courses that has more female students than male. (5)


GO
	CREATE VIEW [Courses] AS

	select cs.CourseCode, count(*) as NumberOfFemaleStudents
	from Student s inner join CourseStudent cs on cs.StudentID = s.StudentID
	inner join
	(select cs.CourseCode, count(*) as NumberOfMaleStudents
	from Student s inner join CourseStudent cs on cs.StudentID = s.StudentID
	where s.Gender = 'M'
	group by cs.CourseCode) as NumberOfMaleStudents on cs.CourseCode = NumberOfMaleStudents.CourseCode

	where s.Gender = 'F'
	group by cs.CourseCode, NumberOfMaleStudents.NumberOfMaleStudents
	having count(*) > NumberOfMaleStudents.NumberOfMaleStudents
GO

