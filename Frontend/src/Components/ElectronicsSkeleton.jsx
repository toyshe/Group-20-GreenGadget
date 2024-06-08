import React from 'react'
import ElectronicsSkeletonbutton from './ElectronicsSkeletonbutton'
import Totop from './Totop'
import "./ElectronicsSkeleton.css";

export default function ElectronicsSkeleton() {
  return (
    <div className='ElectronicsSkeleton'>
        <ul>
            <li><ElectronicsSkeletonbutton /></li>
            <li><ElectronicsSkeletonbutton /></li>
            <li><ElectronicsSkeletonbutton /></li>
            <li><ElectronicsSkeletonbutton /></li>
            <li><ElectronicsSkeletonbutton /></li>
            <li><ElectronicsSkeletonbutton /></li>
            <li><ElectronicsSkeletonbutton /></li>
            <li><ElectronicsSkeletonbutton /></li>
            <li><ElectronicsSkeletonbutton /></li>
            <li><ElectronicsSkeletonbutton /></li>
            <li><ElectronicsSkeletonbutton /></li>
            <li><ElectronicsSkeletonbutton /></li>
        </ul>
        <Totop />
    </div>
  )
}

