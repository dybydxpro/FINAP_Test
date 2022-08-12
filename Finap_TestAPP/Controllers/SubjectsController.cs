using Finap_TestAPP.Models;
using Finap_TestAPP.Repositories.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Finap_TestAPP.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SubjectsController : ControllerBase
    {
        private readonly ISubjectRepository _subjectRepository;

        public SubjectsController(ISubjectRepository subjectRepository)
        {
            _subjectRepository = subjectRepository;
        }

        [HttpGet]
        public async Task<ActionResult<List<Subject>>> GetAll()
        {
            List<Subject> subjects = _subjectRepository.GetSubjects().ToList();
            return Ok(subjects);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Subject>> GetOnce(int id)
        {
            Subject subject = _subjectRepository.GetOneSubject(id);

            if (subject.SubjectID != null)
            {
                return Ok(subject);
            }
            else
            {
                return NotFound();
            }
        }

        [HttpPost]
        public async Task<ActionResult<Subject>> Post(Subject obj)
        {
            if (ModelState.IsValid)
            {
                var isOK = _subjectRepository.PostSubject(obj);
                return Ok(isOK);
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpPut]
        public async Task<ActionResult<Subject>> Update(Subject obj)
        {
            if (ModelState.IsValid)
            {
                var isOK = _subjectRepository.PutSubject(obj);
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
        public async Task<ActionResult<Subject>> UpdateStatus(int id)
        {
            var isOK = _subjectRepository.DeleteSoftSubject(id);
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
        public async Task<ActionResult<Subject>> Delete(int id)
        {
            var isOK = _subjectRepository.DeleteSubject(id);
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
