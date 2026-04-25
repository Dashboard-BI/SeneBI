(function () {
  function fmtKg(n) {
    return `${Number(n || 0).toLocaleString("fr-FR")} kg`;
  }
  function pct(value, cap) {
    return cap > 0 ? Math.round((value / cap) * 100) : 0;
  }

  function renderStockGauge(state) {
    const canvas = SeneBI.qs("#stockGaugeChart");
    const pctEl = SeneBI.qs("#stockGaugePct");
    if (!canvas || !window.Chart) return;
    const s = SeneBI.getSeasonData(state);
    const cap = state.capacity;
    const inv = s.inventory;
    const totalInv = Number(inv.ureeKg || 0) + Number(inv.npkKg || 0) + Number(inv.semencesKg || 0);
    const totalCap = Number(cap.ureeKg || 0) + Number(cap.npkKg || 0) + Number(cap.semencesKg || 0);
    const pct = totalCap > 0 ? Math.min(100, Math.round((totalInv / totalCap) * 100)) : 0;
    if (pctEl) pctEl.textContent = `${pct}%`;
    const rest = Math.max(0, 100 - pct);
    const existing = Chart.getChart(canvas);
    if (existing) existing.destroy();
    new Chart(canvas, {
      type: "doughnut",
      data: {
        datasets: [
          {
            data: [pct, rest],
            backgroundColor: ["#059669", "#e2e8f0"],
            borderWidth: 0,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        circumference: 180,
        rotation: 270,
        cutout: "72%",
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: "rgba(15, 23, 42, 0.92)",
            padding: 10,
            cornerRadius: 10,
            callbacks: {
              label(ctx) {
                if (ctx.dataIndex === 0) return `Remplissage : ${pct}% de la capacite totale`;
                return `Libre : ${rest}%`;
              },
            },
          },
        },
      },
    });
  }

  function renderTopConsumers(state) {
    const tbody = SeneBI.qs("#topConsumersBody");
    const fb = SeneBI.qs("#topConsumersFallback");
    if (!tbody) return;
    const s = SeneBI.getSeasonData(state);
    const now = new Date();
    const y = now.getFullYear();
    const m = now.getMonth();
    let rows = s.consumptionHistory.filter((h) => {
      const d = new Date(h.date);
      return !Number.isNaN(d.getTime()) && d.getFullYear() === y && d.getMonth() === m;
    });
    let fallback = false;
    if (!rows.length) {
      rows = [...s.consumptionHistory];
      fallback = true;
    }
    if (fb) fb.hidden = !fallback;
    const byParcel = new Map();
    for (const h of rows) {
      byParcel.set(h.parcelId, (byParcel.get(h.parcelId) || 0) + Number(h.quantityKg || 0));
    }
    const top3 = [...byParcel.entries()].sort((a, b) => b[1] - a[1]).slice(0, 3);
    if (!top3.length) {
      tbody.innerHTML =
        '<tr><td colspan="3" style="text-align:center;padding:12px;color:#64748b;font-weight:700;">Aucune consommation enregistree.</td></tr>';
      return;
    }
    tbody.innerHTML = top3
      .map((entry, i) => {
        const p = s.parcels.find((x) => x.id === entry[0]);
        const name = p ? p.name : entry[0];
        return `<tr><td>${i + 1}</td><td><strong>${name}</strong></td><td>${Number(entry[1]).toLocaleString("fr-FR")} kg</td></tr>`;
      })
      .join("");
  }

  function isStockCritical(state) {
    const s = SeneBI.getSeasonData(state);
    const cap = state.capacity;
    const ratios = [
      { label: "Urée", value: s.inventory.ureeKg, cap: cap.ureeKg },
      { label: "NPK", value: s.inventory.npkKg, cap: cap.npkKg },
      { label: "Semences", value: s.inventory.semencesKg, cap: cap.semencesKg },
    ];
    const critical = ratios.filter((r) => (r.cap ? r.value / r.cap : 0) <= 0.1).map((r) => ({ ...r, pct: r.cap ? r.value / r.cap : 0 }));
    return { any: critical.length > 0, critical };
  }

  function render(state, readOnly = false) {
    const s = SeneBI.getSeasonData(state);
    const cap = state.capacity;
    const stock = isStockCritical(state);
    const seedTotal = Number(s.inventory.semencesKg || 0);
    const semenceRiz = Math.round(seedTotal * 0.5);
    const semenceMais = Math.round(seedTotal * 0.35);
    const semenceCoton = Math.max(0, seedTotal - semenceRiz - semenceMais);

    const stockRows = [
      { name: "Urée", type: "Engrais", value: Number(s.inventory.ureeKg || 0), threshold: Math.round(cap.ureeKg * 0.1), cost: 15000 },
      { name: "NPK", type: "Engrais", value: Number(s.inventory.npkKg || 0), threshold: Math.round(cap.npkKg * 0.1), cost: 18000 },
      { name: "Semence Riz", type: "Semence", value: semenceRiz, threshold: 50, cost: 800 },
      { name: "Semence Maïs", type: "Semence", value: semenceMais, threshold: 40, cost: 900 },
      { name: "Semence Coton", type: "Semence", value: semenceCoton, threshold: 30, cost: 1200 },
    ];

    const wrap = SeneBI.qs("#inventoryCards");
    if (wrap) {
      const totalIntrants = stockRows.length;
      const criticalCount = stockRows.filter((r) => r.value <= r.threshold).length;
      wrap.innerHTML = `
        <article class="card kpi-card">
          <p class="kpi-title">Total Intrants</p>
          <div class="kpi-value">${totalIntrants}</div>
          <div class="kpi-sub">Types d'intrants geres</div>
        </article>
        <article class="card kpi-card">
          <p class="kpi-title">Alertes Critiques</p>
          <div class="kpi-value" style="color:${criticalCount > 0 ? "#e11d48" : "#08a046"};">${criticalCount}</div>
          <div class="kpi-sub">${criticalCount > 0 ? "Stock sous le seuil" : "Aucun seuil critique"}</div>
        </article>
      `;
    }

    const alert = SeneBI.qs("#stocksLocalAlert");
    if (alert) {
      if (stock.any) {
        alert.classList.add("show");
        const list = stock.critical.map((c) => c.label).join(", ");
        SeneBI.qs("#stocksLocalAlertText").textContent = `${stock.critical.length} intrant(s) en dessous du seuil critique. Reapprovisionnement urgent necessaire.`;
        const first = stock.critical[0];
        const threshold = Math.round((first.cap || 0) * 0.1);
        const criticalChip = SeneBI.qs("#criticalChip");
        if (criticalChip) criticalChip.textContent = `${first.label} - Stock: ${first.value} / Seuil: ${threshold}`;
      } else {
        alert.classList.remove("show");
      }
    }

    const stockTableBody = SeneBI.qs("#stockTableBody");
    if (stockTableBody) {
      stockTableBody.innerHTML = stockRows
        .map((row) => {
          const level = pct(row.value, row.threshold);
          const ok = row.value > row.threshold;
          return `
            <tr>
              <td><strong>${row.name}</strong></td>
              <td><span class="stock-type">${row.type}</span></td>
              <td>${row.value} ${row.type === "Engrais" ? "sac" : "kg"}</td>
              <td>${row.threshold} ${row.type === "Engrais" ? "sac" : "kg"}</td>
              <td>${row.cost.toLocaleString("fr-FR")} FCFA</td>
              <td class="${ok ? "status-ok" : "status-bad"}">${ok ? `OK (${level}%)` : `Critique (${level}%)`}</td>
            </tr>
          `;
        })
        .join("");
    }

    const historyList = SeneBI.qs("#consumptionList");
    if (historyList) {
      const byParcel = new Map();
      for (const h of s.consumptionHistory) byParcel.set(h.parcelId, (byParcel.get(h.parcelId) || 0) + Number(h.quantityKg || 0));
      const top = [...byParcel.entries()].sort((a, b) => b[1] - a[1])[0];
      const topEl = SeneBI.qs("#topConsumer");
      if (topEl) {
        const p = s.parcels.find((x) => x.id === (top ? top[0] : "")) || null;
        topEl.textContent = top && p ? `${p.name} (${top[1]} kg)` : "—";
      }
      historyList.innerHTML = [...s.consumptionHistory]
        .sort((a, b) => (a.date < b.date ? 1 : -1))
        .map((h) => {
          const p = s.parcels.find((x) => x.id === h.parcelId);
          const dateFr = h.date.split("-").reverse().join("/");
          return `
            <article class="history-item">
              <div class="left">
                <strong>${p ? p.name : h.parcelId}</strong>
                <span>${h.item}</span>
              </div>
              <div class="right">
                <strong>${Number(h.quantityKg).toLocaleString("fr-FR")} unites</strong>
                <span>${dateFr}</span>
              </div>
            </article>
          `;
        })
        .join("");
    }

    renderStockGauge(state);
    renderTopConsumers(state);

    if (window.Chart) {
      const chartCanvas = SeneBI.qs("#stocksChart");
      if (chartCanvas) {
        const current = Chart.getChart(chartCanvas);
        if (current) current.destroy();
        new Chart(chartCanvas, {
          type: "bar",
          data: {
            labels: stockRows.map((r) => r.name),
            datasets: [{
              data: stockRows.map((r) => r.value),
              backgroundColor: stockRows.map((r) => (r.value <= r.threshold ? "#ef4444" : "#10b981")),
              borderRadius: 10,
            }],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: { mode: "index", intersect: false },
            plugins: {
              legend: { display: false },
              tooltip: {
                backgroundColor: "rgba(15, 23, 42, 0.92)",
                padding: 10,
                cornerRadius: 10,
                callbacks: {
                  title(items) {
                    return items[0]?.label ? `Intrant : ${items[0].label}` : "";
                  },
                  label(ctx) {
                    const r = stockRows[ctx.dataIndex];
                    const unit = r.type === "Engrais" ? "sac(s)" : "kg";
                    const st = r.value <= r.threshold ? "sous seuil critique" : "OK";
                    return [`Stock : ${r.value} ${unit}`, `Seuil : ${r.threshold} ${unit}`, `Statut : ${st}`];
                  },
                },
              },
            },
            scales: {
              y: { beginAtZero: true, grid: { color: "rgba(15,23,42,0.06)" } },
              x: { grid: { display: false } },
            },
          },
        });
      }
    }

    const form = SeneBI.qs("#consumeForm");
    const feedbackEl = SeneBI.qs("#consumeFeedback");
    if (readOnly) return;

    if (form && !form.dataset.bound) {
      form.dataset.bound = "1";
      const parcelSel = SeneBI.qs("#consumeParcel");
      if (parcelSel) parcelSel.innerHTML = s.parcels.map((p) => `<option value="${p.id}">${p.name}</option>`).join("");

      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const parcelId = SeneBI.qs("#consumeParcel").value;
        const item = SeneBI.qs("#consumeItem").value;
        const qty = Number(SeneBI.qs("#consumeQty").value);
        const date = SeneBI.qs("#consumeDate").value;
        if (!parcelId || !item || !date || !Number.isFinite(qty) || qty <= 0) {
          if (feedbackEl) {
            feedbackEl.textContent = "Merci de remplir tous les champs avec des valeurs valides.";
            feedbackEl.className = "form-feedback error";
          }
          return;
        }

        const invKey = item === "Urée" ? "ureeKg" : item === "NPK" ? "npkKg" : "semencesKg";
        const currentStock = Number(s.inventory[invKey] || 0);
        if (qty > currentStock) {
          if (feedbackEl) {
            feedbackEl.textContent = `Quantite trop elevee. Stock disponible: ${currentStock.toLocaleString("fr-FR")} kg.`;
            feedbackEl.className = "form-feedback error";
          }
          return;
        }
        s.consumptionHistory.push({ id: `C-${Date.now()}`, parcelId, item, quantityKg: qty, date });
        s.inventory[invKey] = Math.max(0, Number(s.inventory[invKey] || 0) - qty);
        SeneBI.saveState(state);
        render(state, readOnly);
        form.reset();
        if (feedbackEl) {
          feedbackEl.textContent = "Consommation enregistree avec succes.";
          feedbackEl.className = "form-feedback success";
        }
        const d = SeneBI.qs("#consumeDate");
        if (d) d.valueAsDate = new Date();
      });
      const d = SeneBI.qs("#consumeDate");
      if (d && !d.value) d.valueAsDate = new Date();
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    const auth = SeneBI.requireRole(
      ["manager", "client"],
      "Acces refuse."
    );
    if (!auth) return;
    const readOnly = auth.role === "client";
    const consumeSection = SeneBI.qs("#stocksConsumeSection");
    if (consumeSection) consumeSection.hidden = readOnly;

    const state = SeneBI.loadState();
    SeneBI.renderTopbar(state);
    render(state, readOnly);
    window.addEventListener("senebi:seasonChanged", () => {
      SeneBI.renderTopbar(state);
      render(state, readOnly);
    });
  });
})();

