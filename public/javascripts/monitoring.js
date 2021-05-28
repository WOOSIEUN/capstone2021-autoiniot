$(function() {

	// canvas
	var ctx1 = $('#chart1');
	var ctx2 = $('#chart2');
	var ctx3 = $('#chart3');
	var ctx4 = $('#chart4');

	// 차트 데이터
	var config1 = {
		type: 'bar',
		data: {
			labels: ['11월', '12월', '1월', '2월', '3월', '4월'],
			datasets: [{
				data: [8, 4, 13, 5, 19, 14],
				label: '입고',
				backgroundColor: [
					'rgba(255, 99, 132, 0.2)',
					'rgba(54, 162, 235, 0.2)',
					'rgba(255, 206, 86, 0.2)',
					'rgba(75, 192, 192, 0.2)',
					'rgba(153, 102, 255, 0.2)',
					'rgba(255, 159, 64, 0.2)'
				],
				borderColor: [
					'rgba(255, 99, 132, 1)',
					'rgba(54, 162, 235, 1)',
					'rgba(255, 206, 86, 1)',
					'rgba(75, 192, 192, 1)',
					'rgba(153, 102, 255, 1)',
					'rgba(255, 159, 64, 1)'
				],
				borderWidth: 1
			}]
		},
		options: {
			scales: {
				y: {
					beginAtZero: true
				}
			},
			plugins: {
				legend: {
					display: false
				},
				title: {
					display: true,
					text: '월별 입고 현황',
					font: {
						size: 25
					}

				},
			},
		}
	};

	var config2 = {
		type: 'doughnut',
		data: {
			labels: [ 'Red', 'Blue', 'Yellow'],
			datasets: [{
				label: '1234',
				data: [300, 50, 100],
				backgroundColor: [
					'rgb(255, 99, 132)',
					'rgb(54, 162, 235)',
					'rgb(255, 205, 86)'
				],
				hoverOffset: 4
			}]
		},
		options: {
			plugins: {
				legend: {
					display: false
				},
				title: {
					display: true,
					text: ' 물품수량 통계',
					font: {
						size: 25
					}
				}
			}
		}
	};

	var config3 = {
		type: 'line',
		data: {
			labels: [0, 4, 8, 12, 16, 20, 24],
			datasets: [{
				label: '온도',
				data: [13, 10, 8, 15, 19, 18, 15],
				fill: false,
				borderColor: 'orange',
				tension: 0.1
			}]
		},
		options: {
			scales: {
				y: {
					min: 0,
					max: 30
				}
			},
			plugins: {
				legend: {
					display: false
				},
				title: {
					display: true,
					text: '온도',
					font: {
						size: 25
					}
				},
			},
		}
	};

	var config4 = {
		type: 'bar',
		data: {
			labels: ['11월', '12월', '1월', '2월', '3월', '4월'],
			datasets: [
				{
					data: [10, 0, 7, 0, 23, 18],
					backgroundColor: '#ff6484',
				},
				{
					data: [0, -16, 0, -6, 0, 0],
					backgroundColor: '#38a2ea',
				}
			]
		},
		options: {
			plugins: {
				legend: {
					display: false
				},
				title: {
					display: true,
					text: '월별 영업이익',
					font: {
						size: 25
					}

				},
			},
			responsive: true,
			scales: {
				x: {
					stacked: true,
				},
				y: {
					stacked: true
				}
			}
		}
	};

	// 차트 생성
	var chart1 = new Chart(ctx1, config1);
	var chart2 = new Chart(ctx2, config2);
	var chart3 = new Chart(ctx3, config3);
	var chart4 = new Chart(ctx4, config4);

	// GraphQL 웹소켓 통신
	var ip = 'localhost';
	var port = 3000;

	var connection = new WebSocket(`ws://${ip}:${port}/graphql`, 'graphql-ws');
	connection.onopen = () => {
		var init = JSON.stringify({type:'connection_init', payload: {}});
		var listen = JSON.stringify({"id":"1","type":"start","payload":{"variables":{},"extensions":{},"operationName":null,"query":"subscription {value}"}});
		connection.send(init);
		connection.send(listen);
	}
	connection.onmessage = e => {
		var res = JSON.parse(e.data);
		if (res.type === 'data') {
			var newValue = res.payload.data.value;
			var tempArr = config3.data.datasets[0].data;
			for (var i = 0; i < tempArr.length - 1; i++) {
				tempArr[i] = tempArr[i + 1];
			}
			tempArr[tempArr.length - 1] = parseInt(newValue);
			chart3.update();
		}
	}
	connection.onerror = e =>{
		console.log(e);
	}

	(function wait () {
		setTimeout(wait, 1000000);
	})();
});
