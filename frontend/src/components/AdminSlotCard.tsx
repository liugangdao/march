
type AdminSlotProps = {
  imageUrl: string | null;
  name: string | null;
  slotid: number;
  themeid: number | null;
  date: string | null;
  time: string | null;
  maxpeople: number | null;
  onEdit: (id: number) => void;
  onAdd: (themeId: number) => void;
  ondelete:(id:number)=>void;
};

export default function AdminCard({ imageUrl, name, slotid,themeid,date,time,maxpeople,onEdit,onAdd,ondelete}: AdminSlotProps) {
  return (
    <div className="card">
      <img src={imageUrl} alt={name} className="card-image" />
      <h2 className="card-title">{name}</h2>
      <p className="card-date">{date}</p>
      <p className ="card-time">{time}</p>
      <p className ="card-maxpeople">maxPeople:{maxpeople}</p>2
      <div className="flex gap-2">
        <button className="card-button" onClick={() => onEdit(slotid)}>
          Edit
        </button>
        <button className ="card-button" onClick={()=>onAdd(themeid)}>
            Add 
        </button>
        <button className ="card-button" onClick={()=>ondelete(themeid)}>
            Delete
        </button>
      </div>
    </div>
  );
}