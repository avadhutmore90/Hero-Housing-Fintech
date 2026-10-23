const formatINR = value => new Intl.NumberFormat("en-IN", {
  style: "currency", currency: "INR", maximumFractionDigits: 0
}).format(value);

const valuationForm = document.getElementById("valuationForm");
if (valuationForm) {
  valuationForm.addEventListener("submit", event => {
    event.preventDefault();
    const city = document.getElementById("city");
    const type = document.getElementById("propertyType");
    const area = Number(document.getElementById("area").value);
    const age = Number(document.getElementById("age").value);
    const condition = Number(document.getElementById("condition").value);

    if (!Number.isFinite(area) || area < 100 || area > 50000) {
      alert("Enter an area between 100 and 50,000 sq. ft.");
      return;
    }

    const estimate = 6850 * area * Number(city.value) *
      Number(type.value) * age * condition;

    document.getElementById("valuationResult").textContent = formatINR(estimate);
    document.getElementById("rateResult").textContent =
      "Approx. " + formatINR(estimate / area) + " per sq. ft.";
    document.getElementById("cityFactor").textContent =
      city.options[city.selectedIndex].text + " · " + Number(city.value).toFixed(2) + "×";
    document.getElementById("typeFactor").textContent =
      type.options[type.selectedIndex].text + " · " + Number(type.value).toFixed(2) + "×";
    document.getElementById("ageFactor").textContent =
      (age * condition).toFixed(2) + "× combined";
  });
}

const loanForm = document.getElementById("loanForm");
if (loanForm) {
  loanForm.addEventListener("submit", event => {
    event.preventDefault();
    const income = Number(document.getElementById("income").value);
    const emi = Number(document.getElementById("emi").value);
    const score = Number(document.getElementById("creditScore").value);
    const documents = document.getElementById("documents").value;

    if (income <= 0 || emi < 0 || score < 300 || score > 900) {
      alert("Please check income, EMI and credit score.");
      return;
    }

    const ratio = emi / income * 100;
    document.getElementById("debtRatio").textContent = ratio.toFixed(1) + "%";
    document.getElementById("creditSignal").textContent =
      score >= 750 ? "Strong (sample)" : score >= 680 ? "Moderate (sample)" : "Needs review (sample)";
    document.getElementById("documentSignal").textContent =
      documents === "verified" ? "Verified in demo" :
      documents === "pending" ? "Pending verification" : "Mismatch flagged";

    let outcome = "Refer for review";
    let description = "The sample rules suggest additional assessment before any real decision.";
    if (documents !== "verified") {
      outcome = "Hold for verification";
      description = "Documents are pending or flagged. Resolve verification before any decision.";
    } else if (score >= 720 && ratio <= 35) {
      outcome = "Indicatively eligible";
      description = "These simplified demo thresholds passed. This is not an approval or loan offer.";
    }
    document.getElementById("loanResult").textContent = outcome;
    document.getElementById("loanDescription").textContent = description;
  });
}