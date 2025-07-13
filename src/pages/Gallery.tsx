import React, { useEffect, useState } from "react";

type Image = {
  id: string;
  author: string;
  download_url: string;
};

const Gallery: React.FC = () => {
  const [images, setImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch("https://picsum.photos/v2/list?page=2&limit=6")
      .then((res) => res.json())
      .then((data: Image[]) => {
        setImages(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching images:", error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading images...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Image Gallery</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
        {images.map((img) => (
          <img
            key={img.id}
            src={img.download_url}
            alt={img.author}
            style={{ width: "30%", height: "200px", objectFit: "cover" }}
          />
        ))}
      </div>
    </div>
  );
};

export default Gallery;
