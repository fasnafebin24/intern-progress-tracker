function loadSummary() {
    fetch("https://zany-carnival-5gjqgqx5wwp4h4gp4-3000.app.github.dev/interns/1/summary")
        .then(response => response.json())
        .then(data => {
            document.getElementById("totalTasks").innerText = data.totalTasks;
            document.getElementById("completedTasks").innerText = data.completedTasks;
            document.getElementById("averageScore").innerText = data.averageEvaluationScore;
        })
        .catch(error => {
            console.log(error);
        });
}