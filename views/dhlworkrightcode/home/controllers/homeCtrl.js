/* Controller for dashboard page
   scope of the controller is private */

app.controller('homeCtrl', function($scope, $state, $ionicPopup, $rootScope, $ionicLoading, $window, homeService, $filter, NgTableParams) {

  google.charts.load('42', {'packages':['corechart']});
  $scope.overviewshow = true;
  $scope.workershow = false;
  $scope.overviewItem = "col col-20 dahsboardtab-itemselected";
  $scope.workersItem = "col col-20 dahsboardtab-item";
  $scope.completed = true;
  $scope.active = false;
  $scope.highPerformance = false;
  $scope.lowPerformance = false;
  $scope.kpi = false;
  $scope.completedItem = "col col-20 overviewtab-itemselected";
  $scope.activeItem = "col col-20 overviewtab-item";
  $scope.kpiItem = "col col-20 overviewtab-item";
  $scope.highItem = "col col-20 overviewtab-item";
  $scope.lowItem = "col col-20 overviewtab-item";
  $scope.workersalltab = true;
  $scope.workerssummarytab = false;
  $scope.allWorkerItem = "col col-20 overviewtab-itemselected";
  $scope.workerSummaryItem = "col col-20 overviewtab-item";
  $scope.completedActivities = [];
  $scope.activeActivities = [];
  $scope.allActivities = [];
  $scope.workers = [];
  $scope.workerChartData = [];
  $scope.noCompletedDataFlag = false;
  $scope.noActiveDataFlag = false;
  $scope.noKpiDataFlag = false;
  $scope.noAllDataFlag = false;
  $scope.noSummaryDataFlag = false;
  $scope.seriesArray = [];
  $scope.testArray = [
      {
        "text": "Idle",
        //"sub_activity": "Idle",
        "values": [30]
      },
      {
        "text": "Picking",
        //"sub_activity": "Pick",
        "values": [70]
      }
    ];


////////////////////////////////////////////////////////////

// $scope.callgr1chart = function(yesData,chartid){
//    $scope.gr1opt0 = []; var i0 = 0; $scope.gr1Str0 = "";
//    $scope.gr1opt1 = []; var i1 =0; $scope.gr1Str1 = "";
//    $scope.gr1opt2 = []; var i2 =0; $scope.gr1Str2 = "";
//    var seloptions = [];
//    seloptions = yesData[0].question.type;
//
//    for (var x = 0 ; x < yesData.length; x++){
//      if(yesData[x].question.seltype === seloptions[0].text){
//        $scope.gr1opt0.push(yesData[x].AccountName);
//        $scope.gr1Str0 = $scope.gr1Str0  + yesData[x].AccountName+ "</br>" ;
//        i0=i0+1;
//      }
//      if(yesData[x].question.seltype === seloptions[1].text){
//        $scope.gr1opt1.push(yesData[x].AccountName);
//        $scope.gr1Str1 = $scope.gr1Str1  + yesData[x].AccountName+ "</br>" ;
//        i1=i1+1;
//      }
//      if(yesData[x].question.seltype === seloptions[2].text){
//        $scope.gr1opt2.push(yesData[x].AccountName);
//        $scope.gr1Str2 = $scope.gr1Str2  + yesData[x].AccountName+ "</br>" ;
//        i2=i2+1;
//      }
//    }
//    var dataTable = new google.visualization.DataTable();
//        dataTable.addColumn('string', 'IOT');
//        dataTable.addColumn('number', 'Count');
//        dataTable.addRows([
//          ["1", $scope.gr1opt0.length],
//          ["2", $scope.gr1opt1.length],
//          [">2", $scope.gr1opt2.length]
//          ]);
//      var options = {
//        width :500,
//        chartArea:{left:0, top : 10,  width:"70%",  height:"60%"},
//        enableInteractivity: true,
//        pieSliceText:'accounts',
//            pieSliceTextStyle: { color: "black"},
//            'tooltip' : {trigger: 'none'},
//            legend: {
//             position: 'labeled',
//       }
//      };
//        var chart = new google.visualization.PieChart(document.getElementById(chartid));
//
//      function selectHandler(){
//      var selection =chart.getSelection();
//      for (var i = 0; i < selection.length; i++) {
//      var item = selection[i];
//      var str = dataTable.getFormattedValue(item.row, 0);
//      console.log(item.row);
//      if(item.row == 0){var accountInfo = '<div>'+$scope.gr1Str0+'</div>' ; }
//      if(item.row == 1){var accountInfo = '<div>'+$scope.gr1Str1+'</div>' ; }
//      if(item.row == 2){var accountInfo = '<div>'+$scope.gr1Str2+'</div>' ; }
//      $scope.showAlert(accountInfo);
//      }
//      chart.setSelection();
//      }
//      google.visualization.events.addListener(chart, 'select', selectHandler);
//  chart.draw(dataTable, options);
//  };
// $scope.drawChart();
//////////////////////////////////////////////////////////////
  $scope.myJson = {
    globals: {
      shadow: false,
      fontFamily: "Helvetica",
      fontWeight: "100"
    },
    type: "pie",
    backgroundColor: "#fff",
    palette: ["#0099CC", "#007E33", "#FF8800", "#CC0000", "#33b5e5", "#00C851", "#ffbb33", "#ff4444"],

    legend: {
      verticalAlign: 'middle',
      toggleAction: 'remove',
      marginRight: 60,
      width: 60,
      alpha: 0.1,
      borderWidth: 0,
      highlightPlot: true,
      item: {
        fontColor: "#373a3c",
        fontSize: 12
      }
    },
    tooltip: {
      text: "%npv %"
    },
    plot: {
      refAngle: "-90",
      borderWidth: "0px",
      valueBox: {
        placement: "in",
        text: "%v",
        fontSize: "15px",
        //textAlpha: 1,
      }
    },
    //series: $scope.seriesArray
    series: $scope.testArray
  };

  $rootScope.showLoading = function() {
    $ionicLoading.show({
      content: 'Loading...',
      animation: 'fade-in',
      showBackdrop: true,
      maxWidth: 200,
      showDelay: 0
    });
  };

  $rootScope.hideLoading = function() {
    $ionicLoading.hide();
  };

  //set the time to format hours:minutes
  $scope.timeFormatter = function(unformattedTime) {
    var date = new Date(unformattedTime.toString());
    // var day = date.getDate();
    // var monthIndex = date.getMonth();
    // var year = date.getFullYear();
    var hours = date.getHours();
    var minutes = date.getMinutes();

    if (hours < 10) {
      hours = '0' + hours;
    }

    if (minutes < 10) {
      minutes = '0' + minutes;
    }

    formattedtime = hours + ':' + minutes;
    return formattedtime;
  };

  //Convert epoch time stamp to normal time stamp
  $scope.convertEpochTime = function(datetime) {
    var date = new Date(datetime);
    return $scope.timeFormatter(date);

  };

  $scope.workerSummaryTableShow = function() {
    if ($scope.workerSummary.length === 0) {
      $scope.noSummaryDataFlag = true;
      $scope.ShowWorkersSummaryTable = false;
    } else {
      $scope.noSummaryDataFlag = false;
      $scope.ShowWorkersSummaryTable = true;
      $scope.workersSummaryTable = new NgTableParams({
        //page: 4,
        count: 10
      }, {
        dataset: $scope.workerSummary
      });
    }
  };

  $scope.getWorkerSummary = function(username) {
    homeService.getWorkerSummary(username).then(function(response) {
      if (response.status === 200) {
        $rootScope.hideLoading();
        console.log(response);
        $scope.workerSummary = response.data.list.activity_array;
        $scope.workerChartData = response.data.chart.activity_array;
        for (i = 0; i < $scope.workerChartData.length; i++) {
          $scope.seriesArray.push({
            "text": $scope.workerChartData[i].activity,
            "values": [$scope.convertTime($scope.workerChartData[i].time_spent)]
          });
        }
        $scope.workerSummaryTableShow();
      } else {
        $rootScope.hideLoading();
        console.log("Summary error");
      }
    });
  };

  $scope.workerAllDetailsTableShow = function() {
    if ($scope.workerDetails.length === 0) {
      $scope.noAllDataFlag = true;
      $scope.ShowWorkersAllTable = false;
    } else {
      $scope.noAllDataFlag = false;
      $scope.ShowWorkersAllTable = true;
      $scope.workersAllTable = new NgTableParams({
        //page: 4,
        count: 10
      }, {
        dataset: $scope.workerDetails
      });
    }
    $scope.getWorkerSummary($scope.user);
  };
  $scope.getWorkerAll = function(username) {
    homeService.getWorkerAll(username).then(function(response) {
      if (response.status === 200) {
        console.log(response);
        $scope.workerDetails = response.data.activity_array;
        for (var i = 0; i < response.data.activity_array.length; i++) {
          var formatStartTime = $scope.convertEpochTime($scope.workerDetails[i].start_time);
          if ($scope.workerDetails[i].end_time) {
            var formatEndTime = $scope.convertEpochTime($scope.workerDetails[i].end_time);
          } else {
            var formatEndTime = "";
          }
          $scope.workerDetails[i].formatedstart_time = formatStartTime;
          $scope.workerDetails[i].formatedend_time = formatEndTime;
        }
        $scope.workerAllDetailsTableShow();
      } else {
        // $rootScope.hideLoading();
        console.log("All error");
      }
    });
  };

  $scope.getWorkerDetails = function(worker) {
    $rootScope.showLoading();
    console.log("Clicked Worker:" + worker.username);
    $scope.workersalltab = true;
    $scope.workerssummarytab = false;
    $scope.allWorkerItem = "col col-20 overviewtab-itemselected";
    $scope.workerSummaryItem = "col col-20 overviewtab-item";
    $scope.usernameDisplay = worker.fullname;
    $scope.user = worker.username;
    $scope.getWorkerAll($scope.user);
  };

  $scope.getMyWorkersList = function() {
    homeService.getMyWorkersList().then(function(response) {
      if (response.status === 200) {
        console.log(response);
        $scope.workers = response.data.user_array;
        $scope.usernameDisplay = $scope.workers[0].fullname;
        $scope.user=$scope.workers[0].username;
        $scope.getWorkerAll($scope.user);
      } else {
        // $rootScope.hideLoading();
        console.log("error");
      }
    });
  };

  /* function to show/hide table based on the tableData length
     scope of the function is private */
  $scope.lowPerformanceTableShow = function() {
    if ($scope.lowPerformanceActivities.length === 0) {
      $scope.noLowPerformanceFlag = true;
      $scope.ShowLowPerformanceTable = false;
    } else {
      $scope.noLowPerformanceFlag = false;
      $scope.ShowLowPerformanceTable = true;
      $scope.overviewLowPerformanceTable = new NgTableParams({
        //page: 4,
        count: 10
      }, {
        dataset: $scope.lowPerformanceActivities
      });
    }
    $scope.getMyWorkersList();
  };

$scope.getLowPerformanceActivities  = function() {
    homeService.getLowPerformanceActivities().then(function(response) {
      if (response.status === 200) {
        console.log(response);
        $scope.lowPerformanceActivities = response.data.activity_array;
        for (var i = 0; i < response.data.activity_array.length; i++) {
          var formatStartTime = $scope.convertEpochTime($scope.lowPerformanceActivities[i].start_time);
          if ($scope.lowPerformanceActivities[i].end_time) {
            var formatEndTime = $scope.convertEpochTime($scope.lowPerformanceActivities[i].end_time);
          } else {
            var formatEndTime = "";
          }
          $scope.lowPerformanceActivities[i].formatedstart_time = formatStartTime;
          $scope.lowPerformanceActivities[i].formatedend_time = formatEndTime;
        }

      } else {
        // $rootScope.hideLoading();
        console.log("error");
      }
      $scope.lowPerformanceTableShow();
    });
  };

  /* function to show/hide table based on the tableData length
     scope of the function is private */
  $scope.highPerformanceTableShow = function() {
    if ($scope.highPerformanceActivities.length === 0) {
      $scope.noHighPerformanceDataFlag = true;
      $scope.ShowHighPerformanceTable= false;
    } else {
      $scope.noHighPerformanceDataFlag = false;
      $scope.ShowHighPerformanceTable = true;
      $scope.overviewHighPerformanceTable = new NgTableParams({
        //page: 4,
        count: 10
      }, {
        dataset: $scope.highPerformanceActivities
      });
    }
    $scope.getLowPerformanceActivities();
  };

  $scope.getHighPerformanceActivities = function() {
    homeService.getHighPerformanceActivities().then(function(response) {
      if (response.status === 200) {
        console.log(response);
        $scope.highPerformanceActivities = response.data.activity_array;
        for (var i = 0; i < response.data.activity_array.length; i++) {
          var formatStartTime = $scope.convertEpochTime($scope.highPerformanceActivities[i].start_time);
          if ($scope.highPerformanceActivities[i].end_time) {
            var formatEndTime = $scope.convertEpochTime($scope.highPerformanceActivities[i].end_time);
          } else {
            var formatEndTime = "";
          }
          $scope.highPerformanceActivities[i].formatedstart_time = formatStartTime;
          $scope.highPerformanceActivities[i].formatedend_time = formatEndTime;
        }

      } else {
        // $rootScope.hideLoading();
        console.log("error");
      }
      $scope.highPerformanceTableShow();
    });
  };

  $scope.allTableShow = function() {
    if ($scope.allActivities.length === 0) {
      $scope.noKpiDataFlag = true;
      $scope.ShowSummaryTable = false;
    } else {
      $scope.noKpiDataFlag = false;
      $scope.ShowSummaryTable = true;
      $scope.overviewAllTable = new NgTableParams({
        //page: 4,
        count: 12
      }, {
        dataset: $scope.allActivities
      });
    }
    $scope.getHighPerformanceActivities();
  };

  $scope.getAllActivities = function() {
    homeService.getAllActivities().then(function(response) {
      if (response.status === 200) {
        //$rootScope.hideLoading();
        console.log(response);
        $scope.allActivities = response.data.activity_array;
        for(var i=0;i<$scope.allActivities.length;i++){
          $scope.allActivities[i].progress_perc = ($scope.allActivities[i].kpi_average/$scope.allActivities[i].kpi_maximum)*100;
        }
      } else {
        // $rootScope.hideLoading();
        console.log("error");
      }
      $scope.allTableShow();
    });
  };

  $scope.activeTableShow = function() {
    if ($scope.activeActivities.length === 0) {
      $scope.noActiveDataFlag = true;
      $scope.ShowActiveTable = false;
    } else {
      $scope.noActiveDataFlag = false;
      $scope.ShowActiveTable = true;
      $scope.overviewActiveTable = new NgTableParams({
        //page: 4,
        count: 10
      }, {
        dataset: $scope.activeActivities
      });
    }
    $scope.getAllActivities();
  };

  $scope.getActiveActivities = function() {
    homeService.getActiveActivities().then(function(response) {
      if (response.status === 200) {
        console.log(response);
        $scope.activeActivities = response.data.activity_array;
        for (var i = 0; i < response.data.activity_array.length; i++) {
          var formatStartTime = $scope.convertEpochTime($scope.activeActivities[i].start_time);
          $scope.activeActivities[i].formatedstart_time = formatStartTime;
        }
      } else {
        // $rootScope.hideLoading();
        console.log("error");
      }
      $scope.activeTableShow();
    });
  };

  /* function to show/hide table based on the tableData length
     scope of the function is private */
  $scope.completedTableShow = function() {
    if ($scope.completedActivities.length === 0) {
      $scope.noCompletedDataFlag = true;
      $scope.ShowCompletedTable = false;
    } else {
      $scope.noCompletedDataFlag = false;
      $scope.ShowCompletedTable = true;
      $scope.overviewCompletedTable = new NgTableParams({
        //page: 4,
        count: 10
      }, {
        dataset: $scope.completedActivities
      });
    }
    $scope.getActiveActivities();
  };

  $scope.getCompletedActivities = function() {
    $rootScope.showLoading();
    homeService.getCompletedActivities().then(function(response) {
      if (response.status === 200) {
        console.log(response);
        $scope.completedActivities = response.data.activity_array;
        for (var i = 0; i < response.data.activity_array.length; i++) {
          var formatStartTime = $scope.convertEpochTime($scope.completedActivities[i].start_time);
          var formatEndTime = $scope.convertEpochTime($scope.completedActivities[i].end_time);
          $scope.completedActivities[i].formatedstart_time = formatStartTime;
          $scope.completedActivities[i].formatedend_time = formatEndTime;
        }
      } else {
        // $rootScope.hideLoading();
        console.log("error");
      }
      var currentTime = new Date();
        var time = currentTime.getTime();
        var hours = currentTime.getHours();
      console.log("Time"+$scope.convertEpochTime(time));
      $scope.currenttime = $scope.convertEpochTime(time);
      $scope.completedTableShow();
    });
  };

  $scope.getCompletedActivities();

  $scope.overviewcontent = function() {
    //$rootScope.showLoading();
    $scope.overviewshow = true;
    $scope.workershow = false;
    $scope.overviewItem = "col col-20 dahsboardtab-itemselected";
    $scope.workersItem = "col col-20 dahsboardtab-item";
    $scope.completed = true;
    $scope.active = false;
    $scope.kpi = false;
    $scope.highPerformance = false;
    $scope.lowPerformance = false;
    $scope.completedItem = "col col-20 overviewtab-itemselected";
    $scope.activeItem = "col col-20 overviewtab-item";
    $scope.kpiItem = "col col-20 overviewtab-item";
    $scope.highItem = "col col-20 overviewtab-item";
    $scope.lowItem = "col col-20 overviewtab-item";
    //$scope.getCompletedActivities();
  };

  $scope.completedcontent = function() {
    $scope.completedItem = "col col-20 overviewtab-itemselected";
    $scope.activeItem = "col col-20 overviewtab-item";
    $scope.kpiItem = "col col-20 overviewtab-item";
    $scope.highItem = "col col-20 overviewtab-item";
    $scope.lowItem = "col col-20 overviewtab-item";
    $scope.completed = true;
    $scope.active = false;
    $scope.kpi = false;
    $scope.highPerformance = false;
    $scope.lowPerformance = false;
  };

  $scope.activecontent = function() {
    $scope.completedItem = "col col-20 overviewtab-item";
    $scope.activeItem = "col col-20 overviewtab-itemselected";
    $scope.kpiItem = "col col-20 overviewtab-item";
    $scope.highItem = "col col-20 overviewtab-item";
    $scope.lowItem = "col col-20 overviewtab-item";
    $scope.completed = false;
    $scope.active = true;
    $scope.kpi = false;
    $scope.highPerformance = false;
    $scope.lowPerformance = false;
  };
  $scope.highcontent = function() {
    $scope.completedItem = "col col-20 overviewtab-item";
    $scope.activeItem = "col col-20 overviewtab-item";
    $scope.kpiItem = "col col-20 overviewtab-item";
    $scope.highItem = "col col-20 overviewtab-itemselected";
    $scope.lowItem = "col col-20 overviewtab-item";
    $scope.completed = false;
    $scope.active = false;
    $scope.kpi = false;
    $scope.highPerformance = true;
    $scope.lowPerformance = false;
  };
  $scope.lowcontent = function() {
    $scope.completedItem = "col col-20 overviewtab-item";
    $scope.activeItem = "col col-20 overviewtab-item";
    $scope.kpiItem = "col col-20 overviewtab-item";
    $scope.highItem = "col col-20 overviewtab-item";
    $scope.lowItem = "col col-20 overviewtab-itemselected";
    $scope.completed = false;
    $scope.active = false;
    $scope.kpi = false;
    $scope.highPerformance = false;
    $scope.lowPerformance = true;
  };
  $scope.kpicontent = function() {
    $scope.completedItem = "col col-20 overviewtab-item";
    $scope.activeItem = "col col-20 overviewtab-item";
    $scope.kpiItem = "col col-20 overviewtab-itemselected";
    $scope.highItem = "col col-20 overviewtab-item";
    $scope.lowItem = "col col-20 overviewtab-item";
    $scope.completed = false;
    $scope.active = false;
    $scope.kpi = true;
    $scope.highPerformance = false;
    $scope.lowPerformance = false;
  };

  $scope.workerscontent = function() {
    $scope.overviewshow = false;
    $scope.workershow = true;
    $scope.overviewItem = "col col-20 dahsboardtab-item";
    $scope.workersItem = "col col-20 dahsboardtab-itemselected"
    $scope.workersalltab = true;
    $scope.workerssummarytab = false;
    $scope.allWorkerItem = "col col-20 overviewtab-itemselected";
    $scope.workerSummaryItem = "col col-20 overviewtab-item";
  };

  $scope.allworkercontent = function() {
    $scope.allWorkerItem = "col col-20 overviewtab-itemselected";
    $scope.workerSummaryItem = "col col-20 overviewtab-item";
    $scope.workersalltab = true;
    $scope.workerssummarytab = false;
  };

  $scope.workersummarycontent = function() {
    $scope.allWorkerItem = "col col-20 overviewtab-item";
    $scope.workerSummaryItem = "col col-20 overviewtab-itemselected";
    $scope.workersalltab = false;
    $scope.workerssummarytab = true;
  };

  document.onkeydown = function() {
    switch (event.keyCode) {
      case 116: //F5 button
        event.returnValue = false;
        event.keyCode = 0;
        return false;

      case 82: //R button
        if (event.ctrlKey) {
          event.returnValue = false;
          event.keyCode = 0;
          return false;
        }
    }
  };

  $scope.getContent = function(obj) {
    return obj.value + " " + obj.text;
  };

  $scope.convertTime = function(millseconds) {
    var seconds = Math.floor(millseconds / 1000);
    var h = 3600;
    var m = 60;
    var hours = Math.floor(seconds / h);
    var minutes = Math.floor((seconds % h) / m);
    var scnds = Math.floor((seconds % m));
    var timeString = '';
    if (scnds < 10) scnds = "0" + scnds;
    if (hours < 10) hours = "0" + hours;
    if (minutes < 10) minutes = "0" + minutes;
    timeString = hours + ":" + minutes + ":" + scnds;
    return timeString;
  };
});

app.filter('millSecondsToTimeString', function() {
  return function(millseconds) {
    var oneSecond = 1000;
    var oneMinute = oneSecond * 60;
    var oneHour = oneMinute * 60;
    var oneDay = oneHour * 24;

    var seconds = Math.floor((millseconds % oneMinute) / oneSecond);
    var minutes = Math.floor((millseconds % oneHour) / oneMinute);
    var hours = Math.floor((millseconds % oneDay) / oneHour);
    var days = Math.floor(millseconds / oneDay);

    var timeString = '';
    if (days !== 0) {
      //timeString += (days !== 1) ? (days + ' days ') : (days + ' day ');
      timeString += (days !== 1) ? (days + ':') : (days + ':');
    }
    if (hours !== 0) {
      // timeString += (hours !== 1) ? (hours + ' hrs ') : (hours + ' hr ');
      timeString += (hours !== 1) ? (hours + ':') : (hours + ':');
    }
    if (minutes !== 0) {
      // timeString += (minutes !== 1) ? (minutes + 'mins') : (minutes + 'min');
      timeString += (minutes !== 1) ? (minutes) : (minutes);
    }
    // if (seconds !== 0 || millseconds < 1000) {
    //     // timeString += (seconds !== 1) ? (seconds + 'secs') : (seconds + 'sec');
    //       timeString += (seconds !== 1) ? (seconds) : (seconds);
    // }

    return timeString;
  };
});
