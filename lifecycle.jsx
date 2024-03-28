const Square = ({ takeTurn, id }) => {
  const mark = ['O', 'X', '+'];
  const [filled, setFilled] = React.useState(false);
  const [tik, setTik] = React.useState(2);
  const [isMounted, setIsMounted] = React.useState(true); // mounted state

  const handleClick = () => {
    if (!filled) { // Prevent update
      setTik(takeTurn(id));
      setFilled(true);
      setIsMounted(false); // Unmount 
    }
  };

  if (!isMounted) return null; //

  return (
    <button
      id={`square-button-${id}`}
      onClick={handleClick} // manage click behavior
    >
      <h1>{mark[tik]}</h1>
    </button>
  );
};


const Board = () => {
  const [player, setPlayer] = React.useState(1);
  const [gameState, setGameState] = React.useState([]);

  const takeTurn = (id) => {
    setGameState([...gameState, { id: id, player: player }]);
    setPlayer((player + 1) % 2); // next player
    return player;
  };

  function renderSquare(i) {
    return <Square takeTurn={takeTurn} id={i} key={i}></Square>; 
  }

  return (
    <div className="game-board">
      <div className="grid-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div id="info">
        {/* no button */}
        <h1>Game Status</h1> {/* shown */}
      </div>
    </div>
  );
};


const Game = () => {
  return (
    <div className="game">
      <Board></Board>
    </div>
  );
};

// ========================================

ReactDOM.render(<Game />, document.getElementById('root'));
