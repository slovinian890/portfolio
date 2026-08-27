const clock = document.getElementById("terminalClock");
const tabButtons = document.querySelectorAll(".tab-button");
const tabPanels = document.querySelectorAll(".tab-panel");
const themeToggle = document.getElementById("themeToggle");
const copyLink = document.getElementById("copyLink");
const copyStatus = document.getElementById("copyStatus");

const CONTACT_LINK = "https://linkedin.com/in/filipsinjur";

function showTab(tabName) {
  tabButtons.forEach((button) => {
    const isActive = button.dataset.tab === tabName;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-selected", String(isActive));
  });

  tabPanels.forEach((panel) => {
    const isActive = panel.id === tabName;
    panel.classList.toggle("is-active", isActive);
    panel.hidden = !isActive;
  });
}

document.querySelectorAll("[data-tab]").forEach((control) => {
  control.addEventListener("click", () => {
    showTab(control.dataset.tab);
  });
});

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light-boost");
});

copyLink.addEventListener("click", async () => {
  if (!navigator.clipboard) {
    copyStatus.textContent = CONTACT_LINK;
    return;
  }

  try {
    await navigator.clipboard.writeText(CONTACT_LINK);
    copyStatus.textContent = "LinkedIn link copied.";
  } catch {
    copyStatus.textContent = CONTACT_LINK;
  }
});

function updateClock() {
  const now = new Date();
  clock.textContent = now.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit"
  });
}

tabButtons.forEach((button) => {
  button.id = `tab-${button.dataset.tab}`;
  button.setAttribute("role", "tab");
  button.setAttribute("aria-controls", button.dataset.tab);
});

tabPanels.forEach((panel) => {
  panel.setAttribute("role", "tabpanel");
  panel.hidden = !panel.classList.contains("is-active");
});

showTab("about");
updateClock();
setInterval(updateClock, 1000 * 30);
