/*!
 * Quiz App
 * Simple quiz app using javascript
 * 
 * 
 * @author Nour-Eddine ECH-CHEBABY
 * @version 1.0.0
 * @version https://github.com/chebaby/quiz-app
 * 
 * 
 * Copyright 2017. ISC licensed.
 * 
 */
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Quiz = function () {

	/**
  * Quiz constructor
  * 
  * @param  {Array} quizQuestions array of quiz's quiestion
  * @return {Void}
  */
	function Quiz(quizQuestions) {
		_classCallCheck(this, Quiz);

		this.questions = quizQuestions;
		this.score = 0;
		this.index = 0;
	}

	/**
  * Get number of questions in this quiz
  * 
  * @return {Number}
  */


	_createClass(Quiz, [{
		key: 'getTotalQuestions',
		value: function getTotalQuestions() {

			return this.questions.length;
		}

		/**
   * Retrieve instance of the current question
   * 
   * @return {Object}
   */

	}, {
		key: 'question',
		value: function question() {

			return this.questions[this.index];
		}

		/**
   * Retrieve the question's body
   * 
   * @return {String}
   */

	}, {
		key: 'getQuestion',
		value: function getQuestion() {

			return this.question().question;
		}

		/**
   * Retrieve the question's choices
   * 
   * @return {Array}
   */

	}, {
		key: 'getChoices',
		value: function getChoices() {

			return this.question().choices;
		}

		/**
   * Retrieve the right answers to the question
   * 
   * @return {Array}
   */

	}, {
		key: 'getAnswers',
		value: function getAnswers() {

			return this.question().answers;
		}

		/**
   * Retrieve the question's points
   * amount of points to add to the score
   * 
   * @return {Number}
   */

	}, {
		key: 'getPoints',
		value: function getPoints() {

			return this.question().points;
		}

		/**
   * Check either the user completed the quiz or not 
   * i could use this.getTotalQuestions in place of this.questions.lenght
   * but for code clearity i left it like so
   * 
   * @return {Boolean}
   */

	}, {
		key: 'isEnded',
		value: function isEnded() {

			return this.questions.length === this.index;
		}

		/**
   * Get user answers
   * 	
   * @param  {HTMLElement} form
   * @param  {String} checkboxName
   * @return {Array}
   */

	}, {
		key: 'getUserAnswers',
		value: function getUserAnswers(form, checkboxName) {

			var answers = [];
			var inputs = form.elements[checkboxName];

			for (var i = 0, len = inputs.length; i < len; i++) {

				if (inputs[i].checked) {

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

	}, {
		key: 'checkUserAnswers',
		value: function checkUserAnswers(answers) {

			if (this.question().hasCorrect(answers)) {

				this.score += this.getPoints();
			}

			this.index++;
		}
	}]);

	return Quiz;
}();

var Question = function () {

	/**
 
  * Question contructor
 
  * 
 
  * @param  {String} question the question
 
  * @param  {Array}  choices  Suggested answers
 
  * @param  {Array}  answers  Correct answers
 
  * @param  {Number} points   Points added to the score
 
  * @return {Void}
 
  */

	function Question(question) {
		var choices = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
		var answers = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
		var points = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;

		_classCallCheck(this, Question);

		this.question = question;

		this.choices = choices;

		this.answers = answers;

		this.points = points;
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

	_createClass(Question, [{
		key: 'hasCorrect',
		value: function hasCorrect(answers) {
			var _this = this;

			if (answers.length !== this.answers.length) {

				return false;
			}

			var countCorrectAnswers = 0;

			answers.forEach(function (answer) {

				if (_this.answers.includes(answer)) {

					countCorrectAnswers++;
				}
			});

			return answers.length === countCorrectAnswers;
		}
	}]);

	return Question;
}();

var View = function () {
	function View(quiz) {
		_classCallCheck(this, View);

		this.quiz = quiz;

		this.questionContainer = document.getElementById('question');

		this.scoreElm = document.getElementById('score');

		this.testElm = document.getElementById('test');

		this.orderElm = document.getElementById('order');
	}

	_createClass(View, [{
		key: 'init',
		value: function init() {

			if (this.quiz.isEnded()) {

				this.evaluation();

				this.showScore();

				this.start();
			} else {

				// show question

				this.questionContainer.innerHTML = this.quiz.getQuestion();

				this.showOrder();

				// show question's choices


				for (var i = 0, choices = this.quiz.getChoices(); i < choices.length; i++) {

					var selector = 'response-' + (i + 1);

					var input = document.getElementById(selector);

					var label = document.getElementsByClassName(selector);

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

	}, {
		key: 'getAnswers',
		value: function getAnswers(form, checkboxName) {

			return this.quiz.getUserAnswers(form, checkboxName);
		}
	}, {
		key: 'validate',
		value: function validate(answers) {

			this.quiz.checkUserAnswers(answers);
		}
	}, {
		key: 'showScore',
		value: function showScore() {

			var pointsElm = document.getElementById('points');

			pointsElm.innerHTML = this.quiz.score;

			this.testElm.classList.add('hidden');

			this.scoreElm.classList.remove('hidden');
		}
	}, {
		key: 'evaluation',
		value: function evaluation() {

			var evaluation = '';

			var totalQuestions = this.quiz.getTotalQuestions();

			var score = this.quiz.score;

			var grades = score / totalQuestions * 100;

			var evaluationElm = document.getElementById('evaluation');

			console.log('totalQuestions : ', totalQuestions);

			console.log('score : ', score);

			console.log('grades : ', grades);

			switch (true) {

				case grades >= 80 && grades <= 100:

					evaluation = 'Excellent';

					break;

				case grades >= 60 && grades < 80:

					evaluation = 'Very Good';

					break;

				case grades >= 40 && grades < 60:

					evaluation = 'Average';

					break;

				case grades >= 20 && grades < 40:

					evaluation = 'Below Average';

					break;

				case grades >= 0 && grades < 20:

					evaluation = 'Failing';

					break;

				default:

					evaluation = 'I don\'t know what to say';

					break;

			}

			evaluationElm.innerHTML = evaluation;
		}
	}, {
		key: 'start',
		value: function start() {
			var _this2 = this;

			var startButton = document.getElementById('start');

			startButton.addEventListener('click', function (event) {

				_this2.quiz.index = 0;

				_this2.quiz.score = 0;

				_this2.testElm.classList.remove('hidden');

				_this2.scoreElm.classList.add('hidden');

				_this2.init();
			}, false);
		}
	}, {
		key: 'showOrder',
		value: function showOrder() {

			this.orderElm.innerHTML = this.quiz.index + 1;
		}
	}]);

	return View;
}();

/**
 * TODO
 *
 * => how to retrieve the checked checkboxs on submit
 * 	function getRadioVal(form, name) {
	    var val;
	    // get list of radio buttons with specified name
	    var radios = form.elements[name];
	    
	    // loop through list of radio buttons
	    for (var i=0, len=radios.length; i<len; i++) {
	        if ( radios[i].checked ) { // radio checked?
	            val = radios[i].value; // if so, hold its value in val
	            break; // and break out of for loop
	        }
	    }
	    return val; // return value of checked radio or undefined if none checked
	}
	----
	var chk_arr =  document.getElementsByName("chkRights[]");
	document.getElementById('messageCheckbox').checked;
	var checkedValue = document.querySelector('.messageCheckbox:checked').value;
 * => some custom styles for the progress bar
 * => es6 array (contains) check if array value's exist in other array
 * 		var isSuperset = arr2.every(function(val) { return arr1.indexOf(val) >= 0; });
 * 		Array.prototype.every()
 * 		
		 * Returns TRUE if the first specified array contains all elements
		 * from the second one. FALSE otherwise.
		 *
		 * @param {array} superset
		 * @param {array} subset
		 *
		 * @returns {boolean}
		 *
		function arrayContainsArray (superset, subset) {
		  return subset.every(function (value) {
		    return (superset.indexOf(value) >= 0);
		  });
		}
 */

var questions = [new Question('Which one is not an OOP programming language?', ['Java', 'C#', 'C++', 'C'], ['C']), new Question('Which language is used for styling web pages?', ['HTML', 'jQuery', 'CSS', 'XML'], ['CSS']), new Question('There are ____ main components of OOP.', ['1', '6', '2', '4'], ['4']), new Question('MVC is a ____.', ['Language', 'Library', 'Framwork', 'All'], ['Framwork']), new Question('Which language is used for web apps?', ['PHP', 'Python', 'Javascript', 'All'], ['All'])];

var quiz = new Quiz(questions); //console.log('quiz'); //console.log(quiz);

var view = new View(quiz); //console.log('view'); //console.log(view);

view.init();

var quizForm = document.forms['form-quiz'];
var checkboxs = quizForm.elements['responses'];
var submitButton = document.getElementById('submit');

submitButton.addEventListener('click', function (event) {

	event.preventDefault();

	var answers = view.getAnswers(quizForm, 'responses');
	view.validate(view.getAnswers(quizForm, 'responses'));
	quizForm.reset();
	view.init();
}, false);