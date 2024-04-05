import getAllElecronics from "../util/utils"; 
import { useEffect, useState } from 'react';
import { getElectronics } from '../../../Backend/controllers/electronics.controller';
//import {customErros} from '../import ErrorHandling from './ErrorHandling';

export default function Electronics({ electronics, setElectronics}){

    //getElectronics

    const handleElectronicsClick = (electronic) =>{
        navigate(`/electronics/${electronic_id}`)
    };

    if (error){
        return 
    }

    /*return(
        <div className="electronics">
        <

    );
    add styling for to app.css*/
}