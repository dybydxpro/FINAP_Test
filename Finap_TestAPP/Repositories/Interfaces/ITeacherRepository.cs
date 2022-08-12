using Finap_TestAPP.Models;

namespace Finap_TestAPP.Repositories.Interfaces
{
    public interface ITeacherRepository
    {
        public List<Teacher> GetTeachers();

        public Teacher GetOneTeacher(int id);

        public bool PostTeacher(Teacher obj);

        public bool PutTeacher(Teacher obj);

        public bool DeleteSoftTeacher(int id);

        public bool DeleteTeacher(int id);
    }
}
