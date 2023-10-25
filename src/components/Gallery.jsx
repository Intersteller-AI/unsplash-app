import React, { useEffect, useState } from 'react';

function Gallery() {
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState(null);
  const perPage = 15;
  const apiKey = "YOUR_ACCESS_KEY";

  useEffect(() => {
    getImages();
  }, [searchTerm, currentPage]);

  const getImages = () => {
    let apiUrl = `https://api.unsplash.com/photos?client_id=${apiKey}&page=${currentPage}&per_page=${perPage}`;
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => {
        setImages(data);
      });
  };

  const loadMoreImages = () => {
    setCurrentPage(currentPage + 1);
  };

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      setSearchTerm(e.target.value);
      setImages([]);
      setCurrentPage(1);
    }
  };

  return (
    <div>
      <input type="text" onKeyUp={handleSearch} className="search-input" />
      <div className="images">
        {images?.map((image, index) => (
          <img
            key={index}
            src={image.urls.full}
            alt={image.alt_description}
          />
        ))}
      </div>
      <button onClick={loadMoreImages} className="load-more">Load More</button>
    </div>
  );
}

export default Gallery;
