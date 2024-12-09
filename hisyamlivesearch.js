document.addEventListener("DOMContentLoaded", () => {
// SCRIPT 1: Kelola Form Pencarian
const searchIcon = document.getElementById("searchIcon");
const buttonSearch = document.getElementById("buttonsearch"); // Perbaiki nama menjadi sesuai dengan ID
const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");
const sitelink = document.getElementById("sitelink");
const iconnav = document.getElementById("iconnav");

// Toggle kelas "show" pada form dan "hide" pada ikon
const toggleSearchForm = () => {
  searchIcon.classList.add("hide"); // Sembunyikan ikon
  searchForm.classList.add("show"); // Tampilkan form
  setTimeout(() => searchInput.focus(), 100); // Fokus pada input
  sitelink.style.visibility = "hidden";
  iconnav.style.visibility = "hidden";
  buttonSearch.style.display = "none";
};

// Tambahkan event listener untuk searchIcon dan buttonSearch
if (searchIcon) {
  searchIcon.addEventListener("click", toggleSearchForm);
}
if (buttonSearch) {
  buttonSearch.addEventListener("click", toggleSearchForm);
  console.log('buttonSearch ditemukan'); // Debugging
}

  // Jika klik di luar input atau form, kembalikan ke ikon
  document.addEventListener("click", (e) => {
    if (!searchForm.contains(e.target) && !searchIcon.contains(e.target) && !buttonSearch.contains(e.target)) {
      searchForm.classList.remove("show"); // Sembunyikan form
      searchIcon.classList.remove("hide"); // Tampilkan ikon
      sitelink.style.visibility = "visible";
      iconnav.style.visibility = "visible";
      buttonSearch.style.display = "block";
    }
  });

  // SCRIPT 2: Live Search
  const resultContainer = document.getElementById("searchResults");
  const jsonUrl = "https://raw.githubusercontent.com/hisyam-coder/dataprodukbharata/refs/heads/bharata/data-bharata-keyword.json";

  let data = [];

  // Ambil data dari JSON
  fetch(jsonUrl)
    .then(response => response.json())
    .then(jsonData => {
      data = jsonData;
    })
    .catch(error => {
      console.error("Gagal mengambil data JSON:", error);
    });

  // Fungsi untuk membuat tautan produk
  const createProductLink = (productName) => {
    const cleanedName = productName.split('Bharata')[0].replace(/\s+/g, "").replace(/[^a-zA-Z0-9]/g, "");
    return `https://www.bharatainternasional.store/p/produk.html?bh=bharata.${cleanedName}`;
  };

  // Fungsi live search
  const searchProducts = (query) => {
    resultContainer.innerHTML = ""; // Bersihkan hasil sebelumnya
    if (!query.trim() || query.trim().length < 3) { // Minimal 3 karakter
      resultContainer.style.display = "none";
      return;
    }

    const lowerCaseQuery = query.toLowerCase();
    const matches = new Set(); // Hindari duplikat
    const relevantKeywords = {}; // Kata kunci yang relevan

    // Cari kecocokan
    data.forEach(product => {
      if (product.nama.toLowerCase().includes(lowerCaseQuery)) {
        matches.add(product.nama);
        relevantKeywords[product.nama] = new Set(product.kata_kunci.filter(keyword => keyword.toLowerCase().includes(lowerCaseQuery)));
      } else {
        product.kata_kunci.forEach(keyword => {
          if (keyword.toLowerCase().includes(lowerCaseQuery)) {
            matches.add(product.nama);
            if (!relevantKeywords[product.nama]) relevantKeywords[product.nama] = new Set();
            relevantKeywords[product.nama].add(keyword);
          }
        });
      }
    });

    // Tampilkan hasil
    if (matches.size > 0) {
      resultContainer.style.display = "block";
      Array.from(matches).slice(0, 5).forEach(match => {
        const item = document.createElement("div");
        const productLink = createProductLink(match);
        item.innerHTML = `
          <div><a style="text-decoration:none; color: darkgreen; font-weight:bold;" href="${productLink}" target="_blank">${match}</a></div>
          <div style="font-size: 0.9rem; color: #505050; margin-top:-12px;">${Array.from(relevantKeywords[match]).join(", ")}</div>
        `;
        item.addEventListener("click", () => {
          window.location.href = productLink;
        });
        resultContainer.appendChild(item);
      });
    } else {
      const noResult = document.createElement("div");
      noResult.textContent = "Tidak ada hasil ditemukan.";
      resultContainer.appendChild(noResult);
      resultContainer.style.display = "block";
    }
  };

  // Event listener untuk pencarian
  searchInput.addEventListener("input", (e) => {
    searchProducts(e.target.value);
  });

  // Sembunyikan hasil jika klik di luar
  document.addEventListener("click", (e) => {
    if (!searchInput.contains(e.target) && !resultContainer.contains(e.target)) {
      resultContainer.style.display = "none";
    }
  });
});
