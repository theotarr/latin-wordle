import { WORDS } from "../constants/wordlist";
import { VALIDGUESSES } from "../constants/validGuesses";

export const isWordInWordList = (word: string) => {
  return (
    WORDS.includes(word.toLowerCase()) ||
    VALIDGUESSES.includes(word.toLowerCase())
  );
};

export const isWinningWord = (word: string) => {
  return solution === word;
};

export const getLatinDefinition = (word: string) => {
  return `https://www.latindictionary.io/dictionary?q=${word}`;
};

export const getWordOfDay = () => {
  // Game epoch (restart point for the daily-word cycle).
  // Dec 14, 2025 is the start of the restarted cycle (dayIndex === 0).
  const epoch = new Date(2025, 11, 14); // Dec 14, 2025

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Use UTC midnights to avoid DST edge cases.
  const epochUtc = Date.UTC(
    epoch.getFullYear(),
    epoch.getMonth(),
    epoch.getDate(),
  );
  const todayUtc = Date.UTC(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
  );
  const msPerDay = 24 * 60 * 60 * 1000;

  const dayIndex = Math.max(0, Math.floor((todayUtc - epochUtc) / msPerDay));
  const solutionIndex = dayIndex % WORDS.length;

  const nextDay = new Date(today);
  nextDay.setDate(today.getDate() + 1);

  return {
    solution: WORDS[solutionIndex].toUpperCase(),
    solutionIndex,
    dayIndex,
    tomorrow: nextDay,
  };
};

export const { solution, solutionIndex, dayIndex, tomorrow } = getWordOfDay();
