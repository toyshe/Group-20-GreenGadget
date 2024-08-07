import './Tech.css';
import { FaReact, FaGithub, FaNodeJs   } from "react-icons/fa";
import { SiJavascript, SiExpress, SiJest, SiRender } from "react-icons/si";
import { BiLogoPostgresql } from "react-icons/bi";

import React from 'react'

export default function Tech() {
  return (
    <div className='tech-wrapper'>
      <h1>Our technologies</h1>

      <div className='ticon-wrapper'>
        <abbr title="React">
        <div className='ticon-container react-icon-container'>
            <FaReact size={80} className='react-icon'/>
        </div>
        </abbr>

        <div className='ticon-container'>
            <FaGithub size={70} className='github-icon'/>
        </div>

        <div className='ticon-container'>
            <FaNodeJs size={80} className='nodejs-icon'/>
        </div>

        <div className='ticon-container'>
            <SiJavascript size={80} className='js-icon'/>
        </div>

        <div className='ticon-container'>
            <SiExpress size={70} className='express-icon'/>
        </div>

        <div className='ticon-container'>
            <SiJest  size={60} className='jest-icon'/>
        </div>

        <div className='ticon-container'>
            <BiLogoPostgresql  size={80} className='psql-icon'/>
        </div>

        <div className='ticon-container'>
            <SiRender  size={80} className='render-icon'/>
        </div>
      </div>
    </div>
  )
}
