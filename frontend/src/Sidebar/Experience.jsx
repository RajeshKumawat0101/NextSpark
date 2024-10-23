import React from 'react';
import InputField from '../components/InputField';

const Experience = ({ handleChange  }) => {
  return (
    <div className="flex flex-col px-10">
  <h4 className='text-2xl font-medium mb-3 text-left'>Experience Level</h4>
  <div className="text-left space-y-2 px-4">
  <label className='text-left flex items-center cursor-pointer'>
          <input
            type='radio' 
            name='xp' 
            value='0'
            onChange={handleChange}
            className='form-radio h-3 w-3  text-spark'
          />
          <span className='px-2'>0 YOE</span>
      </label>
   <label className='text-left flex items-center cursor-pointer'>
          <input
            type='radio'
            name='xp'
            value='0-1'
            onChange={handleChange}
            className='form-radio h-3 w-3  text-spark'
          />
          <span className='px-2'>0-1 YOE</span> 
      </label>
    <label className='text-left flex items-center cursor-pointer'>
          <input
            type='radio'
            name='xp'
            value='1+'
            onChange={handleChange}
            className='form-radio h-3 w-3 text-spark'
          />
          <span className='px-2'>1+ YOE</span>
      </label>
   
  </div>
</div>

  );
};

export default Experience;
