
import React, { useEffect, useState } from 'react';
import { fetchGalleryImages } from '../api/gallery';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import './Gallery.css';

interface ImageData {
  id: string;
  download_url: string;
  author: string;
}

const Gallery: React.FC = () => {
  const [images, setImages] = useState<ImageData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage ] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false)
  const navigate = useNavigate();

  useEffect(() => {
    fetchGalleryImages()
      .then(data => {
        setImages(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);


   const handleLoadMore = () => {
    setLoadingMore(true);
    const nextPage = page + 1;

    fetchGalleryImages(nextPage)
      .then(data => {
        setImages(prev => [...prev, ...data]);
        setPage(nextPage);
        setLoadingMore(false);
      })
      .catch(err => {
        setError(err.message);
        setLoadingMore(false);
      });
  };


  return (
    <div className="gallery-container">
      <motion.h2
        className="gallery-title"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        🖼️ Image Gallery
      </motion.h2>

      <motion.button
        className="home-button"
        onClick={() => navigate('/')}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
      ⬅ Home
      </motion.button>

      {loading && <p className="loading">Loading images...</p>}
      {error && <p className="error">{error}</p>}

      <div className="gallery-grid">
        {images.map(img => (
          <motion.div
            className="gallery-card"
            key={img.id}
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <img src={img.download_url} alt={`by ${img.author}`} />
            <p>📸 {img.author}</p>
          </motion.div>
        ))}
      </div>

      {!loading && (
        <motion.button
          className="load-more-button"
          onClick={handleLoadMore}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          🔄 Load More
        </motion.button>
      )}

      {loadingMore && <p className="loading">Loading more images...</p>}

    </div>
  );
};

export default Gallery;
