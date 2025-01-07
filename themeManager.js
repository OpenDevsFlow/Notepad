export function applyTheme(themeName) {
    document.body.className = ''; // Clear all existing classes
    if (themeName !== 'light') {
        document.body.classList.add(`theme-${themeName}`);
}
