using Finap_TestAPP.Models;

namespace Finap_TestAPP.Repositories.Interfaces
{
    public interface ISubjectRepository
    {
        public List<Subject> GetSubjects();

        public Subject GetOneSubject(int id);

        public bool PostSubject(Subject obj);

        public bool PutSubject(Subject obj);

        public bool DeleteSoftSubject(int id);

        public bool DeleteSubject(int id);
    }
}
