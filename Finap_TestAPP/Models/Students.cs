namespace Finap_TestAPP.Models
{
    public class Student
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
}
}
