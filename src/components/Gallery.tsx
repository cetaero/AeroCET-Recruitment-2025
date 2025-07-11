import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Gallery.css';
import Loading from './Loading';

interface ImageData {
  id: string;
  author: string;
}

function Gallery() {
  const navigate = useNavigate();
  const [images, setImages] = useState<ImageData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    fetch('https://picsum.photos/v2/list?page=2&limit=10')
      .then((res) => res.json())
      .then((data) => {
        setImages(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch images:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="gallery-container">
      <h2 className="gallery-heading">📸 Image Gallery</h2>
      <button className="gallery-home-button" onClick={() => navigate('/')}>🏠 Home</button>

      <div className="gallery-grid">
        {images.map((img) => (
          <div
            key={img.id}
            className="gallery-card"
            onClick={() => setSelectedImage(`https://picsum.photos/id/${img.id}/1000/700`)}
          >
            <img
              src={`https://picsum.photos/id/${img.id}/300/200`}
              alt={`By ${img.author}`}
              className="gallery-thumbnail"
            />
            <div className="gallery-caption">By {img.author}</div>
          </div>
        ))}
      </div>

      {selectedImage && (
        <div className="gallery-modal" onClick={() => setSelectedImage(null)}>
          <img src={selectedImage} alt="Fullscreen" className="gallery-fullscreen-img" />
          <button className="gallery-close-button" onClick={() => setSelectedImage(null)}>×</button>
        </div>
      )}
    </div>
  );
}

export default Gallery;
