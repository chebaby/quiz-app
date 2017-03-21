class Question {

	/**
	 * Question contructor
	 * 
	 * @param  {String} question the question
	 * @param  {Array}  choices  Suggested answers
	 * @param  {Array}  answers  Correct answers
	 * @param  {Number} points   Points added to the score
	 * @return {Void}
	 */
	constructor(question, choices = [], answers = [], points = 1) {

		this.question = question;
		this.choices  = choices;
		this.answers  = answers;
		this.points   = points;
	}

	/**
	 * Check the correctness of the user's answers
	 *
	 * First things I check if the number of the user’s answer 
	 * equal to the number of the correct answer, 
	 * if this conditions passed, i check if the given answers 
	 * is corresponding to the correct answers.
	 * 
	 * @param  {Array}  answers User's answers
	 * @return {Boolean}
	 */
	hasCorrect(answers) {

		if(answers.length !== this.answers.length) {

			return false;
		}


		let countCorrectAnswers = 0

		answers.forEach( (answer) => {

			if(this.answers.includes(answer)) {
				
				countCorrectAnswers++;
			}
		});

		return answers.length === countCorrectAnswers;
	}
}