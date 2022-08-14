import { Container } from "react-bootstrap";
import SlideBar from "./SideBar";

export default function Home(){
    return(
        <div>
            <div className="row">
                <div className="col-2">
                    <SlideBar />
                </div>
                <div className="col">
                    <Container>
                        <div className="shadow p-3 mb-5 bg-light rounded my-5 my-4 mx-5">
                            <div className="">
                                <h1 className="text-center">Finap Test</h1>
                            </div>
                            
                        </div>
                    </Container>
                </div>
            </div>
        </div>
    );
}