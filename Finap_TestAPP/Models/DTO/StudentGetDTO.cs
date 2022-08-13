namespace Finap_TestAPP.Models.DTO
{
    public class StudentGetDTO
    {
        public int? StudentID { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string ContactPerson { get; set; }
        public string ContactNo { get; set; }
        public string EmailAddress { get; set; }
        public DateTime DOB { get; set; }
        public int? Age { get; set; }
        public int Classroom { get; set; }
        public bool? Status { get; set; }
        public int? ClassroomID { get; set; }
        public string ClassroomName { get; set; }
        public bool? CStatus { get; set; }
    }
}
