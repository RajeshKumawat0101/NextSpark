import React,{useContext, useEffect,useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { UserDetailsContext } from '../App';
import EditWork from './EditWork';



const MyWork = () => {
    const navigate = useNavigate();
    const [works,setWorks] = useState([]);
    const [refresh,setRefresh] = useState(false);
    const {userDetails }= useContext(UserDetailsContext);
    const user = userDetails?.storedUser;
   // console.log(UserDetail.userDetails.displayName);
    useEffect(() => {
    console.log("user is ",user);
  fetch(`http://localhost:3000/works/my-works/${user?.useremail}`)
    .then((res) => res.json())
    .then((data) => {
      console.log('Received data:', data);
      setWorks(data);
    });
}, [refresh]);

  //  const handleSearch=()=>{
  //   const filter = works.filter((work)=>work.role.toLowerCase().indexOf(searchText.toLowerCase())!=-1);
  //   setWorks(filter);
  //  }
 
   const handleDelete = async (id) => {
      try {
        
        const response = await fetch(`http://localhost:3000/works/delete-work/${id}`, {
          method: "DELETE",
          // headers:{"Content-Type":"application/json"},
          // body:JSON.stringify({id:id})
        });
        // const data = await response.json();
        // console.log("deleted messasf ",response);
        if(response.status === 500){
          alert(response.message);
        }
        
        if (response.status === 200) {
          setRefresh(!refresh);
          alert("Work Deleted!");
        }
      } catch (error) {
        console.log("delete work error ",error);
      }
   
  };
  

    // console.log(works);
  return (
    <div className='max-w-screen-2xl container mx-auto x1:px-24 px-4 text-primary'>
       <div className=''>
           <h1 className='text-center p-4'>Works Posted by {user?.username}</h1>
           <div className='flex md:rounded-md rounded shadow-sm  md:w-3/4 w-full p-2 text-center mb-2 ml-52'>
               {/* <input onChange={()=>setRefresh(!refresh)} type='text' name='search' id='search' className='py-2 pl-3 border focus:outline-none bg-white  mb-4 w-full ring-1 ring-inset ring-navbg focus-within:ring-2 focus-within:ring-inset focus-within:ring-spark'/> */}
               <button onClick={()=>setRefresh(!refresh)}>Refresh</button>
           </div>

           <section className="py-1 bg-blueGray-50">
<div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4 mx-auto mt-5">
  <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
    <div className="rounded-t mb-0 px-4 py-3 border-0">
      <div className="flex flex-wrap items-center">
        <div className="relative w-full px-4 max-w-full flex-grow flex-1">
          <h3 className="font-semibold text-base text-blueGray-700">My Works</h3>
        </div>
        <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
          <Link to="/create-job"><button className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">Post Work</button>
          </Link>
        </div>
      </div>
    </div>

    <div className="block w-full overflow-x-auto">
      <table className="items-center bg-transparent w-full border-collapse ">
        <thead>
          <tr>
            <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                          No
                        </th>
          <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                          Role
                        </th>
           <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                          Company Name
                        </th>
          <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                          Pay
                        </th>
                         <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                          EDIT
                        </th>
                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                          DELETE
                        </th> 
          </tr>
        </thead>
        <tbody>
        {works.map((work, index) => (
  <tr key={index}>
    <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700">
      {index + 1}
    </th>
    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
      {work.role}
    </td>
    <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
      {work.company}
    </td>
    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
      <i className="fas fa-arrow-up text-emerald-500 mr-4"></i>
      {work.pay}
    </td>
    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
       <button className='bg-blue' onClick={()=> navigate(`/edit-work/${work?._id}`,{replace:true})}>EDIT</button>
    </td>
    <td className="border-t-0 px-6 bg-blue align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
        <button onClick={() => handleDelete(work._id)}>DELETE</button>
    </td>
  </tr>
 
))}

</tbody>
      </table>
    </div>
  </div>
</div>

</section>
       </div>
    </div>
  )
}

export default MyWork
