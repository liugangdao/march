import { useNavigate } from "react-router-dom";

import './Card.css';


type AdminProps = {
  imageUrl: string;
  name: string;
  rating: number;
  description: string;
  id: number;
  onDelete: (id: number) => void;
  onEdit:(id: number) => void
};

export default function AdminCard({ imageUrl, name, rating, description, id, onDelete,onEdit}: AdminProps) {
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
      <div className="flex gap-2">
        <button className="card-button" onClick={() => onEdit(id)}>
          Edit
        </button>
        <button className="card-button bg-red-500" onClick={() => onDelete(id)}>
          Delete
        </button>
      </div>
    </div>
  );
}
