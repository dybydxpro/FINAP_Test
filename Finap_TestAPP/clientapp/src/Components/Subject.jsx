import React, { useEffect, useState } from "react";
import Services from "../Services";
import SlideBar from "./SideBar";
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

export default function Subject(){
    const [data, setData] = useState([
        {
            "subjectID": 0,
            "subjectName": "",
            "status": true
        }
    ]);

    useEffect(() => {
        fetchData();
    },[]);

    function fetchData(){
        Services.SubjectGetAll().then(({data})=>{
            setData(data)
        })
        .catch(({response})=>{
            console.log(response);
        })
    }

    function printTable(){
        return(
            data.map((dataset, index) =>
                <tr key={index+1} className={dataset.status==true?"":"table-secondary"}>
                    <td className="text-center">{index+1}</td>
                    <td className="text-start">{dataset.subjectName}</td>
                    <td className="text-center">
                        <button type="button" className="btn btn-warning mx-2" onClick={()=>{EditModelHandleShow(); GetOneItems(index);}}><i className="bi bi-pencil"></i>&nbsp; Edit</button>
                        <Modal show={editModel} onHide={EditModelHandleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Edit Subject</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <div>
                                    <div className="form-floating mb-3">
                                        <input type="text" className="form-control" id="subjectName" value={editItem.subjectName} onChange={(e) => handleEdit(e)} placeholder="Subject Name"/>
                                        <label htmlFor="subjectName" className="form-label">Subject Name</label>
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
                        <button type="button" className="btn btn-secondary mx-2" onClick={()=>{DeactiveItem(dataset.subjectID)}}><i className={dataset.status==true?"bi bi-eye-slash":"bi bi-eye"}></i>&nbsp; {dataset.status==true?"Deactivate":"Activate"}</button>
                        <button type="button" className="btn btn-danger mx-2" onClick={()=>{DeleteItem(dataset.subjectID)}}><i className="bi bi-trash"></i>&nbsp; Delete</button>
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
        if(newData["subjectName"] === "" || newData["subjectName"] === undefined){
            console.log("subjectName");
            return false;
        }
        else{
            return true;
        }
    }

    function AddItem(){
        if(AddItemValidate()){
            Services.SubjectPost(addNew)
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
        "subjectID": 0,
        "subjectName": "",
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
            "subjectID": data[id].subjectID,
            "subjectName": data[id].subjectName,
            "status": data[id].status
        };
        setEditItem(dt);
        console.log(dt);
    }

    function EditItemValidate(){
        const newData = {...editItem};
        if(newData["subjectName"] === "" || newData["subjectName"] === undefined){
            console.log("subjectName");
            return false;
        }
        else{
            return true;
        }
    }

    function EditItem(){
        if(EditItemValidate()){
            Services.SubjectPut(editItem)
            .then(({data}) =>{
                console.log(data);
                EditItem({"subjectID": 0, "subjectName": "", "status": ""});
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
            Services.SubjectChangeStatus(id)
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
            Services.SubjectDelete(id)
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
                            <h2>Subject</h2>
                        </div>

                        <Table bordered hover>
                            <thead>
                                <tr className="table-info">
                                    <th className="text-center">#</th>
                                    <th className="text-center">Subject Name</th>
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
                                    <Modal.Title>Add Classroom</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <div>
                                        <div className="form-floating mb-3">
                                            <input type="text" className="form-control" id="subjectName" onChange={(e) => handleAdd(e)} placeholder="Subject Name"/>
                                            <label htmlFor="subjectName" className="form-label">Subject Name</label>
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