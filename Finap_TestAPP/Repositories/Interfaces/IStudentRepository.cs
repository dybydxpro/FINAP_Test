using Finap_TestAPP.Models;
using Finap_TestAPP.Models.DTO;

namespace Finap_TestAPP.Repositories.Interfaces
{
    public interface IStudentRepository
    {
        public List<StudentGetDTO> GetStudents();

        public Student GetOneStudent(int id);

        public bool PostStudent(Student obj);

        public bool PutStudent(Student obj);

        public bool DeleteSoftStudent(int id);

        public bool DeleteStudent(int id);
    }
}
