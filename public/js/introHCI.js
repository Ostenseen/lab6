'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
	//$('.project a').click(addProjectDetails);
$('.project a').click(addProjectDetails);
$('#colorBtn').click(function(e) {
		$.get("/palette",randomizeColors);
	});
}

/*
 * Make an AJAX call to retrieve project details and add it in
 */
function addProjectDetails(e) {
	e.preventDefault();
	var projectID = $(this).closest('.project').attr('id');
	var idNumber = projectID.substr('project'.length);

	console.log("User clicked on project " + idNumber);

	$.get("/project/" + idNumber, printDetails);
	function printDetails(result){
		console.log(result);
		var projectHTML = '<a href="#" class="thumbnail">' +
		'<img src="' + result['image'] + '" class="detailsImage">' +
		'<p><small>' + result['title'] + '</small></p>' +
		'<p><small>' + result['date'] + '</small></p></a>';
		$("#" + projectID + " .details").html(projectHTML+result['summary']);
	}

}

/*
 * Make an AJAX call to retrieve a color palette for the site
 * and apply it
 */
function randomizeColors(result) {
	console.log("User clicked on color button");
	var colors1 = result['colors'];
	var colors = colors1['hex'];
	console.log(colors);
	$('body').css('background-color', colors[0]);
	$('.thumbnail').css('background-color', colors[1]);
	$('h1, h2, h3, h4, h5, h5').css('color', colors[2]);
	$('p').css('color', colors[3]);
	$('.project img').css('opacity', .75);
}