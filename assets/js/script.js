var FormEl = $('form');
var timeEl = $('.hour');
var textEl = $('textarea');
var containerEl = $('.container');
var TimeRange = [9, 17];
// Show the current day
$("#currentDay").text(moment().format("dddd, MMMM Do YYYY, h:mm:ss a"));

//Function to generate the planner
var generatePlanner = function(){
    for(i=TimeRange[0]; i <= TimeRange[1]; i++){
        var row = $('<div>');
        row.addClass('row');
        
        var time = $('<div>');
        time.addClass('hour').text(moment(i, "H").format('h a'));

        var textarea = $('<textarea>');
        textarea.text("testttt");

       if(i < moment().format('H')){
            textarea.addClass('past');
        }else if(i == moment().format('H')){
            textarea.addClass('present');
        }else{
            textarea.addClass('future');
        } 

        var input = $('<input>');
        input.addClass('saveBtn').attr('type', 'submit').attr('value', '');
        FormEl.append(row);
        row.append(time, textarea, input);
    }
}

// Function to save the txt that is inserted
// Need to add the Local storage
var saveTxt = function(event){
    event.preventDefault();
    console.log(timeEl.val());
    textEl.innerHtml = textEl.val();
}


FormEl.on('submit', saveTxt);
generatePlanner();