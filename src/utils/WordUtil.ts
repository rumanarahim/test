// @ts-nocheck
import {fromArray, Node, serialize} from "@kamilmielnik/trie";
import { saveAs } from "file-saver";
import UniqueSet from "@sepiariver/unique-set";
import Tile from "../models/Tile.ts";
import LetterValues from "../data/letter-values.json";
import raw from "../data/pre-processed-words.txt";
import TileRackFactory from "../factory/TileRackFactory.ts";

class WordUtil {
  static generateRandomString = (numberOfCharacters: number): string => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const charactersLength = characters.length;
    let result = "";

    // Create an array of 32-bit unsigned integers
    const randomValues = new Uint32Array(numberOfCharacters);

    // Generate random values
    window.crypto.getRandomValues(randomValues);
    randomValues.forEach((value) => {
      result += characters.charAt(value % charactersLength);
    });
    return result;
  };

  static getScoreFromLetter = (letter: string): number => {
    if (letter === Tile.EMPTY_TILE_LETTER) {
      return 0;
    }
    return LetterValues[letter.toLowerCase()];
  };

  static calculateScoreFromWord = (word: string): number => {
    const lettersScore = word
      .split("")
      .reduce(
        (score, letter) => score + WordUtil.getScoreFromLetter(letter),
        0,
      );

    return (
      lettersScore * word.length +
      (word.length === TileRackFactory.MAX_NUMBER_OF_TILES ? 50 : 0)
    );
  };

  static createTrieSerializeData = () => {
    fetch(raw)
      .then((r) => r.text())
      .then((text) => {
        const words = text.split("\r\n");
        const node = fromArray(words);
        const serializedText = serialize(node);
        const blob = new Blob([serializedText], {
          type: "text/plain;charset=utf-8",
        });
        saveAs(blob, "serialized.txt");
      });
  };

  static findOptimalWords = (lettersArray: string[], trieRoot: Node) => {
    const optimalWordsAndScore = new Map();
    const candidateWordsAndScore = new Map();
    let foundOptimalWords = false;
    const validCombinations = new UniqueSet();
    let maxScore = 0;

    const hasEnoughTilesForWord = (
      wordLetters: string[],
      tileLetters: string[],
    ): boolean => {
      const sortedTileLetters = tileLetters.slice().sort();
      const sortedWordLetters = wordLetters.slice().sort();

      let wordIndex = 0;
      let tileIndex = 0;
      while (tileIndex < sortedTileLetters.length) {
        if (sortedWordLetters[wordIndex] === sortedTileLetters[tileIndex]) {
          wordIndex += 1;
          tileIndex += 1;
        } else {
          tileIndex += 1;
        }
      }
      return wordIndex >= sortedWordLetters.length;
    };

    const depthFirstSearch = (node: Node, path: string[]) => {
      if (node.wordEnd) {
        if (hasEnoughTilesForWord(path, lettersArray)) {
          const word = path.join("");
          const score = WordUtil.calculateScoreFromWord(word);
          if (word.length === TileRackFactory.MAX_NUMBER_OF_TILES) {
            optimalWordsAndScore.set(word, score);
            foundOptimalWords = true;
          } else {
            candidateWordsAndScore.set(word, score);
          }
        }
      }

      for (const char of lettersArray) {
        if (node[char]) {
          path.push(char);
          if (!foundOptimalWords) {
            depthFirstSearch(node[char] as Node, path);
          } else {
            break;
          }
          path.pop();
        }
      }
    };

    const backTrackCandidateWords = (current) => {
      let lettersUsedSoFar = [];
      for (const word of current) {
        lettersUsedSoFar = lettersUsedSoFar.concat(word[0].split(""));
      }
      if (!hasEnoughTilesForWord(lettersUsedSoFar, lettersArray)) {
        const previous = [...current];
        previous.pop();
        let previousScore = 0;
        previous.forEach((wordScoreArray) => {
          previousScore += wordScoreArray[1];
        });
        if (previousScore >= maxScore) {
          optimalWordsAndScore.clear();
          previous.forEach((wordScoreArray) => {
            optimalWordsAndScore.set(wordScoreArray[0], wordScoreArray[1]);
          });
          maxScore = previousScore;
        }
        validCombinations.add(previous);
        return;
      }

      for (const candidateWordAndScore of candidateWordsAndScore) {
        if (!current.includes(candidateWordAndScore)) {
          current.push(candidateWordAndScore);
          backTrackCandidateWords(current);
          current.pop();
        }
      }
    };

    // Generate a list of candidate words from the trieDictionary based on the tiles assigned
    depthFirstSearch(trieRoot, []);

    // Generate permutations of valid candidate score and keep track of optimal word and score
    if(!foundOptimalWords) {
      backTrackCandidateWords([]);
    }

    console.log(`Optimal Words: ${Array.from(optimalWordsAndScore)}`);
    console.log(`Candidate Words: ${Array.from(candidateWordsAndScore)}`);
    return optimalWordsAndScore;
  };
}

export default WordUtil;
