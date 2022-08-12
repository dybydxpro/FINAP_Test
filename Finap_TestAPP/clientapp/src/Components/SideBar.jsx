import React, {/*useEffect, useState*/} from "react";

export default function SlideBar(){
    
    return(
        <div style={{position: "relative"}}>
            <div className="d-flex flex-column flex-shrink-0 p-3 text-light SideBackground">
                <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none  text-center">
                    <span className="fs-4 text-light">FINAP TestApp</span>
                </a>
                <hr/>
                <ul className="nav nav-pills flex-column mb-auto mx-3">
                    <li>
                        <a href="/" className="nav-link link-dark text-light">
                            <i className="bi bi-grid"></i> &nbsp; Home
                        </a>
                    </li>
                    <li>
                        <a href="/classrooms" className="nav-link link-dark text-light">
                            <i className="bi bi-person"></i> &nbsp; Classrooms
                        </a>
                    </li>
                    <li>
                        <a href="/students" className="nav-link link-dark text-light">
                            <i className="bi bi-box"></i> &nbsp; Students
                        </a>
                    </li>
                    <li>
                        <a href="/subjects" className="nav-link link-dark text-light">
                            <i className="bi bi-grid-1x2"></i> &nbsp; Subjects
                        </a>
                    </li>
                    <li>
                        <a href="/teachers" className="nav-link link-dark text-light">
                            <i className="bi bi-people"></i> &nbsp; Teachers
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
}