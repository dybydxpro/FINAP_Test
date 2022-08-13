import React, { useEffect, useState } from "react";
import Services from "../Services";
import SlideBar from "./SideBar";
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

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

    useEffect(() => {
        fetchData();
    },[]);

    function fetchData(){
        Services.TeacherGetAll().then(({data})=>{
            setData(data)
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

    return(
        <div>
            <div className="row">
                <div className="col-2">
                    <SlideBar />
                </div>
                <div className="col">
                    <Container>
                        <div className="d-flex justify-content-center topheading">
                            <h2>Student</h2>
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