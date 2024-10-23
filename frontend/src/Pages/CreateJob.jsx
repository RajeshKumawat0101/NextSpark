import React from 'react';
import {useForm} from 'react-hook-form';
import { useContext } from 'react';
import { UserDetailsContext } from '../App';
import toast,{Toaster} from 'react-hot-toast';


    
const CreateJob = () => {
      const {userDetails} = useContext(UserDetailsContext)
      // console.log("context is ", userDetails);
      // console.log("user is at create job ",userDetails?.storedUser?.username)
     const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        reset
      } = useForm()

            
      const onSubmit = (data) => {
            console.log("data is ",data)
            data.postedBy=userDetails?.storedUser?.useremail;
            data.postedByUid=userDetails?.sessionId;
            fetch("http://localhost:3000/works/post-to-review",
                  {
                        method:"POST",
                        headers:{"Content-Type":"application/json"},
                        body:JSON.stringify(data)
                  }
            ).
            then(res=>res.json()).
            then((result)=>{
                  console.log(result);
                  toast('Post transfered to NextSpark Team for Approval',{
                              icon: '⏳',
                  });
            });
            reset();
      }

// console.log(watch("example"))

  return (
    <div className='max-w-screen-2xl container mx-auto x1:px-24 px4'>
           <div className='bg-white py-10 px-4 lg:px-16'>
                 <form onSubmit={handleSubmit(onSubmit)} className=''>
                        <div className='flex flex-col lg:flex-row items-center justify-between gap-8'>
                             <div className='lg:w-1/2 w-full bg-blue-200 rounded-full p-4 flex items-center'>
                                   <label className='block mb-2 text-2xl text-black mx-auto pr-3 justify-center items-center'>Role : </label>
                                   <input type="text" defaultValue={""} {...register("role",{required:true})} className='block flex-1 border-1 py-1.5 pl-3 text-gray-900 bg-blue-100 placeholder:text-gray-400 focus:outline sm:text-lg rounded-full'/>
                                   {errors.role && <span className="text-red-500">Role is required</span>}
                             </div>
                             <div className='lg:w-1/2 w-full bg-blue-200 rounded-full p-4 flex items-center'>
                                   <label className='block mb-2 text-2xl text-black mx-auto pr-3 justify-center items-center'>Company : </label>
                                   <input type="text" defaultValue={""} {...register("company",{required:true})} className='block flex-1 border-1 py-1.5 pl-3 text-gray-900 bg-blue-100 placeholder:text-gray-400 focus:outline sm:text-lg rounded-full'/>
                                   {errors.company && <span className="text-red-500">Company Name is required</span>}
                             </div>
                        </div>
                        <div className='flex flex-col lg:flex-row items-center justify-between gap-8 py-2'>
                             <div className='lg:w-1/2 w-full bg-blue-200 rounded-full p-4 flex items-center'>
                                   <label className='block mb-2 text-2xl text-black mx-auto pr-3 justify-center items-center'>Location : </label>
                                   <input type="text" defaultValue={""} {...register("location",{required:true})} className='block flex-1 border-1 py-1.5 pl-3 text-gray-900 bg-blue-100 placeholder:text-gray-400 focus:outline sm:text-lg rounded-full'/>
                                   {errors.location && <span className="text-red-500">Location is required</span>}
                             </div>
                             <div className='lg:w-1/2 w-full bg-blue-200 rounded-full p-4 flex items-center'>
                                   <label className='block mb-2 text-2xl text-black mx-auto pr-3 justify-center items-center'>Pay : </label>
                                   <input type="text" defaultValue={""} {...register("pay",{required:true})} className='block flex-1 border-1 py-1.5 pl-3 text-gray-900 bg-blue-100 placeholder:text-gray-400 focus:outline sm:text-lg rounded-full'/>
                                   {errors.pay && <span className="text-red-500">Pay is required</span>}
                             </div>
                        </div>
                        <div className='flex flex-col lg:flex-row items-center justify-between gap-8'>
                                 <div className='lg:w-1/2 w-full bg-blue-200 rounded-full p-4 flex items-center'>
                                      <label className='block mb-2 text-2xl text-black mx-auto pr-3 justify-center items-center'>Experience : </label>
                                           <select {...register("xp", { required: true })} className='block flex-1 border-1 py-1.5 pl-3 text-gray-900 bg-blue-100 placeholder:text-gray-400 focus:outline sm:text-lg rounded-full'>
                                           {errors.xp && <span className="text-red-500">Experience is required</span>}
                                            <option value='0'>Fresher</option>
                                            <option value='0-1'>0-1 YOE</option>
                                            <option value='1+'>1+ YOE</option>
                                            </select>
                                  </div>
                                 <div className='lg:w-1/2 w-full bg-blue-200 rounded-full p-4 flex items-center'>
                                      <label className='block mb-2 text-2xl text-black mx-auto pr-3 justify-center items-center'>Search Role : </label>
                                             <select {...register("searchRole", { required: true })} className='block flex-1 border-1 py-1.5 pl-3 text-gray-900 bg-blue-100 placeholder:text-gray-400 focus:outline sm:text-lg rounded-full'>
                                             <option value='Software Developer'>Software Developer</option>
                                              <option value='Testing'>Testing</option>
                                             <option value='UI/UX'>UI/UX</option>
                                             <option value='Backend Developer'>Backend Developer</option>
                                             <option value='Frontend Developer'>Frontend Developer</option>
                                             </select>
                                    </div>
                        </div>
    <div className='flex flex-col lg:flex-row items-center justify-between gap-8 mt-3'>
                            <div className='lg:w-1/2 w-full bg-blue-200 rounded-full p-4 flex items-center'>
                                   <label className='block mb-2 text-2xl text-black mx-auto pr-3 justify-center items-center'>Degree : </label>
                                   <input type="text" defaultValue={""} {...register("degree",{required:true})} className='block flex-1 border-1 py-1.5 pl-3 text-gray-900 bg-blue-100 placeholder:text-gray-400 focus:outline sm:text-lg rounded-full'/>
                             </div>
    
                        <div className='lg:w-1/2 w-full bg-blue-200 rounded-full p-4 flex items-center'>
                             <label className='block mb-2 text-2xl text-black mx-auto pr-3 justify-center items-center'>Work Type : </label>
        <select {...register("type", { required: true })} className='block flex-1 border-1 py-1.5 pl-3 text-gray-900 bg-blue-100 placeholder:text-gray-400 focus:outline sm:text-lg rounded-full'>
            <option value='Full-Time'>Full-Time</option>
            <option value='Intern'>Intern</option>
            {/* <option value='Part-Time'>Part-Time</option>
            <option value='Contractual'>Contractual</option> */}
        </select>
                       </div>

     </div>
     <div className='flex flex-col lg:flex-row items-center justify-between gap-8 mt-3'>
                             <div className='lg:w-1/2 w-full bg-blue-200 rounded-full p-4 flex items-center'>
                                   <label className='block mb-2 text-2xl text-black mx-auto pr-3 justify-center items-cente'>Company Logo : </label>
                                   <input type="text" defaultValue={""} {...register("logo")} className='block flex-1 border-1 py-1.5 pl-3 text-gray-900 bg-blue-100 placeholder:text-gray-400 focus:outline sm:text-lg rounded-full'/>
                             </div>
                             <div className='lg:w-1/2 w-full bg-blue-200 rounded-full p-4 flex items-center'>
                                   <label className='block mb-2 text-2xl text-black mx-auto pr-3 justify-center items-center'>Application Link : </label>
                                   <input type="text" defaultValue={""} {...register("applyLink")} className='block flex-1 border-1 py-1.5 pl-3 text-gray-900 bg-blue-100 placeholder:text-gray-400 focus:outline sm:text-lg rounded-full'/>
                             </div>
                        </div>
                        <div className=''>
                            <input type='submit' className='relative inline-flex items-center justify-center   mb-2 me-2 overflow-hidden text-xl text-gray-900 rounded-full group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 ml-2 mt-8 p-3 '/>
                            <span className='text-gray-500 border-2 p-3 rounded-full ml-10'><span className='text-black'>Note : </span>Your Post will first go to NextSpark Team for approval</span>
                        </div>
                         
                         
                 </form>
                 <Toaster/>
           </div>
          
           
    </div>
  )
}

export default CreateJob
