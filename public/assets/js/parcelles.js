(function () {
  function fmtHectaresWord(n) {
    const v = Number(n || 0);
    const num = v.toLocaleString("fr-FR", { maximumFractionDigits: 1 });
    return `${num} hectares`;
  }
  function fmtKg(n) {
    return `${Number(n || 0).toLocaleString("fr-FR")} kg`;
  }
  function fmtKgPerHa(n) {
    const v = Math.round(Number(n || 0));
    return `${v.toLocaleString("fr-FR")} kg/ha`;
  }

  function renderParcels() {
    const list = SeneBI.qs("#parcelsList");
    if (!list) return;

    const uiParcels = [
      { id: "PN", name: "Parcelle Nord", culture: "Riz", areaHa: 5.5, status: "En culture" },
      { id: "PS", name: "Parcelle Sud", culture: "Maïs", areaHa: 3.2, status: "Récoltée" },
      { id: "PE", name: "Parcelle Est", culture: "Coton", areaHa: 4.0, status: "En culture" },
      { id: "PO", name: "Parcelle Ouest", culture: "Riz", areaHa: 2.8, status: "En jachère" },
      { id: "PC", name: "Parcelle Centre", culture: "Maïs", areaHa: 6.0, status: "En culture" },
    ];

    const activityJournal = {
      PN: [
        { label: "Dernier arrosage", value: "Hier (16 h)" },
        { label: "Engrais applique", value: "10/04/2026 (NPK)" },
      ],
      PS: [
        { label: "Dernier arrosage", value: "Il y a 3 jours" },
        { label: "Engrais applique", value: "22/03/2026" },
      ],
      PE: [
        { label: "Dernier arrosage", value: "Aujourd'hui (matin)" },
        { label: "Engrais applique", value: "05/04/2026" },
      ],
      PO: [
        { label: "Dernier arrosage", value: "— (jachere)" },
        { label: "Derniere intervention", value: "01/02/2026" },
      ],
      PC: [
        { label: "Dernier arrosage", value: "Hier" },
        { label: "Engrais applique", value: "28/03/2026" },
      ],
    };

    const demoHarvests = [
      { parcelId: "PN", date: "2025-11-15", quantityKg: 22000 },
      { parcelId: "PS", date: "2026-02-20", quantityKg: 0 },
      { parcelId: "PC", date: "2025-12-10", quantityKg: 18000 },
    ];

    const lastHarvestByParcel = new Map();
    for (const h of demoHarvests) {
      const prev = lastHarvestByParcel.get(h.parcelId);
      if (!prev || prev.date < h.date) lastHarvestByParcel.set(h.parcelId, h);
    }

    const badgeClass = (st) => (st === "En culture" ? "green" : st === "Récoltée" ? "blue" : "yellow");

    list.innerHTML = uiParcels
      .map((p) => {
        const h = lastHarvestByParcel.get(p.id);
        const hasHarvest = h && Number(h.quantityKg || 0) > 0;
        const yieldKgHa = hasHarvest ? Number(h.quantityKg) / Number(p.areaHa || 1) : null;
        const dateFr = h?.date ? new Date(h.date).toLocaleDateString("fr-FR") : null;
        const journal = activityJournal[p.id] || [];
        const journalHtml = journal
          .map(
            (j) => `
            <li class="parcel-journal-item">
              <span class="parcel-journal-k">${j.label}</span>
              <span class="parcel-journal-v">${j.value}</span>
            </li>`
          )
          .join("");
        return `
          <article class="parcel-card">
            <div class="parcel-head">
              <div class="parcel-name">${p.name}</div>
              <span class="badge ${badgeClass(p.status)}">${p.status}</span>
            </div>

            <div class="parcel-body">
            <div class="parcel-grid">
              <div class="kv"><div class="k">Culture</div><div class="v">${p.culture}</div></div>
              <div class="kv"><div class="k">Surface</div><div class="v">${fmtHectaresWord(p.areaHa)}</div></div>
              <div class="kv"><div class="k">Dernière récolte</div><div class="v">${dateFr || "—"}</div></div>

              <div class="kv"><div class="k">Quantité</div><div class="v">${hasHarvest ? fmtKg(h.quantityKg) : "—"}</div></div>
              <div class="kv">
                <div class="k">Rendement</div>
                <div class="v yield">
                  <span>${hasHarvest ? fmtKgPerHa(yieldKgHa) : "—"}</span>
                  ${hasHarvest ? `<span class="yield-check" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>` : ""}
                </div>
              </div>
              <div></div>
            </div>
            <aside class="parcel-journal" aria-label="Journal d'activites">
              <div class="parcel-journal-title">Journal d'activites</div>
              <ul class="parcel-journal-list">
                ${journalHtml}
              </ul>
            </aside>
            </div>
          </article>
        `;
      })
      .join("");

    const parcelSelect = SeneBI.qs("#harvestParcel");
    if (parcelSelect) {
      parcelSelect.innerHTML = `<option value="">Sélectionner une parcelle</option>` + uiParcels.map((p) => `<option value="${p.id}">${p.name}</option>`).join("");
    }
  }

  function bindForm() {
    const openBtn = SeneBI.qs("#openHarvestBtn");
    const panel = SeneBI.qs("#harvestPanel");
    const cancelBtn = SeneBI.qs("#cancelHarvestBtn");
    if (panel) {
      panel.classList.remove("show");
      panel.setAttribute("aria-hidden", "true");
    }
    if (openBtn && panel && !openBtn.dataset.bound) {
      openBtn.dataset.bound = "1";
      openBtn.addEventListener("click", () => {
        const willShow = !panel.classList.contains("show");
        panel.classList.toggle("show", willShow);
        panel.setAttribute("aria-hidden", willShow ? "false" : "true");
        if (willShow) panel.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
    if (cancelBtn && panel && !cancelBtn.dataset.bound) {
      cancelBtn.dataset.bound = "1";
      cancelBtn.addEventListener("click", () => {
        panel.classList.remove("show");
        panel.setAttribute("aria-hidden", "true");
      });
    }
    const form = SeneBI.qs("#harvestForm");
    if (form && !form.dataset.bound) {
      form.dataset.bound = "1";
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const parcelId = SeneBI.qs("#harvestParcel").value;
        const date = SeneBI.qs("#harvestDate").value;
        const quantityKg = Number(SeneBI.qs("#harvestQty").value);
        if (!parcelId || !date || !Number.isFinite(quantityKg) || quantityKg <= 0) return;
        form.reset();
        const d = SeneBI.qs("#harvestDate");
        if (d) d.valueAsDate = new Date();
        if (panel) {
          panel.classList.remove("show");
          panel.setAttribute("aria-hidden", "true");
        }
      });
      const d = SeneBI.qs("#harvestDate");
      if (d && !d.value) d.valueAsDate = new Date();
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    const auth = SeneBI.requireRole(["manager", "client"], "Acces refuse.");
    if (!auth) return;
    const readOnly = auth.role === "client";
    const openBtn = SeneBI.qs("#openHarvestBtn");
    if (openBtn) openBtn.hidden = readOnly;
    const panel = SeneBI.qs("#harvestPanel");
    if (panel && readOnly) {
      panel.classList.remove("show");
      panel.hidden = true;
      panel.setAttribute("aria-hidden", "true");
    }

    const state = SeneBI.loadState();
    SeneBI.renderTopbar(state);
    renderParcels();
    if (!readOnly) bindForm();
    window.addEventListener("senebi:seasonChanged", () => SeneBI.renderTopbar(state));
  });
})();

