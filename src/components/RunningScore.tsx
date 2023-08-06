// @ts-nocheck
import PropTypes from "prop-types";

function RunningScore(props) {
  const { score } = props;
  return <div className="font-medium">Word Score: {score}</div>;
}

RunningScore.propTypes = {
  score: PropTypes.number,
};

RunningScore.defaultProps = {
  score: 0,
};

export default RunningScore;
