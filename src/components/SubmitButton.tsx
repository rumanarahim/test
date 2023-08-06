// @ts-nocheck
import PropTypes from "prop-types";
import { has, Node } from "@kamilmielnik/trie";
import { toast } from "react-toastify";
import WordUtil from "../utils/WordUtil.ts";

function SubmitButton({
  getWordInStagingTileRack,
  trieDictionaryRoot,
  totalScore,
  setTotalScore,
  resetStagingTileRack,
}) {
  const handleSubmitClick = () => {
    const word = getWordInStagingTileRack();
    if (word.length < 2 || !has(trieDictionaryRoot, word)) {
      toast.error("Word not found in game dictionary", {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    } else {
      toast.success("Word submitted successfully!", {
        position: toast.POSITION.BOTTOM_CENTER,
      });
      const newTotalScore = totalScore + WordUtil.calculateScoreFromWord(word);
      setTotalScore(newTotalScore);
      resetStagingTileRack();
    }
  };

  return (
    <button type="button" className="light" onClick={handleSubmitClick}>
      Submit
    </button>
  );
}

SubmitButton.propTypes = {
  getWordInStagingTileRack: PropTypes.func,
  trieDictionaryRoot: PropTypes.object,
  totalScore: PropTypes.number,
  setTotalScore: PropTypes.func,
  resetStagingTileRack: PropTypes.func,
};

SubmitButton.defaultProps = {
  getWordInStagingTileRack: {},
  trieDictionaryRoot: {},
  totalScore: 0,
  setTotalScore: {},
  resetStagingTileRack: {},
};

export default SubmitButton;
