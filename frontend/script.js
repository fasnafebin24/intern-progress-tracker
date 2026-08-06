function loadSummary(){

fetch("http://localhost:3000/interns/1/summary")

.then(response=>response.json())

.then(data=>{


document.getElementById("totalTasks").innerText =
data.totalTasks;


document.getElementById("completedTasks").innerText =
data.completedTasks;


document.getElementById("averageScore").innerText =
data.averageEvaluationScore;


})

.catch(error=>{

console.log(error);

});


}