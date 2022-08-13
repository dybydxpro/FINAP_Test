using Finap_TestAPP.Data;
using Finap_TestAPP.Models;
using Finap_TestAPP.Models.DTO;
using Finap_TestAPP.Repositories.Interfaces;
using System.Data;
using System.Data.SqlClient;

namespace Finap_TestAPP.Repositories.Classes
{
    public class AllocationRepository: DatabaseConfig, IAllocationRepository
    {
        public List<AllocateClassGetDTO> GetAllocateClasses()
        {
            List<AllocateClassGetDTO> list = new List<AllocateClassGetDTO>();
            try
            {
                using (SqlConnection con = new SqlConnection(Connection))
                {
                    using (SqlCommand cmd = new SqlCommand("[dbo].[sp_getAllAllocateClasses]", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        if (con.State == ConnectionState.Closed)
                            con.Open();
                        SqlDataAdapter adp = new SqlDataAdapter(cmd);
                        DataTable dt = new DataTable();
                        adp.Fill(dt);
                        foreach (DataRow dr in dt.Rows)
                        {
                            list.Add(new AllocateClassGetDTO
                            {
                                ACID = Convert.ToInt32(dr[0]),
                                TeacherID = Convert.ToInt32(dr[1]),
                                FirstName = Convert.ToString(dr[2]),
                                LastName = Convert.ToString(dr[3]),
                                ContactNo = Convert.ToString(dr[4]),
                                EmailAddress = Convert.ToString(dr[5]),
                                Status = Convert.ToBoolean(dr[6]),
                                ClassroomID = Convert.ToInt32(dr[7]),
                                ClassroomName = Convert.ToString(dr[8]),
                                CStatus = Convert.ToBoolean(dr[9])
                            });
                        }
                    }
                }
                return list;
            }
            catch (Exception ex)
            {
                return list;
            }
        }

        public AllocateClass GetOneAllocateClass(int id)
        {
            List<AllocateClass> lists = new List<AllocateClass>();
            try
            {
                using (SqlConnection con = new SqlConnection(Connection))
                {
                    using (SqlCommand cmd = new SqlCommand("[dbo].[sp_getOneAllocateClass]", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@ACID", id);
                        if (con.State == ConnectionState.Closed)
                            con.Open();
                        SqlDataAdapter adp = new SqlDataAdapter(cmd);
                        DataTable dt = new DataTable();
                        adp.Fill(dt);
                        foreach (DataRow dr in dt.Rows)
                        {
                            lists.Add(new AllocateClass
                            {
                                ACID = Convert.ToInt32(dr[0]),
                                TeacherID = Convert.ToInt32(dr[1]),
                                ClassID = Convert.ToInt32(dr[2]),
                                Status = Convert.ToBoolean(dr[3])
                            });
                        }

                        AllocateClass list = new AllocateClass();
                        if (lists.Count >= 1)
                        {
                            list.ACID = Convert.ToInt32(lists[0].ACID);
                            list.TeacherID = Convert.ToInt32(lists[0].TeacherID);
                            list.ClassID = Convert.ToInt32(lists[0].ClassID);
                            list.Status = Convert.ToBoolean(lists[0].Status);

                            return list;
                        }
                        else
                        {
                            return list;
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                return new AllocateClass();
            }
        }

        public bool PostAllocateClass(AllocateClass obj)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(Connection))
                {
                    using (SqlCommand cmd = new SqlCommand("[dbo].[sp_postOneAllocateClass]", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@TeacherID", obj.TeacherID);
                        cmd.Parameters.AddWithValue("@ClassID", obj.ClassID);
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

        public bool PutAllocateClass(AllocateClass obj)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(Connection))
                {
                    using (SqlCommand cmd = new SqlCommand("[dbo].[sp_putOneAllocateClass]", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@ACID", obj.ACID);
                        cmd.Parameters.AddWithValue("@TeacherID", obj.TeacherID);
                        cmd.Parameters.AddWithValue("@ClassID", obj.ClassID);
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

        public bool DeleteAllocateClass(int id)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(Connection))
                {
                    using (SqlCommand cmd = new SqlCommand("[dbo].[sp_deleteOneAllocateClass]", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@ACID", id);

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


        public List<AllocateSubjectGetDTO> GetAllocateSubjects()
        {
            List<AllocateSubjectGetDTO> list = new List<AllocateSubjectGetDTO>();
            try
            {
                using (SqlConnection con = new SqlConnection(Connection))
                {
                    using (SqlCommand cmd = new SqlCommand("[dbo].[sp_getAllAllocateSubjects]", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        if (con.State == ConnectionState.Closed)
                            con.Open();
                        SqlDataAdapter adp = new SqlDataAdapter(cmd);
                        DataTable dt = new DataTable();
                        adp.Fill(dt);
                        foreach (DataRow dr in dt.Rows)
                        {
                            list.Add(new AllocateSubjectGetDTO
                            {
                                ASID = Convert.ToInt32(dr[0]),
                                TeacherID = Convert.ToInt32(dr[1]),
                                FirstName = Convert.ToString(dr[2]),
                                LastName = Convert.ToString(dr[3]),
                                ContactNo = Convert.ToString(dr[4]),
                                EmailAddress = Convert.ToString(dr[5]),
                                Status = Convert.ToBoolean(dr[6]),
                                SubjectID = Convert.ToInt32(dr[7]),
                                SubjectName = Convert.ToString(dr[8]),
                                SStatus = Convert.ToBoolean(dr[9])
                            });
                        }
                    }
                }
                return list;
            }
            catch (Exception ex)
            {
                return list;
            }
        }

        public AllocateSubject GetOneAllocateSubject(int id)
        {
            List<AllocateSubject> lists = new List<AllocateSubject>();
            try
            {
                using (SqlConnection con = new SqlConnection(Connection))
                {
                    using (SqlCommand cmd = new SqlCommand("[dbo].[sp_getOneAllocateSubject]", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@ASID", id);
                        if (con.State == ConnectionState.Closed)
                            con.Open();
                        SqlDataAdapter adp = new SqlDataAdapter(cmd);
                        DataTable dt = new DataTable();
                        adp.Fill(dt);
                        foreach (DataRow dr in dt.Rows)
                        {
                            lists.Add(new AllocateSubject
                            {
                                ASID = Convert.ToInt32(dr[0]),
                                TeacherID = Convert.ToInt32(dr[1]),
                                SubjectID = Convert.ToInt32(dr[2]),
                                Status = Convert.ToBoolean(dr[3])
                            });
                        }

                        AllocateSubject list = new AllocateSubject();
                        if (lists.Count >= 1)
                        {
                            list.ASID = Convert.ToInt32(lists[0].ASID);
                            list.TeacherID = Convert.ToInt32(lists[0].TeacherID);
                            list.SubjectID = Convert.ToInt32(lists[0].SubjectID);
                            list.Status = Convert.ToBoolean(lists[0].Status);

                            return list;
                        }
                        else
                        {
                            return list;
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                return new AllocateSubject();
            }
        }

        public bool PostAllocateSubject(AllocateSubject obj)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(Connection))
                {
                    using (SqlCommand cmd = new SqlCommand("[dbo].[sp_postOneAllocateSubject]", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@TeacherID", obj.TeacherID);
                        cmd.Parameters.AddWithValue("@SubjectID", obj.SubjectID);
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

        public bool PutAllocateSubject(AllocateSubject obj)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(Connection))
                {
                    using (SqlCommand cmd = new SqlCommand("[dbo].[sp_putOneAllocateSubject]", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@ASID", obj.ASID);
                        cmd.Parameters.AddWithValue("@TeacherID", obj.TeacherID);
                        cmd.Parameters.AddWithValue("@SubjectID", obj.SubjectID);
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

        public bool DeleteAllocateSubject(int id)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(Connection))
                {
                    using (SqlCommand cmd = new SqlCommand("[dbo].[sp_deleteOneAllocateSubject]", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@ASID", id);

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
