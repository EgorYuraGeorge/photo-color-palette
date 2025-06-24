document.addEventListener("DOMContentLoaded", () => {
  const photoInput = document.getElementById('photo-input');
  const uploadBtns = document.querySelectorAll('#btn-upload, #upload-btn');
  const settingsBtn = document.getElementById('btn-settings');

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
        reader.onload = function(e) {
          localStorage.setItem('uploadedImage', e.target.result);
          localStorage.setItem('photoList', JSON.stringify([e.target.result]));
          localStorage.setItem('photoIndex', 0);
          window.location.href = 'editor.html';
        };
        reader.readAsDataURL(file);
      }
    });
  }

  const collectionBtn = document.getElementById('btn-collection');
  if (collectionBtn) {
    collectionBtn.addEventListener('click', () => {
      window.location.href = 'gallery.html';
    });
  }

  if (settingsBtn) {
    settingsBtn.addEventListener('click', () => {
      openSettingsMenu();
    });
  }

  function openSettingsMenu() {
    const existingMenu = document.getElementById('settings-menu');
    if (existingMenu) {
      existingMenu.remove();
      return;
    }

    const menu = document.createElement('div');
    menu.id = 'settings-menu';
    menu.style.position = 'absolute';
    menu.style.top = '60px';
    menu.style.right = '20px';
    menu.style.backgroundColor = '#444';
    menu.style.border = '1px solid #666';
    menu.style.padding = '10px';
    menu.style.borderRadius = '10px';
    menu.style.zIndex = '9999';
    menu.style.color = 'white';

    const themeBtn = document.createElement('button');
    themeBtn.textContent = document.body.classList.contains('light') ? 'Тёмная тема' : 'Светлая тема';
    themeBtn.style.display = 'block';
    themeBtn.style.marginBottom = '10px';
    themeBtn.style.background = 'none';
    themeBtn.style.color = 'white';
    themeBtn.style.border = '1px solid white';
    themeBtn.style.borderRadius = '5px';
    themeBtn.style.padding = '5px';
    themeBtn.style.cursor = 'pointer';

    themeBtn.addEventListener('click', () => {
      document.body.classList.toggle('light');
      localStorage.setItem('preferredTheme', document.body.classList.contains('light') ? 'light' : 'dark');
      themeBtn.textContent = document.body.classList.contains('light') ? 'Тёмная тема' : 'Светлая тема';
    });

    const clearBtn = document.createElement('button');
    clearBtn.textContent = 'Очистить подборку';
    clearBtn.style.display = 'block';
    clearBtn.style.background = 'none';
    clearBtn.style.color = 'white';
    clearBtn.style.border = '1px solid white';
    clearBtn.style.borderRadius = '5px';
    clearBtn.style.padding = '5px';
    clearBtn.style.cursor = 'pointer';

    clearBtn.addEventListener('click', () => {
      if (confirm('Удалить все сохранённые изображения?')) {
        localStorage.removeItem('savedProjects');
        alert('Подборка очищена.');
      }
    });

    menu.appendChild(themeBtn);
    menu.appendChild(clearBtn);
    document.body.appendChild(menu);
  }

  const preferredTheme = localStorage.getItem('preferredTheme');
  if (preferredTheme === 'light') {
    document.body.classList.add('light');
  }
});
