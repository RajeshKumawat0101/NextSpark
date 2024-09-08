import React,{useState,useEffect, useContext} from 'react'
import Card from '../components/Card';
import Sidebar from '../Sidebar/Sidebar';
import Work from './Work';
import Leaderboard from '../components/Leaderboard';
import { UserDetailsContext } from '../App';

const AllWorks = () => {
  const { userDetails, setUserDetails } = useContext(UserDetailsContext);
  useEffect(() => {
    console.log("userDetails ", userDetails);
    setUserDetails(userDetails);
  }, []);
    const [query,setQuery]=useState("");
    const [selectedCategory,setSelectedCategory]=useState(null);
    const[jobs,setJobs]=useState([]);
    const [currentPage,setCurrentPage]=useState(1);
    const itemsPerPage = 4;

    useEffect(() => {
        fetch("http://localhost:3000/works/all-works")
          .then(res => res.json())
          .then(data => {
            console.log(data);
            setJobs(data.data);
            console.log(jobs)
          })
          .catch(error => {
            console.error('Error fetching data:', error);
            // Handle the error as needed
          });
      }, []);

      const filteredItems=jobs.filter((job)=>job.role.toLowerCase().indexOf(query.toLowerCase())!==-1);
  console.log("filtered",filteredItems);

  const handleChange = (e) => {
    const value = e.target.value;
    setSelectedCategory(value === 'all' ? null : value);
  };

  const handleClick=(e)=>{
    setSelectedCategory(e.target.value);
    setSelectedCategory(value === 'all' ? null : value);
  }

  const calculatePageRange=()=>{
    const startIndex = (currentPage-1)*itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return {startIndex,endIndex};
  }

  const nextPage = () =>{
    if(currentPage < Math.ceil(filteredItems.length/itemsPerPage)){
      setCurrentPage(currentPage+1);
    }
  }

  const prevPage = () =>{
    if(currentPage>1){
      setCurrentPage(currentPage-1);
    }
  }
  const filteredData = (jobs, selected, query) => {
    let filteredJobs = jobs;
  
    if (query) {
      filteredJobs = jobs.filter((job) =>
        job.role.toLowerCase().includes(query.toLowerCase())
      );
    }
  
    if (selected && selected !== 'all') {
      filteredJobs = filteredJobs.filter(
        ({ location, searchRole,xp,type }) =>
          location.toLowerCase() === selected.toLowerCase() ||
          searchRole.toLowerCase() === selected.toLowerCase() || xp.toLowerCase()===selected.toLowerCase() || type.toLowerCase()===selected.toLowerCase()
      );
      console.log(filteredJobs);
    }
    const {startIndex,endIndex} = calculatePageRange();
    filteredJobs=filteredJobs.slice(startIndex,endIndex);
    return filteredJobs.map((data, i) => <Card key={i} data={data}/>);
  };
  
  
  
  const result = filteredData(jobs,selectedCategory,query);

  return (
    <div className='text-black'>
      <div className='bg-slate-200 min-h-screen md:grid grid-cols-4 gap-10 lg:px-2 px-0  py-2 '>
        <div className='bg-white  rounded-lg'><Sidebar handleChange={handleChange} handleClick={handleClick}/></div>
        <div className='col-span-2 bg-white  p-0 rounded-lg shadow-lg'><Work result={result}/></div>
       
        <div className='bg-white p-4 rounded'><Leaderboard/></div>
      </div>
      {
          result.length > 0 ? (
             <div className='flex mx-5 justify-center items-center pb-4 space-x-2 bg-white font-bold rounded-full'>
                <button onClick={prevPage}>Preious</button>
                <span>Page {currentPage} of {Math.ceil(filteredItems.length/itemsPerPage)}</span>
                <button onClick={nextPage}>Next</button>
             </div>
          ):
          (
            ""
          )
        }
    </div>
  )
}

export default AllWorks
