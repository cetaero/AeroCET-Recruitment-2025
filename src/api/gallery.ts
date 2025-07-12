
export const fetchGalleryImages = async (page = 1,limit = 8) => {
  const res = await fetch(`https://picsum.photos/v2/list?page=${page}&limit=${limit}`);
  if (!res.ok) {
    throw new Error('Failed to fetch images');
  }
  return res.json();
};
