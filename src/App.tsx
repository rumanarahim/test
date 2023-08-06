// @ts-nocheck
import "./App.css";
import {useCallback, useEffect, useState} from "react";
import { deserialize } from "@kamilmielnik/trie";
import { ToastContainer } from "react-toastify";
import serialized from "./data/serialized.txt";
import WordUtil from "./utils/WordUtil.ts";
import Tile from "./models/Tile.ts";
import TileRackFactory from "./factory/TileRackFactory.ts";
import RunningScore from "./components/RunningScore.tsx";
import SubmitButton from "./components/SubmitButton.tsx";
import TotalScore from "./components/TotalScore.tsx";
import FinishButton from "./components/FinishButton.tsx";
import TileRacksDisplay from "./components/TileRacksDisplay.tsx";
import "react-toastify/dist/ReactToastify.css";


function App() {
  const [isNeedToResetGame, setIsNeedToResetGame] = useState(true);
  const [originTileRack, setOriginTileRack] = useState([]);
  const [stagingTileRack, setStagingTileRack] = useState([]);
  const [runningScore, setRunningScore] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [trieDictionaryRoot, setTrieDictionaryRoot] = useState({});
  const [optimalWords, setOptimalWords] = useState(new Map());

  const deserializeAndConstructTrieDictionary = () => {
    fetch(serialized)
      .then((r) => r.text())
      .then((text) => setTrieDictionaryRoot(deserialize(text)));
  };

  const getWordInStagingTileRack = useCallback(() => {
    const nonEmptyTiles = stagingTileRack.filter(
        (tile) => tile.letter !== Tile.EMPTY_TILE_LETTER,
    );
    const letterArray = nonEmptyTiles.map((tile) => tile.letter);
    return letterArray.join("");
  }, [stagingTileRack]);

  const resetStagingTileRack = () => {
    setStagingTileRack(TileRackFactory.createEmptyTileRack());
    setRunningScore(0);
  };

  const findOptimalWords = () => {
    const originLetterArray = originTileRack.map((tile) => tile.letter);
    const currentOptimalWords = WordUtil.findOptimalWords(
      originLetterArray,
      trieDictionaryRoot,
    );
    setOptimalWords(currentOptimalWords);
  };

  useEffect(() => deserializeAndConstructTrieDictionary(), []);
  useEffect(() => {
    findOptimalWords();
  }, [trieDictionaryRoot]);

  useEffect(() => {
    if (isNeedToResetGame) {
      findOptimalWords();
      setIsNeedToResetGame(false);
    }
  }, [originTileRack]);

  useEffect(() => {
    const word = getWordInStagingTileRack();
    setRunningScore(WordUtil.calculateScoreFromWord(word));
  }, [stagingTileRack]);

  useEffect(() => {
    if (isNeedToResetGame) {
      setOriginTileRack(TileRackFactory.createTileRackFromRandomString());
      resetStagingTileRack();
      setTotalScore(0);
    }
  }, [isNeedToResetGame]);

  return (
    <div className="flex h-screen" id="root">
      <div className="m-auto">
        <div className="flex flex-row">
          <div className="basis-1/2 text-left py-3">
            <TotalScore score={totalScore} />
          </div>
          <div className="basis-1/2 px-6 text-right">
            <FinishButton
              setIsNeedToResetGame={setIsNeedToResetGame}
              totalScore={totalScore}
              optimalWords={optimalWords}
            />
          </div>
        </div>
        <TileRacksDisplay
          originTileRack={originTileRack}
          setOriginTileRack={setOriginTileRack}
          stagingTileRack={stagingTileRack}
          setStagingTileRack={setStagingTileRack}
        />
        <div className="flex flex-row">
          <div className="basis-1/2 text-left px-6">
            <RunningScore score={runningScore} />
          </div>
          <div className="basis-1/2 text-right px-6">
            <SubmitButton
                getWordInStagingTileRack={getWordInStagingTileRack}
                trieDictionaryRoot={trieDictionaryRoot}
                totalScore={totalScore}
                setTotalScore={setTotalScore}
                resetStagingTileRack={resetStagingTileRack}
            />
          </div>
        </div>
      </div>
      <ToastContainer autoClose={2000} />
    </div>
  );
}

export default App;
