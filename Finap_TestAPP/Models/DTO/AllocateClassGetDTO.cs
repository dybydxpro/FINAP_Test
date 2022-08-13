namespace Finap_TestAPP.Models.DTO
{
    public class AllocateClassGetDTO
    {
        public int ACID { get; set; }
        public int TeacherID { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string ContactNo { get; set; }
        public string EmailAddress { get; set; }
        public bool Status { get; set; }
        public int ClassroomID { get; set; }
        public string ClassroomName { get; set; }
        public bool CStatus { get; set; }
    }
}
