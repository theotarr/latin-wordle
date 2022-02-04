import {
  InformationCircleIcon,
  ChartBarIcon,
  RefreshIcon,
  SunIcon,
  MoonIcon,
} from '@heroicons/react/outline'
import { useState, useEffect, useContext } from 'react'
import { Alert } from './components/alerts/Alert'
import { Grid } from './components/grid/Grid'
import { Keyboard } from './components/keyboard/Keyboard'
import { AboutModal } from './components/modals/AboutModal'
import { InfoModal } from './components/modals/InfoModal'
import { WinModal } from './components/modals/WinModal'
import { SignupModal } from './components/modals/SignupModal'
import { StatsModal } from './components/modals/StatsModal'
import { ThemeContext } from './ThemeProvider'
import { isWordInWordList, isWinningWord, solution } from './lib/words'
import { addStatsForCompletedGame, loadStats } from './lib/stats'
import {
  loadGameStateFromLocalStorage,
  saveGameStateToLocalStorage,
} from './lib/localStorage'

const DefinitionURL = `https://www.latindictionary.io/words/?word=${solution}`

function App() {
  const { theme, setTheme } = useContext(ThemeContext)
  const [currentGuess, setCurrentGuess] = useState('')
  const [isGameWon, setIsGameWon] = useState(false)
  const [isGameLost, setIsGameLost] = useState(false)
  const [isWinModalOpen, setIsWinModalOpen] = useState(false)
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false)
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false)
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false)
  const [isNotEnoughLetters, setIsNotEnoughLetters] = useState(false)
  const [isStatsModalOpen, setIsStatsModalOpen] = useState(false)
  const [isWordNotFoundAlertOpen, setIsWordNotFoundAlertOpen] = useState(false)
  const [shareComplete, setShareComplete] = useState(false)

  let restarted = false
  let restartExpires = localStorage.getItem('gameReset')

  if (!restartExpires || new Date(restartExpires) < new Date()) {
    restarted = false
  } else {
    restarted = true
  }

  let showForm = false

  if (localStorage.getItem('showForm') == null) {
    showForm = true
  } else {
    showForm = false
  }

  const [guesses, setGuesses] = useState<string[]>(() => {
    const loaded = loadGameStateFromLocalStorage()
    if (loaded?.solution !== solution) {
      return []
    }
    const gameWasWon = loaded.guesses.includes(solution)
    if (gameWasWon) {
      setIsGameWon(true)
    }
    if (loaded.guesses.length === 6 && !gameWasWon) {
      setIsGameLost(true)
    }
    return loaded.guesses
  })

  const [stats, setStats] = useState(() => loadStats())

  // Logic to show the signup modal
  useEffect(() => {
    let pageViews: Number

    if (!localStorage.getItem('pageViews')) {
      localStorage.setItem('pageViews', '1')
      return
    } else {
      pageViews = parseInt(localStorage.getItem('pageViews')!) + 1
      localStorage.setItem('pageViews', pageViews.toString())
    }

    if (pageViews > 3 && !localStorage.getItem('hasSignedUp')) {
      setIsSignupModalOpen(true)
      localStorage.setItem('pageViews', '0')
    }
  }, [])

  useEffect(() => {
    saveGameStateToLocalStorage({ guesses, solution })
  }, [guesses])

  useEffect(() => {
    if (isGameWon) {
      setIsWinModalOpen(true)
    }
  }, [isGameWon])

  useEffect(() => {
    localStorage.setItem('showForm', 'false')
  }, [showForm])

  const onChar = (value: string) => {
    if (currentGuess.length < 5 && guesses.length < 6 && !isGameWon) {
      setCurrentGuess(`${currentGuess}${value}`)
    }
  }

  const onDelete = () => {
    setCurrentGuess(currentGuess.slice(0, -1))
  }

  const onEnter = () => {
    if (!(currentGuess.length === 5) && !isGameLost) {
      setIsNotEnoughLetters(true)
      return setTimeout(() => {
        setIsNotEnoughLetters(false)
      }, 2000)
    }

    if (!isWordInWordList(currentGuess)) {
      setIsWordNotFoundAlertOpen(true)
      return setTimeout(() => {
        setIsWordNotFoundAlertOpen(false)
      }, 2000)
    }

    const winningWord = isWinningWord(currentGuess)

    if (currentGuess.length === 5 && guesses.length < 6 && !isGameWon) {
      setGuesses([...guesses, currentGuess])
      setCurrentGuess('')

      if (winningWord) {
        if (!restarted)
          setStats(addStatsForCompletedGame(stats, guesses.length))
        return setIsGameWon(true)
      }

      if (guesses.length === 5) {
        if (!restarted)
          setStats(addStatsForCompletedGame(stats, guesses.length + 1))
        setIsGameLost(true)
      }
    }
  }

  const onReset = () => {
    if (isGameWon || isGameLost) {
      setGuesses([])
      setIsGameLost(false)
      setIsGameWon(false)
      // set a localstorage item to indicate that the game has been reset so that stats are not counted twice in the same day
      const now: Date = new Date()

      localStorage.setItem(
        'gameReset',
        new Date(now.setHours(23, 59, 59, 999)).toString()
      )
      window.location.reload()
    }
  }

  return (
    <div className="text-black dark:text-white bg-white dark:bg-gray-900 transition-all">
      <div className="py-8 max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div className="flex w-80 mx-auto items-center mb-8">
          <div className="ml-2.5 grow">
            <h1 className="text-xl font-bold">Latin Wordle </h1>
            by{' '}
            <a
              href="https://www.latindictionary.io"
              target="_blank"
              rel="noopenner noreferrer"
              className="font-bold"
            >
              latindictionary.io
            </a>
          </div>
          <InformationCircleIcon
            className="h-6 w-6 cursor-pointer"
            onClick={() => setIsInfoModalOpen(true)}
          />
          <ChartBarIcon
            className="h-6 w-6 cursor-pointer"
            onClick={() => setIsStatsModalOpen(true)}
          />
          {theme === 'dark' ? (
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="text-black dark:text-white shadow-none p-2 focus:outline-none text-lg rounded-full outline-none ring-transparent cursor-pointer"
            >
              <SunIcon className="h-6 w-6 -ml-1" />
            </button>
          ) : (
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="text-black dark:text-white focus:outline-none shadow-none p-2 text-lg rounded-full outline-none ring-transparent cursor-pointer"
            >
              <MoonIcon className="h-6 w-6 -ml-1" />
            </button>
          )}
        </div>
        <Grid guesses={guesses} currentGuess={currentGuess} />
        <Keyboard
          onChar={onChar}
          onDelete={onDelete}
          onEnter={onEnter}
          guesses={guesses}
        />
        <WinModal
          isOpen={isWinModalOpen}
          handleClose={() => setIsWinModalOpen(false)}
          guesses={guesses}
          handleShare={() => {
            setIsWinModalOpen(false)
            setShareComplete(true)
            return setTimeout(() => {
              setShareComplete(false)
            }, 2000)
          }}
        />
        <InfoModal
          isOpen={isInfoModalOpen}
          handleClose={() => setIsInfoModalOpen(false)}
        />
        <StatsModal
          isOpen={isStatsModalOpen}
          handleClose={() => setIsStatsModalOpen(false)}
          gameStats={stats}
        />
        <AboutModal
          isOpen={isAboutModalOpen}
          handleClose={() => setIsAboutModalOpen(false)}
        />
        <SignupModal
          isOpen={isSignupModalOpen}
          handleClose={() => setIsSignupModalOpen(false)}
        />

        <div className="flex justify-center gap-3 mt-8">
          <button
            type="button"
            className="flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 select-none"
            onClick={() => setIsAboutModalOpen(true)}
          >
            About
            <InformationCircleIcon className="h-4 w-4 ml-1.5" />
          </button>
          {/* <Tooltip tooltipText="Restart after winning or losing"> */}
          <button
            type="button"
            className="flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 select-none"
            onClick={onReset}
          >
            Restart
            <RefreshIcon className="ml-1.5 h-4 w-4" />
          </button>
          {/* </Tooltip> */}
        </div>

        <Alert message="Not enough letters" isOpen={isNotEnoughLetters} />
        <Alert message="Word not found" isOpen={isWordNotFoundAlertOpen} />
        <Alert
          message={`
              <a
                href=${DefinitionURL}
                target="_blank"
                rel="noopenner noreferrer"
              >
                You lost. The correct word was ${solution}. Click here to see the definition of ${solution} on latindictionary.io.
              </a>`}
          isOpen={isGameLost}
        />
        <Alert
          message="Game copied to clipboard"
          isOpen={shareComplete}
          variant="success"
        />
        <Alert
          message={`
              <a
                href="https://forms.gle/o61u5Z2BGZD4LohY7"
                target="_blank"
                rel="noopenner noreferrer"
              >
                We notice that you have been playing Wordle for a while, please fill out this feedback survey to help us improve the game.
              </a>`}
          isOpen={isGameWon && showForm}
          variant="info"
        />
      </div>
    </div>
  )
}

export default App
