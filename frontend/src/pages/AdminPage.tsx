import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import "./AdminPage.css"
import Card from "@/components/Card"  
import axios from "axios";
import AdminCard from "@/components/AdminCard"
import AdminSlotCard from "@/components/AdminSlotCard"
import BookingTable from "@/components/BookingTable";
interface Theme{
    id: number
    title: string
    image_url?: string
    rating?: number
    description?: string
    
}
interface AddThemeForm{
  title:string
  image_url?: string
  rating?: number
  description?: string
}

interface Slot {
  imageUrl?: string;
  name: string;
  themeid:number;
  slotid: number;
  date: string;
  time: string;
  maxpeople: number;
};



interface Booking {
  slot_id: number;
  theme_title: string;
  date: string;
  time: string;
  max_people: number;
  booked_people: number;
  remaining: number;
  user_name: string;
  user_email: string;
}

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("scripts")
  const [search, setSearch] = useState("")
  // Theme UseState
  const [themes, setThemes] = useState<Theme[]>([]);
  const [editingThemeId, setEditingThemeId] = useState<number | null>(null);
  const [formData,setFormData] = useState({
    title: "",
    image_url: "",
    rating: undefined,
    description: "",
  })
  const [themeAdding, setthemeAdding] = useState(false);
  const[newTheme,setNewTheme] =useState({
    title: "",
    image_url: "",
    rating: undefined,
    description: "",
  })
    

  const [messgae, setMessage] = useState("")


// Slot UseState
  const [slots, setSlots] = useState<Slot[]>([]);
  const [editingSlotId, setEditingSlotId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState({
    date: "",
    time: "",
    max_people: 0,
  });

const [isAdding, setIsAdding] = useState(false);
const [addingThemeId, setAddingThemeId] = useState<number | null>(null);
const [newSlot, setNewSlot] = useState({ date: "", time: "", max_people: "" });
const [bookings, setBookings] = useState<Booking[]>([]);
const [loading, setLoading] = useState(true);



  useEffect(()=>{
    fetchThemes();
    fetchSlots();
    fetchBookingInf();
  }, []);

      const fetchThemes = async() =>{
      try{
        const res = await fetch("http://localhost:8000/api/themes");
        if(!res.ok) throw new Error("Fail to recive the Theme");
        const data = await res.json();
        setThemes(data);
      } catch(err){
        console.error("❌ Can not recive the theme:", err);

      }
    };
    const handleThemeEdit = (id:number,theme: Theme) => {
      setEditingThemeId(id);
      setthemeAdding(false);
      setFormData({
        title: theme.title,
        image_url: theme.image_url || "",
        rating: theme.rating ?? undefined,
        description: theme.description || "",
      });
    };
    const handleThemeUpdate = async () => {
      if (formData.rating < 0 || formData.rating > 5) {
        alert("Rating need to be in between 0-5！");
        return;
      }
      if (!formData.title.trim()) {
        setMessage("❌ Title cannot be empty when editing!");
        return;
      }
      try {
        await axios.put(`http://localhost:8000/api/themes/${editingThemeId}`, formData);
        setEditingThemeId(null);
        fetchSlots();
      } catch (err) {
        console.error("Fail to Update", err);
      }
      fetchThemes();
    };

    const handleCreateTheme = async () => {
      const payload: AddThemeForm = {
        title: formData.title,
        image_url: formData.image_url?.trim() || undefined, 
        rating: formData.rating,
        description: formData.description?.trim() || undefined,
      };

      try {
        const response = await axios.post("http://127.0.0.1:8000/api/themes", payload, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        setMessage("✅ Add success!");
        fetchThemes(); 
        setFormData({
          title: "",
          image_url: "",
          rating: undefined,
          description: ""
        });

        setEditingThemeId(null);  
        setthemeAdding(false);
      } catch (error) {
        console.error("Fail to Update", error);
        setMessage("❌ Failed to add theme.");
      }
    };

    const handleThemeDelete = async (themeId: number) => {
      const confirmed = window.confirm("Are you sure you want to delete this theme?");
      if (!confirmed) return;

      try {
        const res = await fetch(`http://127.0.0.1:8000/api/themes/${themeId}`, {
          method: "DELETE",
        });

        if (!res.ok) {
          throw new Error("Failed to delete");
        }

        alert("Deleted successfully!");
        fetchThemes(); 
      } catch (err) {
        alert("Error deleting theme. Please try again.");
        console.error(err);
      }
    };




    const fetchSlots = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/api/admin/slot");
        setSlots(res.data);
      } catch (err) {
        console.error("Failed to fetch slots:", err);
      }
    };

    const handleEdit = (id:number,slot: Slot) => {
      setEditingSlotId(id);
      setIsAdding(false);
      
      setEditForm({
        date: slot.date,
        time: slot.time,
        max_people: slot.maxpeople,
      });
    };

    const handleUpdate = async () => {
      try {
        await axios.put(`http://localhost:8000/api/slots/${editingSlotId}`, editForm);
        setEditingSlotId(null);
        fetchSlots();
      } catch (err) {
        console.error("Fail to update", err);
      }
    };
    
  const handleCreateSlot = async () => {
    if (!newSlot.date || !newSlot.time || !newSlot.max_people) return;

    try {
      const payload = {
        theme_id: addingThemeId , 
        date: newSlot.date,
        time: newSlot.time,
        max_people: parseInt(newSlot.max_people),
      };
      await axios.post("http://127.0.0.1:8000/api/slots", payload);
      setIsAdding(false);
      setAddingThemeId(null);
      setNewSlot({ date: "", time: "", max_people: "" });
      fetchSlots()
    } catch (error) {
      console.error("Fail to add：", error);
    }
  };

  const handleSlotDelete = async (slotId: number) => {
    if (!window.confirm("Are you sure you want to delete this time slot?")) return;

    try {
      const token = localStorage.getItem("token");

      const res = await axios.delete(`http://127.0.0.1:8000/api/slots/${slotId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("✅ Slot deleted successfully");
      
      fetchSlots(); 
    } catch (error: any) {
      if (error.response?.data?.detail) {
        alert("❌ Failed to delete: " + error.response.data.detail);
      } else {
        alert("❌ Network error while deleting");
      }
      console.error("Delete error:", error);
    }
  };
  const fetchBookingInf = async (): Promise<void> => {
    try {
      const res = await fetch("http://localhost:8000/api/admin/bookings");
      if (!res.ok) {
        throw new Error("❌ Failed to receive the booking info");
      }
      const data = await res.json();
      setBookings(data); 
    } catch (err) {
      console.error("❌ Error fetching booking info:", err);
    }
  };
  return (
    <div className="admin-container">
    
      <div className="sidebar">
        <div className="logo">🛠️ EscapeFox Admin</div>

        <div className="tab-list">
          <button
            className={activeTab === "scripts" ? "tab-trigger active" : "tab-trigger"}
            onClick={() => setActiveTab("scripts")}
          >
            🎭 ThemeDetail
          </button>

          <button
            className={activeTab === "manage-scripts" ? "tab-trigger active" : "tab-trigger"}
            onClick={() => setActiveTab("manage-scripts")}
          >
            ➕ ManageThemes
          </button>



          <button
            className={activeTab === "schedule" ? "tab-trigger active" : "tab-trigger"}
            onClick={() => setActiveTab("schedule")}
          >
            🕒 Time Management
          </button>

          <button
            className={activeTab === "booking" ? "tab-trigger active" : "tab-trigger"}
            onClick={() => setActiveTab("booking")}
          >
            🕒 Reservation Management
          </button>
        </div>
      </div>

      
      <div className="main-content">
        <div className="header">
          <h1 className="title">Admin Management</h1>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        

        <div className="tab-content">
          {activeTab === "scripts" &&(
            <div className="admin-theme-grid">
              {themes
                .filter((theme) => theme.title.toLowerCase().includes(search.toLowerCase()))
                .map((theme) => (
                  <Card
                    key={theme.id}
                    id={theme.id}
                    imageUrl={theme.image_url}
                    name={theme.title}
                    rating={theme.rating}
                    description={theme.description}
                    showButton={false} 
                  />
                ))}
            </div>
          )}

          
          {activeTab === "manage-scripts" && (
            <div className="manage-themes">
              {themeAdding || editingThemeId !== null ? (
                
                <div className="edit-form">
                  <h2>{themeAdding ? "Add Theme" : `Edit Theme #${editingThemeId}`}</h2>
                  <input
                    name="title"
                    type="text"
                    placeholder="Title *"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required={themeAdding}
                  />
                  <input
                    name="image_url"
                    type="text"
                    placeholder="Image URL"
                    value={formData.image_url}
                    onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  />
                  <input
                    name="rating"
                    type="number"
                    placeholder="Rating"
                    value={formData.rating ?? ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        rating: e.target.value ? parseFloat(e.target.value) : undefined,
                      })
                    }
                  />
                  <textarea
                    name="description"
                    placeholder="Description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                  <button onClick={themeAdding ? handleCreateTheme : handleThemeUpdate}>
                    Save
                  </button>
                  <button
                    onClick={() => {
                      setthemeAdding(false);
                      setEditingThemeId(null);
                      setFormData({ title: "", image_url: "", rating: undefined, description: "" });
                    }}
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <>
                  <button
                    className="add-theme-button"
                    onClick={() => {
                      setthemeAdding(true);
                      setEditingThemeId(null);
                      setFormData({ title: "", image_url: "", rating: undefined, description: "" });
                    }}
                  >
                    ➕ Add New Theme
                  </button>

                  <div className="admin-theme-grid">
                    {themes
                      .filter((theme) => theme.title.toLowerCase().includes(search.toLowerCase()))
                      .map((theme) => (
                        <AdminCard
                          key={theme.id}
                          theme={{
                            id: theme.id,
                            name: theme.title,
                            imageUrl: theme.image_url ?? "/default.png",
                            rating: theme.rating ?? 0,
                            description: theme.description ?? "",
                          }}
                          onDelete={handleThemeDelete}
                          onEdit={() => handleThemeEdit(theme.id, theme)}
                        />
                      ))}
                  </div>
                </>
              )}
            </div>
          )}


          {activeTab === "schedule" && (
            <div className="manageTime">
              {isAdding && addingThemeId !== null ? (
              
                <div className="edit-form">
                  <h2>Add Slot (Theme #{addingThemeId})</h2>
                  <input
                    type="date"
                    value={newSlot.date}
                    onChange={(e) => setNewSlot({ ...newSlot, date: e.target.value })}
                    required
                  />
                  <input
                    type="time"
                    value={newSlot.time}
                    onChange={(e) => setNewSlot({ ...newSlot, time: e.target.value })}
                    required
                  />
                  <input
                    type="number"
                    value={newSlot.max_people}
                    onChange={(e) => setNewSlot({ ...newSlot, max_people: e.target.value })}
                    placeholder="Max People"
                    required
                  />
                  <button
                    onClick={handleCreateSlot}
                    disabled={!newSlot.date || !newSlot.time || !newSlot.max_people}
                  >
                    Save
                  </button>
                  <button
                    onClick={() => {
                      setIsAdding(false);
                      setAddingThemeId(null);
                    }}
                  >
                    Cancel
                  </button>
                </div>
              ) : editingSlotId !== null ? (
              
                <div className="edit-form">
                  <h2>Edit Slot #{editingSlotId}</h2>
                  <input
                    type="date"
                    value={editForm.date}
                    onChange={(e) => setEditForm({ ...editForm, date: e.target.value })}
                  />
                  <input
                    type="time"
                    value={editForm.time}
                    onChange={(e) => setEditForm({ ...editForm, time: e.target.value })}
                  />
                  <input
                    type="number"
                    value={editForm.max_people}
                    onChange={(e) =>
                      setEditForm({ ...editForm, max_people: parseInt(e.target.value) })
                    }
                  />
                  <button onClick={handleUpdate}>Save</button>
                  <button
                    onClick={() => {
                      setEditingSlotId(null);
                      setEditForm({ date: "", time: "", max_people: 0 });
                    }}
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <div className="admin-theme-grid">
                  {slots
                    .filter((slot) => slot.name?.toLowerCase().includes(search.toLowerCase()) ?? true)
                    .map((slot) => (
                      <AdminSlotCard
                        key={slot.slotid}
                        slot={{
                          id: slot.slotid,
                          themeId: slot.themeid,
                          date: slot.date,
                          time: slot.time,
                          maxPeople: slot.maxpeople,
                        }}
                        theme={{
                          name: slot.name,
                          imageUrl: slot.imageUrl ?? "/default.png",
                        }}
                        onEdit={() => handleEdit(slot.slotid, slot)}
                        onAdd={(themeId) => {
                          setIsAdding(true);
                          setAddingThemeId(themeId);
                          setEditingSlotId(null);
                        }}
                        onDelete={handleSlotDelete}
                      />
                    ))}
                </div>
              )}
              
            </div>
          )}

        {activeTab === "booking" && (
          <div className="booking">
            <BookingTable
              bookings={bookings.filter((b) =>
                b.theme_title.toLowerCase().includes(search.toLowerCase())
              )}
            />
          </div>
        )}




        </div>
      </div>
    </div>
  );
}
