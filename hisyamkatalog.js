  document.addEventListener("DOMContentLoaded", (function() {
	const e = document.getElementById("daftar-produk-container");
	fetch("https://raw.githubusercontent.com/hisyam-coder/dataprodukbharata/refs/heads/bharata/data-bharata.json").then((e => e.json())).then((a => {
		Object.keys(a).map((e => a[e])).sort(((e, a) => {
			const t = e.namaobat.toLowerCase(),
				o = a.namaobat.toLowerCase();
			return t.localeCompare(o)
		})).forEach((a => {
			const t = document.createElement("div");
			t.className = "col-6 p-2", t.style.cursor = "pointer", t.style.position = "relative", t.id = "produkwadah";
			const o = a.namaobat.replace(/Bharata/i, "").trim();
			t.addEventListener("click", (() => {
				const e = `https://www.bharatainternasional.store/p/produk.html?bh=bharata.${o.replace(/\s+/g,"")}`;
				window.location.href = e
			}));
			const n = document.createElement("div");
			n.style.position = "absolute", n.id = "labeldiv", n.style.top = "0";
			n.innerHTML = '<span style="color:white;background-color:#c79004;padding:2px 8px;border-radius:50px 0px 50px 0px;font-size:9px;font-style:italic;">Original</span>';
			const r = document.createElement("div");
			r.style.position = "absolute", r.style.right = "5%", r.style.top = "0%";
			let d = "";
			["Etheral"].some((e => a.namaobat.includes(e))) ? d = '<span style="color:white;background-color:blue;padding:2px 20px;border-radius:2px;font-size:9px;font-weight:bold;">TERLARIS</span>' : ["Galrida", "Dekapro", "Verdilla", "Chanamax", "Hexfida", "Libaver", "Vellare", "Retlifa"].some((e => a.namaobat.includes(e))) ? d = '<span style="color:blue;background-color:gold;padding:2px 10px;border-radius:2px;font-size:9px;font-weight:bold;">BEST SELLER</span>' : ["Cloventa"].some((e => a.namaobat.includes(e))) ? d = '<span style="color:white;background-color:green;padding:2px 10px;border-radius:2px;font-size:9px;font-weight:bold;">TERMURAH</span>' : ["Drivago"].some((e => a.namaobat.includes(e))) && (d = '<span style="color:white;background-color:darkred;padding:2px 20px;border-radius:2px;font-size:9px;font-weight:bold;">PREMIUM</span>'), r.innerHTML = d;
			const i = document.createElement("img");
			i.src = a.fotoobat, i.alt = a.namaobat;
			const s = document.createElement("div");
			s.id = "produkserupa", s.textContent = a.namaobat;
			const p = document.createElement("div");
			p.id = "produkkeyword";
			const l = a.khasiatobat.map((e => e.toLowerCase().startsWith("mengobati") ? e.replace(/^Mengobati/i, "Obat") : e)).slice(0, 5).join(", ");
			p.textContent = l;
			const c = document.createElement("div");
			c.id = "hargaserupa", c.innerHTML = `<div style="display:flex;justify-content:space-between;align-items:center">${a.hargaobat} <span style="width:25px;color: white;background-color: darkgreen;padding: 2.4px 5px 1.5px 5px; border-radius: 2px; font-size:7px;margin-right:5px;">COD</span></div>`;
			const h = document.createElement("div");
			h.id = "hargaupserupa", h.innerHTML = `<s>${a.hargaobatup}</s>`, t.appendChild(n), t.appendChild(r), t.appendChild(i), t.appendChild(s), t.appendChild(p), t.appendChild(h), t.appendChild(c), e.appendChild(t)
      window.onload = function() {if (typeof checkFunction !== "function") {document.body.innerHTML = ""}};
		}))
	})).catch((e => console.error("Gagal memuat JSON:", e)))
}));
