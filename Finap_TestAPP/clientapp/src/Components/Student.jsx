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

export default function Student(){
    const [data, setData] = useState([
        {
            "studentID": 0,
            "firstName": "",
            "lastName": "",
            "contactPerson": "",
            "contactNo": "",
            "emailAddress": "",
            "dob": "",
            "age": 0,
            "classroom": 0,
            "status": false
          }
    ]);
    const [classroom, setClassroom] = useState([
        {
            "classroomID": 0,
            "classroomName": "",
            "status": false
        }
    ]);
    const [detailedReports, setDetailedReports] = useState([{}]);

    useEffect(() => {
        fetchData();
        fetchClass();
        fetchDetailedReport();
    },[]);

    function fetchData(){
        Services.StudentGetAll().then(({data})=>{
            setData(data)
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
            setClassroom(dt);
            console.log(dt);
        })
        .catch(({response})=>{
            console.log(response);
        })
    }

    function fetchDetailedReport(){
        Services.StudentDetailedReport().then(({data})=>{
            setDetailedReports(data);
            console.log(data);
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
                    <td className="text-center">{dataset.contactPerson}</td>
                    <td className="text-center">{dataset.contactNo}</td>
                    <td className="text-center">{dataset.emailAddress}</td>
                    <td className="text-center">{(dataset.dob).substring(0, 10)}</td>
                    <td className="text-center">{dataset.age}</td>
                    <td className="text-center">{dataset.classroomName}</td>
                    <td className="text-center">
                        <button type="button" className="btn btn-warning mx-2" onClick={()=>{EditModelHandleShow(); GetOneItems(index);}}><i className="bi bi-pencil"></i>&nbsp; Edit</button>
                        <Modal show={editModel} onHide={EditModelHandleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Edit Student</Modal.Title>
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
                                            <input type="text" className="form-control" id="contactPerson" value={editItem.contactPerson} onChange={(e) => handleEdit(e)} placeholder="Contact Person"/>
                                            <label htmlFor="contactPerson" className="form-label">Contact Person</label>
                                        </div>
                                        <div className="form-floating mb-3">
                                            <input type="text" className="form-control" id="contactNo" value={editItem.contactNo} onChange={(e) => handleEdit(e)} placeholder="Contact Number"/>
                                            <label htmlFor="contactNo" className="form-label">Contact Number</label>
                                        </div>
                                        <div className="form-floating mb-3">
                                            <input type="email" className="form-control" id="emailAddress" value={editItem.emailAddress} onChange={(e) => handleEdit(e)} placeholder="Email Address"/>
                                            <label htmlFor="emailAddress" className="form-label">Email Address</label>
                                        </div>
                                        <div className="form-floating mb-3">
                                            <input type="date" className="form-control" id="dob" value={editItem.dob} onChange={(e) => handleEdit(e)} placeholder="Date of Birth"/>
                                            <label htmlFor="dob" className="form-label">Date of Birth</label>
                                        </div>
                                        <div className="form-floating mb-3">
                                            <select className="form-select" aria-label="Default select example"  id="classroom"  value={editItem.classroom} onChange={(e) => handleEdit(e)} placeholder="Classroom">
                                                <option value=""></option>
                                                {
                                                    classroom.map(mydata => <option key={mydata.classroomID} value={mydata.classroomID}>{mydata.classroomName}</option>)
                                                }
                                            </select>
                                            <label htmlFor="classroom" className="form-label">Classroom</label>
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
                        <button type="button" className="btn btn-secondary mx-2" onClick={()=>{DeactiveItem(dataset.studentID)}}><i className={dataset.status==true?"bi bi-eye-slash":"bi bi-eye"}></i>&nbsp; {dataset.status==true?"Deactivate":"Activate"}</button>
                        <button type="button" className="btn btn-danger mx-2" onClick={()=>{DeleteItem(dataset.studentID)}}><i className="bi bi-trash"></i>&nbsp; Delete</button>
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
        else if(newData["contactPerson"] === "" || newData["contactPerson"] === undefined){
            console.log("contactPerson");
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
        else if(newData["dob"] === "" || newData["dob"] === undefined){
            console.log("dob");
            return false;
        }
        else if(newData["classroom"] === "" || newData["classroom"] === undefined){
            console.log("classroom");
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
            "contactPerson": addNew.contactPerson,
            "contactNo": addNew.contactNo,
            "emailAddress": addNew.emailAddress,
            "dob": dateToDateTime(addNew.dob),
            "classroom": addNew.classroom
        });
        if(AddItemValidate()){
            Services.StudentPost(dt)
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
        "contactPerson": "",
        "contactNo": "",
        "emailAddress": "",
        "dob": "",
        "age": 0,
        "classroom": 0,
        "status": false
    });

    function handleEdit(e){
        const newData = {...editItem};
        newData[e.target.id] = e.target.value;
        setEditItem(newData);
        console.log(newData);
    }

    function GetOneItems(id){
        var dt = {
            "studentID": data[id].studentID,
            "firstName": data[id].firstName,
            "lastName": data[id].lastName,
            "contactPerson": data[id].contactPerson,
            "contactNo": data[id].contactNo,
            "emailAddress": data[id].emailAddress,
            "dob": data[id].dob,
            "age": data[id].age,
            "classroom": data[id].classroom,
            "status": data[id].status
        };
        setEditItem(dt);
        console.log(dt);
    }

    function EditItemValidate(){
        const newData = {...editItem};
        if(newData["firstName"] === "" || newData["firstName"] === undefined){
            console.log("firstName");
            return false;
        }
        else if(newData["lastName"] === "" || newData["lastName"] === undefined){
            console.log("lastName");
            return false;
        }
        else if(newData["contactPerson"] === "" || newData["contactPerson"] === undefined){
            console.log("contactPerson");
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
        else if(newData["dob"] === "" || newData["dob"] === undefined){
            console.log("dob");
            return false;
        }
        else if(newData["classroom"] === "" || newData["classroom"] === undefined){
            console.log("classroom");
            return false;
        }
        else{
            return true;
        }
    }

    function EditItem(){
        if(EditItemValidate()){
            Services.StudentPut(editItem)
            .then(({data}) =>{
                console.log(data);
                EditItem({
                    "studentID": 0,
                    "firstName": "",
                    "lastName": "",
                    "contactPerson": "",
                    "contactNo": "",
                    "emailAddress": "",
                    "dob": "",
                    "age": 0,
                    "classroom": 0,
                    "status": false
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
            Services.StudentChangeStatus(id)
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

    //Report Model
    const [reportModel, setReportModel] = useState(false);
    const [temp, setTemp] = useState([{}]);

    const ReportModelHandleClose = () => setReportModel(false);
    const ReportModelHandleShow = () => setReportModel(true);

    function tempStudent(id){
        var dt = [];
        detailedReports.map((mydata) => {
            if(mydata.studentID == id){
                dt.push(mydata);
            }
        });
        setTemp(dt);
        console.log(dt);
    }

    return(
        <div>
            <div className="row">
                <div className="col-2">
                    <SlideBar />
                </div>
                <div className="col">
                    <Container fluid>
                        <div className="d-flex justify-content-center topheading">
                            <h2>List of Students.</h2>
                        </div>

                        <div className="d-flex justify-content-end mb-2">
                            <DropdownButton
                                as={ButtonGroup}
                                key="Primary"
                                id={`dropdown-variants-primary`}
                                variant="primary"
                                title={<><Toggles/> Options</>}>
                                <Dropdown.Item eventKey="1" onClick={() => ReportModelHandleShow()}>Allocate className Name</Dropdown.Item>
                                    <Modal size="lg" aria-labelledby="contained-modal-title-vcenter" show={reportModel} onHide={() => ReportModelHandleClose()} centered>
                                        <Modal.Header closeButton>
                                            Student Detail Report
                                        </Modal.Header>
                                        <Modal.Body>
                                            <div>
                                                <div className="segmentBorder2">
                                                    <p>Student Details</p>

                                                    <div className="row">
                                                        <div className="col-2">
                                                            <p>Student</p>
                                                        </div>
                                                        <div className="col-4">
                                                            <select className="form-select" aria-label="Default select example" onChange={(e) => tempStudent(e.target.value)} id="studentID" placeholder="Classroom">
                                                                <option value=""></option>
                                                                {
                                                                    data.map((mydata) => <option key={mydata.studentID} value={mydata.studentID}>{mydata.firstName + " " + mydata.lastName}</option>)
                                                                }
                                                            </select>
                                                        </div>
                                                        <div className="col-2">
                                                            <p>Classroom</p>
                                                        </div>
                                                        <div className="col-4">
                                                            <input type="text" className="form-control" value={(temp[0].classroomName == undefined)?"":temp[0].classroomName} id="Classroom" readOnly/>
                                                        </div>
                                                    </div>

                                                    <div className="row">
                                                        <div className="col-2">
                                                            <p>Contactor</p>
                                                        </div>
                                                        <div className="col-4">
                                                            <input type="text" className="form-control" value={(temp[0].contactPerson == undefined)?"":temp[0].contactPerson} id="contactPerson" readOnly/>
                                                        </div>
                                                        <div className="col-2">
                                                            <p>Email</p>
                                                        </div>
                                                        <div className="col-4">
                                                            <input type="text" className="form-control" value={(temp[0].emailAddress == undefined)?"":temp[0].emailAddress} id="email" readOnly/>
                                                        </div>
                                                    </div>

                                                    <div className="row">
                                                        <div className="col-2">
                                                            <p>Contact No.</p>
                                                        </div>
                                                        <div className="col-4">
                                                            <input type="text" className="form-control" value={(temp[0].contactNo == undefined)?"":temp[0].contactNo} id="contactNumber" readOnly/>
                                                        </div>
                                                        <div className="col-2">
                                                            <p>Date of Birth</p>
                                                        </div>
                                                        <div className="col-4">
                                                            <input type="text" className="form-control" value={(((temp[0].dob)=="") || ((temp[0].dob)== undefined))?"":(temp[0].dob).substring(0,10)} id="dob" readOnly/>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="segmentBorder2">
                                                    <p>Teacher and Subject Details</p>

                                                    <Table bordered hover>
                                                        <thead>
                                                            <tr className="table-info">
                                                                <th className="text-center">Subject</th>
                                                                <th className="text-center">Teacher</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {temp.map((dataset, index) =>
                                                                <tr key={index}>
                                                                    <td className="">{dataset.subjectName}</td>
                                                                    <td className="">{dataset.tFirstName + " " + dataset.tLastName}</td>
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
                                    <th className="text-center">Contact Person</th>
                                    <th className="text-center">Contact #</th>
                                    <th className="text-center">Email</th>
                                    <th className="text-center">DOB</th>
                                    <th className="text-center">Age</th>
                                    <th className="text-center">Classroom</th>
                                    <th className="text-center" style={{ width: "400px" }}>Option</th>
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
                                            <input type="text" className="form-control" id="contactPerson" onChange={(e) => handleAdd(e)} placeholder="Contact Person"/>
                                            <label htmlFor="contactPerson" className="form-label">Contact Person</label>
                                        </div>
                                        <div className="form-floating mb-3">
                                            <input type="text" className="form-control" id="contactNo" onChange={(e) => handleAdd(e)} placeholder="Contact Number"/>
                                            <label htmlFor="contactNo" className="form-label">Contact Number</label>
                                        </div>
                                        <div className="form-floating mb-3">
                                            <input type="email" className="form-control" id="emailAddress" onChange={(e) => handleAdd(e)} placeholder="Email Address"/>
                                            <label htmlFor="emailAddress" className="form-label">Email Address</label>
                                        </div>
                                        <div className="form-floating mb-3">
                                            <input type="date" className="form-control" id="dob" onChange={(e) => handleAdd(e)} placeholder="Date of Birth"/>
                                            <label htmlFor="dob" className="form-label">Date of Birth</label>
                                        </div>
                                        <div className="form-floating mb-3">
                                            <select className="form-select" aria-label="Default select example"  id="classroom" onChange={(e) => handleAdd(e)} placeholder="Classroom">
                                                <option value=""></option>
                                                {
                                                    classroom.map(mydata => <option key={mydata.classroomID} value={mydata.classroomID}>{mydata.classroomName}</option>)
                                                }
                                            </select>
                                            <label htmlFor="classroom" className="form-label">Classroom</label>
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