using Finap_TestAPP.Models;
using Finap_TestAPP.Models.DTO;
using Finap_TestAPP.Repositories.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Finap_TestAPP.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentsController : ControllerBase
    {
        private readonly IStudentRepository _studentRepository;

        public StudentsController(IStudentRepository studentRepository)
        {
            _studentRepository = studentRepository;
        }

        [HttpGet]
        public async Task<ActionResult<List<StudentGetDTO>>> GetAll()
        {
            List<StudentGetDTO> students = _studentRepository.GetStudents().ToList();
            return Ok(students);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Student>> GetOnce(int id)
        {
            Student student = _studentRepository.GetOneStudent(id);

            if (student.StudentID != null)
            {
                return Ok(student);
            }
            else
            {
                return NotFound();
            }
        }

        [HttpPost]
        public async Task<ActionResult<Student>> Post(Student obj)
        {
            if (ModelState.IsValid)
            {
                var isOK = _studentRepository.PostStudent(obj);
                return Ok(isOK);
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpPut]
        public async Task<ActionResult<Student>> Update(Student obj)
        {
            if (ModelState.IsValid)
            {
                var isOK = _studentRepository.PutStudent(obj);
                if (isOK)
                {
                    return Ok(isOK);
                }
                else
                {
                    return NotFound();
                }
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpPut("ChangeStatus/{id}")]
        public async Task<ActionResult<Student>> UpdateStatus(int id)
        {
            var isOK = _studentRepository.DeleteSoftStudent(id);
            if (isOK)
            {
                return Ok(isOK);
            }
            else
            {
                return NotFound();
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Student>> Delete(int id)
        {
            var isOK = _studentRepository.DeleteStudent(id);
            if (isOK)
            {
                return Ok(isOK);
            }
            else
            {
                return NotFound();
            }
        }


        [HttpGet("DetailedReport")]
        public async Task<ActionResult<List<StudentDetailDTO>>> GetDetailedReport()
        {
            List<StudentDetailDTO> students = _studentRepository.GetStudentsDetails().ToList();
            return Ok(students);
        }
    }
}
