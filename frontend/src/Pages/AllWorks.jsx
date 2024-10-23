import React,{useState,useEffect} from 'react'
import Card from '../components/Card';
import Sidebar from '../Sidebar/Sidebar';
import Work from './Work';
import Leaderboard from '../components/Leaderboard';

const AllWorks = () => {
  const [query,setQuery]=useState("");
  const [selectedCategory,setSelectedCategory]=useState({type:"all",xp:null});
  const[jobs,setJobs]=useState([]);
  const [currentPage,setCurrentPage]=useState(1);
  const itemsPerPage = 4;

useEffect(() => {
      fetch("http://localhost:3000/works/all-works")
        .then(res => res.json())
        .then(data => {
          console.log("data is",data);
          console.log("jobs are ",data?.data)
          setJobs(data?.data);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
          // Handle the error as needed
        });
  }, []);

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
  //  console.log("name is ",typeof name);
   if(name === "type"){
    setSelectedCategory({...selectedCategory,type:value});
   }
   if(name === "xp"){
    setSelectedCategory({...selectedCategory,xp:value});
   }
    
  };

  const calculatePageRange=()=>{
    const startIndex = (currentPage-1)*itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return {startIndex,endIndex};
  }

  const nextPage = () =>{
    if(currentPage < Math.ceil(filteredJobs.length/itemsPerPage)){
      setCurrentPage(currentPage+1);
    }
  }

  const prevPage = () =>{
    if(currentPage>1){
      setCurrentPage(currentPage-1);
    }
  }  

  const filteredData = (jobs, selectedCategory) => { 
    let filteredJobs = jobs;

   filteredJobs=jobs.filter((job)=>job.role.toLowerCase().indexOf(query.toLowerCase())!==-1);
  
    if(selectedCategory?.type === 'all'){
      if(selectedCategory.xp !== null)
        filteredJobs = filteredJobs.filter(
          ({ xp,type }) =>
            xp.toLowerCase()===selectedCategory?.xp.toLowerCase() 
        );
    }
    else{
      filteredJobs = filteredJobs.filter(
        ({ xp,type }) =>xp.toLowerCase()===selectedCategory?.xp?.toLowerCase() 
        && type.toLowerCase()===selectedCategory?.type.toLowerCase()
      );
    }  
    console.log("after apply filter ",filteredJobs);
    return filteredJobs;
  };
  
  const filteredJobs = filteredData(jobs,selectedCategory);
  const {startIndex,endIndex} = calculatePageRange();
  const currentPageJobs = filteredJobs.slice(startIndex,endIndex);
  const result = currentPageJobs.map((data,id)=> <Card key={id} data={data} /> )

  return (
    <div className='text-black'>
      <div className='bg-slate-200 min-h-screen md:grid grid-cols-4 gap-10 lg:px-2 px-0  py-2 '>
        <div className='bg-white  rounded-lg'><Sidebar handleChange={handleChange} /></div>
        <div className='col-span-2 bg-white  p-0 rounded-lg shadow-lg'><Work result={result} /></div>
        <div className='bg-white p-4 rounded'><Leaderboard/></div>
      </div>
      {
          result.length > 0 ? (
             <div className='flex mx-5 justify-center items-center pb-4 space-x-2 bg-white font-bold rounded-full'>
                <button onClick={prevPage}  className="h-10 px-5 text-indigo-100 bg-indigo-700 rounded-lg transition-colors duration-150 focus:shadow-outline hover:bg-indigo-800">Previous</button>
                <span>Page {currentPage} of {Math.ceil(filteredJobs.length/itemsPerPage)}</span>
                <button onClick={nextPage}  className="h-10 px-5 text-indigo-100 bg-indigo-700 rounded-lg transition-colors duration-150 focus:shadow-outline hover:bg-indigo-800">Next</button>
             </div>
          ):
          (
            <div className='text-center text-gray-500'>No jobs found matching your criteria.</div>
          )
        }
    </div>
  )
}
 
export default AllWorks;
