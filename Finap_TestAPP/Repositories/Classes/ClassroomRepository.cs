using Finap_TestAPP.Data;
using Finap_TestAPP.Models;
using Finap_TestAPP.Repositories.Interfaces;
using System.Data;
using System.Data.SqlClient;

namespace Finap_TestAPP.Repositories.Classes
{
    public class ClassroomRepository : DatabaseConfig, IClassroomRepository
    {
        public List<Classroom> GetClassrooms()
        {
            List<Classroom> classrooms = new List<Classroom>();
            try
            {
                using (SqlConnection con = new SqlConnection(Connection))
                {
                    using (SqlCommand cmd = new SqlCommand("[dbo].[sp_getAllClassRooms]", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        if (con.State == ConnectionState.Closed)
                            con.Open();
                        SqlDataAdapter adp = new SqlDataAdapter(cmd);
                        DataTable dt = new DataTable();
                        adp.Fill(dt);
                        foreach (DataRow dr in dt.Rows)
                        {
                            classrooms.Add(new Classroom
                            {
                                ClassroomID = Convert.ToInt32(dr[0]),
                                ClassroomName = Convert.ToString(dr[1]),
                                Status = Convert.ToBoolean(dr[2])
                            });
                        }
                    }
                }
                return classrooms;
            }
            catch (Exception ex)
            {
                return classrooms;
            }
        }

        public Classroom GetOneClassroom(int id)
        {
            List<Classroom> classrooms = new List<Classroom>();
            try
            {
                using (SqlConnection con = new SqlConnection(Connection))
                {
                    using (SqlCommand cmd = new SqlCommand("[dbo].[sp_getOneClassRoom]", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@ClassID", id);
                        if (con.State == ConnectionState.Closed)
                            con.Open();
                        SqlDataAdapter adp = new SqlDataAdapter(cmd);
                        DataTable dt = new DataTable();
                        adp.Fill(dt);
                        foreach (DataRow dr in dt.Rows)
                        {
                            classrooms.Add(new Classroom
                            {
                                ClassroomID = Convert.ToInt32(dr[0]),
                                ClassroomName = Convert.ToString(dr[1]),
                                Status = Convert.ToBoolean(dr[2])
                            });
                        }

                        Classroom classroom = new Classroom();
                        if (classrooms.Count >= 1)
                        {
                            classroom.ClassroomID = Convert.ToInt32(classrooms[0].ClassroomID);
                            classroom.ClassroomName = Convert.ToString(classrooms[0].ClassroomName);
                            classroom.Status = Convert.ToBoolean(classrooms[0].Status);

                            return classroom;
                        }
                        else
                        {
                            return classroom;
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                return new Classroom();
            }
        }

        public bool PostClassroom(Classroom obj)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(Connection))
                {
                    using (SqlCommand cmd = new SqlCommand("[dbo].[sp_postOneClassRoom]", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@ClassName", obj.ClassroomName);
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

        public bool PutClassroom(Classroom obj)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(Connection))
                {
                    using (SqlCommand cmd = new SqlCommand("[dbo].[sp_putOneClassRoom]", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@ClassID", obj.ClassroomID);
                        cmd.Parameters.AddWithValue("@ClassName", obj.ClassroomName);
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

        public bool DeleteSoftClassroom(int id)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(Connection))
                {
                    using (SqlCommand cmd = new SqlCommand("[dbo].[sp_deleteSoftClassRoom]", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@ClassID", id);

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

        public bool DeleteClassroom(int id)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(Connection))
                {
                    using (SqlCommand cmd = new SqlCommand("[dbo].[sp_deleteOneClassRoom]", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@ClassID", id);

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
