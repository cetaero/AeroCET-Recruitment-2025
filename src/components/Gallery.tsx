import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from './Loading'; 


interface ImageData {
  id: string;
  author: string;
}

function Gallery() {
  const navigate = useNavigate();
  const [images, setImages] = useState<ImageData[]>([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return <Loading />;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ color: 'white' }}>Image Gallery</h2>
      <button
        style={{ position: 'absolute', right: '2em', top: '2em' }}
        onClick={() => navigate('/')}
      >
        Home
      </button>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
        {images.map((img) => (
          <img
            key={img.id}
            src={`https://picsum.photos/id/${img.id}/300/200`}
            alt={`By ${img.author}`}
            style={{ borderRadius: '8px', boxShadow: '0 4px 10px rgba(0,0,0,0.2)' }}
          />
        ))}
      </div>
    </div>
  );
}

export default Gallery;
