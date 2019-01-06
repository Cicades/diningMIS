var ctx = document.getElementById("myChart");
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        datasets: [{
            label: '营业额',
            data: [19774, 21345, 19483, 24003, 23489, 24092, 20000],
            lineTension: 0,
            backgroundColor: [
                'rgba(255, 99, 132, 0.5)',
                'rgba(54, 162, 235, 0.5)',
                'rgba(255, 206, 86, 0.5)',
                'rgba(75, 192, 192, 0.5)',
                'rgba(153, 102, 255, 0.5)',
                'rgba(255, 159, 64, 0.5)',
                'rgba(128, 200, 64, 0.5)'
            ],
            borderColor: 'rgba(255,255,255,0.5)',
            borderWidth: 2,
            pointBackgroundColor: 'orange'
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: false
                }
            }]
        },
        legend: {
            display: false,
        }
    }
});