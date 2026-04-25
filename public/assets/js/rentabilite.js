(function () {
  const harvests = [
    { date: "15/11/2025", parcel: "Parcelle Nord (Riz)", qtyKg: 22000, unitPrice: 250 },
    { date: "20/02/2026", parcel: "Parcelle Sud (Mais)", qtyKg: 9600, unitPrice: 180 },
    { date: "10/12/2025", parcel: "Parcelle Centre (Mais)", qtyKg: 18000, unitPrice: 180 },
    { date: "20/06/2025", parcel: "Parcelle Nord (Riz)", qtyKg: 20000, unitPrice: 245 },
    { date: "15/08/2025", parcel: "Parcelle Sud (Mais)", qtyKg: 8800, unitPrice: 175 },
  ];

  function million(value) {
    return Number(value || 0) / 1000000;
  }

  function fmtM(value) {
    return million(value).toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  function fmtMoney(value) {
    return `${Number(value || 0).toLocaleString("fr-FR")} FCFA`;
  }

  function bindCalculator(state, onApply) {
    const openBtn = SeneBI.qs("#openCalculatorBtn");
    const closeBtn = SeneBI.qs("#closeCalculatorBtn");
    const applyBtn = SeneBI.qs("#applyCalculatorBtn");
    const panel = SeneBI.qs("#calculatorPanel");
    const form = SeneBI.qs("#calculatorForm");
    const areaEl = SeneBI.qs("#calcArea");
    const qtyEl = SeneBI.qs("#calcQty");
    const priceEl = SeneBI.qs("#calcPrice");
    const intrantsEl = SeneBI.qs("#calcIntrants");
    const otherEl = SeneBI.qs("#calcOther");

    const yieldOut = SeneBI.qs("#calcYield");
    const revenueOut = SeneBI.qs("#calcRevenue");
    const profitOut = SeneBI.qs("#calcProfit");
    const marginOut = SeneBI.qs("#calcMargin");
    const verdictOut = SeneBI.qs("#calcVerdict");
    const feedbackEl = SeneBI.qs("#calculatorFeedback");

    const sanityChecks = [
      { el: areaEl, max: 200, label: "surface" },
      { el: qtyEl, max: 1000000, label: "quantite recoltee" },
      { el: priceEl, max: 100000, label: "prix unitaire" },
      { el: intrantsEl, max: 1000000000, label: "couts intrants" },
      { el: otherEl, max: 1000000000, label: "autres couts" },
    ];

    const recalc = () => {
      const area = Number(areaEl?.value || 0);
      const qty = Number(qtyEl?.value || 0);
      const price = Number(priceEl?.value || 0);
      const intrants = Number(intrantsEl?.value || 0);
      const other = Number(otherEl?.value || 0);

      const valid = area > 0 && qty > 0 && price > 0;
      const yieldKgHa = area > 0 ? qty / area : 0;
      const revenue = qty * price;
      const totalCosts = intrants + other;
      const profit = revenue - totalCosts;
      const margin = revenue > 0 ? (profit / revenue) * 100 : 0;
      let sanityError = "";

      sanityChecks.forEach((f) => {
        if (!f.el) return;
        f.el.classList.remove("input-error");
        const val = Number(f.el.value || 0);
        if (val > f.max) {
          f.el.classList.add("input-error");
          sanityError = `Valeur trop elevee pour ${f.label}. Merci de verifier.`;
        }
      });

      if (yieldOut) yieldOut.textContent = `${Math.round(yieldKgHa).toLocaleString("fr-FR")} kg/ha`;
      if (revenueOut) revenueOut.textContent = fmtMoney(revenue);
      if (profitOut) profitOut.textContent = fmtMoney(profit);
      if (marginOut) marginOut.textContent = `${margin.toLocaleString("fr-FR", { minimumFractionDigits: 1, maximumFractionDigits: 1 })}%`;

      if (verdictOut) {
        let text = "A completer";
        let color = "#475569";
        let bg = "#e2e8f0";
        if (revenue > 0) {
          if (margin >= 25) {
            text = "Rentable";
            color = "#166534";
            bg = "#dcfce7";
          } else if (margin >= 10) {
            text = "A surveiller";
            color = "#92400e";
            bg = "#fef3c7";
          } else {
            text = "Non rentable";
            color = "#991b1b";
            bg = "#fee2e2";
          }
        }
        verdictOut.textContent = text;
        verdictOut.style.color = color;
        verdictOut.style.background = bg;
      }

      if (feedbackEl) {
        if (sanityError) {
          feedbackEl.textContent = sanityError;
          feedbackEl.className = "form-feedback error";
        } else if (feedbackEl.classList.contains("error")) {
          feedbackEl.textContent = "";
          feedbackEl.className = "form-feedback";
        }
      }

      return { valid: valid && !sanityError, revenue, totalCosts, profit, margin, sanityError };
    };

    if (panel && !panel.dataset.initialized) {
      panel.dataset.initialized = "1";
      panel.classList.remove("show");
      panel.setAttribute("aria-hidden", "true");
    }

    if (openBtn && panel && !openBtn.dataset.calcBound) {
      openBtn.dataset.calcBound = "1";
      openBtn.addEventListener("click", () => {
        panel.classList.toggle("show");
        const isOpen = panel.classList.contains("show");
        panel.setAttribute("aria-hidden", isOpen ? "false" : "true");
        if (isOpen) panel.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }

    if (closeBtn && panel && !closeBtn.dataset.calcBound) {
      closeBtn.dataset.calcBound = "1";
      closeBtn.addEventListener("click", () => {
        panel.classList.remove("show");
        panel.setAttribute("aria-hidden", "true");
      });
    }

    if (form && !form.dataset.bound) {
      form.dataset.bound = "1";
      [areaEl, qtyEl, priceEl, intrantsEl, otherEl].forEach((el) => {
        if (el) el.addEventListener("input", recalc);
      });
    }

    if (applyBtn && !applyBtn.dataset.bound) {
      applyBtn.dataset.bound = "1";
      applyBtn.addEventListener("click", () => {
        const values = recalc();
        if (!values.valid) {
          if (feedbackEl) {
            feedbackEl.textContent =
              values.sanityError || "Renseigne au minimum la surface, la quantite recoltee et le prix unitaire.";
            feedbackEl.className = "form-feedback error";
          }
          return;
        }
        const business = SeneBI.getSeasonData(state).business;
        business.salesFcfa = Math.round(values.revenue);
        business.intrantsCostFcfa = Math.round(values.totalCosts);
        SeneBI.saveState(state);
        if (feedbackEl) {
          feedbackEl.textContent = "Bilan mis a jour avec les valeurs du calculateur.";
          feedbackEl.className = "form-feedback success";
        }
        if (typeof onApply === "function") onApply();
      });
    }

    recalc();
  }

  function bindButtons() {
    const topExportBtn = SeneBI.qs("#exportPdfBtn");
    const bottomExportBtn = SeneBI.qs("#exportPdfBottomBtn");

    const handlePdf = (button) => {
      if (!button) return;
      const { jsPDF } = window.jspdf || {};
      if (!jsPDF || !SeneBI.exportStyledFinancialPdf) return;
      const originalText = button.textContent;
      button.disabled = true;
      button.textContent = "Generation PDF...";
      try {
        const state = SeneBI.loadState();
        SeneBI.exportStyledFinancialPdf({
          state,
          title: "Bilan financier",
          subtitle: `Rentabilite · Saison ${state.season} · ${new Date().toLocaleDateString("fr-FR", { dateStyle: "long" })}`,
          filename: `SeneBI_Bilan_${state.season}.pdf`,
          charts: [
            { canvas: SeneBI.qs("#profitChart"), title: "Structure du bilan (millions FCFA)", heightPt: 230 },
            { canvas: SeneBI.qs("#cultureChart"), title: "Indicateurs de culture (t/ha)", heightPt: 210 },
          ],
        });
      } finally {
        button.disabled = false;
        button.textContent = originalText;
      }
    };

    [topExportBtn, bottomExportBtn].forEach((btn) => {
      if (btn && !btn.dataset.bound) {
        btn.dataset.bound = "1";
        btn.addEventListener("click", () => handlePdf(btn));
      }
    });
  }

  function renderTable() {
    const tbody = SeneBI.qs("#harvestRows");
    if (!tbody) return;
    let total = 0;
    const rows = harvests.map((h) => {
      const revenue = h.qtyKg * h.unitPrice;
      total += revenue;
      return `<tr>
        <td>${h.date}</td>
        <td>${h.parcel}</td>
        <td>${Number(h.qtyKg).toLocaleString("fr-FR")}</td>
        <td>${Number(h.unitPrice).toLocaleString("fr-FR")} FCFA</td>
        <td class="money">${Number(revenue).toLocaleString("fr-FR")} FCFA</td>
      </tr>`;
    });
    rows.push(`<tr class="total-row"><td colspan="4" style="text-align:right;">Total:</td><td>${total.toLocaleString("fr-FR")} FCFA</td></tr>`);
    tbody.innerHTML = rows.join("");
  }

  function renderCharts(sales, cost, profit) {
    if (!window.Chart) return;
    const pCanvas = SeneBI.qs("#profitChart");
    const cCanvas = SeneBI.qs("#cultureChart");

    if (pCanvas) {
      const existing = Chart.getChart(pCanvas);
      if (existing) existing.destroy();
      const mSales = million(sales);
      const mCost = million(cost);
      const mProfit = million(profit);
      const yMax = Math.max(5, Math.ceil(Math.max(mSales, mCost, mProfit, 0.1) * 11) / 10);

      new Chart(pCanvas, {
        type: "bar",
        data: {
          labels: ["Revenus", "Couts", "Benefice"],
          datasets: [
            {
              data: [mSales, mCost, mProfit],
              backgroundColor: ["#16a34a", "#dc2626", "#4f46e5"],
              borderRadius: 10,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: {
              backgroundColor: "rgba(15, 23, 42, 0.92)",
              padding: 10,
              cornerRadius: 10,
              callbacks: {
                label(ctx) {
                  const v = ctx.parsed.y;
                  return `${ctx.label} : ${v.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} M FCFA`;
                },
              },
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              max: yMax,
              grid: { color: "rgba(15,23,42,0.07)" },
              ticks: { callback: (v) => `${v}` },
              title: { display: true, text: "Millions FCFA", font: { size: 11, weight: "600" } },
            },
            x: {
              grid: { display: false },
              ticks: { font: { size: 12, weight: "700" }, maxRotation: 0, autoSkip: false },
            },
          },
        },
      });
    }

    if (cCanvas) {
      const existing = Chart.getChart(cCanvas);
      if (existing) existing.destroy();
      const cultureLabels = ["Riz", "Mais", "Coton"];
      const cultureVals = [10.5, 6.4, 4.2];
      const yMaxC = Math.ceil(Math.max(...cultureVals, 1) * 11) / 10;

      new Chart(cCanvas, {
        type: "bar",
        data: {
          labels: cultureLabels,
          datasets: [
            {
              label: "t/ha",
              data: cultureVals,
              backgroundColor: ["#16a34a", "#ea580c", "#6366f1"],
              borderRadius: 10,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: {
              backgroundColor: "rgba(15, 23, 42, 0.92)",
              padding: 10,
              cornerRadius: 10,
              callbacks: {
                title(items) {
                  return items[0]?.label ? `Culture : ${items[0].label}` : "";
                },
                label(ctx) {
                  return `Rendement : ${ctx.parsed.y} t/ha`;
                },
              },
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              max: yMaxC,
              grid: { color: "rgba(15,23,42,0.07)" },
              title: { display: true, text: "t/ha", font: { size: 11, weight: "600" } },
            },
            x: {
              grid: { display: false },
              ticks: { font: { size: 12, weight: "700" }, maxRotation: 0, autoSkip: false },
              title: { display: true, text: "Culture", font: { size: 11, weight: "600" } },
            },
          },
        },
      });
    }
  }

  function render(state) {
    const business = SeneBI.getSeasonData(state).business;
    const profit = business.salesFcfa - business.intrantsCostFcfa;
    const margin = business.salesFcfa > 0 ? (profit / business.salesFcfa) * 100 : 0;

    const salesKpi = SeneBI.qs("#salesKpi");
    const costKpi = SeneBI.qs("#costKpi");
    const profitKpi = SeneBI.qs("#profitKpi");
    const marginKpi = SeneBI.qs("#marginKpi");
    const marginStatus = SeneBI.qs("#marginStatus");
    const compareEl = SeneBI.qs("#seasonCompareText");

    if (salesKpi) salesKpi.textContent = fmtM(business.salesFcfa);
    if (costKpi) costKpi.textContent = fmtM(business.intrantsCostFcfa);
    if (profitKpi) profitKpi.textContent = fmtM(profit);
    if (marginKpi) marginKpi.textContent = `${margin.toLocaleString("fr-FR", { minimumFractionDigits: 1, maximumFractionDigits: 1 })}%`;
    if (marginStatus) {
      if (margin >= 25) {
        marginStatus.textContent = "Tres rentable";
        marginStatus.className = "good";
      } else if (margin >= 10) {
        marginStatus.textContent = "Rentabilite moyenne";
        marginStatus.className = "";
      } else {
        marginStatus.textContent = "A ameliorer";
        marginStatus.className = "";
      }
    }

    if (compareEl) {
      const currentSeason = String(state.season || "");
      const previousSeason = String(Number(currentSeason) - 1);
      const prevData = state.bySeason?.[previousSeason]?.business;
      if (prevData) {
        const prevSales = Number(prevData.salesFcfa || 0);
        const prevCost = Number(prevData.intrantsCostFcfa || 0);
        const salesDelta = business.salesFcfa - prevSales;
        const costDelta = business.intrantsCostFcfa - prevCost;
        const salesPct = prevSales > 0 ? (salesDelta / prevSales) * 100 : 0;
        const costPct = prevCost > 0 ? (costDelta / prevCost) * 100 : 0;
        const salesWord = salesDelta >= 0 ? "hausse" : "baisse";
        const costWord = costDelta >= 0 ? "hausse" : "baisse";
        compareEl.textContent =
          `Par rapport a ${previousSeason}: ${salesWord} du chiffre d'affaires de ${Math.abs(salesPct).toLocaleString("fr-FR", {
            minimumFractionDigits: 1,
            maximumFractionDigits: 1,
          })}% et ${costWord} des couts de ${Math.abs(costPct).toLocaleString("fr-FR", { minimumFractionDigits: 1, maximumFractionDigits: 1 })}%.`;
      } else {
        compareEl.textContent = "Aucune saison precedente trouvee pour faire la comparaison.";
      }
    }

    renderCharts(business.salesFcfa, business.intrantsCostFcfa, profit);
    renderTable();
    bindButtons();
    bindCalculator(state, () => render(state));
  }

  document.addEventListener("DOMContentLoaded", function () {
    const auth = SeneBI.requireRole(
      ["manager", "client"],
      "Acces refuse. La rentabilite detaillee est reservee aux clients et au manager."
    );
    if (!auth) return;
    const state = SeneBI.loadState();
    SeneBI.renderTopbar(state);
    render(state);
    window.addEventListener("senebi:seasonChanged", function () {
      SeneBI.renderTopbar(state);
      render(state);
    });
  });
})();

