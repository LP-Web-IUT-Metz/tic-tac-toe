
var nb_rows = 3;
var nb_cols = 3;
var current_player = "cross";
var victory = {
    "cross" : 0,
    "circle" : 0
};

for(i=0; i <nb_rows; i++){
    $("table").append("<tr id='"+i+"'></tr>");
    for(j=0; j<nb_cols; j++){
        $("#"+i).append("<td class='blank' id='"+i+"-"+j+"'></td>");
    }
}

$("table > tr > td").each(function(){
    $(this).click(function(){
        if($(this).hasClass("blank")){
            $(this).removeClass("blank").addClass(current_player);
            var id = $(this).attr("id");
            var position = $(this).attr("id").split("-");
            checkDirections(id, current_player, position);

            switch_currentPlayer();
        }
    });
});

function switch_currentPlayer(){
    if(current_player == "cross"){
        current_player = "circle";
    } else {
        current_player = "cross";
    }
}

function checkDirections(id, team, position){
    var col = position[1];
    var diagonal_1 = [
        $("#"+id).parent().next().find("td").eq(col-1),
        $("#"+id).parent().prev().find("td").eq(parseInt(col)+1),
    ];
    var diagonal_2 = [
        $("#"+id).parent().prev().find("td").eq(col-1),
        $("#"+id).parent().next().find("td").eq(parseInt(col)+1),
    ];


    var victory = check(diagonal_1, team) || check(diagonal_2, team) || check(row, team) || check(col, team);
    console.log(victory);
}

function check(directions, team){
    
    var victory = 1;
    
    if(victory == 3){
        return true;
    } 
    return false;
}

function checkRow(id){
    var row = [
        $("#"+id).next(),
        $("#"+id).prev(),
    ];
    $(row).each(function(index){
        if(!!$(row[index]).attr("id")){
            var element = directions[index];
            if(element.hasClass(team)){
                victory ++;
            }
        }
    });
}
function checkCol(id){

    var col = [
        $("#"+id).parent().prev().find("td").eq(col),
        $("#"+id).parent().next().find("td").eq(col),
    ];
    $(col).each(function(index){
        if(!!$(col[index]).attr("id")){
            var element = col[index];
            if(element.hasClass(team)){
                victory ++;
            }
        }
    });
}

