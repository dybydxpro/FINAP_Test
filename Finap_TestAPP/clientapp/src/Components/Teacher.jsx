import React, { useEffect, useState } from "react";
import Services from "../Services";
import SlideBar from "./SideBar";
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

import { Toggles } from 'react-bootstrap-icons';

export default function Teacher(){
    const [data, setData] = useState([
        {
            "teacherID": 0,
            "firstName": "",
            "lastName": "",
            "contactNo": "",
            "emailAddress": "",
            "status": true
          }
    ]);

    const [activeTeachers, setActiveTeachers] = useState([]);
    const [activeClassrooms, setActiveClassrooms] = useState([]);
    const [activeSubjects, setActiveSubjects] = useState([]);
    const [allocateClass, setAllocateClass] = useState([]);
    const [tempAllocateClass, setTempAllocateClass] = useState([]);
    const [allocateSubject, setAllocateSubject] = useState([]);
    const [tempAllocateSubject, setTempAllocateSubject] = useState([]);

    useEffect(() => {
        fetchData();
        fetchClass();
        fetchSubject();
        fetchAllocateClass();
        fetchAllocateSubject();
    },[]);

    function fetchData(){
        var dt = [];
        Services.TeacherGetAll().then(({data})=>{
            setData(data);
            data.map((mydata) => {
                if(mydata.status == true){
                    dt.push(mydata);
                }
            });
            setActiveTeachers(dt);
        })
        .catch(({response})=>{
            console.log(response);
        })
    }

    function fetchClass(){
        var dt = [];
        Services.ClassroomGetAll().then(({data})=>{
            data.map((mydata) => {
                if(mydata.status == true){
                    dt.push(mydata);
                }
            });
            setActiveClassrooms(dt);
            console.log(dt);
        })
        .catch(({response})=>{
            console.log(response);
        })
    }

    function fetchSubject(){
        var dt = [];
        Services.SubjectGetAll().then(({data})=>{
            data.map((mydata) => {
                if(mydata.status == true){
                    dt.push(mydata);
                }
            });
            setActiveSubjects(dt);
            console.log(dt);
        })
        .catch(({response})=>{
            console.log(response);
        })
    }

    function fetchAllocateClass(){
        Services.AllocateClassGetAll().then(({data})=>{
            setAllocateClass(data);
        })
        .catch(({response})=>{
            console.log(response);
        })
    }

    function fetchAllocateSubject(){
        Services.AllocateSubjectGetAll().then(({data})=>{
            setAllocateSubject(data);
        })
        .catch(({response})=>{
            console.log(response);
        })
    }

    function dateToDateTime(vals){
        const dt = vals.split("-");
        const dtv = new Date(dt[0], Number(dt[1])-1, Number(dt[2])+1, 0,0,0,0);
        return dtv;
    }

    function printTable(){
        return(
            data.map((dataset, index) =>
                <tr key={index+1} className={dataset.status==true?"":"table-secondary"}>
                    <td className="text-center">{index+1}</td>
                    <td className="text-center">{dataset.firstName}</td>
                    <td className="text-center">{dataset.lastName}</td>
                    <td className="text-center">{dataset.contactNo}</td>
                    <td className="text-center">{dataset.emailAddress}</td>
                    <td className="text-center">
                        <button type="button" className="btn btn-warning mx-2" onClick={()=>{EditModelHandleShow(); GetOneItems(index);}}><i className="bi bi-pencil"></i>&nbsp; Edit</button>
                        <Modal show={editModel} onHide={EditModelHandleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Edit Teacher</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <div>
                                        <div className="form-floating mb-3">
                                            <input type="text" className="form-control" id="firstName" value={editItem.firstName} onChange={(e) => handleEdit(e)} placeholder="First Name"/>
                                            <label htmlFor="firstName" className="form-label">First Name</label>
                                        </div>
                                        <div className="form-floating mb-3">
                                            <input type="text" className="form-control" id="lastName" value={editItem.lastName} onChange={(e) => handleEdit(e)} placeholder="Last Name"/>
                                            <label htmlFor="lastName" className="form-label">Last Name</label>
                                        </div>
                                        <div className="form-floating mb-3">
                                            <input type="text" className="form-control" id="contactNo" value={editItem.contactNo} onChange={(e) => handleEdit(e)} placeholder="Contact Number"/>
                                            <label htmlFor="contactNo" className="form-label">Contact Number</label>
                                        </div>
                                        <div className="form-floating mb-3">
                                            <input type="email" className="form-control" id="emailAddress" value={editItem.emailAddress} onChange={(e) => handleEdit(e)} placeholder="Email Address"/>
                                            <label htmlFor="emailAddress" className="form-label">Email Address</label>
                                        </div>
                                </div>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="success" onClick={() => EditItem()}>
                                    Save
                                </Button>
                                <Button variant="secondary" onClick={EditModelHandleClose}>
                                    Close
                                </Button>
                            </Modal.Footer>
                        </Modal>
                        <button type="button" className="btn btn-secondary mx-2" onClick={()=>{DeactiveItem(dataset.teacherID)}}><i className={dataset.status==true?"bi bi-eye-slash":"bi bi-eye"}></i>&nbsp; {dataset.status==true?"Deactivate":"Activate"}</button>
                        <button type="button" className="btn btn-danger mx-2" onClick={()=>{DeleteItem(dataset.teacherID)}}><i className="bi bi-trash"></i>&nbsp; Delete</button>
                    </td>
                </tr>
            )
        );
    }

    //Add Model
    const [addModel, setAddModel] = useState(false);

    const AddModelHandleClose = () => setAddModel(false);
    const AddModelHandleShow = () => setAddModel(true);

    //Add New
    const [addNew, setAddNew] = useState({});

    function handleAdd(e){
        const newData = {...addNew};
        newData[e.target.id] = e.target.value;
        setAddNew(newData);
        console.log(newData);
    }

    function AddItemValidate(){
        const newData = {...addNew};
        if(newData["firstName"] === "" || newData["firstName"] === undefined){
            console.log("firstName");
            return false;
        }
        else if(newData["lastName"] === "" || newData["lastName"] === undefined){
            console.log("lastName");
            return false;
        }
        else if(newData["contactNo"] === "" || newData["contactNo"] === undefined){
            console.log("contactNo");
            return false;
        }
        else if(newData["emailAddress"] === "" || newData["emailAddress"] === undefined){
            console.log("emailAddress");
            return false;
        }
        else{
            return true;
        }
    }

    function AddItem(){
        var dt = ({
            "firstName": addNew.firstName,
            "lastName": addNew.lastName,
            "contactNo": addNew.contactNo,
            "emailAddress": addNew.emailAddress,
        });
        if(AddItemValidate()){
            Services.TeacherPost(dt)
            .then(({data}) =>{
                console.log(data);
                fetchData();
                AddModelHandleClose();
                setAddNew({});
            }).catch(({response})=>{
                console.log(response);
                alert(response);
            })
        }
        else{
            alert("Validation Failed!");
        }
        
    }

    //Edit Model
    const [editModel, setEditModel] = useState(false);

    const EditModelHandleClose = () => setEditModel(false);
    const EditModelHandleShow = () => setEditModel(true);

    //Edit User
    const [editItem, setEditItem] = useState({
        "studentID": 0,
        "firstName": "",
        "lastName": "",
        "contactNo": "",
        "emailAddress": "",
    });

    function handleEdit(e){
        const newData = {...editItem};
        newData[e.target.id] = e.target.value;
        setEditItem(newData);
        console.log(newData);
    }

    function GetOneItems(id){
        var dt = {
            "teacherID": data[id].teacherID,
            "firstName": data[id].firstName,
            "lastName": data[id].lastName,
            "contactNo": data[id].contactNo,
            "emailAddress": data[id].emailAddress,
        };
        setEditItem(dt);
        console.log(dt);
    }

    function EditItemValidate(){
        const newData = {...editItem};
        if(newData["teacherID"] === "" || newData["teacherID"] === undefined){
            console.log("teacherID");
            return false;
        }
        else if(newData["firstName"] === "" || newData["firstName"] === undefined){
            console.log("firstName");
            return false;
        }
        else if(newData["lastName"] === "" || newData["lastName"] === undefined){
            console.log("lastName");
            return false;
        }
        else if(newData["contactNo"] === "" || newData["contactNo"] === undefined){
            console.log("contactNo");
            return false;
        }
        else if(newData["emailAddress"] === "" || newData["emailAddress"] === undefined){
            console.log("emailAddress");
            return false;
        }
        else{
            return true;
        }
    }

    function EditItem(){
        if(EditItemValidate()){
            Services.TeacherPut(editItem)
            .then(({data}) =>{
                console.log(data);
                EditItem({
                    "teacherID": 0,
                    "firstName": "",
                    "lastName": "",
                    "contactNo": "",
                    "emailAddress": ""
                });
                fetchData();
                EditModelHandleClose();
            }).catch(({response})=>{
                console.log(response);
                alert(response);
            })     
        }
        else{
            alert("Validation Failed!")
        }
    }

    //Deactive

    function DeactiveItem(id){
        if(window.confirm("Confirm to continue!") == true){
            Services.TeacherChangeStatus(id)
            .then(({data}) =>{
                console.log(data);
                fetchData();
            }).catch(({response})=>{
                console.log(response);
                alert("Deactivate Failed!");
            })     
        }
    }

    //Delete

    function DeleteItem(id){
        if(window.confirm("Confirm to continue!") == true){
            Services.StudentDelete(id)
            .then(({data}) =>{
                console.log(data);
                fetchData();
            }).catch(({response})=>{
                console.log(response);
                alert("Delete Failed!");
            })     
        }
    }


    //Alocate className Modal
    const [showClassModal, setShowClassModal] = useState(false);
    const [addNewAC, setAddNewAC] = useState({});

    const handleClassModalClose = () => setShowClassModal(false);
    const handleClassModalShow = () => setShowClassModal(true);

    function allocateTeacher(id){
        var dt = [];
        allocateClass.map((mydata) => {
            if(mydata.teacherID == id){
                dt.push(mydata);
            }
        });
        setTempAllocateClass(dt);
    }

    function handleAC(e){
        const newData = {...addNewAC};
        newData[e.target.id] = e.target.value;
        setAddNewAC(newData);
        console.log(newData);
    }

    function AddACValidate(){
        const newData = {...addNewAC};
        if(newData["teacherID"] === "" || newData["teacherID"] === undefined){
            console.log("teacherID");
            return false;
        }
        else if(newData["classID"] === "" || newData["classID"] === undefined){
            console.log("classID");
            return false;
        }
        else{
            return true;
        }
    }

    function AddAC(){
        var dt = ({
            "teacherID": addNewAC.teacherID,
            "classID": addNewAC.classID
        });
        if(AddACValidate()){
            Services.AllocateClassPost(dt)
            .then(({data}) =>{
                console.log(data);
                fetchAllocateClass();
                setInterval(allocateTeacher(Number(dt.teacherID)) , 5000);
                //allocateTeacher(Number(dt.teacherID))
            }).catch(({response})=>{
                console.log(response);
                alert(response);
            })
        }
        else{
            alert("Validation Failed!");
        }
    }

    function DeallocateClass(id){
        Services.AllocateClassDelete(id)
        .then(({data}) =>{
            console.log(data);
            fetchAllocateClass();
            setInterval(allocateTeacher(Number(sessionStorage.getItem("tid"))) , 5000);
        }).catch(({response})=>{
            console.log(response);
            alert(response);
        })
    }

    //Alocate Subject Modal
    const [showSubjectModal, setShowSubjectModal] = useState(false);
    const [addNewAS, setAddNewAS] = useState({});

    const handleSubjectModalClose = () => setShowSubjectModal(false);
    const handleSubjectModalShow = () => setShowSubjectModal(true);

    function allocateTeacherS(id){
        var dt = [];
        allocateSubject.map((mydata) => {
            if(mydata.teacherID == id){
                dt.push(mydata);
            }
        });
        setTempAllocateSubject(dt);
    }

    function handleAS(e){
        const newData = {...addNewAS};
        newData[e.target.id] = e.target.value;
        setAddNewAS(newData);
        console.log(newData);
    }

    function AddASValidate(){
        const newData = {...addNewAS};
        if(newData["teacherID"] === "" || newData["teacherID"] === undefined){
            console.log("teacherID");
            return false;
        }
        else if(newData["subjectID"] === "" || newData["subjectID"] === undefined){
            console.log("subjectID");
            return false;
        }
        else{
            return true;
        }
    }

    function AddAS(){
        var dt = ({
            "teacherID": addNewAS.teacherID,
            "subjectID": addNewAS.subjectID
        });
        if(AddASValidate()){
            Services.AllocateSubjectPost(dt)
            .then(({data}) =>{
                console.log(data);
                fetchAllocateSubject();
                setInterval(allocateTeacher(Number(dt.teacherID)) , 5000);
                //allocateTeacher(Number(dt.teacherID))
            }).catch(({response})=>{
                console.log(response);
                alert(response);
            })
        }
        else{
            alert("Validation Failed!");
        }
    }

    function DeallocateSubject(id){
        Services.AllocateSubjectDelete(id)
        .then(({data}) =>{
            console.log(data);
            fetchAllocateSubject();
            setInterval(allocateTeacherS(Number(sessionStorage.getItem("tid"))) , 5000);
        }).catch(({response})=>{
            console.log(response);
            alert(response);
        })
    }


    return(
        <div>
            <div className="row">
                <div className="col-2">
                    <SlideBar />
                </div>
                <div className="col">
                    <Container>
                        <div className="d-flex justify-content-center topheading">
                            <h2>List of Teachers.</h2>
                        </div>

                        <div className="d-flex justify-content-end mb-2">
                            <DropdownButton
                                as={ButtonGroup}
                                key="Primary"
                                id={`dropdown-variants-primary`}
                                variant="primary"
                                title={<><Toggles/> Options</>}>
                                <Dropdown.Item eventKey="2" onClick={() => handleClassModalShow()}>Allocate Class Name</Dropdown.Item>
                                    <Modal size="lg" aria-labelledby="contained-modal-title-vcenter" show={showClassModal} onHide={() => handleClassModalClose()} centered>
                                        <Modal.Header closeButton>
                                            Allocate Classroom
                                        </Modal.Header>
                                        <Modal.Body>
                                            <div>
                                                <div className="segmentBorder">
                                                    <p>Teachers Details</p>
                                                    <div className="d-flex">
                                                        <p className="modelText">Teacher   </p>
                                                        <select className="form-select modelSelect" aria-label="Default select example"  id="teacherID" onChange={(e) => {handleAC(e); sessionStorage.setItem("tid", e.target.value)}} placeholder="Classroom">
                                                            <option value=""></option>
                                                            {
                                                                activeTeachers.map(mydata => <option key={mydata.teacherID} value={mydata.teacherID}>{mydata.firstName + " " + mydata.lastName}</option>)
                                                            }
                                                        </select>
                                                        <button type="button" className="btn btn-primary mx-5" onClick={() =>  allocateTeacher(Number(sessionStorage.getItem("tid")))}>Save</button>
                                                    </div>
                                                </div>

                                                <div className="segmentBorder">
                                                    <p>Allocate Classroom</p>
                                                    <div className="d-flex mb-3">
                                                        <p className="modelText">Classroom   </p>
                                                        <select className="form-select modelSelect" aria-label="Default select example"  id="classID" onChange={(e) => {handleAC(e);}} placeholder="Classroom">
                                                            <option value=""></option>
                                                            {
                                                                activeClassrooms.map(mydata => <option key={mydata.classroomID} value={mydata.classroomID}>{mydata.classroomName}</option>)
                                                            }
                                                        </select>
                                                        <button type="button" className="btn btn-primary mx-5" onClick={()=>AddAC()}>Allocate</button>
                                                    </div>

                                                    <Table bordered hover>
                                                        <thead>
                                                            <tr className="table-info">
                                                                <th className="text-center">Classroom</th>
                                                                <th className="text-center" style={{ width: "150px" }}>Option</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {tempAllocateClass.map((dataset, index) =>
                                                                <tr key={index+1} className={dataset.status==true?"":"table-secondary"}>
                                                                    <td className="">{dataset.classroomName}</td>
                                                                    <td className="text-center">
                                                                        <button type="button" className="btn btn-danger mx-5" onClick={() => DeallocateClass(dataset.acid)}>Deallocate</button>
                                                                    </td>
                                                                </tr>
                                                            )}
                                                        </tbody>
                                                    </Table>
                                                </div>
                                            </div>
                                        </Modal.Body>
                                    </Modal>
                                <Dropdown.Item eventKey="3" onClick={() => handleSubjectModalShow()}>Allocate Subjects</Dropdown.Item>
                                    <Modal size="lg" aria-labelledby="contained-modal-title-vcenter" show={showSubjectModal} onHide={() => handleSubjectModalClose()} centered>
                                        <Modal.Header closeButton>
                                            Allocate Subjects
                                        </Modal.Header>
                                        <Modal.Body>
                                            <div>
                                                <div className="segmentBorder">
                                                    <p>Teachers Details</p>
                                                    <div className="d-flex">
                                                        <p className="modelText">Teacher   </p>
                                                        <select className="form-select modelSelect" aria-label="Default select example"  id="teacherID" onChange={(e) => {handleAS(e); sessionStorage.setItem("tid", e.target.value)}} placeholder="Classroom">
                                                            <option value=""></option>
                                                            {
                                                                activeTeachers.map(mydata => <option key={mydata.teacherID} value={mydata.teacherID}>{mydata.firstName + " " + mydata.lastName}</option>)
                                                            }
                                                        </select>
                                                        <button type="button" className="btn btn-primary mx-5" onClick={() =>  allocateTeacherS(Number(sessionStorage.getItem("tid")))}>Save</button>
                                                    </div>
                                                </div>

                                                <div className="segmentBorder">
                                                    <p>Allocate Subjects</p>
                                                    <div className="d-flex mb-3">
                                                        <p className="modelText">Subject   </p>
                                                        <select className="form-select modelSelect" aria-label="Default select example"  id="subjectID" onChange={(e) => {handleAS(e);}} placeholder="Classroom">
                                                            <option value=""></option>
                                                            {
                                                                activeSubjects.map(mydata => <option key={mydata.subjectID} value={mydata.subjectID}>{mydata.subjectName}</option>)
                                                            }
                                                        </select>
                                                        <button type="button" className="btn btn-primary mx-5" onClick={()=>AddAS()}>Allocate</button>
                                                    </div>

                                                    <Table bordered hover>
                                                        <thead>
                                                            <tr className="table-info">
                                                                <th className="text-center">Classroom</th>
                                                                <th className="text-center" style={{ width: "150px" }}>Option</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {tempAllocateSubject.map((dataset, index) =>
                                                                <tr key={index+1} className={dataset.status==true?"":"table-secondary"}>
                                                                    <td className="">{dataset.subjectName}</td>
                                                                    <td className="text-center">
                                                                        <button type="button" className="btn btn-danger mx-5" onClick={() => DeallocateSubject(dataset.asid)}>Deallocate</button>
                                                                    </td>
                                                                </tr>
                                                            )}
                                                        </tbody>
                                                    </Table>
                                                </div>
                                            </div>
                                        </Modal.Body>
                                    </Modal>
                            </DropdownButton>
                        </div>

                        <Table bordered hover>
                            <thead>
                                <tr className="table-info">
                                    <th className="text-center">#</th>
                                    <th className="text-center">First Name</th>
                                    <th className="text-center">Last Name</th>
                                    <th className="text-center">Contact #</th>
                                    <th className="text-center">Email</th>
                                    <th className="text-center" style={{ width: "450px" }}>Option</th>
                                </tr>
                            </thead>
                            <tbody>
                                {printTable()}
                            </tbody>
                        </Table>

                        <div>
                            <button type="button" className="btn text-light" style={{position:"fixed", width:"60px", height:"60px", bottom:"40px", right:"40px", borderRadius: "50%", backgroundColor: "#2e856e", fontSize:"28px"}} onClick={AddModelHandleShow}>
                                <i className="bi bi-plus"></i>
                            </button>
                            <Modal show={addModel} onHide={AddModelHandleClose}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Add Student</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <div>
                                        <div className="form-floating mb-3">
                                            <input type="text" className="form-control" id="firstName" onChange={(e) => handleAdd(e)} placeholder="First Name"/>
                                            <label htmlFor="firstName" className="form-label">First Name</label>
                                        </div>
                                        <div className="form-floating mb-3">
                                            <input type="text" className="form-control" id="lastName" onChange={(e) => handleAdd(e)} placeholder="Last Name"/>
                                            <label htmlFor="lastName" className="form-label">Last Name</label>
                                        </div>
                                        <div className="form-floating mb-3">
                                            <input type="text" className="form-control" id="contactNo" onChange={(e) => handleAdd(e)} placeholder="Contact Number"/>
                                            <label htmlFor="contactNo" className="form-label">Contact Number</label>
                                        </div>
                                        <div className="form-floating mb-3">
                                            <input type="email" className="form-control" id="emailAddress" onChange={(e) => handleAdd(e)} placeholder="Email Address"/>
                                            <label htmlFor="emailAddress" className="form-label">Email Address</label>
                                        </div>
                                    </div>
                                    
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="success" onClick={() => AddItem()}>
                                        Save
                                    </Button>
                                    <Button variant="secondary" onClick={AddModelHandleClose}>
                                        Close
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                        </div>
                    </Container>
                </div>
            </div>
        </div>
    );
}