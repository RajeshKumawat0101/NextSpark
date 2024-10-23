import React from 'react';

const Work = ({ result }) => {

  // console.log(result);
  if(result.length>0)
  return (
    <div className="p-0">
    { result}
    </div>
  );
  else{
    return (
    <div className="p-0">
      <h2>No jobs found</h2>
    </div>);
  }
};
 
export default Work;
