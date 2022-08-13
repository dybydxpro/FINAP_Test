using Finap_TestAPP.Models;
using Finap_TestAPP.Models.DTO;

namespace Finap_TestAPP.Repositories.Interfaces
{
    public interface IAllocationRepository
    {
        public List<AllocateClassGetDTO> GetAllocateClasses();

        public AllocateClass GetOneAllocateClass(int id);

        public bool PostAllocateClass(AllocateClass obj);

        public bool PutAllocateClass(AllocateClass obj);

        public bool DeleteAllocateClass(int id);


        public List<AllocateSubjectGetDTO> GetAllocateSubjects();

        public AllocateSubject GetOneAllocateSubject(int id);

        public bool PostAllocateSubject(AllocateSubject obj);

        public bool PutAllocateSubject(AllocateSubject obj);

        public bool DeleteAllocateSubject(int id);
    }
}
