import React from 'react';
import rock from './icons/rockCircle.png';
import paper from './icons/paperCircle.png';
import { useEffect, useState } from 'react';
import scissor from './icons/scissorCircle.png';
import { round } from './rounds';

import rockCircle from './icons/rockCircle.png';
import paperCircle from './icons/paperCircle.png';
import scissorCircle from './icons/scissorCircle.png';


const TwoPlayers = () => {
	const [state, setState] = useState({
		roundsRemaining: round,
		playerOption1: '',
		playerOption2: '',
		player1Src: '',
		player2Src: '',
		winner: 'No Winner Yet. Play First!',
		playerScore1: 0,
		playerScore2: 0,
		resultMsg: '',

		awaitMsg1: 'Your Turn.',
		awaitMsg2: 'Please wait for your turn.',
		player2Turn: 0,
	});

	useEffect(() => {
		console.log(state);
	}, [state]);

	useEffect(() => {
		if (state.playerOption2 === 'Rock' || state.playerOption2 === 'Paper' || state.playerOption2 === 'Scissor') {
			roundWinner()
		} else {
			console.log(state)
		}
	}, [state.player2Turn]);

	const player1 = (event) => {
		event.preventDefault();
		const rock = document.querySelector('#rock');
		const paper = document.querySelector('#paper');
		const scissor = document.querySelector('#scissor');
		const playerText = document.querySelector('#player-output11');

		const playerForm1 = document.querySelector('#player-forms');
		const playerForm2 = document.querySelector('#player-form2');

		if (rock.checked || paper.checked || scissor.checked) {
			playerText.style.display = 'block';

			setState((prev) => {
				return {
					...prev,
					awaitMsg1: 'Please wait for your turn.',
					awaitMsg2: 'It is now your turn.',
				};
			});
			playerForm1.style.display = 'none';
			playerForm2.style.display = 'block';
		}

		if (state.roundsRemaining > 0) {
			if (rock.checked) {
				setState((prev) => {
					return {
						...prev,
						playerOption1: 'Rock',
						player1Src: rockCircle
					};
				});
			} else if (paper.checked) {
				setState((prev) => {
					return {
						...prev,
						playerOption1: 'Paper',
						player1Src: paperCircle
					};
				});
			} else if (scissor.checked) {
				setState((prev) => {
					return {
						...prev,
						playerOption1: 'Scissor',
						player1Src: scissorCircle
					};
				});
			} else {
				alert('You must pick an option! 😤');
			}
		}
	};

	const player2 = (event) => {
		event.preventDefault();

		const rock = document.querySelector('#rock2');
		const paper = document.querySelector('#paper2');
		const scissor = document.querySelector('#scissor2');
		const playerText = document.querySelector('#player-output2');

		const playerForm1 = document.querySelector('#player-forms');
		const playerForm2 = document.querySelector('#player-form2');

		if (rock.checked || scissor.checked || paper.checked) {
			playerText.style.display = 'block';
			if (Number(state.roundsRemaining) === 1) {
				playerForm1.style.display = 'none';
				playerForm2.style.display = 'none';
				setState((prev) => {
					return {
						...prev,
						awaitMsg1:
							'Game Over.',
						awaitMsg2:
							'Game Over.',
					};
				});
			} else {
				playerForm1.style.display = 'block';
				playerForm2.style.display = 'none';
				setState((prev) => {
					return {
						...prev,
						awaitMsg1: 'It is now your turn.',
						awaitMsg2: 'Please wait for you turn.',
					};
				});
			}

			if (rock.checked) {
				setState((prev) => {
					return {
						...prev,
						playerOption2: 'Rock',
						player2Src: rockCircle
					};
				});
			} else if (paper.checked) {
				setState((prev) => {
					return {
						...prev,
						playerOption2: 'Paper',
						player2Src: paperCircle
					};
				});
			} else if (scissor.checked) {
				setState((prev) => {
					return {
						...prev,
						playerOption2: 'Scissor',
						player2Src: scissorCircle
					};
				});
			}
			setState((prev) => {
				return {
					...prev,
					player2Turn: prev.player2Turn + 1,
				};
			});

		} else {
			alert('You must pick an option! 😤')
		}
	};

	const roundWinner = () => {

		const player1Selected = state.playerOption1;
		const player2Selected = state.playerOption2;

		console.log('player1selected: ' + player1Selected);
		console.log('player2selected: ' + player2Selected);

		setState((prev) => {
			return {
				...prev,
				roundsRemaining: prev.roundsRemaining - 1,
			};
		});

		if (player1Selected == player2Selected) {
			setState((prev) => {
				return {
					...prev,
					winner: 'This round is a TIE!!',
				};
			});
		} else if (player1Selected === 'Rock') {
			if (player2Selected === 'Scissor') {
				setState((prev) => {
					return {
						...prev,
						winner: 'Player 1',
						playerScore1: prev.playerScore1 + 1,
					};
				});
			} else if (player2Selected === 'Paper') {
				setState((prev) => {
					return {
						...prev,
						winner: 'Player 2',
						playerScore2: prev.playerScore2 + 1,
					};
				});
			}
		} else if (player1Selected === 'Paper') {
			if (player2Selected === 'Rock') {
				setState((prev) => {
					return {
						...prev,
						winner: 'Player 1',
						playerScore1: prev.playerScore1 + 1,
					};
				});
			} else if (player2Selected === 'Scissor') {
				setState((prev) => {
					return {
						...prev,
						winner: 'Player 2',
						playerScore2: prev.playerScore2 + 1,
					};
				});
			}
		} else if (player1Selected === 'Scissor') {
			if (player2Selected === 'Rock') {
				setState((prev) => {
					return {
						...prev,
						winner: 'Player 2',
						playerScore2: prev.playerScore2 + 1,
					};
				});
			} else if (player2Selected === 'Paper') {
				setState((prev) => {
					return {
						...prev,
						winner: 'Player 1',
						playerScore1: prev.playerScore1 + 1,
					};
				});
			}
		}
	};

	function displayResult(e) {
		e.preventDefault();
		document.querySelector('#winner-display2').style.display = 'none';
		const displayResultBtn = document.querySelector('#display-result-button');
		displayResultBtn.style.display = 'none';
		if (Number(state.playerScore1) == Number(state.playerScore2)) {
			setState((prev) => {
				return {
					...prev,
					resultMsg: 'The overall result: TIE 🤷',
				};
			});
		} else if (Number(state.playerScore2) > Number(state.playerScore1)) {
			setState((prev) => {
				return {
					...prev,
					resultMsg: 'The overall result: Player 2 Wins 🎊',
				};
			});
		} else {
			setState((prev) => {
				return {
					...prev,
					resultMsg: 'The overall result: Player 1 Wins 🎊',
				};
			});
		}
	}
	return (
		<>
			<h1 id="rounds-left">Rounds Remaining: {state.roundsRemaining}</h1> <hr id="hr2"></hr>
			<h3 id="winner-display2">The winner of this round: {state.winner}</h3>
			<div className="row">
				<div className="column">
					<h1 id="player11">Player 1</h1>
					<h3 id="winoutof1">
						Player 1's Win out of {round} rounds: {state.playerScore1}
					</h3>
					<p id="await-msg1">{state.awaitMsg1}</p>
					<p style={{ display: 'none' }} id="player-output11">
						What You Selected: {state.playerOption1}
						<img class='circle' id="circle11" src={state.player1Src} alt='player1' />
					</p>
					<form id="player-forms" onSubmit={player1}>
						<label>
							<input type="radio" id="rock" name="option" value="rock" />
							<img src={rock} alt="rock" />
						</label>
						<label>
							<input type="radio" id="paper" name="option" value="paper" />
							<img src={paper} alt="paper" />
						</label>
						<label>
							<input type="radio" id="scissor" name="option" value="scissor" />
							<img src={scissor} alt="scissor" />
						</label>
						<input id="ghy" type="submit" value="GO!" />
					</form>
				</div>

				< div class="vl2"></div>

				<div className="column">
					<h1 id="player23">Player 2</h1>
					<h3 id="winoutof">
						Player 2's Win out of {round} rounds: {state.playerScore2}
					</h3>
					<p id="await-msg2">{state.awaitMsg2}</p>
					<p style={{ display: 'none' }} id="player-output2">
						What You Selected: {state.playerOption2}
						<img class='circle' id="circle21" src={state.player2Src} alt='player2' />
					</p>
					<form

						id="player-form2"
						style={{ display: 'none' }}
						onSubmit={player2}
					>
						<label>
							<input type="radio" id="rock2" name="option" value="rock" />
							<img src={rock} alt="rock" />
						</label>
						<label>
							<input type="radio" id="paper2" name="option" value="paper" />
							<img src={paper} alt="paper" />
						</label>
						<label>
							<input type="radio" id="scissor2" name="option" value="scissor" />
							<img src={scissor} alt="scissor" />
						</label>
						<input id="blah" type="submit" value="GO!" />
					</form>
				</div>
			</div>

			<h1 class="resultstatement" id="result">{state.resultMsg}</h1>

			{state.roundsRemaining <= 0 ? (
				<button id="display-result-button" onClick={displayResult}>
					WHO WON? 🤔
				</button>
			) : null}
		</>
	);
};

export default TwoPlayers;
