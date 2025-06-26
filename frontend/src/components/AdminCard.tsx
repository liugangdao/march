import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/Card";
import './Card.css';

// 1. 定义清晰的数据类型
type Theme = {
  id: number;
  name: string;
  imageUrl: string;
  rating: number;
  description: string;
};

type AdminThemeCardProps = {
  theme: Theme;
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
  isDeleting?: boolean; // 增加加载状态
};

export default function AdminCard({ theme, onDelete, onEdit, isDeleting = false }: AdminThemeCardProps) {
  
  const handleDelete = () => {
    // 2. 增加删除确认
    if (window.confirm(`Are you sure you want to delete "${theme.name}"?`)) {
      onDelete(theme.id);
    }
  };

  return (
    <Card>
      <CardHeader>
        {theme.imageUrl ? (
          <img src={theme.imageUrl} alt={theme.name} className="card-image" />
        ) : (
          <div className="card-image-placeholder">No Image</div>
        )}
        <CardTitle>{theme.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="card-rating">Rating: {theme.rating} / 5</p>
        <p className="card-description">{theme.description}</p>
      </CardContent>
      <CardFooter>
        <button className="card-button" onClick={() => onEdit(theme.id)} disabled={isDeleting}>
          Edit
        </button>
        <button className="card-button" onClick={handleDelete} disabled={isDeleting}>
          {isDeleting ? 'Deleting...' : 'Delete'}
        </button>
      </CardFooter>
    </Card>
  );
}
