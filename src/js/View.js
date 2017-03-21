class View {

	constructor(quiz) {

		this.quiz              = quiz;
		this.questionContainer = document.getElementById('question');
		this.scoreElm          = document.getElementById('score');
		this.testElm           = document.getElementById('test');
		this.orderElm          = document.getElementById('order');
	}


	init() {
		
		if(this.quiz.isEnded()) {

			this.evaluation();
			this.showScore();
			this.start();

		} else {

			// show question
			this.questionContainer.innerHTML = this.quiz.getQuestion();
			this.showOrder();

			// show question's choices
			
			for (let i = 0, choices = this.quiz.getChoices(); i < choices.length; i++) {

				let selector = 'response-'+ (i+1);
				let input = document.getElementById(selector);
				let label = document.getElementsByClassName(selector);

				label[0].innerHTML = choices[i];
				input.value = choices[i];
			}
		}
	}

	/**
	 * TODO
	 *
	 * => possible dublication
	 * i could just use the hasCorrect() method on Question class
	 * rather than this.quiz.checkUserAnswers() method
	 */
	getAnswers(form, checkboxName) {

		return this.quiz.getUserAnswers(form, checkboxName);
	}


	validate(answers) {

		this.quiz.checkUserAnswers(answers);
	}


	showScore() {

		let pointsElm = document.getElementById('points');
		pointsElm.innerHTML = this.quiz.score;
		this.testElm.classList.add('hidden');
		this.scoreElm.classList.remove('hidden');
	}


	evaluation() {

		let evaluation     = '';
		let totalQuestions = this.quiz.getTotalQuestions();
		let score          = this.quiz.score;
		let grades         = (score / totalQuestions) * 100;

		let evaluationElm  = document.getElementById('evaluation');
		console.log('totalQuestions : ',totalQuestions);
		console.log('score : ',score);
		console.log('grades : ', grades);
		switch (true) {

			case (grades >= 80 && grades <= 100):
				evaluation = 'Excellent';
				break;

			case (grades >= 60 && grades < 80):
				evaluation = 'Very Good';
				break;

			case (grades >= 40 && grades < 60):
				evaluation = 'Average';
				break;

			case (grades >= 20 && grades < 40):
				evaluation = 'Below Average';
				break;

			case (grades >= 0 && grades < 20):
				evaluation = 'Failing';
				break;

			default:
				evaluation = 'I don\'t know what to say';
				break;
		}

		evaluationElm.innerHTML = evaluation;
	}


	start() {

		let startButton = document.getElementById('start');
		
		startButton.addEventListener('click', (event) => {
			
			this.quiz.index = 0;
			this.quiz.score = 0;
			this.testElm.classList.remove('hidden');
			this.scoreElm.classList.add('hidden');
			this.init();

		}, false);
	}


	showOrder() {

		this.orderElm.innerHTML = this.quiz.index + 1;
	}
}