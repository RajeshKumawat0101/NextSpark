import React, { useContext, useEffect } from 'react';
import { GoogleAuthProvider, getAuth, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref, set } from 'firebase/database';
import { UserDetailsContext } from '../App';
import { useNavigate } from 'react-router-dom';
import app from '../firebase/firebase.config';
const Login = () => {
  const auth = getAuth(app);
  const db = getDatabase(app);
  const googleProvider = new GoogleAuthProvider();
  const { setUserDetails } = useContext(UserDetailsContext);
  const { userDetails } = useContext(UserDetailsContext);

  const nav = useNavigate();

  const handleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      setUserDetails(user);

      set(ref(db, 'usersInfo/' + user.uid), {
        displayName: user.displayName,
        email: user.email,
        displayPicture: user.photoURL,
      });

      nav('/jobs-internships', {replace: true});
    } catch (error) {
      console.error('Sign in error:', error.code, error.message);
    }
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        setUserDetails(null);
        nav('/');
      })
      .catch((error) => {
        console.error('Sign out error:', error.message);
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserDetails(user);
      } else {
        setUserDetails(null);
      }
    });

    return () => unsubscribe();
  }, [auth, setUserDetails]);

  const giveDate = (date) => {
    const dateObj = new Date(date);
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December',
    ];
    const day = dateObj.getDate();
    const month = monthNames[dateObj.getMonth()];
    const year = dateObj.getFullYear();
    return `${day} ${month} ${year}`;
  };

  return (
    <div className='block mx-auto justify-center items-center mt-20 text-primary'>
      {userDetails ? (
        <>
          <div className=''>
            <div className='flex justify-center items-center'>
              <img src={userDetails.photoURL} height={100} width={150} className='rounded-full' alt="User" />
            </div>
            <div className='flex justify-center items-center mt-20'>
              <h6 className='text-3xl'>{userDetails.displayName}</h6>
            </div>
            <div className='flex justify-center items-center mt-2'>
              <h6 className='text-md'>Joined on {giveDate(userDetails.metadata.creationTime)}</h6>
            </div>
            <div className='flex justify-center items-center mt-2'>
              <h6 className='text-md'>Email: {userDetails.email}</h6>
            </div>
            <div className='flex justify-center items-center mt-5'>
              <button
                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full'
                onClick={handleSignOut}
              >
                Sign Out
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className='justify-center container mx-auto flex'>
          <div className='text-center p-5 block border-blue-600 bg-spark border-4 w-3/4 rounded-2xl'>
            <h5 className='text-4xl text-white mb-7'>
              Fasten your Job/Internship Search with NextSpark
            </h5>
            <div>
              <button
                className='bg-spark border-2 hover:bg-red-500 border-blue-600 m-1.5 text-white font-bold py-2 px-4 rounded-lg mx-auto block'
                onClick={handleSignIn}
              >
                Sign In with Google
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
