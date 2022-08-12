import SlideBar from "./SideBar";

export default function Subject(){
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