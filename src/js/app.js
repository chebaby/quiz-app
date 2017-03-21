//=include Quiz.js

//=include Question.js

//=include View.js


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



let questions = [

	new Question('Which one is not an OOP programming language?', ['Java', 'C#', 'C++', 'C'], ['C']),
	new Question('Which language is used for styling web pages?', ['HTML', 'jQuery', 'CSS', 'XML'], ['CSS']),
	new Question('There are ____ main components of OOP.', ['1', '6', '2', '4'], ['4']),
	new Question('MVC is a ____.', ['Language', 'Library', 'Framwork', 'All'], ['Framwork']),
	new Question('Which language is used for web apps?', ['PHP', 'Python', 'Javascript', 'All'], ['All'])
];

let quiz = new Quiz(questions); //console.log('quiz'); //console.log(quiz);

let view = new View(quiz); //console.log('view'); //console.log(view);

view.init();

let quizForm     = document.forms['form-quiz'];
let checkboxs    = quizForm.elements['responses'];
let submitButton = document.getElementById('submit');

submitButton.addEventListener('click', function(event) {
	
	event.preventDefault();
	
	let answers = view.getAnswers(quizForm, 'responses');
	view.validate(view.getAnswers(quizForm, 'responses'));
	quizForm.reset();
	view.init();

}, false);