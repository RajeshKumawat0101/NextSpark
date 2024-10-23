import React from 'react'
import Roles from './WorkType'
import Experience from './Experience'

const Sidebar = ({handleChange}) => {
  return (
    <div className='space-y-8 py-5'>
      {/* <h3 className='text-lg font-bold mb-2'>Filters</h3> */}
      <Roles handleChange={handleChange}/>
      <Experience handleChange={handleChange}/>
    </div>
  )
}

export default Sidebar
