const applySavedTheme = () => {
	const savedTheme = loadFromStorage(STORAGE_KEYS.THEME) || "dark";
	document.body.classList.toggle("light-mode", savedTheme === "light");
	document.getElementById("theme-switcher").checked = savedTheme === "light";
};

const handleThemeToggle = () => {
	const themeSwitcher = document.getElementById("theme-switcher");
	if (!themeSwitcher) return;

    themeSwitcher.addEventListener("change", (e) => {
        const isLightMode = e.target.checked;
        document.body.classList.toggle("light-mode", isLightMode);
        saveToStorage(STORAGE_KEYS.THEME, isLightMode ? 'light' : 'dark');
    });
};
