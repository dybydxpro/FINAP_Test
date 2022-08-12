import httpCommon from "./http-common";

class Services{
    //Classrooms Functions
    ClassroomGetAll(){
        return httpCommon.get("/Classrooms");
    }

    ClassroomGetOne(id){
        return httpCommon.get(`/Classrooms/${id}`);
    }

    ClassroomPost(data){
        return httpCommon.post("/Classrooms", data);
    }

    ClassroomPut(data){
        return httpCommon.put("/Classrooms", data);
    }

    ClassroomChangeStatus(id){
        return httpCommon.put(`/Classrooms/ChangeStatus/${id}`);
    }

    ClassroomDelete(){
        return httpCommon.delete("/Classrooms");
    }

    //Students Functions
    StudentGetAll(){
        return httpCommon.get("/Students");
    }

    StudentGetOne(id){
        return httpCommon.get(`/Students/${id}`);
    }

    StudentPost(data){
        return httpCommon.post("/Students", data);
    }

    StudentPut(data){
        return httpCommon.put("/Students", data);
    }

    StudentChangeStatus(id){
        return httpCommon.put(`/Students/ChangeStatus/${id}`);
    }

    StudentDelete(){
        return httpCommon.delete("/Students");
    }

    //Subjects Functions
    SubjectGetAll(){
        return httpCommon.get("/Subjects");
    }

    SubjectGetOne(id){
        return httpCommon.get(`/Subjects/${id}`);
    }

    SubjectPost(data){
        return httpCommon.post("/Subjects", data);
    }

    SubjectPut(data){
        return httpCommon.put("/Subjects", data);
    }

    SubjectChangeStatus(id){
        return httpCommon.put(`/Subjects/ChangeStatus/${id}`);
    }

    SubjectDelete(){
        return httpCommon.delete("/Subjects");
    }

    //Teachers Functions
    TeacherGetAll(){
        return httpCommon.get("/Teachers");
    }

    TeacherGetOne(id){
        return httpCommon.get(`/Teachers/${id}`);
    }

    TeacherPost(data){
        return httpCommon.post("/Teachers", data);
    }

    TeacherPut(data){
        return httpCommon.put("/Teachers", data);
    }

    TeacherChangeStatus(id){
        return httpCommon.put(`/Teachers/ChangeStatus/${id}`);
    }

    TeacherDelete(){
        return httpCommon.delete("/Teachers");
    }
}

export default new Services();