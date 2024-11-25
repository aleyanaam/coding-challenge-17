// Task 2: Create Tour List Component
import React, { useEffect, useState } from "react"; //Imports usEffect and useState
import './App.css'; // Import gallery using the correct file path

const Gallery = () => {
    //Stores tour data, tracks loading statuses, and tracks errors
    const [tourList, setTourList] = useState([]); 
    const [isLoading, setIsLoading] = useState(true); 
    const [loadError, setLoadError] = useState(""); 

    useEffect(() => {
        const fetchToursData = async () => {
            try {
                const response = await fetch('https://api.allorigins.win/get?url=' + encodeURIComponent('https://course-api.com/react-tours-project')); //extra code provided from online as original link threw an error
                if (!response.ok) {
                    //Displays an error message if it fails to fetch
                    throw new Error("Failed to fetch tours."); 
                }
                const data = await response.json();
                const tours = JSON.parse(data.contents); 
                setTourList(tours); 
            } catch (err) {
                setLoadError(err.message); 
            } finally {
                setIsLoading(false); 
            }
        };
        //Calls the ToursData function 
        fetchToursData(); 
    }, []); 

    //Removes a tour from the list
    const handleRemoveTour = (tourId) => {
        setTourList(tourList.filter((tour) => tour.id !== tourId));
    };

    const handleToggleDescription = (tourId) => {
        setTourList(tourList.map((tour) =>
            tour.id === tourId ? { ...tour, showFullDescription: !tour.showFullDescription } : tour
        ));
    };

    if (isLoading) return <p>Loading tours...</p>;  //Displays a loading message
    if (loadError) return <p>Error: {loadError}</p>; // Displays an error message  

    return (
        <div className="gallery">
            {tourList.map(({ id, name, info, image, price, showFullDescription }) => (
                <div key={id} className="tour-card">
                    <img src={image} alt={name} />
                    <div className="tour-info">
                        <h2>{name}</h2>
                        <p className="tour-price">${price}</p>
                        <p>
                            {showFullDescription ? info : `${info.substring(0, 100)}...`}
                            <button onClick={() => handleToggleDescription(id)}>
                                {showFullDescription ? "Show Less" : "Read More"}
                            </button>
                        </p>
                        <button className="not-interested" onClick={() => handleRemoveTour(id)}>
                            Not Interested
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Gallery; //Displays Gallery