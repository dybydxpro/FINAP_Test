using Finap_TestAPP.Models;

namespace Finap_TestAPP.Repositories.Interfaces
{
    public interface IClassroomRepository
    {
        public List<Classroom> GetClassrooms();

        public Classroom GetOneClassroom(int id);

        public bool PostClassroom(Classroom obj);

        public bool PutClassroom(Classroom obj);

        public bool DeleteSoftClassroom(int id);

        public bool DeleteClassroom(int id);
    }
}
