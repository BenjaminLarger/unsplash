// Extract access key from environment variable
// const accessKey = process.env.ACCESS_KEY;
// const secretKey = process.env.SECRET_KEY;

const accessKey = "1limJC1oMa3Vy-zxff6k5sjYiGbFvqtdvoRoOjTnmAc";
const redirectUri = "http://localhost:8443/callback"; // Your redirect URI
const authUrl = `https://unsplash.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=public+write_likes`;

const gallery = document.getElementById('gallery');

async function fetchPhotots() {
  try {
    const response = await fetch(`https://api.unsplash.com/photos?client_id=${accessKey}`);
    const photos = await response.json();
    gallery.innerHTML = "";
    photos.forEach(photo => {
      const photoElement = document.createElement('div');
      photoElement.className = 'photo';
      photoElement.innerHTML = `<img src="${photo.urls.regular}" alt="${photo.alt_description}">`;
      gallery.appendChild(photoElement);
    });
  }
  catch (error) {
    console.error(error);
    gallery.innerHTML = "<p>Something went wrong</p>";
  }
  const data = await response.json();
  return data;
}

fetchPhotots();

// Logic to redirect users to Unsplah for authentication
document.getElementById('login').addEventListener('click', () => {
  window.location.href = authUrl;
});
