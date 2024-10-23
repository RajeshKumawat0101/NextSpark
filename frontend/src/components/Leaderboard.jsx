import React, { useState, useEffect } from 'react';

const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refresh,setRefresh] = useState(false)

  useEffect(() => {
    // Function to fetch leaderboard data
    const fetchLeaderboardData = async () => {
      try {
        const response = await fetch('http://localhost:3000/events/weekly-leaderboard');
        const data = await response.json();
        console.log(data);
        setLeaderboardData(data);
      } catch (error) {
        console.error('Error fetching leaderboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    // Initial fetch
    // fetchLeaderboardData();
  }, [refresh]);

  const handleRefresh = () => {
    // Set loading to true while refreshing
    setLoading(true);

    // Fetch leaderboard data
    setRefresh(!refresh);
  };
 
  return (
    <div className="leaderboard bg-gray-100 p-4 h-full rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-3xl text-spark shadow-2xl p-0.4 rounded-full shadow-yellow-400  font-bold">🏆 Leaderboard 🏆</h2>
        
      </div>
      <div className='text-center text-red-600 font-semibold p-4 shadow-red-700 shadow-2xl  text-4xl  mt-36'>
          Coming Soon
      </div>
      {/* <button
          onClick={handleRefresh}
          disabled={loading}
          className={`text-white bg-blue-500 py-2 px-4 rounded ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {loading ? 'Refreshing...' : 'R'}
        </button>
      <ul>
        {leaderboardData.map((person, index) => (
          person.score!=0?
          <li key={index} className="mb-4 p-2 bg-white rounded-md shadow-md">
            <div className="flex items-center">
              <div className="w-20 h-16 overflow-hidden rounded-full mr-4">
                <img
                  src={person.displayPicture}
                  alt={person.displayName}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col">
                <p className="text-lg font-semibold">{person.displayName}</p>
                <p className="text-gray-600">🌟 Score: {person.score}</p>
              </div>
            </div>
          </li>
          :
          <></>
        ))}
      </ul> */}
    </div>
  );
};

export default Leaderboard;
