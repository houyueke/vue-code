/**
 * start
 */
console.log("*************脚本开始执行---------*********");
console.log("*************开始抓取数据******************");
getAllData();

function createXHR() {
  if (typeof XMLHttpRequest != "undefined") {
    return new XMLHttpRequest();
  }
  if (typeof ActiveXobject == "undefined") {
    throw new Error(" not support ");
  }
  //判断是否为 IE6或IE6以下版本
  if (typeof arguments.callee.activeString != "string") {
    var versions = ["MSXML2.XMLHttp.6.0", "MSXML2.XMLHttp3.0", "MSXML2.XMLHttp"],
      i,
      len;

    for (var i = 0; i < versions.length; i++) {
      try {
        //尝试使用不同版本的插件新建对象
        new ActiveXobject(versions[i]);
        //将合适的版本保存至 activeString属性中
        //arguments.callee代表的是调用函数,这里指的是createXHR
        arguments.callee.activeString = versions[i];
        break;
      } catch (ex) {
        //  no action
      }
    }
  }
  //返回实例对象
  return new ActiveXobject(arguments.callee.activeString);
}

function postData(data) {
  var url = "http://cts.ujiuye.com/apiList/itcsInfo-api/infoConsult/editConsultVistor";
  var xhr = createXHR();
  // console.log("current key", data.key);
  xhr.open("PUT", url);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.setRequestHeader(
    "Authorization",
    "BearereyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ4eHk4NDkyNyIsImF1dGhvcml0aWVzIjpbIlJPTEVfMzIiLCJST0xFXyA1NyJdLCJpYXQiOjE2MDk4MTQwMzcsImV4cCI6MTYwOTkwMDQzN30.jLcEPndr5L_LoHXYn8ACYC6YLZtGFFkLQQ1ZMxayHIY"
  );
  // xhr.setRequestHeader(
  //   "Cookie",
  //   "ctsToken=BearereyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ4eHk4NDkyNyIsImF1dGhvcml0aWVzIjpbIlJPTEVfMzIiLCJST0xFXyA1NyJdLCJpYXQiOjE2MDk4MTQwMzcsImV4cCI6MTYwOTkwMDQzN30.jLcEPndr5L_LoHXYn8ACYC6YLZtGFFkLQQ1ZMxayHIY"
  // );
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      //
      // callback(xhr);
      // i=i+1;
      console.log("***************请求模拟成功************");
    }
  };
  xhr.send(JSON.stringify(data)); //发送表单 编码数据
}

function getAllData() {
  var geturl =
    "http://cts.ujiuye.com/apiList/itcsInfo-api/infoConsult/queryMyConsultVisitorsByCond?pageNumber=1&countFlag=true&pageSize=200&consultStatus=3&visitorAddStartTime=&visitorAddEndTime=&lastOperatorTimeStart=&lastOperatorTimeEnd=&visitorIdentity=&intentionDegree=&schoolProvinceId=&schoolCityId=&phone=&visitorTitle=&remark=&visitorName=&addStartTime=&addEndTime=&returnVisitStartDate=&returnVisitEndDate=&school=";
  var getxhr = createXHR();
  getxhr.open("GET", geturl);
  // getxhr.setRequestHeader("Content-Type", "application/json");
  getxhr.setRequestHeader(
    "Authorization",
    "BearereyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ4eHk4NDkyNyIsImF1dGhvcml0aWVzIjpbIlJPTEVfMzIiLCJST0xFXyA1NyJdLCJpYXQiOjE2MDk4MTQwMzcsImV4cCI6MTYwOTkwMDQzN30.jLcEPndr5L_LoHXYn8ACYC6YLZtGFFkLQQ1ZMxayHIY"
  );
  // getxhr.setRequestHeader(
  //   "Cookie",
  //   "ctsToken=BearereyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ4eHk4NDkyNyIsImF1dGhvcml0aWVzIjpbIlJPTEVfMzIiLCJST0xFXyA1NyJdLCJpYXQiOjE2MDk4MTQwMzcsImV4cCI6MTYwOTkwMDQzN30.jLcEPndr5L_LoHXYn8ACYC6YLZtGFFkLQQ1ZMxayHIY"
  // );
  getxhr.onreadystatechange = function() {
    if (getxhr.readyState === 4 && getxhr.status === 200) {
      //获取所有数据进行保存
      console.log("****************数据抓取成功******************");
      var all =JSON.parse(getxhr.responseText).value.list;
      console.log(all);
      console.log("****************共抓取数据" + all.length + "条********");
      console.log("****************开始进行数据处理**************");
      all.forEach((item, index) => {
        console.log("*************开始进行第" + index + "次数据处理**********");
        let data = {
          communication: 6,
          id: item.id,
          infoVisitor: {
            dataSource: item.dataSource,
            intentionDegree: item.intentionDegree,
            preSubjectId: item.preSubjectId,
            visitorIdentity: item.visitorIdentity,
            visitorName: item.visitorName,
          },
          remark: "已经回访，还在继续跟进",
          returnVisitDate: item.returnVisitDate,
        };
        console.log("*********数据处理结果为", JSON.stringify(data));

        setTimeout(() => {
          console.log("***********开始进行第"+index+"次模拟请求***********");
          postData(data);
        }, (index + 1) * 15000);
      });
    }
  };
  getxhr.send(null);
}
