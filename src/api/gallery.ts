import React, { useEffect, useState } from 'react';

const Gallery: React.FC = () => {
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    fetch('https://picsum.photos/v2/list?limit=6')
      .then(res => res.json())
      .then(data => {
        const urls = data.map((img: any) => img.download_url);
        setImages(urls);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="gallery">
      {images.map((src, idx) => (
        <img key={idx} src={src} alt={`Gallery ${idx}`} width={400} height={300}/>
      ))}
    </div>
  );
};

export default Gallery;
