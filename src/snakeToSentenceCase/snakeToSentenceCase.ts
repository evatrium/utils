import {deSnake} from "~/deSnake";
import { sentenceCase } from "~/sentenceCase";

export const snakeToSentenceCase = (string: string = "") => sentenceCase(deSnake(string));
