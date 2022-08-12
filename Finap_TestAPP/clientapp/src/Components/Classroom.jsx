import SlideBar from "./SideBar";

export default function Classroom(){
    return(
        <div>
            <div className="row">
                <div className="col-2">
                    <SlideBar />
                </div>
                <div className="col"></div>
            </div>
        </div>
    );
}