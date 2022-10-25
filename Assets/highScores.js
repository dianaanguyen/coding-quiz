var highScores = $(".high-scores"); //target location for high scores

function showScores() {
    var allScores = localStorage.getItem("allScores");
    allScores = JSON.parse(allScores);

if (allScores !== null) {
    for (var i = 0; i <allScores.length; i++) {

        var createLi = $("<li>"); 
        createLi.text(allScores[i].initials + " " + allScores[i].score);
        highScores.append(createLi);
    }
    var clearButton = $("<button>"); //creates a clear button
    clearButton.attr("id", "clearButton");
    clearButton.text("CLEAR ALL");
    highScores.append(clearButton);
    var buttonToClear = $("#clearButton");
    buttonToClear.on("click", function() {
        highScores.text("");
        buttonToClear.hide ();
        localStorage.clear();
    })
};
}

showScores();