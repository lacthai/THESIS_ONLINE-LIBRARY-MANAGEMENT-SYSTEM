import React, { useEffect } from "react";
import { LayoutApp } from "../navbar/LayoutApp";


export const PrivateRoute = ({ children }) =>{
    return <LayoutApp>{children}</LayoutApp>
}


