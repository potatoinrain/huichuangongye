$(function(){
	//页面淡入效果
	$(".animsition").animsition({
	    inClass               :   'fade-in',
	    outClass              :   'fade-out',
	    inDuration            :    300,
	    outDuration           :    1000,
	    // e.g. linkElement   :   'a:not([target="_blank"]):not([href^=#])'
	    loading               :    false,
	    loadingParentElement  :   'body', //animsition wrapper element
	    loadingClass          :   'animsition-loading',
	    unSupportCss          : [ 'animation-duration',
	                              '-webkit-animation-duration',
	                              '-o-animation-duration'
	                            ],
	    //"unSupportCss" option allows you to disable the "animsition" in case the css property in the array is not supported by your browser.
	    //The default setting is to disable the "animsition" in a browser that does not support "animation-duration".
	    
	    overlay               :   false,
	    
	    overlayClass          :   'animsition-overlay-slide',
	    overlayParentElement  :   'body'
  	});
	
	document.onreadystatechange = subSomething;
	function subSomething() 
	{ 
		if(document.readyState == "complete"){
			$('#loader').hide();
		} 
	} 

	//顶部时间
	function getTime(){
		var myDate = new Date();
		var myYear = myDate.getFullYear(); //获取完整的年份(4位,1970-????)
		var myMonth = myDate.getMonth()+1; //获取当前月份(0-11,0代表1月)
		var myToday = myDate.getDate(); //获取当前日(1-31)
		var myDay = myDate.getDay(); //获取当前星期X(0-6,0代表星期天)
		var myHour = myDate.getHours(); //获取当前小时数(0-23)
		var myMinute = myDate.getMinutes(); //获取当前分钟数(0-59)
		var mySecond = myDate.getSeconds(); //获取当前秒数(0-59)
		var week = ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'];
		var nowTime;
		
		nowTime = myYear+'-'+fillZero(myMonth)+'-'+fillZero(myToday)+'&nbsp;&nbsp;'+week[myDay]+'&nbsp;&nbsp;'+fillZero(myHour)+':'+fillZero(myMinute)+':'+fillZero(mySecond);
		$('.topTime').html(nowTime);
	};
	function fillZero(str){
		var realNum;
		if(str<10){
			realNum	= '0'+str;
		}else{
			realNum	= str;
		}
		return realNum;
	}
	setInterval(getTime,1000);

	function totalNum(obj,speed){
		var singalNum = 0;
		var timer;
		var totalNum = obj.attr('total');

		if(totalNum){
			timer = setInterval(function(){
				singalNum+=speed;
				if(singalNum>=totalNum){
					singalNum=totalNum;
					clearInterval(timer);
				}
				obj.html(singalNum);
			},1);
		}
	}
	
	var data_2021 = {};
	var data_2020 = {};
	var data_2019 = {};
	function data_request(){
		var dataUrl = "http://huichuan.gmh.zxytinfo.com/app/outputYear/datas";
		var result = ajaxGet(dataUrl);
		var data = result.data;
		
		for(var i=0;i<data.length;i++){
			var obj = data[i]
			if(obj.year == "2019年"){
				data_2019 = obj;
			} else if (obj.year == "2020年"){
				data_2020 = obj;
			} else{
				data_2021 = obj;
			}
		}
		
		var html = "<span class=\"dateTypeChoose data_2021 selected\" style=\"cursor: pointer;float: right;\" >" + data_2021.year + "</span>" +
					"<span class=\"dateTypeChoose selected\" style=\"float: right;\">/</span>" +
					"<span class=\"dateTypeChoose data_2020\" style=\"cursor: pointer;float: right;\" >" + data_2020.year + "</span>" +
					"<span class=\"dateTypeChoose selected\" style=\"float: right;\">/</span>" +
					"<span class=\"dateTypeChoose data_2019\" style=\"cursor: pointer;float: right;\" >" + data_2019.year + "</span>"
		$("#left .itemTit").append(html);
	}
	data_request();
	
	//高德地图
    // var myMap = new AMap.Map('myMap',{
    //     resizeEnable: true,
    //     zoom: 12,
    //     mapStyle: 'amap://styles/darkblue',
    //     center: [106.934195,27.753007],
    // });
    
    /* var infoWindow = new AMap.InfoWindow({
    	offset: new AMap.Pixel(16, -36)
    });
  	function markerClick(e){
    	infoWindow.setContent(e.target.content);
    	infoWindow.open(myMap,e.target.getPosition());
	}
	myMap.on('click',function(){
		infoWindow.close();
	});
	
	var circle = new AMap.Circle({
	    center: new AMap.LngLat("106.894779", "27.831083"), // 圆心位置
	    radius: 900,  //半径
	    strokeColor: "#1eb6fe",  //线颜色
	    strokeOpacity: 1,  //线透明度
	    strokeWeight: 3,  //线粗细度
	    fillColor: "#32ffc7",  //填充颜色
	    fillOpacity: 0.35 //填充透明度
	});
	
	//高坪工业园
	var circle1 = new AMap.Circle({
	    center: new AMap.LngLat("106.911704", "27.815316"), // 圆心位置
	    radius: 1200,  //半径
	    strokeColor: "#1eb6fe",  //线颜色
	    strokeOpacity: 1,  //线透明度
	    strokeWeight: 3,  //线粗细度
	    fillColor: "#32ffc7",  //填充颜色
	    fillOpacity: 0.35 //填充透明度
	});
	
	//田沟
	var circle2 = new AMap.Circle({
	    center: new AMap.LngLat("106.92619", "27.759025"), // 圆心位置
	    radius: 600,  //半径
	    strokeColor: "#1eb6fe",  //线颜色
	    strokeOpacity: 1,  //线透明度
	    strokeWeight: 3,  //线粗细度
	    fillColor: "#32ffc7",  //填充颜色
	    fillOpacity: 0.35 //填充透明度
	});
	//航天
	var circle3 = new AMap.Circle({
	    center: new AMap.LngLat("106.951443", "27.720804"), // 圆心位置
	    radius: 600,  //半径
	    strokeColor: "#1eb6fe",  //线颜色
	    strokeOpacity: 1,  //线透明度
	    strokeWeight: 3,  //线粗细度
	    fillColor: "#32ffc7",  //填充颜色
	    fillOpacity: 0.35 //填充透明度
	});
	//外高桥
	var circle4 = new AMap.Circle({
	    center: new AMap.LngLat("106.904396", "27.700096"), // 圆心位置
	    radius: 600,  //半径
	    strokeColor: "#1eb6fe",  //线颜色
	    strokeOpacity: 1,  //线透明度
	    strokeWeight: 3,  //线粗细度
	    fillColor: "#32ffc7",  //填充颜色
	    fillOpacity: 0.35 //填充透明度
	});
	
	myMap.add(circle)
	myMap.add(circle1)
	myMap.add(circle2)
	myMap.add(circle3)
	myMap.add(circle4)
	
	//覆盖物事件
	circle.on('click', function(){
		show_list()
	})
	circle1.on('click', function(){
		show_list()
	})
	circle2.on('click', function(){
		show_list()
	})
	circle3.on('click', function(){
		show_list()
	})
	circle4.on('click', function(){
		show_list()
	}) */

	//公司构成
	var pieChart1 = echarts.init(document.getElementById('companyPie'));
	pieChart1.setOption({
	  color:["#87cefa","#ff7f50","#32cd32","#da70d6",],
	  legend: {
	      top: '5%',
	      left: 'center',
	      textStyle : {
	          color : '#ffffff',
	      },
	      data : ['先进装备制造产业','优质烟酒产业','生态特色食品产业','战略新兴产业'],
	  },
	  tooltip : {
	      trigger: 'item',
	      formatter: "{b}<br/>{c}家 ({d}%)"
	  },
	  series : [
	      {
	          name:'产业分布',
	          type:'pie',
	          radius : '50%',
	          center : ['50%', '50%'],
			  avoidLabelOverlap: false,
	    //       itemStyle: {
				 //  borderRadius: 10,
				 //  borderColor: '#fff',
				 //  borderWidth: 2
			  // },
			  // label: {
				 //  show: false,
				 //  position: 'center'
			  // },
			  emphasis: {
				  label: {
					  show: true,
					  fontSize: '12',
					  fontWeight: 'bold'
				  }
			  },
			  // labelLine: {
				 //  show: false
			  // },
	          data:[
	              {value:43, name:'先进装备制造产业'},
	              {value:7, name:'优质烟酒产业'},
	              {value:9, name:'生态特色食品产业'},
	              {value:24, name:'战略新兴产业'}
	          ]
	      }
	  ]
	  });

	//产值
	var names_produce = new Array();
	var datas_produce = new Array();
	var datas_produceAdd = new Array();
	var datas_produceSpeed = new Array();

	$(".data_2021").on("click", function(){
		names_produce.length = 0
		datas_produce.length = 0
		datas_produceAdd.length = 0
		datas_produceSpeed.length = 0
		
		var items = data_2021.items;
		var names = new Array();
		var datas = new Array();
		for(var i=0;i<items.length;i++){
			var item = items[i]
			names_produce.push(item.name)
			datas_produce.push(item.value1)
			datas_produceAdd.push(item.value2)
			datas_produceSpeed.push(item.value3)
		}
		$(".data_2021").addClass("selected");
		$(".data_2020").removeClass("selected")
		$(".data_2019").removeClass("selected")
		produceChartInit()
		produceAddChartInit()
		produceSpeedChartInit()
	})
	
	$(".data_2020").on("click", function(){
		names_produce.length = 0
		datas_produce.length = 0
		datas_produceAdd.length = 0
		datas_produceSpeed.length = 0
		
		var items = data_2020.items;
		var names = new Array();
		var datas = new Array();
		for(var i=0;i<items.length;i++){
			var item = items[i]
			names_produce.push(item.name)
			datas_produce.push(item.value1)
			datas_produceAdd.push(item.value2)
			datas_produceSpeed.push(item.value3)
		}
		$(".data_2020").addClass("selected");
		$(".data_2021").removeClass("selected")
		$(".data_2019").removeClass("selected")
		produceChartInit()
		produceAddChartInit()
		produceSpeedChartInit()
	})
	
	$(".data_2019").on("click", function(){
		names_produce.length = 0
		datas_produce.length = 0
		datas_produceAdd.length = 0
		datas_produceSpeed.length = 0
		
		var items = data_2019.items;
		var names = new Array();
		var datas = new Array();
		for(var i=0;i<items.length;i++){
			var item = items[i]
			names_produce.push(item.name)
			datas_produce.push(item.value1)
			datas_produceAdd.push(item.value2)
			datas_produceSpeed.push(item.value3)
		}
		$(".data_2019").addClass("selected");
		$(".data_2020").removeClass("selected")
		$(".data_2021").removeClass("selected")
		produceChartInit()
		produceAddChartInit()
		produceSpeedChartInit()
	})
	
	var produceChart = echarts.init(document.getElementById('produceChart'));
	function produceChartInit(){
		produceChart.clear()
		produceChart.setOption({
			color: ["rgb(18,250,110)","rgb(255,68,69)", "rgb(255,230,68)", , "rgb(18,248,209)", "rgb(19,182,250)", "rgb(19,84,250)",
				"rgb(61,18,248)", "rgb(121,20,249)", "rgb(224,19,249)", "rgb(249,17,226)", 
				"rgb(255,157,69)", "rgb(257,116,69)"
			],
			grid: {
				left: '2%',
				right: '2%',
				bottom: '12%',
				top: '12%',
				containLabel: true
			},
			tooltip: {
				trigger: 'axis',
				axisPointer: {
					type: 'cross',
					crossStyle: {
						color: '#999'
					}
				}
			},
			xAxis: [
				{
					axisLine: {
						onZero: false,
						lineStyle: {
							color: 'rgb(19,182,250)'
						}
					},
					axisTick: {
						show: false,
						lineStyle:{
							color: 'rgb(19,182,250)'
						}
					},
					type: 'category',
					data: names_produce,
					axisPointer: {
						type: 'shadow'
					},
					axisLabel: {
					  interval: 0,
					  rotate: 0,
					  align: 'center',
					  margin: 15
					}
				}
			],
			yAxis: [
				{
					axisLine: {
						onZero: false,
						lineStyle: {
							color: 'rgb(255,230,68)'
						}
					},
					splitLine: {
						lineStyle: {
							color: 'rgb(255,157,69)'
						}
					},
					type: 'value',
					name: '产值(千)',
					// min: null,
					// max: 150,
					// interval: 25,
					// offset: 0,
					axisLabel: {
						formatter: '{value}'
					}
				}
			],
			series: [
				{
					name: '产值',
					type: 'bar',
					data: datas_produce,
					barWidth: 15,
					itemStyle:{
						normal: {
							color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
								offset: 0,
								color: 'rgb(18,250,110)'
							}, {
								offset: 0.5,
								color: 'rgb(18,248,209)'
							}, {
								offset: 1,
								color: 'rgb(19,182,250)'
							}]),
						}
					}
				}
			]
		}, true);
	}

	//产值构成
	var produceAddChart = echarts.init(document.getElementById('produceAddChart'), 'shine');
	function produceAddChartInit(){
		produceAddChart.clear()
		produceAddChart.setOption({
			color: ["rgb(18,250,110)","rgb(255,68,69)", "rgb(255,230,68)", , "rgb(18,248,209)", "rgb(19,182,250)", "rgb(19,84,250)",
				"rgb(61,18,248)", "rgb(121,20,249)", "rgb(224,19,249)", "rgb(249,17,226)", 
				"rgb(255,157,69)", "rgb(257,116,69)"
			],
			grid: {
				left: '2%',
				right: '2%',
				bottom: '12%',
				top: '12%',
				containLabel: true
			},
			tooltip: {
				trigger: 'axis',
				axisPointer: {
					type: 'cross',
					crossStyle: {
						color: '#999'
					}
				}
			},
			xAxis: [
				{
					axisLine: {
						onZero: false,
						lineStyle: {
							color: 'rgb(19,182,250)'
						}
					},
					axisTick: {
						show: false,
						lineStyle:{
							color: 'rgb(19,182,250)'
						}
					},
					type: 'category',
					data: names_produce,
					axisPointer: {
						type: 'shadow'
					},
					axisLabel: {
					  interval: 0,
					  rotate: 0,
					  align: 'center',
					  margin: 15
					}
				}
			],
			yAxis: [
				{
					axisLine: {
						onZero: false,
						lineStyle: {
							color: 'rgb(255,230,68)'
						}
					},
					splitLine: {
						lineStyle: {
							color: 'rgb(255,157,69)'
						}
					},
					type: 'value',
					name: '产值(千)',
					// min: null,
					// max: 150,
					// interval: 25,
					// offset: 0,
					axisLabel: {
						formatter: '{value}'
					}
				}
			],
			series: [
				{
					name: '增加值',
					type: 'bar',
					data: datas_produceAdd,
					barWidth: 15,
					itemStyle:{
						normal: {
							color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
								offset: 0,
								color: 'rgb(18,250,110)'
							}, {
								offset: 0.5,
								color: 'rgb(18,248,209)'
							}, {
								offset: 1,
								color: 'rgb(19,182,250)'
							}]),
						}
					}
				}
			]
		});
	}
	
	//产值构成
	var produceSpeedChart = echarts.init(document.getElementById('produceSpeedChart'), 'shine');
	function produceSpeedChartInit(){
		produceSpeedChart.clear()
		produceSpeedChart.setOption({
			color: ["rgb(18,250,110)","rgb(255,68,69)", "rgb(255,230,68)", , "rgb(18,248,209)", "rgb(19,182,250)", "rgb(19,84,250)",
				"rgb(61,18,248)", "rgb(121,20,249)", "rgb(224,19,249)", "rgb(249,17,226)", 
				"rgb(255,157,69)", "rgb(257,116,69)"
			],
			grid: {
				left: '2%',
				right: '2%',
				bottom: '12%',
				top: '12%',
				containLabel: true
			},
			tooltip: {
				trigger: 'axis',
				axisPointer: {
					type: 'cross',
					crossStyle: {
						color: '#999'
					}
				}
			},
			xAxis: [
				{
					axisLine: {
						onZero: false,
						lineStyle: {
							color: 'rgb(19,182,250)'
						}
					},
					axisTick: {
						show: false,
						lineStyle:{
							color: 'rgb(19,182,250)'
						}
					},
					type: 'category',
					data: names_produce,
					axisPointer: {
						type: 'shadow'
					},
					axisLabel: {
					  interval: 0,
					  rotate: 0,
					  align: 'center',
					  margin: 15
					}
				}
			],
			yAxis: [
				{
					axisLine: {
						onZero: false,
						lineStyle: {
							color: 'rgb(255,230,68)'
						}
					},
					splitLine: {
						lineStyle: {
							color: 'rgb(255,157,69)'
						}
					},
					type: 'value',
					name: '增速',
					min: -30,
					max: 90,
					interval: 30,
					offset: 0,
					axisLabel: {
						formatter: '{value}%'
					}
				}
			],
			series: [
				{
					name: '增速',
					type: 'line',
					data: datas_produceSpeed
				}
			]
		});
	}
	
	$(".data_2021")[0].click()

	//文字滚动
	$('#FontScroll').FontScroll({time: 3000,num: 1});
	setTimeout(function(){
		
		$('.progress').each(function(i,ele){
			var PG = $(ele).attr('progress');
			var PGNum = parseInt(PG);
			var zero = 0;
			var speed = 50;
			var timer;
			
			$(ele).find('h4').html(zero+'%');
			if(PGNum<10){
				$(ele).find('.progressBar span').addClass('bg-red');
				$(ele).find('h3 i').addClass('color-red');
			}else if(PGNum>=10 && PGNum<50){
				$(ele).find('.progressBar span').addClass('bg-yellow');
				$(ele).find('h3 i').addClass('color-yellow');
			}else if(PGNum>=50 && PGNum<100){
				$(ele).find('.progressBar span').addClass('bg-blue');
				$(ele).find('h3 i').addClass('color-blue');
			}else{
				$(ele).find('.progressBar span').addClass('bg-green');
				$(ele).find('h3 i').addClass('color-green');
			}
			$(ele).find('.progressBar span').animate({width: PG},PGNum*speed);
			timer = setInterval(function(){
				zero++;
				$(ele).find('h4').html(zero+'%');
				if(zero==PGNum){
					clearInterval(timer);
				}
			},speed);
		});

		

		// //基本信息
		// totalNum($('#indicator1'),1);
		// totalNum($('#indicator2'),1);
		// totalNum($('#indicator3'),1);

		// //总计运单数
		// totalNum($('#totalNum'),1000);

		// myChart1.setOption(option1);
	
	},500);


	var summaryPie1,summaryPie2,summaryPie3,summaryBar,summaryLine;
	var pieData;
	function setSummary(){
		summaryPie1 = echarts.init(document.getElementById('summaryPie1'));
		summaryPie2 = echarts.init(document.getElementById('summaryPie2'));
		summaryPie3 = echarts.init(document.getElementById('summaryPie3'));
		
		var ww = $(window).width();
		var pieData;
		if(ww>1600){
			pieData = {
				pieTop: '40%',
				pieTop2: '36%',
				titleSize: 20,
				pieRadius: [80, 85],
				itemSize: 32
			}
		}else{
			pieData = {
				pieTop: '30%',
				pieTop2: '26%',
				titleSize: 16,
				pieRadius: [60, 64],
				itemSize: 28
			}
		};
		//弹出框调用ECharts饼图
		var pieOption1 = {
		    title: {
		    	x: 'center',
		        y: pieData.pieTop,
		        text: '司机',
		        textStyle: {
		            fontWeight: 'normal',
		            color: '#ffd325',
		            fontSize: pieData.titleSize,
		        },
		        subtext: '总数：100人\n今日工作：25人',
		        subtextStyle:{
		        	color: '#fff',
		        }
		    },
		    tooltip: {
		        show: false,
		    },
		    toolbox: {
		        show: false,
		    },
		    
		    series: [{
		        type: 'pie',
		        clockWise: false,
		        radius: pieData.pieRadius,
		        hoverAnimation: false,
		        center: ['50%', '50%'],
		        data: [{
		            value: 25,
		            label: {
		                normal: {
		                    formatter: '{d}%',
		                    position: 'outside',
		                    show: true,
		                    textStyle: {
		                        fontSize: pieData.itemSize,
		                        fontWeight: 'normal',
		                        color: '#ffd325'
		                    }
		                }
		            },
		            itemStyle: {
		                normal: {
		                    color: '#ffd325',
		                    shadowColor: '#ffd325',
		                    shadowBlur: 10
		                }
		            }
		        }, {
		            value: 75,
		            name: '未工作',
		            itemStyle: {
					    normal: {
					        color: 'rgba(44,59,70,1)', // 未完成的圆环的颜色
					        label: {
					            show: false
					        },
					        labelLine: {
					            show: false
					        }
					    },
					    emphasis: {
					        color: 'rgba(44,59,70,1)' // 未完成的圆环的颜色
					    }
					},
		            itemStyle: {
	                    normal: {
	                        color: '#11284e',
	                        shadowColor: '#11284e',
	                    }
	                },
		        }]
		    }]
		}
		var pieOption2 = {
		    title: {
		    	x: 'center',
		        y: pieData.pieTop,
		        text: '车辆',
		        textStyle: {
		            fontWeight: 'normal',
		            color: '#32ffc7',
		            fontSize: pieData.titleSize
		        },
		        subtext: '总数：100辆\n今日工作：75辆人',
		        subtextStyle:{
		        	color: '#fff',
		        }
		    },
		    tooltip: {
		        show: false,
		    },
		    toolbox: {
		        show: false,
		    },
		    
		    series: [{
		        type: 'pie',
		        clockWise: false,
		        radius: pieData.pieRadius,
		        hoverAnimation: false,
		        center: ['50%', '50%'],
		        data: [{
		            value: 75,
		            label: {
		                normal: {
		                    formatter: '{d}%',
		                    position: 'outside',
		                    show: true,
		                    textStyle: {
		                        fontSize: pieData.itemSize,
		                        fontWeight: 'normal',
		                        color: '#32ffc7'
		                    }
		                }
		            },
		            itemStyle: {
		                normal: {
		                    color: '#32ffc7',
		                    shadowColor: '#32ffc7',
		                    shadowBlur: 10
		                }
		            }
		        }, {
		            value: 25,
		            name: '未工作',
		            itemStyle: {
					    normal: {
					        color: 'rgba(44,59,70,1)', // 未完成的圆环的颜色
					        label: {
					            show: false
					        },
					        labelLine: {
					            show: false
					        }
					    },
					    emphasis: {
					        color: 'rgba(44,59,70,1)' // 未完成的圆环的颜色
					    }
					},
		            itemStyle: {
	                    normal: {
	                        color: '#11284e',
	                        shadowColor: '#11284e',
	                    }
	                },
		        }]
		    }]
		}
		var pieOption3 = {
		    title: {
		    	x: 'center',
		        y: pieData.pieTop2,
		        text: '运单',
		        textStyle: {
		            fontWeight: 'normal',
		            color: '#1eb6fe',
		            fontSize: pieData.titleSize
		        },
		        subtext: '总数：100单\n正常单：50单\n异常单：50单',
		        subtextStyle:{
		        	color: '#fff',
		        }
		    },
		    tooltip: {
		        show: false,
		    },
		    toolbox: {
		        show: false,
		    },
		    
		    series: [{
		        type: 'pie',
		        clockWise: false,
		        radius: pieData.pieRadius,
		        hoverAnimation: false,
		        center: ['50%', '50%'],
		        data: [{
		            value: 50,
		            label: {
		                normal: {
		                    formatter: '{d}%',
		                    position: 'outside',
		                    show: true,
		                    textStyle: {
		                        fontSize: pieData.itemSize,
		                        fontWeight: 'normal',
		                        color: '#1eb6fe'
		                    }
		                }
		            },
		            itemStyle: {
		                normal: {
		                    color: '#1eb6fe',
		                    shadowColor: '#1eb6fe',
		                    shadowBlur: 10
		                }
		            }
		        }, {
		            value: 50,
		            name: '未工作',
		            itemStyle: {
					    normal: {
					        color: 'rgba(44,59,70,1)', // 未完成的圆环的颜色
					        label: {
					            show: false
					        },
					        labelLine: {
					            show: false
					        }
					    },
					    emphasis: {
					        color: 'rgba(44,59,70,1)' // 未完成的圆环的颜色
					    }
					},
		            itemStyle: {
	                    normal: {
	                        color: '#11284e',
	                        shadowColor: '#11284e',
	                    }
	                },
		        }]
		    }]
		}
	
		//弹出框调用ECharts柱状图
		summaryBar = echarts.init(document.getElementById('summaryBar'));
		var barOption = {

			tooltip: {
				trigger: 'item',  
	            formatter: function(params) {  
	                var res = '本月'+params.name+'号运单数：'+params.data; 
	                return res;  
	            }  
			},
			grid: {
				top: '20%',
				left: '15%',
		        width: '80%',
		        height: '80%',
		        containLabel: true
		    },
			xAxis: {
				data: ['美的南沙分厂','美的商业空调事业部','佛山信华'],
				axisLabel: {
	                show: true,
	                textStyle: {
	                    fontSize: '12px',
	                    color: '#fff',
	                }
	           	},
	           	axisLine:{  
	                lineStyle:{  
	                    color:'#fff',  
	                    width:1, 
	                }  
	            }  
			},

			yAxis: {
				axisLabel: {
	                show: true,
	                textStyle: {
	                    fontSize: '12px',
	                    color: '#fff',
	                }
	           	},
	           	axisLine:{  
	                lineStyle:{  
	                    color:'#fff',  
	                    width:1, 
	                }  
	            },
	            splitLine:{  
		            show:false,
	    		}  
			},

			series :{
				name: '',
				type: 'bar',
				barWidth : 20,
				data: ['15','13','17'],
				itemStyle: {
	                normal: {
	                    color: new echarts.graphic.LinearGradient(
	                        0, 0, 0, 1,
	                        [
	                            {offset: 0, color: '#3876cd'},
	                            {offset: 0.5, color: '#45b4e7'},
	                            {offset: 1, color: '#54ffff'}
	                        ]
	                    ),
	                },
	            },
			},
		}

		//弹出框调用ECharts折线图
		summaryLine = echarts.init(document.getElementById('summaryLine'));
		var lineOption = {

			tooltip: {
				trigger: 'item',  
	            formatter: function(params) {  
	                var res = '本月'+params.name+'号运单数：'+params.data; 
	                return res;  
	            }  
			},
			grid: {
				top: '20%',
				left: '0%',
		        width: '100%',
		        height: '80%',
		        containLabel: true
		    },
			xAxis: {
				data: ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31'],
				axisLabel: {
	                show: true,
	                textStyle: {
	                    fontSize: '12px',
	                    color: '#3e70b0',
	                }
	           	},
	           	axisLine:{  
	                lineStyle:{  
	                    color:'#0e2c52',  
	                    width:1,
	                }  
	            }  
			},

			yAxis: {
				axisLabel: {
	                show: true,
	                textStyle: {
	                    fontSize: '12px',
	                    color: '#3e70b0',
	                }
	           	},
	           	axisLine:{  
	                lineStyle:{  
	                    color:'#0e2c52',  
	                    width:1, 
	                }  
	            },
	            splitLine:{  
		            show:true,
		            lineStyle:{  
	                    color:'#0e2c52',  
	                    width:1, 
	                }  
	    		}  
			},

			series :{
				name: '',
				type: 'line',
				data: ['5','14','3','6','8','18','11','4','8','7','16','13','6','10','11','9','19','13','4','20','12','7','13','15','8','3','9','16','11','16','8'],
				areaStyle: {
					normal:{
						color: 'rgba(79,237,247,0.3)',
					}
				},
				itemStyle: {
	                normal: {
	                    lineStyle: {
	                    	color: '#00dafb',
	                    	width: 1,
	                    },
	                    color: '#00dafb',
	                },
	            },
			},
		}

		summaryPie1.setOption(pieOption1);
		summaryPie2.setOption(pieOption2);
		summaryPie3.setOption(pieOption3);
		summaryBar.setOption(barOption);
		summaryLine.setOption(lineOption);
	}

	//弹窗
	$('.summaryBtn').on('click',function(){
		return;
		$('.filterbg').show();
		$('.popup').show();
		$('.popup').width('3px');
		$('.popup').animate({height: '76%'},400,function(){
			$('.popup').animate({width: '82%'},400);
		});
		setTimeout(summaryShow,800);
	});
	$('.popupClose').on('click',function(){
		$('.popupClose').css('display','none');
		$('.summary').hide();
		summaryPie1.clear();
		summaryPie2.clear();
		summaryPie3.clear();
		summaryBar.clear();
		summaryLine.clear();
		$('.popup').animate({width: '3px'},400,function(){
			$('.popup').animate({height: 0},400);
		});
		setTimeout(summaryHide,800);
	});
	function summaryShow(){
		$('.popupClose').css('display','block');
		$('.summary').show();
		setSummary();
		
	};
	function summaryHide(){
		$('.filterbg').hide();
		$('.popup').hide();
		$('.popup').width(0);
	};

	$(window).resize(function(){
		// myChart1.resize();
		try{
			summaryPie1.resize();
			summaryPie2.resize();
			summaryPie3.resize();
			summaryBar.resize();
			summaryLine.resize();
		}catch(err){
			return false;
		}
	});



	/***************2018-01-03增加js****************/

	//地图上的搜索
	$('.searchBtn').on('click',function(){
		$(this).hide();
		$('.searchInner').addClass('open');
		setTimeout(function(){
			$('.searchInner').find('form').show();
		},400);
	});

	$('#btn_search').on('click',function(event){
		list();
	});
	
	$("#search_name").on("keydown",function(event){
		var keyCode = event.keyCode || event.which;
		if(keyCode == "13"){
			list()
			event.preventDefault();
		}
	});
	
	$('body').on('click',function(){
		$('.searchInner').find('form').hide();
		$('.searchInner').removeClass('open');
		setTimeout(function(){
			$('.searchBtn').show();
		},400);
	});

	//车辆状态滚动条样式
	$('.stateUl').niceScroll({
        cursorcolor: "#045978",//#CC0071 光标颜色
        cursoropacitymax: 0.6, //改变不透明度非常光标处于活动状态（scrollabar“可见”状态），范围从1到0
        touchbehavior: false, //使光标拖动滚动像在台式电脑触摸设备
        cursorwidth: "4px", //像素光标的宽度
        cursorborder: "0", // 	游标边框css定义
        cursorborderradius: "4px",//以像素为光标边界半径
        autohidemode: false //是否隐藏滚动条
    });

    //车辆信息工作时间表
    //模拟数据
    var carData = [
    	{
    		dateLable: "2021-06-01 星期二",
    		data: {
    			workTime: [
    				{start: "09:30",end: "12:00"},
    				{start: "14:30",end: "17:30"}
    			],
    			standard: [
    				{start: "09:00",end: "12:00"},
    				{start: "13:00",end: "18:00"}
    			]
    		}
    	},
    	{
    		dateLable: "2021-06-01 星期三",
    		data: {
    			workTime: [
    				{start: "09:30",end: "12:00"},
    				{start: "14:30",end: "17:30"}
    			],
    			standard: [
    				{start: "09:00",end: "12:00"},
    				{start: "13:00",end: "18:00"}
    			]
    		}
    	},
    	{
    		dateLable: "2021-06-01 星期四",
    		data: {
    			workTime: [
    				{start: "09:30",end: "12:00"},
    				{start: "14:30",end: "17:30"}
    			],
    			standard: [
    				{start: "09:00",end: "12:00"},
    				{start: "13:00",end: "18:00"}
    			]
    		}
    	},
    	{
    		dateLable: "2021-06-01 星期五",
    		data: {
    			workTime: [
    				{start: "09:30",end: "12:00"},
    				{start: "14:30",end: "17:30"},
					{start: "18:00",end: "24:00"}
    			],
    			standard: [
    				{start: "09:00",end: "12:00"},
    				{start: "13:00",end: "17:30"},
					{start: "18:00",end: "24:00"}
    			]
    		}
    	},
    	{
    		dateLable: "2021-06-01 星期六",
    		data: {
    			workTime: [
					{start: "01:00",end: "09:00"},
    				{start: "09:30",end: "12:00"},
    				{start: "14:00",end: "17:30"}
    			],
    			standard: [
    				{start: "09:30",end: "12:00"},
    				{start: "14:00",end: "17:30"}
    			]
    		}
    	},
    	{
    		dateLable: "2021-06-01 星期日",
    		data: {
    			workTime: [
    				{start: "09:30",end: "12:00"},
    				{start: "14:00",end: "17:30"}
    			],
    			standard: [
    				{start: "09:30",end: "12:00"},
    				{start: "14:00",end: "17:30"}
    			]
    		}
    	},
    	{
    		dateLable: "2021-06-01 星期二",
    		data: {
    			workTime: [
    				{start: "09:30",end: "12:00"},
    				{start: "14:30",end: "17:30"}
    			],
    			standard: [
    				{start: "09:00",end: "12:00"},
    				{start: "13:00",end: "18:00"}
    			]
    		}
    	}
    ];

    function Schedule(){
    	var Item = $('.dataBox');
    	var Size = Item.eq(0).width();
    	var oDay = 24*60;

    	function getMin(timeStr){
    		var timeArray = timeStr.split(":");
    		var Min = parseInt(timeArray[0])*60+parseInt(timeArray[1]);
    		return Min;
    	}

    	//在时间轴上添加工作时间数据
    	Item.each(function(i,ele){
    		var ItemData = carData[i];
    		function addData(obj,dataParam){
    			for(var j=0;j<dataParam.length;j++){
	    			var pos,wid,workCeil,sDate,sStart,sEnd,sConsume;
	    			pos = getMin(dataParam[j].start)/oDay*100+'%';
	    			wid = (getMin(dataParam[j].end)-getMin(dataParam[j].start))/oDay*100+'%';
	    			sDate = ItemData.dateLable;
	    			sStart = dataParam[j].start;
	    			sEnd = dataParam[j].end;
	    			sConsume = getMin(dataParam[j].end)-getMin(dataParam[j].start);
	    			workCeil = '<span style="width: '+wid+';left: '+pos+'" sDate="'+sDate+'" sStart="'+sStart+'" sEnd="'+sEnd+'" sConsume="'+sConsume+'"></span>';
	    			obj.append(workCeil);
	    		}
    		}
    		addData($(ele).find('.workTime'),ItemData.data.workTime);
    		addData($(ele).find('.standard'),ItemData.data.standard);
    	});

    	//添加总用时与总单数
    	var Total = $('.totalItem');
    	Total.each(function(i,ele){
    		var ItemData = carData[i].data.workTime;
    		var timeUsed = 0;
    		for(var j=0;j<ItemData.length;j++){
				timeUsed+= getMin(ItemData[j].end)-getMin(ItemData[j].start);
    		}
    		var realHour = Math.floor(timeUsed/60);
    		$(ele).find('span').eq(0).html(realHour+':'+(timeUsed-realHour*60));
    		$(ele).find('span').eq(1).html(ItemData.length);
    	});
    };
    Schedule();

    //鼠标移入运单显示信息框
    $('.workTime').on('mouseenter','span',function(ev){
    	var x = ev.clientX;
    	var y = ev.clientY;
    	var sDate,sStart,sEnd,sConsume,infos,sHour,sMin;
    	sDate = $(this).attr("sDate");
		sStart = $(this).attr("sStart");
		sEnd = $(this).attr("sEnd");
		sConsume = $(this).attr("sConsume");
		sHour = Math.floor(sConsume/60);
		sMin = sConsume-sHour*60;

		infos = '<div class="workTimeInfo" style="left:'+x+'px;top:'+y+'px"><p>日期：'+sDate+'</p><p>开始时间：'+sStart+'</p><p>结束时间：'+sEnd+'</p><p>总用时：'+sHour+'小时'+sMin+'分钟</p></div>'; 
    	$('body').append(infos);
    });
    $('.workTime').on('mouseout',function(){
    	$('.workTimeInfo').remove();
    });


    //车辆信息弹出框的显示隐藏效果
    $('.infoBtn').on('click',function(){
		show_list();
		list();
	});
	
	function show_list(){
		$('.filterbg').show();
		$('.carInfo').show();
		$('.carInfo').width('3px');
		$('.carInfo').animate({height: '76%'},400,function(){
			$('.carInfo').animate({width: '82%'},400);
		});
		setTimeout(function(){
			$('.infoBox').show();
			$('.carClose').css('display','block');
		},800);
	}
	
	
	$('.carClose').on('click',function(){
		$('.carClose').css('display','none');
		$('.infoBox').hide();
		
		$('.carInfo').animate({width: '3px'},400,function(){
			$('.carInfo').animate({height: 0},400);
		});
		setTimeout(function(){
			$('.filterbg').hide();
			$('.carInfo').hide();
			$('.carInfo').width(0);
		},800);
	});
	
	var url = "http://huichuan.gmh.zxytinfo.com/app/company/datas";
	
	function list(zoneId){
		var params = {};
		params.order = 'leadingFlag desc, q desc';
		var search_name = $("#search_name").val();
		params.name = search_name;
		if(zoneId){
			params.zoneId = zoneId;
		}
		
		$.ajax({
		    url: url,
		    type: "POST",
		    dataType: "json",
			data: params,
		    success: function(result) {
				var data = result.data;
				$("#stateUl").empty()
				var selectedId;
				for(var i=0;i<data.length;i++){
					var obj = data[i]
					
					if(i == 0){
						var html = "<li class='selected list_li' attr-id='" + obj.id + "'>";
						selectedId = obj.id;
					} else {
						var html = "<li class='list_li' attr-id='" + obj.id + "'>";
					}
					html += "<p>" + obj.name + "</p>" + 
						// "<span class='type_" + obj.type + "'>" + (obj.leadingFlag=='Y' ? '是': '否') + "</span>" +
					"</li>";
					$("#stateUl").append(html);
				}
				company_change(selectedId);
		    }
		});
	}
	list();
	
	$(document).on("click",".list_li", function(){
		var id = $(this).attr("attr-id");
		company_change(id)
		$("#stateUl li").removeClass("selected");
		$(this).addClass("selected")
	})
	
	function company_change(id){
		$("#companyDetail").show()
		$("#zoneDetail").hide()
		
		$("#detail_name").text("");
		$("#detail_image").attr("src", "")
		$("#detail_leadingTypeName").text("");
		$("#detail_leadingFlag").text("");
		$("#detail_staffCount").text("");
		$("#detail_mainProduct").text("");
		$("#detail_baobaoDutyDeptName").text("");
		$("#detail_content").html("");
		
		var selectUrl = url + "?id=" + id;
		$.ajax({
		    url: selectUrl,
		    type: "POST",
		    dataType: "json",
		    success: function(result) {
				var obj = result.data[0];
				$("#detail_name").text(obj.name);
				$("#detail_image").attr("src", obj.imageUrl)
				$("#detail_leadingTypeName").text(obj.leadingTypeName);
				if(obj.leadingFlag == 'Y'){
					$("#detail_leadingFlag").text('是');
				}else{
					$("#detail_leadingFlag").text('否');
				}
				$("#detail_staffCount").text(obj.staffCount);
				$("#detail_mainProduct").text(obj.mainProduct);
				$("#detail_baobaoDutyDeptName").text(obj.baobaoDutyDeptName);
				$("#detail_content").html(obj.about);
		    }
		});
	}
	
	$(document).on("click",".map_circle,.circle_desc", function(){
		var zoneId = $(this).attr("data-id");
		zoneDetail(zoneId);
		show_list()
	})
	
	
	function zoneDetail(zoneId){
		$("#companyDetail").hide()
		$("#zoneDetail").show()
		
		var detailUrl = "http://huichuan.gmh.zxytinfo.com/app/news/id/" + zoneId;
		$.ajax({
		    url: detailUrl,
		    type: "POST",
		    dataType: "json",
			// data: params,
		    success: function(result) {
				$("#detail_name").text("");
				$("#zone_detail_image").attr("src", "")
				$("#detail_leadingTypeName").text("");
				$("#detail_leadingFlag").text("");
				$("#detail_staffCount").text("");
				$("#detail_mainProduct").text("");
				$("#detail_baobaoDutyDeptName").text("");
				$("#zone_detail_content").html("");
				
				var obj = result.data;
				$("#detail_name").text(obj.title);
				$("#zone_detail_image").attr("src", obj.imageUrl)
				$("#zone_detail_content").html(obj.content);
		    }
		});
	}
	
	var scale = 1;
	//鼠标滚轮放大缩小地图
	$('.mapContainer').on('mousewheel', function(event) {
	    var y = event.deltaY;
		scale += y*0.2;
		$("#myMap").css({'transform': 'scale('+scale+', '+scale+') translate('+lastXY.marginLeft + 'px,'+lastXY.marginTop+'px)'})
	});
	
	//鼠标拖拽地图
	var lastXY = {x:null, y:null, marginLeft: 0, marginTop: 0};
	var monsedown = false;
	$('.mapContainer').on('mousedown', function(event) {
		monsedown = true;
		lastXY.x = null;
		lastXY.y = null;
	});
	$(document).on('mouseup', function(event) {
		monsedown = false;
		lastXY.x = null;
		lastXY.y = null;
		event.stopPropagation()
		return false;
	})
	$('.mapContainer').on('mousemove', function(event) {
		if(!monsedown)
			return;
		if(lastXY.x === null) {
			lastXY.x = event.pageX
			lastXY.y = event.pageY
		} else {
			var x = event.pageX - lastXY.x;
			var y = event.pageY - lastXY.y;
			lastXY.x = event.pageX
			lastXY.y = event.pageY
			lastXY.marginLeft = lastXY.marginLeft + x/scale;
			lastXY.marginTop = lastXY.marginTop + y/scale;
			$("#myMap").css({'transform': 'scale('+scale+', '+scale+') translate('+lastXY.marginLeft + 'px,'+lastXY.marginTop+'px)'})
		}
	});
	
	$(document).on('keyup', function(event) {
		if(event.keyCode == '66') {
			scale = 1;
			lastXY.marginLeft = 0;
			lastXY.marginTop = 0;
			$("#myMap").css({'transform': 'scale('+scale+', '+scale+') translate('+lastXY.marginLeft + 'px,'+lastXY.marginTop+'px)'})
		}
	});
});