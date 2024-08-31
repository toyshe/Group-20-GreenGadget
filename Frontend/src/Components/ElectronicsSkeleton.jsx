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
            <div className="pagination-buttons">
              <button>1</button>
              <button>1</button>
              <button>1</button>
            </div>
        </ul>
        <Totop />
    </div>
  )
}

