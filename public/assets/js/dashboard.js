(function () {
  let selectedPriceCulture = "Riz";

  function getCerealPriceSeries(s) {
    const base = s.pricesCereals.map((p) => p.price);
    return {
      Riz: base,
      "Maïs": base.map((p) => Math.round(p * 0.93)),
      Coton: base.map((p) => Math.round(p * 1.08)),
    };
  }

  function computeInsightLine(state, k) {
    const s = SeneBI.getSeasonData(state);
    let bestName = "";
    let maxKg = 0;
    for (const h of s.harvests) {
      const q = Number(h.quantityKg || 0);
      if (q > maxKg) {
        maxKg = q;
        const p = s.parcels.find((x) => x.id === h.parcelId);
        bestName = p ? p.name : String(h.parcelId);
      }
    }
    if (bestName && k.rendementMoyenTparHa > 0) {
      return `Le rendement est en hausse : la saison met en avant ${bestName} (${SeneBI.fmtInt(maxKg)} kg récoltés), ce qui soutient la moyenne à ${k.rendementMoyenTparHa.toLocaleString("fr-FR", { maximumFractionDigits: 1 })} t/ha.`;
    }
    return "Les indicateurs sont cohérents : surveillez l'évolution des prix par culture (menu ci-dessus) et la répartition des surfaces.";
  }

  function bindCerealPriceSelect(state) {
    const sel = SeneBI.qs("#cerealPriceSelect");
    if (!sel || sel.dataset.bound) return;
    sel.dataset.bound = "1";
    if ([...sel.options].some((o) => o.value === selectedPriceCulture)) sel.value = selectedPriceCulture;
    sel.addEventListener("change", () => {
      selectedPriceCulture = sel.value;
      render(state);
    });
  }

  function computeKpis(state) {
    const s = SeneBI.getSeasonData(state);
    const totalHarvestKg = s.harvests.reduce((sum, h) => sum + Number(h.quantityKg || 0), 0);
    const hectaresActifs = s.parcels.filter((p) => p.status !== "En jachère").reduce((sum, p) => sum + Number(p.areaHa || 0), 0);

    const rendementMoyenTparHa = (() => {
      const harvestedByParcel = new Map();
      for (const h of s.harvests) harvestedByParcel.set(h.parcelId, (harvestedByParcel.get(h.parcelId) || 0) + Number(h.quantityKg || 0));
      const yields = [];
      for (const p of s.parcels) {
        const q = harvestedByParcel.get(p.id);
        if (!q) continue;
        yields.push((q / 1000) / Number(p.areaHa || 1));
      }
      if (!yields.length) return 0;
      return yields.reduce((a, b) => a + b, 0) / yields.length;
    })();

    const chiffreAffairesEstimeFcfa = Number(s.business?.salesFcfa || 0);
    return { totalHarvestKg, hectaresActifs, rendementMoyenTparHa, chiffreAffairesEstimeFcfa };
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

  function render(state) {
    const k = computeKpis(state);
    const s = SeneBI.getSeasonData(state);
    const stock = isStockCritical(state);

    const totalHarvestEl = SeneBI.qs("#kpiTotalHarvest");
    const caEl = SeneBI.qs("#kpiCA");
    const haEl = SeneBI.qs("#kpiHa");
    const rendEl = SeneBI.qs("#kpiRend");

    if (totalHarvestEl) totalHarvestEl.textContent = SeneBI.fmtInt(k.totalHarvestKg);
    if (caEl) caEl.textContent = (k.chiffreAffairesEstimeFcfa / 1_000_000).toLocaleString("fr-FR", { maximumFractionDigits: 1 });
    if (haEl) haEl.textContent = k.hectaresActifs.toLocaleString("fr-FR", { maximumFractionDigits: 1 });
    if (rendEl) rendEl.textContent = k.rendementMoyenTparHa.toLocaleString("fr-FR", { maximumFractionDigits: 1 });

    const insightEl = SeneBI.qs("#dashboardInsight");
    if (insightEl) insightEl.textContent = computeInsightLine(state, k);

    const alert = SeneBI.qs("#stockAlert");
    if (alert) {
      if (stock.any) {
        alert.classList.add("show");
        const items = stock.critical.map((c) => `${c.label} ${(c.pct * 100).toFixed(0)}%`).join(" • ");
        SeneBI.qs("#stockAlertText").textContent = `Alerte Stock: ${items}`;
      } else {
        alert.classList.remove("show");
      }
    }

    bindCerealPriceSelect(state);

    if (window.Chart && SeneBI.qs("#priceChart")) {
      const seriesMap = getCerealPriceSeries(s);
      const cultureKey = seriesMap[selectedPriceCulture] ? selectedPriceCulture : "Riz";
      const prices = seriesMap[cultureKey];
      const ctx = SeneBI.qs("#priceChart").getContext("2d");
      const existing = Chart.getChart(ctx.canvas);
      if (existing) existing.destroy();
      const sel = SeneBI.qs("#cerealPriceSelect");
      if (sel && [...sel.options].some((o) => o.value === cultureKey)) sel.value = cultureKey;

      new Chart(ctx, {
        type: "line",
        data: {
          labels: s.pricesCereals.map((p) => p.month),
          datasets: [
            {
              label: `Prix ${cultureKey} (FCFA/kg)`,
              data: prices,
              borderColor: "#7c3aed",
              backgroundColor: "rgba(124,58,237,0.14)",
              fill: true,
              tension: 0.35,
              pointRadius: 4,
              pointHoverRadius: 6,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          interaction: { mode: "index", intersect: false },
          plugins: {
            legend: { display: true, position: "bottom", labels: { boxWidth: 12, font: { size: 11, weight: "600" } } },
            tooltip: {
              backgroundColor: "rgba(15, 23, 42, 0.92)",
              titleFont: { weight: "600", size: 12 },
              bodyFont: { size: 13 },
              padding: 10,
              cornerRadius: 10,
              callbacks: {
                title(items) {
                  const i = items[0]?.dataIndex;
                  const mo = i != null ? s.pricesCereals[i]?.month : "";
                  return mo ? `${mo} ${state.season}` : "";
                },
                label(ctx) {
                  const v = ctx.parsed.y;
                  return `${cultureKey} : ${v} FCFA/kg`;
                },
              },
            },
          },
          scales: {
            y: { grid: { color: "rgba(15,23,42,0.06)" }, ticks: { callback: (v) => `${v}` } },
            x: { grid: { display: false } },
          },
        },
      });
    }

    if (window.Chart && SeneBI.qs("#cultureChart")) {
      const ctx = SeneBI.qs("#cultureChart").getContext("2d");
      const existing = Chart.getChart(ctx.canvas);
      if (existing) existing.destroy();
      new Chart(ctx, {
        type: "doughnut",
        data: { labels: s.cultures.map((c) => c.name), datasets: [{ data: s.cultures.map((c) => c.percent), backgroundColor: ["#16a34a", "#7c3aed", "#0ea5e9"], borderWidth: 0 }] },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          cutout: "68%",
          plugins: {
            legend: { position: "bottom", labels: { boxWidth: 10 } },
            tooltip: {
              backgroundColor: "rgba(15, 23, 42, 0.92)",
              padding: 10,
              cornerRadius: 10,
              callbacks: {
                label(ctx) {
                  const pct = typeof ctx.parsed === "number" ? ctx.parsed : ctx.raw;
                  return `${ctx.label} : ${pct}% des surfaces`;
                },
              },
            },
          },
        },
      });
      const dominant = [...s.cultures].sort((a, b) => b.percent - a.percent)[0];
      const dominantEl = SeneBI.qs("#dominantCulture");
      if (dominantEl && dominant) dominantEl.textContent = `${dominant.name} ${dominant.percent}%`;
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    const auth = SeneBI.requireRole(["manager", "client"], "Acces refuse.");
    if (!auth) return;
    const state = SeneBI.loadState();
    SeneBI.renderTopbar(state);
    render(state);
    window.addEventListener("senebi:seasonChanged", () => {
      SeneBI.renderTopbar(state);
      render(state);
    });
  });
})();

