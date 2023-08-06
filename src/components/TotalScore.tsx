// @ts-nocheck
import PropTypes from "prop-types";

function TotalScore(props) {
  const { score } = props;
  return <div className="px-6 font-bold text-xl">Total Score: {score}</div>;
}

TotalScore.propTypes = {
  score: PropTypes.number,
};

TotalScore.defaultProps = {
  score: 0,
};

export default TotalScore;
