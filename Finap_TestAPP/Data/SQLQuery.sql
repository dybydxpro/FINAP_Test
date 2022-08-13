CREATE DATABASE FinapTest;

USE FinapTest;

DROP DATABASE FinapTest;

CREATE TABLE tblClassRooms(
	ClassroomID INTEGER IDENTITY(1,1),
	ClassroomName VARCHAR(255),
	Status BIT,
	CONSTRAINT tblClassRoomsPK PRIMARY KEY (ClassroomID),
	CONSTRAINT tblClassRoomsUnqs UNIQUE (ClassroomName)
);

CREATE TABLE tblStudents(
	StudentID INTEGER IDENTITY(1,1),
	FirstName VARCHAR(255),
	LastName VARCHAR(255),
	ContactPerson VARCHAR(255),
	ContactNo VARCHAR(255), 
	EmailAddress VARCHAR(255),
	DOB DATETIME,
	Age INTEGER,
	Classroom INTEGER,
	Status BIT,
	CONSTRAINT tblStudentsPK PRIMARY KEY (StudentID),
	CONSTRAINT tblStudentsUnqs UNIQUE (ContactNo, EmailAddress)
);

CREATE TABLE tblTeachers(
	TeacherID INTEGER IDENTITY(1,1),
	FirstName VARCHAR(255),
	LastName VARCHAR(255),
	ContactNo VARCHAR(255), 
	EmailAddress VARCHAR(255),
	Status BIT,
	CONSTRAINT tblTeacherIDPK PRIMARY KEY (TeacherID),
	CONSTRAINT tblTeacherIDUnqs UNIQUE (ContactNo, EmailAddress)
);

CREATE TABLE tblSubjects(
	SubjectID INTEGER IDENTITY(1,1),
	SubjectName VARCHAR(255),
	Status BIT,
	CONSTRAINT tblSubjectsPK PRIMARY KEY (SubjectID),
	CONSTRAINT tblSubjectUnqs UNIQUE (SubjectName)
);

SELECT * FROM tblClassRooms;
SELECT * FROM tblStudents;
SELECT * FROM tblTeachers;
SELECT * FROM tblSubjects;


--- Stored Procedures

--ClassRooms
CREATE PROCEDURE sp_getAllClassRooms
AS
BEGIN
	SELECT ClassroomID, ClassroomName, Status
	FROM tblClassRooms
END;

EXEC sp_getAllClassRooms;

CREATE PROCEDURE sp_getOneClassRoom(@ClassID INTEGER)
AS
BEGIN
	SELECT ClassroomID, ClassroomName, Status
	FROM tblClassRooms
	WHERE ClassroomID = @ClassID
END;

EXEC sp_getOneClassRoom @ClassID = 1;

CREATE PROCEDURE sp_postOneClassRoom(@ClassName VARCHAR(255))
AS
BEGIN
	INSERT INTO tblClassRooms(ClassroomName, Status)
	VALUES (@ClassName, 1)
END;

EXEC sp_postOneClassRoom @ClassName = 'Grade 6A';

CREATE PROCEDURE sp_putOneClassRoom(@ClassID INTEGER, @ClassName VARCHAR(255))
AS
BEGIN
	UPDATE tblClassRooms
	SET ClassroomName = @ClassName
	WHERE ClassroomID = @ClassID
END;

EXEC sp_putOneClassRoom @ClassID = 1, @ClassName = 'Grade 6A';

CREATE PROCEDURE sp_deleteSoftClassRoom(@ClassID INTEGER)
AS
BEGIN
	DECLARE @AvailableStatus BIT;
    SET @AvailableStatus = (SELECT Status FROM tblClassRooms WHERE ClassroomID = @ClassID);

    IF @AvailableStatus != 'True'
    BEGIN
        UPDATE tblClassRooms SET Status = 'True' WHERE ClassroomID = @ClassID
    END
    ELSE
    BEGIN
        UPDATE tblClassRooms SET Status = 'False' WHERE ClassroomID = @ClassID
    END
END;

EXEC sp_deleteSoftClassRoom @ClassID = 1;

CREATE PROCEDURE sp_deleteOneClassRoom(@ClassID INTEGER)
AS
BEGIN
	DELETE FROM tblClassRooms
	WHERE ClassroomID = @ClassID
END;

EXEC sp_deleteOneClassRoom @ClassID = 1;

--Students

CREATE PROCEDURE sp_getAllStudents
AS
BEGIN
	SELECT s.StudentID, s.FirstName, s.LastName, s.ContactPerson, s.ContactNo, s.EmailAddress, s.DOB, s.Age, s.Classroom, s.Status, c.ClassroomID, c.ClassroomName, c.Status
	FROM tblStudents s, tblClassRooms c
	WHERE s.Classroom = c.ClassroomID
END;

EXEC sp_getAllStudents;

CREATE PROCEDURE sp_getOneStudent(@StudentID INTEGER)
AS
BEGIN
	SELECT  StudentID, FirstName, LastName, ContactPerson, ContactNo, EmailAddress, DOB, Age, Classroom, Status
	FROM tblStudents
	WHERE StudentID = @StudentID
END;

EXEC sp_getOneStudent @StudentID = 1;

CREATE PROCEDURE sp_postOneStudent(@FirstName VARCHAR(255), @LastName VARCHAR(255), @ContactPerson VARCHAR(255), @ContactNo VARCHAR(255), @EmailAddress VARCHAR(255), @DOB DATETIME, @Age INTEGER, @Classroom INTEGER)
AS
BEGIN
	INSERT INTO tblStudents(FirstName, LastName, ContactPerson, ContactNo, EmailAddress, DOB, Age, Classroom, Status)
	VALUES (@FirstName, @LastName, @ContactPerson, @ContactNo, @EmailAddress, @DOB, @Age, @Classroom, 1)
END;

EXEC sp_postOneStudent @FirstName = 'Tharindu', @LastName = 'Dayananda', @ContactPerson = 'EA Lalani', @ContactNo = '+94779200039', @EmailAddress = 'tharindutd1998@gmail.com', @DOB = '1998-09-16T00:00:00.000', @Age = 23, @Classroom = 2;

CREATE PROCEDURE sp_putOneStudent(@StudentID INTEGER, @FirstName VARCHAR(255), @LastName VARCHAR(255), @ContactPerson VARCHAR(255), @ContactNo VARCHAR(255), @EmailAddress VARCHAR(255), @DOB DATETIME, @Age INTEGER, @Classroom INTEGER)
AS
BEGIN
	UPDATE tblStudents
	SET FirstName = @FirstName, LastName = @LastName, ContactPerson = @ContactPerson, ContactNo = @ContactNo, EmailAddress = @EmailAddress, DOB = @DOB, Age = Age, Classroom = @Classroom
	WHERE StudentID = @StudentID
END;

EXEC sp_putOneStudent @StudentID = 1, @FirstName = 'Tharindu', @LastName = 'Dayananda', @ContactPerson = 'EA Lalani', @ContactNo = '+94719900039', @EmailAddress = 'tharindutd1998@gmail.com', @DOB = '1998-09-16T00:00:00.000', @Age = 23, @Classroom = 2;

CREATE PROCEDURE sp_deleteSoftStudent(@StudentID INTEGER)
AS
BEGIN
	DECLARE @AvailableStatus BIT;
    SET @AvailableStatus = (SELECT Status FROM tblStudents WHERE StudentID = @StudentID);

    IF @AvailableStatus != 'True'
    BEGIN
        UPDATE tblStudents SET Status = 'True' WHERE StudentID = @StudentID
    END
    ELSE
    BEGIN
        UPDATE tblStudents SET Status = 'False' WHERE StudentID = @StudentID
    END
END;

EXEC sp_deleteSoftStudent @StudentID = 1;

CREATE PROCEDURE sp_deleteOneStudent(@StudentID INTEGER)
AS
BEGIN
	DELETE FROM tblStudents
	WHERE StudentID = @StudentID
END;

EXEC sp_deleteOneStudent @StudentID = 1;

--Teachers

CREATE PROCEDURE sp_getAllTeachers
AS
BEGIN
	SELECT TeacherID, FirstName, LastName, ContactNo, EmailAddress, Status
	FROM tblTeachers
END;

EXEC sp_getAllTeachers;

CREATE PROCEDURE sp_getOneTeacher(@TeacherID INTEGER)
AS
BEGIN
	SELECT  TeacherID, FirstName, LastName, ContactNo, EmailAddress, Status
	FROM tblTeachers
	WHERE TeacherID = @TeacherID
END;

EXEC sp_getOneTeacher @TeacherID = 1;

CREATE PROCEDURE sp_postOneTeacher(@FirstName VARCHAR(255), @LastName VARCHAR(255), @ContactNo VARCHAR(255), @EmailAddress VARCHAR(255))
AS
BEGIN
	INSERT INTO tblTeachers(FirstName, LastName, ContactNo, EmailAddress, Status)
	VALUES (@FirstName, @LastName, @ContactNo, @EmailAddress, 1)
END;

EXEC sp_postOneTeacher @FirstName = 'Sanduni', @LastName = 'Samarasinghe', @ContactNo = '+94777896452', @EmailAddress = 'sanduni@gmail.com';

CREATE PROCEDURE sp_putOneTeacher(@TeacherID INTEGER, @FirstName VARCHAR(255), @LastName VARCHAR(255), @ContactNo VARCHAR(255), @EmailAddress VARCHAR(255))
AS
BEGIN
	UPDATE tblTeachers
	SET FirstName = @FirstName, LastName = @LastName, ContactNo = @ContactNo, EmailAddress = @EmailAddress
	WHERE TeacherID = @TeacherID
END;

EXEC sp_putOneTeacher @TeacherID = 1, @FirstName = 'Sanduni', @LastName = 'Samarasinghe', @ContactNo = '+94777896452', @EmailAddress = 'sanduni.s@gmail.com';

CREATE PROCEDURE sp_deleteSoftTeacher(@TeacherID INTEGER)
AS
BEGIN
	DECLARE @AvailableStatus BIT;
    SET @AvailableStatus = (SELECT Status FROM tblTeachers WHERE TeacherID = @TeacherID);

    IF @AvailableStatus != 'True'
    BEGIN
        UPDATE tblTeachers SET Status = 'True' WHERE TeacherID = @TeacherID
    END
    ELSE
    BEGIN
        UPDATE tblTeachers SET Status = 'False' WHERE TeacherID = @TeacherID
    END
END;

EXEC sp_deleteSoftTeacher @TeacherID = 1;

CREATE PROCEDURE sp_deleteOneTeacher(@TeacherID INTEGER)
AS
BEGIN
	DELETE FROM tblTeachers
	WHERE TeacherID = @TeacherID
END;

EXEC sp_deleteOneTeacher @TeacherID = 1;

--Subjects

CREATE PROCEDURE sp_getAllSubjects
AS
BEGIN
	SELECT SubjectID, SubjectName, Status
	FROM tblSubjects
END;

EXEC sp_getAllSubjects;

CREATE PROCEDURE sp_getOneSubject(@SubjectID INTEGER)
AS
BEGIN
	SELECT SubjectID, SubjectName, Status
	FROM tblSubjects
	WHERE SubjectID = @SubjectID
END;

EXEC sp_getOneSubject @SubjectID = 1;

CREATE PROCEDURE sp_postOneSubject(@SubjectName VARCHAR(255))
AS
BEGIN
	INSERT INTO tblSubjects(SubjectName, Status)
	VALUES (@SubjectName, 1)
END;

EXEC sp_postOneSubject @SubjectName = 'Science';

CREATE PROCEDURE sp_putOneSubject(@SubjectID INTEGER, @SubjectName VARCHAR(255))
AS
BEGIN
	UPDATE tblSubjects
	SET SubjectName = @SubjectName
	WHERE SubjectID = @SubjectID
END;

EXEC sp_putOneSubject @SubjectID = 1, @SubjectName = 'Mathematics';

CREATE PROCEDURE sp_deleteSoftSubject(@SubjectID INTEGER)
AS
BEGIN
	DECLARE @AvailableStatus BIT;
    SET @AvailableStatus = (SELECT Status FROM tblSubjects WHERE SubjectID = @SubjectID);

    IF @AvailableStatus != 'True'
    BEGIN
        UPDATE tblSubjects SET Status = 'True' WHERE SubjectID = @SubjectID
    END
    ELSE
    BEGIN
        UPDATE tblSubjects SET Status = 'False' WHERE SubjectID = @SubjectID
    END
END;

EXEC sp_deleteSoftSubject @SubjectID = 1;

CREATE PROCEDURE sp_deleteOneSubject(@SubjectID INTEGER)
AS
BEGIN
	DELETE FROM tblSubjects
	WHERE SubjectID = @SubjectID
END;

EXEC sp_deleteOneSubject @SubjectID = 1;





