const API_KEY = 's1cUooOyo2fSugcx2cAiwxXb7gqHBqVdvTyLuvQpSFk';
const SEARCH_API_URL = 'https://api.unsplash.com/search/photos';
const RANDOM_API_URL = 'https://api.unsplash.com/photos/random'; 
const photoGallery = document.getElementById('photoGallery');
const searchInput = document.getElementById('searchInput');
const clearButton = document.getElementById('clearButton');


async function fetchPhotos(query = '') {
    let url;
    const photosCount = 21;
  
    if (query) {
     
      url = `${SEARCH_API_URL}?query=${query}&client_id=${API_KEY}&per_page=${photosCount}`;
    } else {
     
      url = `${RANDOM_API_URL}?client_id=${API_KEY}&count=${photosCount}`; 
    }
  
    try {
      const response = await fetch(url);
      const data = await response.json();
    
    
    displayPhotos(data.results || data);
  } catch (error) {
    console.error('Error fetching photos:', error);
    photoGallery.innerHTML = '<p>Error loading photos. Please try again later.</p>';
  }
}

function displayPhotos(photos) {
  if (photos.length > 0) {
    photoGallery.innerHTML = photos.map(photo => `
      <img src="${photo.urls.small}" alt="${photo.alt_description || 'Unsplash photo'}">
    `).join('');
  } else {
    photoGallery.innerHTML = '<p>No photos found</p>';
  }
}

searchInput.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    fetchPhotos(searchInput.value);
  }
});


clearButton.addEventListener('click', () => {
    searchInput.value = ''; 
    searchInput.placeholder = 'Search for photos...'; 
     
  });


window.onload = function() {
  fetchPhotos(); 
  searchInput.focus();
}
