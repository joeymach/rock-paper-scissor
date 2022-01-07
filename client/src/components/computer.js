import React from 'react';
import rock from './icons/rockCircle.png';
import paper from './icons/paperCircle.png';
import { useEffect, useState } from 'react';
import scissor from './icons/scissorCircle.png';
import { round } from './rounds';
import { Link, Navigate } from 'react-router-dom';

import rockCircle from './icons/rockCircle.png';
import paperCircle from './icons/paperCircle.png';
import scissorCircle from './icons/scissorCircle.png';
import Home from './home';

const Computer = () => {
	const [state, setState] = useState({
		roundsRemaining: round,
		playerSelection: '',
		compSelection: 's',
		winner: 'No Winner Yet. Play First! 🙄',
		compScore: 0,
		playerScore: 0,
		resultMsg: '',
		playerSrc: '',
		compScr: '',
	});

	useEffect(() => {
		console.log('State changed: ' + state);
	}, [state]);

	function computerTurn(playerSelected) {
		if (state.roundsRemaining > 0) {
			setState((prev) => {
				return {
					...prev,
					roundsRemaining: prev.roundsRemaining - 1,
				};
			});

			document.querySelector('#computer-bottom-output').style.display = 'block';
			const options = ['Rock', 'Paper', 'Scissor'];
			const random = Math.floor(Math.random() * 3);
			const source = [rockCircle, paperCircle, scissorCircle];

			setState((prev) => {
				return {
					...prev,
					compSelection: options[random],
					compScr: source[random],
				};
			});

			const compSelect = options[random];

			if (playerSelected == compSelect) {
				setState((prev) => {
					return {
						...prev,
						winner: 'This round is a TIE!!',
					};
				});
			} else if (playerSelected === 'Rock') {
				if (compSelect === 'Scissor') {
					setState((prev) => {
						return {
							...prev,
							winner: 'Player',
							playerScore: prev.playerScore + 1,
						};
					});
				} else if (compSelect === 'Paper') {
					setState((prev) => {
						return {
							...prev,
							winner: 'Computer',
							compScore: prev.compScore + 1,
						};
					});
				}
			} else if (playerSelected === 'Paper') {
				if (compSelect === 'Rock') {
					setState((prev) => {
						return {
							...prev,
							winner: 'Player',
							playerScore: prev.playerScore + 1,
						};
					});
				} else if (compSelect === 'Scissor') {
					setState((prev) => {
						return {
							...prev,
							winner: 'Computer',
							compScore: prev.compScore + 1,
						};
					});
				}
			} else if (playerSelected === 'Scissor') {
				if (compSelect === 'Rock') {
					setState((prev) => {
						return {
							...prev,
							winner: 'Computer',
							compScore: prev.compScore + 1,
						};
					});
				} else if (compSelect === 'Paper') {
					setState((prev) => {
						return {
							...prev,
							winner: 'Player',
							playerScore: prev.playerScore + 1,
						};
					});
				}
			}
		}
	}

	function displayResult(e) {
		e.preventDefault();
		const displayResultBtn = document.querySelector('#display-result-button');
		displayResultBtn.style.display = 'none';

		document.querySelector('#winner-display').style.display = 'none';

		if (Number(state.compScore) == Number(state.playerScore)) {
			setState((prev) => {
				return {
					...prev,
					resultMsg: 'The overall result: TIE 🦃',
				};
			});
			console.log('tie');
		} else if (Number(state.compScore) > Number(state.playerScore)) {
			setState((prev) => {
				return {
					...prev,
					resultMsg: 'The overall result: COMPUTER Wins 🥇',
				};
			});
			console.log('computer wins');
		} else {
			setState((prev) => {
				return {
					...prev,
					resultMsg: 'The overall result: PLAYER Wins 🥇',
				};
			});
			console.log('player wins');
		}
	}

	function onSubmit(event) {
		event.preventDefault();
		const rock = document.querySelector('#rock');
		const paper = document.querySelector('#paper');
		const scissor = document.querySelector('#scissor');
		const playerText = document.querySelector('#player-output');

		if (rock.checked || paper.checked || scissor.checked) {
			playerText.style.display = 'block';
		}

		if (state.roundsRemaining > 0) {
			if (rock.checked) {
				setState((prev) => {
					return {
						...prev,
						playerSelection: 'Rock',
						playerSrc: rockCircle,
					};
				});
				computerTurn('Rock');
			} else if (paper.checked) {
				setState((prev) => {
					return {
						...prev,
						playerSelection: 'Paper',
						playerSrc: paperCircle,
					};
				});
				computerTurn('Paper');
			} else if (scissor.checked) {
				setState((prev) => {
					return {
						...prev,
						playerSelection: 'Scissor',
						playerSrc: scissorCircle,
					};
				});
				computerTurn('Scissor');
			} else {
				alert('You must pick an option! 😤');
			}
		}
		if (
			state.roundsRemaining == 1 &&
			(rock.checked || paper.checked || scissor.checked)
		) {
			const playerForm = document.querySelector('#player-form');
			playerForm.style.display = 'none';
		}
	}

	return (
		<>




			<h1 id="rounds-remaining"># of Rounds Remaining:  {state.roundsRemaining} </h1>
			<hr></hr>
			<h3 id="winner-display">
				The winner of this round: <span>{state.winner}</span>
			</h3>
			<div className="row">
				<div className="column">
					<h1 id="playerr">Player</h1>
					<h3 class="together">
						Player's Win out of {round} rounds: {state.playerScore}
					</h3>
					<p id="your">Please Choose Your Option</p>
					<p style={{ display: 'none' }} id="player-output">
						<span class="whatyou">
							What You Selected: {state.playerSelection}{' '}
						</span>
						<img id="circle1" src={state.playerSrc} alt="computer" />
					</p>

					<form id="player-form" onSubmit={onSubmit}>
						<label class="radiobtn">
							<input type="radio" id="rock" name="option" value="rock" />
							<img class="item" src={rock} alt="rock" />
						</label>
						<label>
							<input type="radio" id="paper" name="option" value="paper" />
							<img class="item" src={paper} alt="paper" />
						</label>
						<label>
							<input type="radio" id="scissor" name="option" value="scissor" />
							<img class="item" src={scissor} alt="scissor" />
						</label>
						<input id="optionsubmit" type="submit" value="GO!" />
					</form>
				</div>

				<div class="vl"></div>

				<div className="column">
					<h1 id="computerr">Computer</h1>
					<h3 id="computerwins">
						Computer's Win out of {round} rounds: {state.compScore}
					</h3>
					<p id="computer-screen">Computer Is Waiting...</p>
					<p style={{ display: 'none' }} id="computer-bottom-output">
						{' '}
						<span class="whatyou">
							Computer has picked: {state.compSelection}{' '}
						</span>
						<img id="circle2" src={state.compScr} alt="computer" />
					</p>
				</div>
			</div>

			<h1 class="resultsentence" id="result">
				{state.resultMsg}
			</h1>


			{state.roundsRemaining <= 0 ? <button id='display-result-button' onClick={displayResult}>WHO WON? 🤭</button> : null}

			<a className="link-to-redirect" href="/">Play Again</a>
		</>
	);
};



export default Computer;
