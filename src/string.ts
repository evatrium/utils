export const capitalize = (string: string = "") => string.charAt(0).toUpperCase() + string.slice(1);

export const capEachFirst = (string: string = "") =>
	string.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase());

export const deSnake = (string: string = "") => string.split("_").join(" ");

export const deKebab = (string: string = "") => string.split("-").join(" ");

export const snakeToSentenceCase = (string: string = "") => capEachFirst(deSnake(string));
