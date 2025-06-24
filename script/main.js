document.addEventListener("DOMContentLoaded", () => {
  const photoInput = document.getElementById('photo-input');
  const uploadBtns = document.querySelectorAll('#btn-upload, #upload-btn');

  uploadBtns.forEach(btn => {
    if (btn) {
      btn.addEventListener('click', () => {
        if (photoInput) photoInput.click();
      });
    }
  });

  if (photoInput) {
    photoInput.addEventListener('change', (event) => {
      const file = event.target.files[0];
      if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = function (e) {
          localStorage.setItem('uploadedImage', e.target.result);
          window.location.href = 'editor.html';
        };
        reader.readAsDataURL(file);
      }
    });
  }

  const gallery = document.getElementById('gallery');
  if (gallery) {
    const images = Array.from(gallery.getElementsByTagName('img'));
    let currentIndex = 0;

    function showImage(index) {
      images.forEach((img, i) => {
        img.classList.toggle('active', i === index);
        img.style.display = i === index ? 'block' : 'none';
      });
      if (images[index]) {
        localStorage.setItem('uploadedImage', images[index].src);
      }
    }

    if (images.length > 0) {
      showImage(currentIndex);
    }

    const btnLeft = document.getElementById('btn-left');
    const btnRight = document.getElementById('btn-right');

    if (btnLeft) {
      btnLeft.addEventListener('click', () => {
        if (images.length === 0) return;
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        showImage(currentIndex);
      });
    }

    if (btnRight) {
      btnRight.addEventListener('click', () => {
        if (images.length === 0) return;
        currentIndex = (currentIndex + 1) % images.length;
        showImage(currentIndex);
      });
    }

    images.forEach(img => {
      img.style.cursor = 'pointer';
      img.addEventListener('click', () => {
        localStorage.setItem('uploadedImage', img.src);
        window.location.href = 'editor.html';
      });
    });
  }

  const btnHome = document.getElementById('btn-home');
  const btnEdit = document.getElementById('btn-edit');
  const btnCollection = document.getElementById('btn-collection');
  const btnAdd = document.getElementById('btn-add');
  const btnSettings = document.getElementById('btn-settings');

  if (btnHome) btnHome.addEventListener('click', () => location.href = 'index.html');
  if (btnCollection) btnCollection.addEventListener('click', () => location.href = 'gallery.html');
  if (btnEdit) btnEdit.addEventListener('click', () => location.href = 'editor.html');
  if (btnAdd) btnAdd.addEventListener('click', () => {
    if (photoInput) photoInput.click();
  });

  if (btnSettings) btnSettings.addEventListener('click', () => {
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

      document.getElementById('themeToggle').addEventListener('change', (e) => {
        document.body.style.backgroundColor = e.target.checked ? '#eee' : '#333';
        document.body.style.color = e.target.checked ? '#000' : '#fff';
      });

      document.getElementById('clearProjects').addEventListener('click', () => {
        localStorage.removeItem('savedProjects');
        alert('Все сохранённые проекты удалены');
      });
    } else {
      settingsMenu.remove();
    }
  });
});
  
