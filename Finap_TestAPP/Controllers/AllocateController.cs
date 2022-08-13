using Finap_TestAPP.Models;
using Finap_TestAPP.Models.DTO;
using Finap_TestAPP.Repositories.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Finap_TestAPP.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AllocateController : ControllerBase
    {
        private readonly IAllocationRepository _allocationRepository;

        public AllocateController(IAllocationRepository allocationRepository)
        {
            _allocationRepository = allocationRepository;
        }

        [HttpGet("Class")]
        public async Task<ActionResult<List<AllocateClassGetDTO>>> GetAllAllocateClass()
        {
            List<AllocateClassGetDTO> list = _allocationRepository.GetAllocateClasses().ToList();
            return Ok(list);
        }

        [HttpGet("Class/{id}")]
        public async Task<ActionResult<AllocateClass>> GetOnceAllocateClass(int id)
        {
            AllocateClass list = _allocationRepository.GetOneAllocateClass(id);

            if (list.ACID != null)
            {
                return Ok(list);
            }
            else
            {
                return NotFound();
            }
        }

        [HttpPost("Class")]
        public async Task<ActionResult<AllocateClass>> PostAllocateClass(AllocateClass obj)
        {
            if (ModelState.IsValid)
            {
                var isOK = _allocationRepository.PostAllocateClass(obj);
                return Ok(isOK);
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpPut("Class")]
        public async Task<ActionResult<AllocateClass>> UpdateAllocateClass(AllocateClass obj)
        {
            if (ModelState.IsValid)
            {
                var isOK = _allocationRepository.PutAllocateClass(obj);
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

        [HttpDelete("Class/{id}")]
        public async Task<ActionResult<AllocateClass>> DeleteAllocateClass(int id)
        {
            var isOK = _allocationRepository.DeleteAllocateClass(id);
            if (isOK)
            {
                return Ok(isOK);
            }
            else
            {
                return NotFound();
            }
        }


        [HttpGet("Subject")]
        public async Task<ActionResult<List<AllocateSubjectGetDTO>>> GetAllAllocateSubject()
        {
            List<AllocateSubjectGetDTO> list = _allocationRepository.GetAllocateSubjects().ToList();
            return Ok(list);
        }

        [HttpGet("Subject/{id}")]
        public async Task<ActionResult<AllocateSubject>> GetOnceAllocateSubject(int id)
        {
            AllocateSubject list = _allocationRepository.GetOneAllocateSubject(id);

            if (list.ASID != null)
            {
                return Ok(list);
            }
            else
            {
                return NotFound();
            }
        }

        [HttpPost("Subject")]
        public async Task<ActionResult<AllocateSubject>> PostAllocateSubject(AllocateSubject obj)
        {
            if (ModelState.IsValid)
            {
                var isOK = _allocationRepository.PostAllocateSubject(obj);
                return Ok(isOK);
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpPut("Subject")]
        public async Task<ActionResult<AllocateSubject>> UpdateAllocateSubject(AllocateSubject obj)
        {
            if (ModelState.IsValid)
            {
                var isOK = _allocationRepository.PutAllocateSubject(obj);
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

        [HttpDelete("Subject/{id}")]
        public async Task<ActionResult<AllocateSubject>> DeleteAllocateSubject(int id)
        {
            var isOK = _allocationRepository.DeleteAllocateSubject(id);
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
