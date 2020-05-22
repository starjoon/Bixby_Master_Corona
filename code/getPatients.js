var console = require('console')
var http = require('http')
var fail = require('fail')

function compare(a, b) {
  if (a.timestamp < b.timestamp) {
    return 1;
  }
  if (a.timestamp > b.timestamp) {
    return -1;
  }
  return 0;
}

module.exports.function = function getPatients(CheckProvince, CheckCity, CheckPatients) {
  //Query 값 설정
  var searchProvince = CheckProvince
  var searchCity = CheckCity
  var searchRegion;
  if (CheckCity != null) {
    searchRegion = CheckCity
  } else if (CheckProvince != null) {
    searchRegion = CheckProvince
  } else {
    searchRegion = '국내'
  }

  //API 요청 설정
  var URL = 'Patients API URL 입력'
  var Options = {
    format: 'json',
    returnHeaders: true,
    query: {
      province: searchProvince,
      city: searchCity
    }
  }
  var URL2 = 'Status API URL 입력'
  var Options2 = {
    format: 'json',
    returnHeaders: true,
    query: {
      region: searchRegion
    }
  }

  //API 요청
  var response = http.getUrl(URL, Options)
  var response2 = http.getUrl(URL2, Options2)

  //해당 지역에 확진자 없음 (에러 코드 400)
  if (response.status == 400) {
    throw fail.checkedError('해당 지역에 확진자 없음', 'NoPatients', null)
  }

  //API 요청 정상적으로 처리

  //현황 DB에 해당 도시 자료 없음
  if (response2.status != 200) {
    return {
      confirm: response.parsed.length,
      region: searchRegion,
      updatedDate: response.parsed[0].updatedDate,
      patients: response.parsed.sort(compare)
    }
  }

  return {
    confirm: response2.parsed.confirm,
    region: response2.parsed.region,
    updatedDate: response2.parsed.updatedDate,
    patients: response.parsed.sort(compare)
  }
}
