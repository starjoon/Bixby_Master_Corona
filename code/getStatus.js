var console = require('console')
var http = require('http')
var fail = require('fail')

module.exports.function = function getStatus (CheckProvince, CheckCity, CheckStatus) {
  //Query 값 설정
  var searchRegion;
  if (CheckCity != null) {
    searchRegion = CheckCity
  } else if (CheckProvince != null) {
    searchRegion = CheckProvince
  } else {
    searchRegion = '국내'
  }

  //API 요청 설정
  var URL = 'Status API URL 입력'
  var Options = {
    format: 'json',
    returnHeaders: true,
    query: {
      region: searchRegion
    }
  }
  
  //API 요청
  var response = http.getUrl(URL, Options)

  //해당 지역에 확진자 없음 (에러 코드 400)
  if (response.status == 400) {
    throw fail.checkedError('해당 지역에 확진자 없음','NoPatients',null)
  }

  //API 요청 정상적으로 처리
  return response.parsed
}
