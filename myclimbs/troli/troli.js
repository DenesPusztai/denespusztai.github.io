const vegallomasNevek = {
  "70": "Kossuth Lajos tér – Erzsébet királyné útja, aluljáró",
  "72": "Orczy tér – Zugló vasútállomás (Hermina út)",
  "73": "Arany János utca – Keleti pályaudvar",
  "74": "Károly körút (Astoria) – Csáktornya park",
  "75": "Jászai Mari tér – Puskás Ferenc Stadion",
  "76": "Jászai Mari tér – Keleti pályaudvar",
  "77": "Puskás Ferenc Stadion – Kála utca",
  "78": "Kossuth Lajos tér – Keleti pályaudvar (Garay utca)",
  "79": "Keleti pályaudvar – Kárpát utca",
  "80": "Keleti pályaudvar – Örs vezér tere",
  "81": "Örs vezér tere – Fischer István utca",
  "82": "Uzsoki Utcai Kórház – Örs vezér tere",
  "83": "Fővám tér – Orczy tér"
};

function populateRoutes() {
  const select = document.getElementById('jaratSzam');
  if (!select) {
    return;
  }

  Object.keys(vegallomasNevek)
    .sort()
    .forEach((jarat) => {
      const option = document.createElement('option');
      option.value = jarat;
      option.textContent = jarat;
      select.appendChild(option);
    });

  const defaultValue = select.value || '70';
  select.value = defaultValue;
  vegallomasKiiras(defaultValue);

  select.addEventListener('change', (event) => {
    vegallomasKiiras(event.target.value);
  });
}

function vegallomasKiiras(jarat) {
  const target = document.getElementById('vegallomasok');
  if (!target) {
    return;
  }

  target.textContent = vegallomasNevek[jarat] || '';
}

function setupBackToTop() {
  const button = document.getElementById('backToTop');
  if (!button) {
    return;
  }

  button.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  const toggleVisibility = () => {
    if (window.scrollY > 200) {
      button.classList.remove('d-none');
    } else {
      button.classList.add('d-none');
    }
  };

  toggleVisibility();
  window.addEventListener('scroll', toggleVisibility);
}

document.addEventListener('DOMContentLoaded', () => {
  populateRoutes();
  setupBackToTop();
});
