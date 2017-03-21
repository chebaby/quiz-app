class Quiz {

	/**
	 * Quiz constructor
	 * 
	 * @param  {Array} quizQuestions array of quiz's quiestion
	 * @return {Void}
	 */
	constructor(quizQuestions) {

		this.questions = quizQuestions;
		this.score = 0;
		this.index = 0;
	}

	/**
	 * Get number of questions in this quiz
	 * 
	 * @return {Number}
	 */
	getTotalQuestions() {

		return this.questions.length;
	}

	/**
	 * Retrieve instance of the current question
	 * 
	 * @return {Object}
	 */
	question() {

		return this.questions[this.index];
	}

	/**
	 * Retrieve the question's body
	 * 
	 * @return {String}
	 */
	getQuestion() {

		return this.question().question;
	}

	/**
	 * Retrieve the question's choices
	 * 
	 * @return {Array}
	 */
	getChoices() {

		return this.question().choices;
	}

	/**
	 * Retrieve the right answers to the question
	 * 
	 * @return {Array}
	 */
	getAnswers() {

		return this.question().answers;
	}

	/**
	 * Retrieve the question's points
	 * amount of points to add to the score
	 * 
	 * @return {Number}
	 */
	getPoints() {
		
		return this.question().points;
	}

	/**
	 * Check either the user completed the quiz or not 
	 * i could use this.getTotalQuestions in place of this.questions.lenght
	 * but for code clearity i left it like so
	 * 
	 * @return {Boolean}
	 */
	isEnded() {
		
		return this.questions.length === this.index;
	}

	/**
	 * Get user answers
	 * 	
	 * @param  {HTMLElement} form
	 * @param  {String} checkboxName
	 * @return {Array}
	 */
	getUserAnswers(form, checkboxName) {

	    let answers = [];
	    let inputs = form.elements[checkboxName];

	    for (let i=0, len=inputs.length; i<len; i++) {

	        if ( inputs[i].checked ) {

	            answers.push(inputs[i].value);
	        }
	    }

	    return answers;
	}

	/**
	 * Check the correctness of the user's answers
	 * if the answers are correct we add the question points to the score
	 * either way we navigate to the next question
	 * 	
	 * @param  {Array} answers User's answers
	 * @return {Void}
	 */
	checkUserAnswers(answers) {

		if(this.question().hasCorrect(answers)) {

			this.score += this.getPoints();
		}

		this.index++;
	}
}