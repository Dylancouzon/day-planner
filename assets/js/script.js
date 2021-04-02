var containerEl = $('.container');
var TimeRange = [9, 17];
var storagePosition = 0;
var storedTasks = JSON.parse(localStorage.getItem("tasks"));
if(!storedTasks){
  var storedTasks = ["", "", "", "", "", "", "", "", ""];
}
// Show the current day
$("#currentDay").text(moment().format("dddd, MMMM Do YYYY, h:mm:ss a"));

//Function to generate the planner
var generatePlanner = function () {
    for (i = TimeRange[0]; i <= TimeRange[1]; i++) {

        // Creates all the element of each row
        var form = $('<form>');
        form.attr('data-hour-index', storagePosition);

        var row = $('<div>');
        row.addClass('row');

        var time = $('<div>');
        time.addClass('hour').text(moment(i, "H").format('h a'));

        var textarea = $('<textarea>');
        // Get the txt from Local Storage
        textarea.text(storedTasks[storagePosition]);
        
        // Give a class of past/present/future depending on the time of the day
        if (i < moment().format('H')) {
            textarea.addClass('past');
        } else if (i == moment().format('H')) {
            textarea.addClass('present');
        } else {
            textarea.addClass('future');
        }

        var input = $('<input>');
        input.addClass('saveBtn').attr('type', 'submit').attr('value', '');
        
        containerEl.append(form);
        form.append(row);
        row.append(time, textarea, input);
        storagePosition++;
    }
}

// Function to save the txt that is inserted
// Need to add the Local storage
var saveTxt = function (event) {
    event.preventDefault();
    
    var target = event.target.getAttribute("data-hour-index");
    var txtValue = event.target.querySelector('textarea');
    console.log(txtValue.value);
    storagePosition = 0;
    storedTasks[target] = txtValue.value;
    txtValue.innerHtml = txtValue.value;
    localStorage.setItem("tasks", JSON.stringify(storedTasks));
}


containerEl.on('submit', saveTxt);

generatePlanner();