// @ts-nocheck
import Modal from "react-modal";
import { useState } from "react";
import PropTypes from "prop-types";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "white",
    border: "2px solid black",
    width: 400,
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
};

function FinishButton({ setIsNeedToResetGame, totalScore, optimalWords }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [optimalWordString, setOptimalWordString] = useState("");
  const [optimalWordScore, setOptimalWordScore] = useState(0);
  const [isWinner, setIsWinner] = useState(false);

  const handleFinishGameClick = () => {
    const optimalWordsScoreArray = Array.from(optimalWords);
    setOptimalWordString(
      optimalWordsScoreArray.map((element) => element[0]).join("+ "),
    );
    let optimalScore = 0;
    optimalWordsScoreArray.forEach((element) => {
      optimalScore += Number(element[1]);
    });
    setOptimalWordScore(optimalScore);
    if (optimalScore > totalScore) {
      setIsWinner(false);
    } else {
      setIsWinner(true);
    }
    setIsModalOpen(true);
  };

  const handlePlayNewGameClick = () => {
    setIsModalOpen(false);
    setIsNeedToResetGame(true);
  };

  return (
    <>
      <button
        type="button"
        className="dark"
        onClick={() => handleFinishGameClick()}
      >
        <div>Finish Game</div>
      </button>
      <Modal
        ariaHideApp={false}
        isOpen={isModalOpen}
        style={customStyles}
        shouldCloseOnOverlayClick={false}
      >
        <div className="font-bold text-3xl text-center pb-5">
          {isWinner ? "You Won" : "Game Over"}
        </div>
        <div className="pb-5 text-center">
          Your total score is: <strong>{totalScore}</strong>
        </div>

        <div className="pb-5 text-center">
          {!isWinner && (
            <p>
              The optimal word is <strong>{optimalWordString}</strong> which is
              worth <strong>{optimalWordScore}</strong> points
            </p>
          )}
        </div>
        <div className="text-center">
          <button
            type="button"
            className="dark"
            onClick={handlePlayNewGameClick}
          >
            Play new game!
          </button>
        </div>
      </Modal>
    </>
  );
}

FinishButton.propTypes = {
  setIsNeedToResetGame: PropTypes.func,
  totalScore: PropTypes.number,
  optimalWords: PropTypes.instanceOf(Map),
};

FinishButton.defaultProps = {
  setIsNeedToResetGame: {},
  totalScore: 0,
  optimalWords: new Map(),
};

export default FinishButton;
