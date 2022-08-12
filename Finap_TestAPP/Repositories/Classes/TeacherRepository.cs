using Finap_TestAPP.Data;
using Finap_TestAPP.Models;
using Finap_TestAPP.Repositories.Interfaces;
using System.Data;
using System.Data.SqlClient;

namespace Finap_TestAPP.Repositories.Classes
{
    public class TeacherRepository : DatabaseConfig, ITeacherRepository
    {
        public List<Teacher> GetTeachers()
        {
            List<Teacher> teachers = new List<Teacher>();
            try
            {
                using (SqlConnection con = new SqlConnection(Connection))
                {
                    using (SqlCommand cmd = new SqlCommand("[dbo].[sp_getAllTeachers]", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        if (con.State == ConnectionState.Closed)
                            con.Open();
                        SqlDataAdapter adp = new SqlDataAdapter(cmd);
                        DataTable dt = new DataTable();
                        adp.Fill(dt);
                        foreach (DataRow dr in dt.Rows)
                        {
                            teachers.Add(new Teacher
                            {
                                TeacherID = Convert.ToInt32(dr[0]),
                                FirstName = Convert.ToString(dr[1]),
                                LastName = Convert.ToString(dr[2]),
                                ContactNo = Convert.ToString(dr[3]),
                                EmailAddress = Convert.ToString(dr[4]),
                                Status = Convert.ToBoolean(dr[5])
                            });
                        }
                    }
                }
                return teachers;
            }
            catch (Exception ex)
            {
                return teachers;
            }
        }

        public Teacher GetOneTeacher(int id)
        {
            List<Teacher> teachers = new List<Teacher>();
            try
            {
                using (SqlConnection con = new SqlConnection(Connection))
                {
                    using (SqlCommand cmd = new SqlCommand("[dbo].[sp_getOneTeacher]", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@TeacherID", id);
                        if (con.State == ConnectionState.Closed)
                            con.Open();
                        SqlDataAdapter adp = new SqlDataAdapter(cmd);
                        DataTable dt = new DataTable();
                        adp.Fill(dt);
                        foreach (DataRow dr in dt.Rows)
                        {
                            teachers.Add(new Teacher
                            {
                                TeacherID = Convert.ToInt32(dr[0]),
                                FirstName = Convert.ToString(dr[1]),
                                LastName = Convert.ToString(dr[2]),
                                ContactNo = Convert.ToString(dr[3]),
                                EmailAddress = Convert.ToString(dr[4]),
                                Status = Convert.ToBoolean(dr[5])
                            });
                        }

                        Teacher teacher = new Teacher();
                        if (teachers.Count >= 1)
                        {
                            teacher.TeacherID = Convert.ToInt32(teachers[0].TeacherID);
                            teacher.FirstName = Convert.ToString(teachers[0].FirstName);
                            teacher.LastName = Convert.ToString(teachers[0].LastName);
                            teacher.ContactNo = Convert.ToString(teachers[0].ContactNo);
                            teacher.EmailAddress = Convert.ToString(teachers[0].EmailAddress);
                            teacher.Status = Convert.ToBoolean(teachers[0].Status);

                            return teacher;
                        }
                        else
                        {
                            return teacher;
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                return new Teacher();
            }
        }

        public bool PostTeacher(Teacher obj)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(Connection))
                {
                    using (SqlCommand cmd = new SqlCommand("[dbo].[sp_postOneTeacher]", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@FirstName", obj.FirstName);
                        cmd.Parameters.AddWithValue("@LastName", obj.LastName);
                        cmd.Parameters.AddWithValue("@ContactNo", obj.ContactNo);
                        cmd.Parameters.AddWithValue("@EmailAddress", obj.EmailAddress);
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

        public bool PutTeacher(Teacher obj)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(Connection))
                {
                    using (SqlCommand cmd = new SqlCommand("[dbo].[sp_putOneTeacher]", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@TeacherID", obj.TeacherID);
                        cmd.Parameters.AddWithValue("@FirstName", obj.FirstName);
                        cmd.Parameters.AddWithValue("@LastName", obj.LastName);
                        cmd.Parameters.AddWithValue("@ContactNo", obj.ContactNo);
                        cmd.Parameters.AddWithValue("@EmailAddress", obj.EmailAddress);
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

        public bool DeleteSoftTeacher(int id)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(Connection))
                {
                    using (SqlCommand cmd = new SqlCommand("[dbo].[sp_deleteSoftTeacher]", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@TeacherID", id);

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

        public bool DeleteTeacher(int id)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(Connection))
                {
                    using (SqlCommand cmd = new SqlCommand("[dbo].[sp_deleteOneTeacher]", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@TeacherID", id);

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
