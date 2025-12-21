import {
  InformationCircleIcon,
  ChartBarIcon,
  ArrowPathIcon,
  SunIcon,
  MoonIcon,
  Squares2X2Icon,
} from "@heroicons/react/24/outline";
import { useState, useEffect, useContext, useMemo } from "react";
import { Alert } from "./components/alerts/Alert";
import { LostAlert } from "./components/alerts/LostAlert";
import { Grid } from "./components/grid/Grid";
import { Keyboard } from "./components/keyboard/Keyboard";
import { AboutModal } from "./components/modals/AboutModal";
import { InfoModal } from "./components/modals/InfoModal";
import { WinModal } from "./components/modals/WinModal";
import { SignupModal } from "./components/modals/SignupModal";
import { StatsModal } from "./components/modals/StatsModal";
import { DonationModal } from "./components/modals/DonationModal";
import { ThemeContext } from "./ThemeProvider";
import {
  isWordInWordList,
  isWinningWord,
  solution,
  dayIndex,
  tomorrow,
} from "./lib/words";
import { addStatsForCompletedGame, loadStats } from "./lib/stats";
import {
  loadGameStateFromLocalStorage,
  saveGameStateToLocalStorage,
} from "./lib/localStorage";

function App() {
  const { theme, setTheme } = useContext(ThemeContext);
  const [currentGuess, setCurrentGuess] = useState("");
  const [isGameWon, setIsGameWon] = useState(false);
  const [isGameLost, setIsGameLost] = useState(false);
  const [modals, setModals] = useState({
    win: false,
    info: false,
    about: false,
    signup: false,
    stats: false,
  });
  const [alerts, setAlerts] = useState({
    notEnoughLetters: false,
    wordNotFound: false,
    shareComplete: false,
  });

  const restarted = useMemo(() => {
    const restartExpires = localStorage.getItem("gameReset");
    return restartExpires && new Date(restartExpires) >= new Date();
  }, []);

  const [guesses, setGuesses] = useState<string[]>(() => {
    const loaded = loadGameStateFromLocalStorage();
    if (loaded?.dayIndex !== dayIndex) {
      return [];
    }
    const gameWasWon = loaded.guesses.includes(solution);
    if (gameWasWon) {
      setIsGameWon(true);
    }
    if (loaded.guesses.length === 6 && !gameWasWon) {
      setIsGameLost(true);
    }
    return loaded.guesses;
  });

  const [stats, setStats] = useState(() => loadStats());

  // Logic to show the signup modal
  useEffect(() => {
    let pageViews: number;

    if (!localStorage.getItem("pageViews")) {
      localStorage.setItem("pageViews", "1");
      return;
    } else {
      pageViews = parseInt(localStorage.getItem("pageViews")!) + 1;
      localStorage.setItem("pageViews", pageViews.toString());
    }

    if (pageViews > 3 && !localStorage.getItem("hasSignedUp")) {
      setModals((prev) => ({ ...prev, signup: true }));
      localStorage.setItem("pageViews", "0");
    }
  }, []);

  useEffect(() => {
    saveGameStateToLocalStorage({ guesses, solution, dayIndex });
  }, [guesses]);

  useEffect(() => {
    if (isGameWon) {
      // We wait a couple of seconds to allow the "reveal" animations to complete.
      const timeoutId = setTimeout(() => {
        setModals((prev) => ({ ...prev, win: true }));
      }, 2000);
      return () => clearTimeout(timeoutId);
    }
  }, [isGameWon]);

  const onChar = (value: string) => {
    if (currentGuess.length < 5 && guesses.length < 6 && !isGameWon) {
      setCurrentGuess(`${currentGuess}${value}`);
    }
  };

  const onDelete = () => {
    setCurrentGuess(currentGuess.slice(0, -1));
  };

  const onEnter = () => {
    if (!(currentGuess.length === 5) && !isGameLost) {
      setAlerts((prev) => ({ ...prev, notEnoughLetters: true }));
      setTimeout(() => {
        setAlerts((prev) => ({ ...prev, notEnoughLetters: false }));
      }, 2000);
      return;
    }

    if (!isWordInWordList(currentGuess)) {
      setAlerts((prev) => ({ ...prev, wordNotFound: true }));
      setTimeout(() => {
        setAlerts((prev) => ({ ...prev, wordNotFound: false }));
      }, 2000);
      return;
    }

    const winningWord = isWinningWord(currentGuess);

    if (currentGuess.length === 5 && guesses.length < 6 && !isGameWon) {
      setGuesses([...guesses, currentGuess]);
      setCurrentGuess("");

      if (winningWord) {
        if (!restarted)
          setStats(addStatsForCompletedGame(stats, guesses.length));
        setIsGameWon(true);
        return;
      }

      if (guesses.length === 5) {
        if (!restarted)
          setStats(addStatsForCompletedGame(stats, guesses.length + 1));
        setIsGameLost(true);
      }
    }
  };

  const onReset = () => {
    if (isGameWon || isGameLost) {
      setGuesses([]);
      setIsGameLost(false);
      setIsGameWon(false);
      // set a localstorage item to indicate that the game has been reset so that stats are not counted twice in the same day
      localStorage.setItem("gameReset", new Date(tomorrow).toString());
      window.location.reload(); // reload the page to reset the game
    }
  };

  return (
    <div className="text-black dark:text-white bg-white dark:bg-gray-900 transition-all">
      <div className="pt-8 max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div className="flex w-full max-w-sm mx-auto items-center mb-8 px-4">
          <div className="ml-2.5 grow">
            <h1 className="text-xl font-semibold">Latin Word Game </h1>
            by{" "}
            <a
              href="https://www.latindictionary.io"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold tracking-tight"
            >
              latindictionary.io
            </a>
          </div>
          <div className="flex items-center gap-1">
            {/* <a
              href="https://connections.latindictionary.io"
              target="_blank"
              rel="noopener noreferrer"
              className="h-6 w-6 cursor-pointer hover:opacity-70 transition-opacity"
              aria-label="Go to Connections"
            >
              <Squares2X2Icon className="h-6 w-6" strokeWidth={2} />
            </a> */}
            <InformationCircleIcon
              className="h-6 w-6 cursor-pointer hover:opacity-70 transition-opacity"
              onClick={() => setModals((prev) => ({ ...prev, info: true }))}
              strokeWidth={2}
            />
            <ChartBarIcon
              className="h-6 w-6 cursor-pointer hover:opacity-70 transition-opacity"
              onClick={() => setModals((prev) => ({ ...prev, stats: true }))}
              strokeWidth={2}
            />
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="h-6 w-6 cursor-pointer hover:opacity-70 transition-opacity"
            >
              {theme === "dark" ? (
                <SunIcon className="h-6 w-6" strokeWidth={2} />
              ) : (
                <MoonIcon className="h-6 w-6" strokeWidth={2} />
              )}
            </button>
          </div>
        </div>
        <Grid
          guesses={guesses}
          currentGuess={currentGuess}
          isGameWon={isGameWon}
          shouldShake={alerts.wordNotFound || alerts.notEnoughLetters}
        />
        <Keyboard
          onChar={onChar}
          onDelete={onDelete}
          onEnter={onEnter}
          guesses={guesses}
        />
        <WinModal
          isOpen={modals.win}
          handleClose={() => setModals((prev) => ({ ...prev, win: false }))}
          guesses={guesses}
          handleShare={() => {
            setModals((prev) => ({ ...prev, win: false }));
            setAlerts((prev) => ({ ...prev, shareComplete: true }));
            setTimeout(() => {
              setAlerts((prev) => ({ ...prev, shareComplete: false }));
            }, 2000);
          }}
        />
        <InfoModal
          isOpen={modals.info}
          handleClose={() => setModals((prev) => ({ ...prev, info: false }))}
        />
        <StatsModal
          isOpen={modals.stats}
          handleClose={() => setModals((prev) => ({ ...prev, stats: false }))}
          gameStats={stats}
          guesses={guesses}
          isGameLost={isGameLost}
          isGameWon={isGameWon}
          handleShare={() => {
            setAlerts((prev) => ({ ...prev, shareComplete: true }));
            setTimeout(() => {
              setAlerts((prev) => ({ ...prev, shareComplete: false }));
            }, 2000);
          }}
        />
        <AboutModal
          isOpen={modals.about}
          handleClose={() => setModals((prev) => ({ ...prev, about: false }))}
        />
        <SignupModal
          isOpen={modals.signup}
          handleClose={() => setModals((prev) => ({ ...prev, signup: false }))}
        />
        <DonationModal />
        <div className="flex justify-center gap-3 mt-8">
          <button
            type="button"
            className="flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-sky-700 bg-sky-100 hover:bg-sky-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 select-none"
            onClick={() => setModals((prev) => ({ ...prev, about: true }))}
          >
            About
          </button>
          <button
            type="button"
            className="flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 select-none"
            onClick={onReset}
          >
            Restart
          </button>
        </div>

        <Alert message="Not enough letters" isOpen={alerts.notEnoughLetters} />
        <Alert message="Word not found" isOpen={alerts.wordNotFound} />
        <LostAlert isOpen={isGameLost} solution={solution} />
        <Alert
          message="Game copied to clipboard"
          isOpen={alerts.shareComplete}
          variant="success"
        />
      </div>
    </div>
  );
}

export default App;
