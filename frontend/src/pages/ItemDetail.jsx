// components/ItemDetail.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function ItemDetail() {
  const { itemId } = useParams();
  const [item, setItem] = useState(null);

  useEffect(() => {
    async function fetchItem() {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/items/${itemId}`, {
            withCredentials: true,
        });
        setItem(response.data);
      } catch (error) {
        console.error('Error fetching item data:', error);
      }
    }

    fetchItem();
  }, [itemId]);

  if (!item) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{item.title}</h2>
      <p>{item.description}</p>
      <div>
        {item.photos.map((photoUrl, index) => (
          <img key={index} src={photoUrl} alt="Item" style={{ width: '100px', height: '100px' }} />
        ))}
      </div>
      {/* Display other item details */}
    </div>
  );
}

export default ItemDetail;
