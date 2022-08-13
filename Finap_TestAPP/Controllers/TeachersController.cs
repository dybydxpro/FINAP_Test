using Finap_TestAPP.Models;
using Finap_TestAPP.Repositories.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Finap_TestAPP.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TeachersController : ControllerBase
    {
        private readonly ITeacherRepository _teacherRepository;

        public TeachersController(ITeacherRepository teacherRepository)
        {
            _teacherRepository = teacherRepository;
        }

        [HttpGet]
        public async Task<ActionResult<List<Teacher>>> GetAll()
        {
            List<Teacher> teachers = _teacherRepository.GetTeachers().ToList();
            return Ok(teachers);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Teacher>> GetOnce(int id)
        {
            Teacher teacher = _teacherRepository.GetOneTeacher(id);

            if (teacher.TeacherID != null)
            {
                return Ok(teacher);
            }
            else
            {
                return NotFound();
            }
        }

        [HttpPost]
        public async Task<ActionResult<Teacher>> Post(Teacher obj)
        {
            if (ModelState.IsValid)
            {
                var isOK = _teacherRepository.PostTeacher(obj);
                return Ok(isOK);
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpPut]
        public async Task<ActionResult<Teacher>> Update(Teacher obj)
        {
            if (ModelState.IsValid)
            {
                var isOK = _teacherRepository.PutTeacher(obj);
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
        public async Task<ActionResult<Teacher>> UpdateStatus(int id)
        {
            var isOK = _teacherRepository.DeleteSoftTeacher(id);
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
        public async Task<ActionResult<Teacher>> Delete(int id)
        {
            var isOK = _teacherRepository.DeleteTeacher(id);
            if (isOK)
            {
                return Ok(isOK);
            }
            else
            {
                return NotFound();
            }
        }
    }
}
