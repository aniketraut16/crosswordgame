import React, { useState, useEffect } from "react";
import "./crossword.css";
import { countries, sports, fruits, colors, animals } from "./data";
import Congomodel from "./Congomodel";

function Crossword() {
  const [catagory, setcatagory] = useState("countries");
  const [doGenerate, setdoGenerate] = useState(false);
  const [itemarray, setitemarray] = useState([]);
  const noOfWords = 10;
  const [solution, setSolution] = useState([]);
  const [divColors, setDivColors] = useState({});
  const [from, setFrom] = useState(0);
  const [modalDisplay, setmodalDisplay] = useState({display:"none",transform:'scale(0)'});

  const [toAskInfo, settoAskInfo] = useState(true);
  const [controlstyle, setcontrolstyle] = useState({
    height: "100vh",
    width: "100vw",
    position: "fixed",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: " rgb(190, 190, 190,0.5)",
  });
  const [inside_control_style, setinside_control_style] = useState({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
    borderRadius: "25px",
    flexDirection: "column",
    padding: "1em",
  });
  const [to, setTo] = useState(0);
  const [ary, setAry] = useState([]);
  const changeCatagory = (e) => {
    setcatagory(e.target.value);
  };

  const generategrid = () => {
    setdoGenerate(true);
    setcontrolstyle({
      marginTop: "1em",
      height: "15%",
      display: "flex",
      justifyContent: "space-evenly",
    });
    setinside_control_style({
      width: "70%",
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-evenly",
    });
    settoAskInfo(false);
  };
  useEffect(() => {
    if (doGenerate && catagory) {
      const items = [];
      switch (catagory) {
        case "countries":
          while (items.length < noOfWords) {
            const rindex = Math.floor(Math.random() * countries.length);
            if (!items.includes(countries[rindex])) {
              items.push(countries[rindex]);
            }
          }
          break;

        case "sports":
          while (items.length < noOfWords) {
            const rindex = Math.floor(Math.random() * sports.length);
            if (!items.includes(sports[rindex])) {
              items.push(sports[rindex]);
            }
          }
          break;

        case "fruits":
          while (items.length < noOfWords) {
            const rindex = Math.floor(Math.random() * fruits.length);
            if (!items.includes(fruits[rindex])) {
              items.push(fruits[rindex]);
            }
          }
          break;

        case "colors":
          while (items.length < noOfWords) {
            const rindex = Math.floor(Math.random() * colors.length);
            if (!items.includes(colors[rindex])) {
              items.push(colors[rindex]);
            }
          }
          break;

        case "animals":
          while (items.length < noOfWords) {
            const rindex = Math.floor(Math.random() * animals.length);
            if (!items.includes(animals[rindex])) {
              items.push(animals[rindex]);
            }
          }
          break;

        default:
          break;
      }

      const wordbox = [];
      for (let i = 0; i < 10; i++) {
        const row = [];
        for (let j = 0; j < 10; j++) {
          row.push(null);
        }
        wordbox.push(row);
      }
      const maxAttempts = 10000;
      const solution = [];
      items.forEach((item) => {
        let totry = true;
        let attempts = 0;
        while (totry) {
          if (attempts >= maxAttempts) {
            console.log(`Failed to place ${item} after ${attempts} attempts.`);
            break;
          }

          let i = Math.floor(Math.random() * 10);
          let j = Math.floor(Math.random() * 10);

          let direction = Math.floor(Math.random() * 3);

          let token = true;
          if (direction === 0) {
            // Horizontal
            if (j + item.length <= 10) {
              for (let k = 0; k < item.length; k++) {
                if (
                  wordbox[i][j + k] !== null &&
                  wordbox[i][j + k] !== item[k]
                ) {
                  token = false;
                  break;
                }
              }
              if (token) {
                let k;
                for (k = 0; k < item.length; k++) {
                  wordbox[i][j + k] = item[k];
                }
                const sol1 = [[i, j], [i, j + k - 1], item];
                solution.push(sol1);

                totry = false;
              }
            }
          } else if (direction === 1) {
            // Vertical
            if (i + item.length <= 10) {
              for (let k = 0; k < item.length; k++) {
                if (
                  wordbox[i + k][j] !== null &&
                  wordbox[i + k][j] !== item[k]
                ) {
                  token = false;
                  break;
                }
              }
              if (token) {
                let k;
                for (k = 0; k < item.length; k++) {
                  wordbox[i + k][j] = item[k];
                }
                const sol1 = [[i, j], [i + k - 1, j], item];
                solution.push(sol1);
                totry = false;
              }
            }
          } else if (direction === 2) {
            // Diagonal
            if (i + item.length <= 10 && j + item.length <= 10) {
              for (let k = 0; k < item.length; k++) {
                if (
                  wordbox[i + k][j + k] !== null &&
                  wordbox[i + k][j + k] !== item[k]
                ) {
                  token = false;
                  break;
                }
              }
              if (token) {
                let k;
                for (k = 0; k < item.length; k++) {
                  wordbox[i + k][j + k] = item[k];
                }
                const sol1 = [[i, j], [i + k - 1, j + i - 1], item];
                solution.push(sol1);
                totry = false;
              }
            }
          }
          attempts++;
        }
      });

      for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
          if (wordbox[i][j] === null) {
            wordbox[i][j] = String.fromCharCode(
              97 + Math.floor(Math.random() * 26)
            );
          }
        }
      }
      setitemarray(wordbox);
      console.log(solution);
      setSolution(solution);
    }
    setAry([]);
  }, [doGenerate, catagory]);

  function labelToIndex(label, gridSize) {
    const num = parseInt(label, 10);
    if (num >= 1 && num <= gridSize * gridSize) {
      const row = Math.floor((num - 1) / gridSize);
      const col = (num - 1) % gridSize;
      return [row, col];
    } else {
      return null;
    }
  }

  const updateFrom = (e) => {
    setFrom(e.target.value);
  };

  const updateTo = (e) => {
    setTo(e.target.value);
  };

  const check = () => {
    let fromAry = labelToIndex(from, 10);
    let toAry = labelToIndex(to, 10);

    if (fromAry !== null && toAry !== null) {
      solution.forEach((answer) => {
        if (
          answer[0][0] === fromAry[0] &&
          answer[0][1] === fromAry[1] &&
          answer[1][0] === toAry[0] &&
          answer[1][1] === toAry[1]
        ) {
          if (!ary.includes(answer[2])) {
            setFrom(0);
            setTo(0);
            const newAry = [...ary];
            newAry.push(answer[2]);
            setAry(newAry);
            if(newAry.length === solution.length){
              setmodalDisplay({display:"flex",transform:'scale(1)'});
            }
            console.log(newAry);
            // Update the text color in the state variable
            setDivColors((prevColors) => ({
              ...prevColors,
              [answer[2]]: "white",
            }));
          }
        }
      });
    }
  };

  let ids = 0;
  return (
    <>
      {
        <div className="control-panel" style={controlstyle}>
          <div
            style={
              toAskInfo
                ? {
                   backgroundColor:'white',
                   borderRadius:'25px',
                    width: "20em",
                    padding:'2em',
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-evenly",
                    flexDirection: "column",
                  }
                : inside_control_style
            }
          >
            <select
              className="form-select controlele"
              aria-label="Default select example"
              value={catagory}
              onChange={changeCatagory}
              style={toAskInfo ? { width: "100%" ,marginBottom:'1em'} : {}}
            >
              <option value="countries">Countries</option>
              <option value="fruits">Fruits</option>
              <option value="colors">Colors</option>
              <option value="sports">Sports</option>
              <option value="animals">Animals</option>
            </select>
            {toAskInfo && (
              <button
                className="btn generatebtn btn-primary"
                onClick={generategrid}
              >
                Generate
              </button>
            )}
            {doGenerate && (
              <>
                <input
                  type="number"
                  class="form-control  controlele"
                  value={from}
                  onChange={updateFrom}
                />
                <input
                  type="number"
                  class="form-control  controlele"
                  value={to}
                  onChange={updateTo}
                />
                <button className="btn btn-primary controlele" onClick={check}>
                  Check
                </button>
              </>
            )}
          </div>
        </div>
      }

      <h1 className="title">
        <i className="fa-solid fa-won-sign"></i>ord Puzzle{" "}
        <i class="fa-solid fa-puzzle-piece"></i>
      </h1>

      <div className="gridcontainer">
        {doGenerate && (
          <div>
            <div className="grid">
              {itemarray.map((items, index1) =>
                items.map((letter, index2) => (
                  <div id={`${++ids}`}>
                    <b>{letter.toUpperCase()}</b>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
        {doGenerate && (
          <div className="allsolutions">
            {solution.map((item, index) => (
              <div
                id={item[2]}
                style={{ color: divColors[item[2]] || "rgb(141, 141, 141)" }} // Apply text color from state variable
              >
                {item[2].toUpperCase()}
              </div>
            ))}
          </div>
        )}
      </div>

    <Congomodel modelDisplay={modalDisplay}/>
    </>
  );
}

export default Crossword;
