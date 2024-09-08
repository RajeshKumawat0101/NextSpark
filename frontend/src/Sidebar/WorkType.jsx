import React from 'react';
import InputField from '../components/InputField';

const Roles = ({ handleChange }) => {
  return (
    <div className="flex flex-col px-10">
      <h4 className='text-2xl font-medium mb-3 text-left'>Work Type</h4>
      <div className="px-4 space-y-2">
        <label className='text-left flex items-center cursor-pointer'>
          <input
            type='radio' 
            name='workFilter'
            value='all'
            onChange={handleChange}
            className='form-radio h-3 w-3 text-spark'
          />
          <span className='px-2'>All</span> 
        </label>
        <label className='text-left flex items-center cursor-pointer'>
          <input
            type='radio'
            name='workFilter'
            value='Full-Time'
            onChange={handleChange}
            className='form-radio h-3 w-3 text-spark'
          />
          <span className='px-2'>Full Time</span>
        </label>
        <label className='text-left flex items-center cursor-pointer'>
          <input
            type='radio'
            name='workFilter'
            value='Intern'
            onChange={handleChange}
            className='form-radio h-3 w-3 text-spark'
          />
          <span className='px-2'>Internship</span>
        </label>
        
      </div>
    </div>
  );
};

export default Roles;
