using Finap_TestAPP.Models;
using Finap_TestAPP.Repositories.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Finap_TestAPP.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClassroomsController : ControllerBase
    {
        private readonly IClassroomRepository _classroomRepository;

        public ClassroomsController(IClassroomRepository classroomRepository)
        {
            _classroomRepository = classroomRepository;
        }

        [HttpGet]
        public async Task<ActionResult<List<Classroom>>> GetAll()
        {
            List<Classroom> classrooms = _classroomRepository.GetClassrooms().ToList();
            return Ok(classrooms);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Classroom>> GetOnce(int id)
        {
            Classroom classroom = _classroomRepository.GetOneClassroom(id);

            if (classroom.ClassroomID != null)
            {
                return Ok(classroom);
            }
            else
            {
                return NotFound();
            }
        }

        [HttpPost]
        public async Task<ActionResult<Classroom>> Post(Classroom obj)
        {
            if (ModelState.IsValid)
            {
                var isOK = _classroomRepository.PostClassroom(obj);
                return Ok(isOK);
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpPut]
        public async Task<ActionResult<Classroom>> Update(Classroom obj)
        {
            if (ModelState.IsValid)
            {
                var isOK = _classroomRepository.PutClassroom(obj);
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
        public async Task<ActionResult<Classroom>> UpdateStatus(int id)
        {
            var isOK = _classroomRepository.DeleteSoftClassroom(id);
            if (isOK)
            {
                return Ok(isOK);
            }
            else
            {
                return NotFound();
            }
        }

        [HttpDelete]
        public async Task<ActionResult<Classroom>> Delete(int id)
        {
            var isOK = _classroomRepository.DeleteClassroom(id);
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
