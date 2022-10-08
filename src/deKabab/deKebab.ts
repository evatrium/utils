/**
 * converts kebab case to normal sentence case
 * foo-bar => foo bar
 * @param string
 */
export const deKebab = (string: string = "") => string.split("-").join(" ");
