// Theme choice. The visitor's pick is remembered; until they choose, the site follows their device.

export const THEME_KEY = "theme";

/**
 * Runs inline in <head>, before the page paints, so visitors never see a flash of the wrong
 * theme. Kept small and dependency-free on purpose. If storage is blocked, it still follows the
 * device setting.
 */
export const themeScript = `(function(){var t;try{t=localStorage.getItem("${THEME_KEY}")}catch(e){}if(t!=="light"&&t!=="dark"){t=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}document.documentElement.dataset.theme=t})()`;
