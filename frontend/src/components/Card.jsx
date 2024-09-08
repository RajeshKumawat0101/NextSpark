import { Link } from "react-router-dom";
import { CiLocationOn } from "react-icons/ci";
import { IoBriefcaseOutline } from "react-icons/io5";
import { GiMoneyStack } from "react-icons/gi";

const Card = ({ data }) => {
  const { company, logo, role, pay, location, skills, xp, degree, applyLink, type } = data;

  return (
    <section className="text-primary m-5 border-2 border-solid border-gray-300 rounded-2xl
     p-2 relative">
      <div className="flex gap-4 flex-col sm:flex-row items-start">
        <img src={logo} alt="" className="h-20 w-20 rounded-2xl" />

        <div className="">
          <h4 className=" font-semibold text-left font text-xl">{company}</h4>
          <h3 className="font-lg text-left">{role}</h3>
          <h3 className="font-lg text-left">{type}</h3>
          <h2 className=" text-left flex items-center gap-2">
            <GiMoneyStack /> {pay}
            <div className="flex items-center ml-6"><CiLocationOn /> {location} </div>
          </h2>
          <div className="flex flex-wrap gap-4 mb-2">
            {xp && <span className="flex items-center gap-2"><IoBriefcaseOutline /> {xp==0?<>Fresher</>:<>{xp}</>}</span>}
            <div className="flex items-center gap-2"><IoBriefcaseOutline /> {degree}</div>
          </div>
        </div>
      </div>

      {/* Apply Button */}
      <a href={applyLink} target='_blank' rel='noreferrer' className="absolute cursor-pointer  top-8 transform -translate-y-1/2 right-2 bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-spark hover:text-black">
        Apply
      </a>
    </section>
  );
};

export default Card;
