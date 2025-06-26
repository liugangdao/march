import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/Card";
import './Card.css';

// 1. 定义清晰的数据类型
type Slot = {
  id: number;
  themeId: number;
  date: string;
  time: string;
  maxPeople: number;
};

// 关联的主题信息，可以只包含部分
type ThemeInfo = {
  name: string;
  imageUrl: string;
}

type AdminSlotCardProps = {
  slot: Slot;
  theme: ThemeInfo;
  onEdit: (id: number) => void;
  onAdd: (themeId: number) => void;
  onDelete: (id: number) => void;
  isProcessing?: boolean; // 通用的处理中状态
};

export default function AdminSlotCard({ slot, theme, onEdit, onAdd, onDelete, isProcessing = false }: AdminSlotCardProps) {
  
  const handleDelete = () => {
    // 2. 增加删除确认
    if (window.confirm(`Are you sure you want to delete this slot?`)) {
      // 3. 修复 Bug：使用 slot.id 而不是 themeid
      onDelete(slot.id);
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <img src={theme.imageUrl} alt={theme.name} className="card-image" />
        <CardTitle>{theme.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="card-date">Date: {slot.date}</p>
        <p className="card-time">Time: {slot.time}</p>
        <p className="card-maxpeople">Max People: {slot.maxPeople}</p>
      </CardContent>
      <CardFooter>
        <button className="card-button" onClick={() => onEdit(slot.id)} disabled={isProcessing}>
          Edit
        </button>
        <button className="card-button" onClick={() => onAdd(slot.themeId)} disabled={isProcessing}>
          Add Slot
        </button>
        <button className="card-button" onClick={handleDelete} disabled={isProcessing}>
          {isProcessing ? 'Deleting...' : 'Delete'}
        </button>
      </CardFooter>
    </Card>
  );
}