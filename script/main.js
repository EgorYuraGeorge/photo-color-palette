document.addEventListener("DOMContentLoaded", () => {
    const gallery = document.getElementById("gallery");
    const photoInput = document.getElementById("photo-input");
  
    function getImages() {
      return Array.from(gallery.getElementsByTagName("img"));
    }
  
    let currentIndex = 0;
  
    function showImage(index) {
      const images = getImages();
      images.forEach((img, i) => img.classList.toggle("active", i === index));
    }
  
    function createColorSwatches(palette) {
      const swatchContainer = document.createElement("div");
      swatchContainer.style.display = "flex";
      swatchContainer.style.justifyContent = "center";
      swatchContainer.style.gap = "8px";
      swatchContainer.style.marginTop = "10px";
  
      palette.forEach((rgb) => {
        const hex = rgbToHex(rgb[0], rgb[1], rgb[2]);
        const colorDiv = document.createElement("div");
        colorDiv.style.width = "30px";
        colorDiv.style.height = "30px";
        colorDiv.style.borderRadius = "6px";
        colorDiv.style.backgroundColor = hex;
        colorDiv.title = hex;
        colorDiv.style.cursor = "pointer";
  
        colorDiv.addEventListener("click", () => {
          navigator.clipboard.writeText(hex);
          alert(`HEX-код ${hex} скопирован!`);
        });
  
        swatchContainer.appendChild(colorDiv);
      });
  
      return swatchContainer;
    }
  
    function rgbToHex(r, g, b) {
      return (
        "#" +
        [r, g, b]
          .map((x) => {
            const hex = x.toString(16);
            return hex.length === 1 ? "0" + hex : hex;
          })
          .join("")
      );
    }
  
    function analyzeColors(img) {
      const colorThief = new ColorThief();
      if (img.complete) {
        const palette = colorThief.getPalette(img, 5);
        const swatches = createColorSwatches(palette);
        img.insertAdjacentElement("afterend", swatches);
      } else {
        img.addEventListener("load", () => {
          const palette = colorThief.getPalette(img, 5);
          const swatches = createColorSwatches(palette);
          img.insertAdjacentElement("afterend", swatches);
        });
      }
    }
  
    getImages().forEach((img) => {
      img.crossOrigin = "Anonymous";
      analyzeColors(img);
    });
  
    document.getElementById("btn-left").addEventListener("click", () => {
      const images = getImages();
      if (images.length === 0) return;
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      showImage(currentIndex);
    });
  
    document.getElementById("btn-right").addEventListener("click", () => {
      const images = getImages();
      if (images.length === 0) return;
      currentIndex = (currentIndex + 1) % images.length;
      showImage(currentIndex);
    });
  
    document.getElementById("btn-home").addEventListener("click", () => {
      alert("Переход на главную страницу");
    });
  
    document.getElementById("btn-edit").addEventListener("click", () => {
      alert("Редактирование изображения в разработке");
    });
  
    document.getElementById("btn-collection").addEventListener("click", () => {
      alert("Подборка изображений в разработке");
    });
  
    document.getElementById("btn-upload").addEventListener("click", () => {
      photoInput.click();
    });
  
    document.getElementById("btn-add").addEventListener("click", () => {
      photoInput.click();
    });
  
    photoInput.addEventListener("change", (event) => {
      const file = event.target.files[0];
      if (file && file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = function (e) {
          const img = document.createElement("img");
          img.src = e.target.result;
          img.crossOrigin = "Anonymous";
  
          gallery.appendChild(img);
          currentIndex = getImages().length - 1;
          showImage(currentIndex);
          analyzeColors(img);
        };
        reader.readAsDataURL(file);
      }
    });
  });
  