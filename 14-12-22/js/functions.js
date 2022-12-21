// Save Dark Mode
const saveDarkMode = (mode) => {
  localStorage.setItem("theme", mode);
};

// Reset Dark Mode
const resetDarkMode = () => {
  localStorage.setItem("theme", "dark");
};

const loadDarkMode = () => {
    const mode = localStorage.getItem("theme");
    if (mode) {
      document.documentElement.setAttribute("theme", mode);
    } else {
      localStorage.setItem("theme", "dark");
    }
  }

export {
    saveDarkMode,
    resetDarkMode,
    loadDarkMode
}