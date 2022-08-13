using Finap_TestAPP.Data;
using Finap_TestAPP.Models;
using Finap_TestAPP.Models.DTO;
using Finap_TestAPP.Repositories.Interfaces;
using System.Data;
using System.Data.SqlClient;

namespace Finap_TestAPP.Repositories.Classes
{
    public class StudentRepository : DatabaseConfig, IStudentRepository
    {
        public List<StudentGetDTO> GetStudents()
        {
            List<StudentGetDTO> students = new List<StudentGetDTO>();
            try
            {
                using (SqlConnection con = new SqlConnection(Connection))
                {
                    using (SqlCommand cmd = new SqlCommand("[dbo].[sp_getAllStudents]", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        if (con.State == ConnectionState.Closed)
                            con.Open();
                        SqlDataAdapter adp = new SqlDataAdapter(cmd);
                        DataTable dt = new DataTable();
                        adp.Fill(dt);
                        foreach (DataRow dr in dt.Rows)
                        {
                            students.Add(new StudentGetDTO
                            {
                                StudentID = Convert.ToInt32(dr[0]),
                                FirstName = Convert.ToString(dr[1]),
                                LastName = Convert.ToString(dr[2]),
                                ContactPerson = Convert.ToString(dr[3]),
                                ContactNo = Convert.ToString(dr[4]),
                                EmailAddress = Convert.ToString(dr[5]),
                                DOB = Convert.ToDateTime(dr[6]),
                                Age = Convert.ToInt32(dr[7]),
                                Classroom = Convert.ToInt32(dr[8]),
                                Status = Convert.ToBoolean(dr[9]),
                                ClassroomID = Convert.ToInt32(dr[10]),
                                ClassroomName = Convert.ToString(dr[11]),
                                CStatus = Convert.ToBoolean(dr[12])
                            });
                        }
                    }
                }
                return students;
            }
            catch (Exception ex)
            {
                return students;
            }
        }

        public Student GetOneStudent(int id)
        {
            List<Student> students = new List<Student>();
            try
            {
                using (SqlConnection con = new SqlConnection(Connection))
                {
                    using (SqlCommand cmd = new SqlCommand("[dbo].[sp_getOneStudent]", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@StudentID", id);
                        if (con.State == ConnectionState.Closed)
                            con.Open();
                        SqlDataAdapter adp = new SqlDataAdapter(cmd);
                        DataTable dt = new DataTable();
                        adp.Fill(dt);
                        foreach (DataRow dr in dt.Rows)
                        {
                            students.Add(new Student
                            {
                                StudentID = Convert.ToInt32(dr[0]),
                                FirstName = Convert.ToString(dr[1]),
                                LastName = Convert.ToString(dr[2]),
                                ContactPerson = Convert.ToString(dr[3]),
                                ContactNo = Convert.ToString(dr[4]),
                                EmailAddress = Convert.ToString(dr[5]),
                                DOB = Convert.ToDateTime(dr[6]),
                                Age = Convert.ToInt32(dr[7]),
                                Classroom = Convert.ToInt32(dr[8]),
                                Status = Convert.ToBoolean(dr[9])
                            });
                        }

                        Student student = new Student();
                        if (students.Count >= 1)
                        {
                            student.StudentID = Convert.ToInt32(students[0].StudentID);
                            student.FirstName = Convert.ToString(students[0].FirstName);
                            student.LastName = Convert.ToString(students[0].LastName);
                            student.ContactPerson = Convert.ToString(students[0].ContactPerson);
                            student.ContactNo = Convert.ToString(students[0].ContactNo);
                            student.EmailAddress = Convert.ToString(students[0].EmailAddress);
                            student.DOB = Convert.ToDateTime(students[0].DOB);
                            student.Age = Convert.ToInt32(students[0].Age);
                            student.Classroom = Convert.ToInt32(students[0].Classroom);
                            student.Status = Convert.ToBoolean(students[0].Status);

                            return student;
                        }
                        else
                        {
                            return student;
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                return new Student();
            }
        }

        public bool PostStudent(Student obj)
        {
            try
            {
                obj.Age = Convert.ToInt32((DateTime.Now - obj.DOB).TotalDays / 365.25);
                using (SqlConnection con = new SqlConnection(Connection))
                {
                    using (SqlCommand cmd = new SqlCommand("[dbo].[sp_postOneStudent]", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@FirstName", obj.FirstName);
                        cmd.Parameters.AddWithValue("@LastName", obj.LastName);
                        cmd.Parameters.AddWithValue("@ContactPerson", obj.ContactPerson);
                        cmd.Parameters.AddWithValue("@ContactNo", obj.ContactNo);
                        cmd.Parameters.AddWithValue("@EmailAddress", obj.EmailAddress);
                        cmd.Parameters.AddWithValue("@DOB", obj.DOB);
                        cmd.Parameters.AddWithValue("@Age", obj.Age);
                        cmd.Parameters.AddWithValue("@Classroom", obj.Classroom);
                        if (con.State == ConnectionState.Closed)
                            con.Open();
                        int i = cmd.ExecuteNonQuery();
                        if (i >= 1)
                        {
                            return true;
                        }
                        else
                        {
                            return false;
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public bool PutStudent(Student obj)
        {
            try
            {
                obj.Age = Convert.ToInt32((DateTime.Now - obj.DOB).TotalDays / 365.25);
                using (SqlConnection con = new SqlConnection(Connection))
                {
                    using (SqlCommand cmd = new SqlCommand("[dbo].[sp_putOneStudent]", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@StudentID", obj.StudentID);
                        cmd.Parameters.AddWithValue("@FirstName", obj.FirstName);
                        cmd.Parameters.AddWithValue("@LastName", obj.LastName);
                        cmd.Parameters.AddWithValue("@ContactPerson", obj.ContactPerson);
                        cmd.Parameters.AddWithValue("@ContactNo", obj.ContactNo);
                        cmd.Parameters.AddWithValue("@EmailAddress", obj.EmailAddress);
                        cmd.Parameters.AddWithValue("@DOB", obj.DOB);
                        cmd.Parameters.AddWithValue("@Age", obj.Age);
                        cmd.Parameters.AddWithValue("@Classroom", obj.Classroom);
                        if (con.State == ConnectionState.Closed)
                            con.Open();
                        int i = cmd.ExecuteNonQuery();
                        if (i >= 1)
                        {
                            return true;
                        }
                        else
                        {
                            return false;
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public bool DeleteSoftStudent(int id)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(Connection))
                {
                    using (SqlCommand cmd = new SqlCommand("[dbo].[sp_deleteSoftStudent]", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@StudentID", id);

                        if (con.State == ConnectionState.Closed)
                            con.Open();
                        int i = cmd.ExecuteNonQuery();
                        if (i >= 1)
                        {
                            return true;
                        }
                        else
                        {
                            return false;
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public bool DeleteStudent(int id)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(Connection))
                {
                    using (SqlCommand cmd = new SqlCommand("[dbo].[sp_deleteOneStudent]", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@StudentID", id);

                        if (con.State == ConnectionState.Closed)
                            con.Open();
                        int i = cmd.ExecuteNonQuery();
                        if (i >= 1)
                        {
                            return true;
                        }
                        else
                        {
                            return false;
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                return false;
            }
        }
    }
}
