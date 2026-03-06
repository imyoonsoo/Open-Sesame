import { useState, useEffect } from 'react';
import FeedCard from './FeedCard';
import './FeedGrid.css';


function FeedGrid() {
  const [users, setUsers] = useState([]);

  useEffect(()=>{
    fetch('https://openmind-api.vercel.app/23-4/subjects/')
      .then(respose => {
        return respose.json();
      })
      .then(data => {
        setUsers(data.results);
      })
  }, []);
  return (
    <div className="feed-grid">
      {users.slice(0, 8).map((item) => (
        <FeedCard
          key={item.id}
          item={item}
          onClick={() => onClickCard(item.id)}
        />
      ))}
    </div>
  );
}

export default FeedGrid;
