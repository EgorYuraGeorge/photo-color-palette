document.addEventListener("DOMContentLoaded", () => {
  const photoInput = document.getElementById('photo-input');
  const uploadBtns = document.querySelectorAll('#btn-upload, #upload-btn');
  const btnHome = document.getElementById('btn-home');
  const btnCollection = document.getElementById('btn-collection');
  const btnAdd = document.getElementById('btn-add');
  const btnSettings = document.getElementById('btn-settings');

  function initUpload() {
    uploadBtns.forEach(btn => {
      btn?.addEventListener('click', () => photoInput?.click());
    });

    photoInput?.addEventListener('change', handleFileSelect);
  }

  function handleFileSelect(event) {
    const file = event.target.files[0];
    if (file?.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        localStorage.setItem('uploadedImage', e.target.result);
        window.location.href = 'editor.html';
      };
      reader.readAsDataURL(file);
    }
  }

  function initMainGallery() {
    const gallery = document.getElementById('gallery');
    if (!gallery) return;

    const images = gallery.querySelectorAll('img');
    images.forEach(img => {
      img.addEventListener('click', () => {
        localStorage.setItem('uploadedImage', img.src);
        window.location.href = 'editor.html';
      });
    });
  }

  function initGalleryPage() {
    const displayedImage = document.getElementById('displayedImage');
    if (!displayedImage) return;

    const imageFilenames = [
      "2025-06-16 15.56.51.jpg",
      "2025-06-16 15.57.17.jpg",
      "2025-06-16 15.57.21.jpg",
      "2025-06-16 15.57.25.jpg",
      "2025-06-16 15.57.31.jpg",
      "2025-06-16 15.57.35.jpg",
      "2025-06-16 15.57.40.jpg",
      "2025-06-16 15.57.45.jpg"
    ];

    const basePath = "style/photos/";
    let index = 0;

    function updateImage() {
      displayedImage.style.opacity = 0;
      setTimeout(() => {
        displayedImage.src = basePath + imageFilenames[index];
        displayedImage.style.opacity = 1;
      }, 200);
    }

    displayedImage.addEventListener('click', () => {
      localStorage.setItem('uploadedImage', displayedImage.src);
      window.location.href = 'editor.html';
    });

    document.getElementById('btn-left')?.addEventListener('click', () => {
      index = (index - 1 + imageFilenames.length) % imageFilenames.length;
      updateImage();
    });

    document.getElementById('btn-right')?.addEventListener('click', () => {
      index = (index + 1) % imageFilenames.length;
      updateImage();
    });
  }

  function setupCommonHandlers() {
    btnHome?.addEventListener('click', () => location.href = 'index.html');
    btnCollection?.addEventListener('click', () => location.href = 'gallery.html');
    btnAdd?.addEventListener('click', () => photoInput?.click());
    
    if (btnSettings) {
      btnSettings.addEventListener('click', showSettingsMenu);
    }
  }

  function showSettingsMenu() {
    let settingsMenu = document.getElementById('settings-menu');
    if (!settingsMenu) {
      settingsMenu = document.createElement('div');
      settingsMenu.id = 'settings-menu';
      settingsMenu.style.position = 'fixed';
      settingsMenu.style.top = '60px';
      settingsMenu.style.right = '20px';
      settingsMenu.style.background = '#222';
      settingsMenu.style.color = '#fff';
      settingsMenu.style.padding = '10px';
      settingsMenu.style.borderRadius = '10px';
      settingsMenu.style.zIndex = '9999';
      settingsMenu.innerHTML = `
        <label style="display: block; margin-bottom: 5px;">
          <input type="checkbox" id="themeToggle"> Светлая тема
        </label>
        <button id="clearProjects" style="margin-top: 10px;">Очистить сохранения</button>
      `;
      document.body.appendChild(settingsMenu);

      const themeToggle = document.getElementById('themeToggle');
      if (localStorage.getItem('theme') === 'light') {
        themeToggle.checked = true;
        toggleTheme({target: themeToggle});
      }

      themeToggle.addEventListener('change', toggleTheme);
      document.getElementById('clearProjects').addEventListener('click', clearProjects);
    } else {
      settingsMenu.remove();
    }
  }

  function toggleTheme(e) {
    if (e.target.checked) {
      document.body.style.backgroundColor = '#eee';
      document.body.style.color = '#000';
      localStorage.setItem('theme', 'light');
    } else {
      document.body.style.backgroundColor = '#333';
      document.body.style.color = '#fff';
      localStorage.setItem('theme', 'dark');
    }
  }

  function clearProjects() {
    localStorage.removeItem('savedProjects');
    alert('Все сохранённые проекты удалены');
  }

  initUpload();
  setupCommonHandlers();

  if (document.getElementById('gallery') && !document.getElementById('displayedImage')) {
    initMainGallery();
  }

  if (document.getElementById('displayedImage')) {
    initGalleryPage();
  }

  if (localStorage.getItem('theme') === 'light') {
    document.body.style.backgroundColor = '#eee';
    document.body.style.color = '#000';
  }
});