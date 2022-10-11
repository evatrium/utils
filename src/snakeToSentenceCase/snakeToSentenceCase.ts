import { deSnake } from '~/deSnake';
import { sentenceCase } from '~/sentenceCase';

/**
 * snake_case => Sentence Case
 * @param string
 */
export const snakeToSentenceCase = (string = '') => sentenceCase(deSnake(string));
