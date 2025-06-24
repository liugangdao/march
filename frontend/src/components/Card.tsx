import { useNavigate } from "react-router-dom";

import './Card.css';


type CardProps = {
  imageUrl: string;
  name: string;
  rating: number;
  description: string;
  id: number;
  showButton?: boolean;
};

export default function Card({ imageUrl, name, rating, description, id, showButton = true}: CardProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/themes/${id}`);
  };
  
  return (
    <div className="card">
        {imageUrl ? (
        <img src={imageUrl} alt={name} className="card-image" />
        ) : (
        <div className="card-image-placeholder">No Image</div>
        )}
      <h2 className="card-title">{name}</h2>
      <p className="card-rating">Rating: {rating} / 5</p>
      <p className="card-description">{description}</p>
      {showButton && ( 
        <button onClick={handleClick} className="card-button">Book</button>
      )}
  

    </div>
  );
}
