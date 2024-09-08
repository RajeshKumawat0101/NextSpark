import React, { useState } from 'react';
import { FcSearch,FcGlobe } from 'react-icons/fc';


const HomeSearchBar = () => {
   const [query, setQuery] = useState('');

  // const handleInputChange = (e) => {
  //   setQuery(e.target.value);
  // };
  const SubmitCompany=()=>{
      if(query.length>0){
        window.localStorage.setItem('companyToSearch', query);
      }
      console.log({query});
  }

  return (
    <div className='text-primary h-screen  max-w-screen-2xl container mx-auto x1:px-24 px-4 md:py-24 py-14'>
     <div className='flex justify-center '>
     <h1 className='text-5xl text-blue-700 mb-3 font-bold'>
        Find your <span className='text-spark'>Perfect</span> workplace
      </h1>
      </div>
      <p className='text-2xl text-blue-700 font-bold mb-8 flex justify-center items-center'>Best Jobs & Internship Sharing Place on the Web</p>
     
      <form>
  <div className='flex justify-center md:flex-row flex-row gap-10 mt-44  mx-auto'>
    <div className='relative md:w-1/4 w-full'>
      <input
        type='text'
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder='Company'
        className='block w-full border-2 bg-transparent py-1.5 pl-8 pr-12 text-gray-800 border-spark outline-none placeholder:text-gray-400 focus:border-blue-400 rounded-full text-sm leading-6' 
      />
        <button type='submit' onClick={SubmitCompany} className='absolute top-1/2 transform -translate-y-1/2 right-3 text-gray-50 border-2 border-blue-500 rounded-xl p-1'>
        <FcSearch/>
        </button>
    </div>
  </div>

</form>

    </div>
  );
};

export default HomeSearchBar;
