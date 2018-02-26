var initHeight = 400; //needs to match last number in viewBod attr
var initWidth = 600; //needs to match third number in viewBod attr
var numOfQues = 15;
var maxNum = 20;
var correct = 0;
var total = 0;

var svg = d3.select("div#svgHere")
.append("div")
.classed("svg-container", true) //container class to make it responsive
.append("svg")//responsive SVG needs these 2 attributes and no width and height attr
.attr("preserveAspectRatio", "xMinYMin meet")
.attr("viewBox", "0 0 600 400")//class to make it responsive
.classed("svg-content-responsive", true);

svg.append("image")
        .attr("xlink:href", "island2.png")
        .attr("height", initHeight)
        .attr("width", initWidth);

var getLocations = function(){
  var pts = [];
  for(var i=0; i<numOfQues; i++){
    var x = Math.round(Math.random() * (initWidth*0.5)) + initWidth*0.25;
    var y = Math.round(Math.random() * (initHeight*0.5)) + initHeight*0.25;
    var num1 = Math.round(Math.random() * maxNum);
    var num2 = Math.round(Math.random() * maxNum);
    pts.push({"x": x, "y": y, "n1": num1, "n2": num2, "sum": num1+num2, "answered": false});
  }
  return pts;
}

var locations = getLocations();

svg.selectAll("dot")
    .data(locations)
    .enter().append("circle")
    .attr("r", 5)
    .attr("cx", function(d) { return d.x; })
    .attr("cy", function(d) { return d.y; })
    .attr("fill", "red")
    .attr("stroke", "black")
    .attr("stroke-width", "1")
    .on("click", function(d) {
         Answer = window.prompt(  d.n1 + "+"  + d.n2 +  " = ", "");
         if (Answer == d.sum){
           correct++;
           msg = "Congratulations, your answer is correct.";
         }else{
           msg = "Oops!  " + Answer + " is incorrect.\n\n" + "The correct answer was " + d.sum + ".";
         }
         total++;
         score = "" + ((correct / (total)) * 100);
         score = score.substring(0,4) + "%";
         alert(msg + "\n\nYOUR SCORE:  " + score + "\n" + correct + " correct\n" + (total-correct) + " incorrect");
         d3.select(this).remove();
     });
svg.selectAll()

function check() {
  if ((total) != 0) {
    score = "" + ((correct / total) * 100);
    score = score.substring(0,4) + "%";
    alert("YOUR SCORE:  " + score + "\n" + correct + " correct\n" + (total-correct) + " incorrect")
  }
  else alert("You have not completed any exercises yet.");
}
