namespace Finap_TestAPP.Models.DTO
{
    public class AllocateSubjectGetDTO
    {
        public int ASID { get; set; } 
        public int TeacherID { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string ContactNo { get; set; }
        public string EmailAddress { get; set; }
        public bool Status { get; set; }
        public int SubjectID { get; set; }
        public string SubjectName { get; set; }
        public bool SStatus { get; set; }
    }
}
