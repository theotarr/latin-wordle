import { WORDS } from '../constants/wordlist'
import { VALIDGUESSES } from '../constants/validGuesses'

import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'

dayjs.extend(customParseFormat)


export const isWordInWordList = (word: string) => {
  return (
    WORDS.includes(word.toLowerCase()) ||
    VALIDGUESSES.includes(word.toLowerCase())
  )
}

export const isWinningWord = (word: string) => {
  return solution === word
}

export const getLatinDefinition = (word: string) => {
  return `https://www.latindictionary.io/words/?word=${word}`
}

const getWordOfDay = () => {
  // January 1, 2022, at midnight local time, is the Game Epoch
  const epoch   = dayjs('01-01-2022 00:00:00', 'MM-DD-YYYY HH:mm:ss')
  const now     = dayjs()
  const index   = now.diff(epoch, 'day')
  const nextday = now.startOf('day').add(1, 'day')

  return {
    solution:      WORDS[index].toUpperCase(),
    solutionIndex: index,
    tomorrow:      nextday.valueOf(),
  }
}

export const { solution, solutionIndex, tomorrow } = getWordOfDay()
