import React,  { useEffect, useState } from "react";
import axios from "axios";
import "./OurRoom.css"
export default function description(){
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect (()=>{
        
        const fetchTheme = async()=>{
            try{
                const response = await axios.get("http://127.0.0.1:8000/api/topThemes");
                setData(response.data);
            }catch(err){
                console.error(err);
                setError("Failed to fetch theme");
            }finally{
                setLoading(false);
            }
        }
        fetchTheme()
    },[])

    if (loading) return <p>Loading...</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;

    return (
        <div className="main-section">
            <div className="leftGallery">
                <h2>ThemeGallery</h2>
                <div className="roomGalleryContainer">
                    <div className="roomGallery">
                        {data.map((data) => (
                        <div className="room" key={data.id}>
                            <img src={data.image_url} alt="No image" className="theme-picture" />
                            <p className="theme-title">Name: {data.title}</p>
                            <p>Rating: {data.rating}</p>
                        </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="rightDescription">
                <div className="features-container">
                    <div className="feature">
                        
                        <div>
                        <h4><img src="/icons8-postcard-100.png" className="icon" />Explore more about the room</h4>
                        <p>The room covers an average of 300m². Some rooms feature NPCs to guide or surprise you during tasks. 
                            Each room is uniquely decorated with elements that reflect its theme. </p>
                        </div>
                    </div>

                    <div className="feature">
                        
                        <div>
                        <h4><img src="/icons8-fast-forward-100.png" className="icon" />Fast and flexible</h4>
                        <p>Book tickets online in minutes, with free cancellation available for many escape room themes.</p>
                        </div>
                    </div>


                    <div className="feature">
                       
                        <div>
                        <h4>
                            <img src="/icons8-notice-100.png" className="icon" />
                              Game Notice
                        </h4>
                        
                        <p>Please arrive 10 minutes early. Personal belongings must be stored outside the room. 
                            No recording or photography is allowed during the game.</p>
                        </div>
                    </div>
                </div>

                
            </div>
        </div>

    );
}
