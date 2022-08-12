using Finap_TestAPP.Data;
using Finap_TestAPP.Models;
using Finap_TestAPP.Repositories.Interfaces;
using System.Data;
using System.Data.SqlClient;

namespace Finap_TestAPP.Repositories.Classes
{
    public class SubjectRepository : DatabaseConfig, ISubjectRepository
    {
        public List<Subject> GetSubjects()
        {
            List<Subject> subjects = new List<Subject>();
            try
            {
                using (SqlConnection con = new SqlConnection(Connection))
                {
                    using (SqlCommand cmd = new SqlCommand("[dbo].[sp_getAllSubjects]", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        if (con.State == ConnectionState.Closed)
                            con.Open();
                        SqlDataAdapter adp = new SqlDataAdapter(cmd);
                        DataTable dt = new DataTable();
                        adp.Fill(dt);
                        foreach (DataRow dr in dt.Rows)
                        {
                            subjects.Add(new Subject
                            {
                                SubjectID = Convert.ToInt32(dr[0]),
                                SubjectName = Convert.ToString(dr[1]),
                                Status = Convert.ToBoolean(dr[2])
                            });
                        }
                    }
                }
                return subjects;
            }
            catch (Exception ex)
            {
                return subjects;
            }
        }

        public Subject GetOneSubject(int id)
        {
            List<Subject> subjects = new List<Subject>();
            try
            {
                using (SqlConnection con = new SqlConnection(Connection))
                {
                    using (SqlCommand cmd = new SqlCommand("[dbo].[sp_getOneSubject]", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@SubjectID", id);
                        if (con.State == ConnectionState.Closed)
                            con.Open();
                        SqlDataAdapter adp = new SqlDataAdapter(cmd);
                        DataTable dt = new DataTable();
                        adp.Fill(dt);
                        foreach (DataRow dr in dt.Rows)
                        {
                            subjects.Add(new Subject
                            {
                                SubjectID = Convert.ToInt32(dr[0]),
                                SubjectName = Convert.ToString(dr[1]),
                                Status = Convert.ToBoolean(dr[2])
                            });
                        }

                        Subject subject = new Subject();
                        if (subjects.Count >= 1)
                        {
                            subject.SubjectID = Convert.ToInt32(subjects[0].SubjectID);
                            subject.SubjectName = Convert.ToString(subjects[0].SubjectName);
                            subject.Status = Convert.ToBoolean(subjects[0].Status);

                            return subject;
                        }
                        else
                        {
                            return subject;
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                return new Subject();
            }
        }

        public bool PostSubject(Subject obj)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(Connection))
                {
                    using (SqlCommand cmd = new SqlCommand("[dbo].[sp_postOneSubject]", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@SubjectName", obj.SubjectName);
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

        public bool PutSubject(Subject obj)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(Connection))
                {
                    using (SqlCommand cmd = new SqlCommand("[dbo].[sp_putOneSubject]", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@SubjectID", obj.SubjectID);
                        cmd.Parameters.AddWithValue("@SubjectName", obj.SubjectName);
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

        public bool DeleteSoftSubject(int id)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(Connection))
                {
                    using (SqlCommand cmd = new SqlCommand("[dbo].[sp_deleteSoftSubject]", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@SubjectID", id);

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

        public bool DeleteSubject(int id)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(Connection))
                {
                    using (SqlCommand cmd = new SqlCommand("[dbo].[sp_deleteOneSubject]", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@SubjectID", id);

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
