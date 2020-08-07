<p align="center">
  <img src="https://camo.githubusercontent.com/745c6ad37a844ec4f3d533e299ab5756107f99e8/68747470733a2f2f6269786279646576656c6f706572732e636f6d2f6465762f646f63732d6173736574732f7265736f75726365732f6465762d67756964652f62697862795f6c6f676f5f6769746875622d31313232313934303037303237383032383336392e706e67">
</p>

# 빅스비 개발자 INSIGHT [코로나 알림]

안녕하세요, 빅스비 마스터 최준입니다.

영상에서 개발 과정을 보여드린 캡슐 그대로 제공되니 참고하세요~

---

## Bixby | 개발자 Insight - 1. 소개

<a href="http://www.youtube.com/watch?feature=player_embedded&v=iNFlq-O6aRM
" target="_blank"><img src="https://i.imgur.com/GHeg0fI.jpg" 
alt="개발자 INSIGHT EP.1 - 코로나 알림" width="100%" height="100%" style="border: 5px solid black" /></a>

2월 초 빅스비 마켓플레이스에 출시된 캡슐로서, 국내 코로나 현황, 주변 접촉 장소, 근처 마스크 구매처 등 다양한 정보를 제공하고있습니다. 코로나 공공데이터가 따로 존재하지 않아, [질병관리본부](http://ncov.mohw.go.kr 'COVID-19 질병관리본부 웹사이트') 웹사이트에서 자료를 스크래핑하는 형식으로 백엔드를 구축 해보겠습니다.

### 해당 캡슐은 교육용으로, 개발 과정은 다음과 같습니다:

**Modeling (모델링)** &rarr; **Coding (코딩)** &rarr; **Bixby Views (UI/UX)** &rarr; **Training (학습)**

---

## Bixby | 개발자 Insight - 2. 모델링

<a href="http://www.youtube.com/watch?feature=player_embedded&v=S2Jbey_a7tw
" target="_blank"><img src="https://i.imgur.com/TgbamG2.jpg" 
alt="개발자 INSIGHT EP.2 - 코로나 알림" width="100%" height="100%" style="border: 5px solid black" /></a>

### 교육 차원에서 발화 기능 / Action 은 총 2가지로 간주됩니다:

#### "현황 알려줘" &rarr; GetStatus.model.bxb

```js
action (GetStatus) {
  type (Search)
  description (현황 불러오기)
  collect {
    input (CheckProvince) {
      type (CheckProvince)
      min (Optional) max (One)
    }
    input (CheckCity) {
      type (CheckCity)
      min (Optional) max (One)
    }
    input (CheckStatus) {
      type (CheckStatus)
      min (Required) max (One)
    }
  }
  output (Status)
}
```

#### "확진자 알려줘" &rarr; GetPatients.model.bxb

```js
action (GetPatients) {
  type (Search)
  description (환자 불러오기)
  collect {
    input (CheckProvince) {
      type (CheckProvince)
      min (Optional) max (One)
    }
    input (CheckCity) {
      type (CheckCity)
      min (Optional) max (One)
    }
    input (CheckPatients) {
      type (CheckPatients)
      min (Required) max (One)
    }
  }
  output (PatientInfo)
}
```

### Action 을 수립할 때는 발화 자체를 그대로 반영한다고 생각하시면 됩니다.

```js
//경기도 수원 현황 알려줘
action (GetStatus) {
  type (Search)
  description (현황 불러오기)
  collect {
    //경기도
    input (CheckProvince) {
      type (CheckProvince)
      min (Optional) max (One)
    }
    //수원
    input (CheckCity) {
      type (CheckCity)
      min (Optional) max (One)
    }
    //현황
    input (CheckStatus) {
      type (CheckStatus)
      min (Required) max (One)
    }
  }
  output (Status)
}
```

---

## Bixby | 개발자 Insight - 3. 코딩

<a href="http://www.youtube.com/watch?feature=player_embedded&v=QJDK5gBSwu4
" target="_blank"><img src="https://i.imgur.com/84HLKU5.jpg" 
alt="개발자 INSIGHT EP.3 - 코로나 알림" width="100%" height="100%" style="border: 5px solid black" /></a>

별도 코로나 공공데이터가 존재하지 않기 떄문에 백엔드를 먼저 구축해야 합니다. 저희는 AWS에서 제공하는 서비스를 활용해 필요한 DB와 API를 생성해보겠습니다. 자세한 내용은 [Bixby_Master_Corona_AWS](https://github.com/starjoon/Bixby_Master_Corona_AWS 'AWS 기반 백엔드 구축') github 문서를 참고하세요!

백엔드를 구축한 후, Bixby Developer Studio에서 추가 JavaScript 코딩을 하여 유저 발화 시, 데이터를 불러올 수 있도록 기존에 생성한 Action과 연동합니다.

#### getStatus.js (GetStatus.model.bxb)

Bixby Developer Studio 내에서 제공하는 JavaScript 환경은 ECMAScript5 (ES5) 언어 기반으로 몇 가지 기능들이 제한되어 있습니다. 우선 사용할 모듈을 불러오겠습니다.

```js
var console = require('console');
var http = require('http');
var fail = require('fail');
```

JavaScript 파일에 구성은 기존에 생성한 Action 모델과 유사하다고 생각하시면 됩니다.

```js
action (GetStatus) {
  type (Search)
  description (현황 불러오기)
  collect {
    input (CheckProvince) {
      type (CheckProvince)
      min (Optional) max (One)
    }
    input (CheckCity) {
      type (CheckCity)
      min (Optional) max (One)
    }
    input (CheckStatus) {
      type (CheckStatus)
      min (Required) max (One)
    }
  }
  output (Status)
}
```

```js
module.exports.function = function getStatus(
  CheckProvince,
  CheckCity,
  CheckStatus
) {
  // API 요청 및 데이터 처리
  return Status;
};
```

우선, 유저 발화에서 API 요청에 사용될 Query 값을 추출하겠습니다. 발화에 포함될 수 있는 요청값 조합을 모두 고려해야 합니다.

```js
//Query 값 설정
var searchRegion;
if (CheckCity != null) {
  searchRegion = CheckCity;
} else if (CheckProvince != null) {
  searchRegion = CheckProvince;
} else {
  searchRegion = '국내';
}
```

API 요청은 `http` 모듈을 활용해서 작용하겠습니다. 해당 모듈의 `getUrl()` Method는 `URL`과 `Options` 패러미터가 요구되어 먼저 설정해보겠습니다.

```js
//API 요청 설정
var URL = 'Status API URL 입력';
var Options = {
  format: 'json',
  returnHeaders: true,
  query: {
    region: searchRegion,
  },
};

//API 요청
var response = http.getUrl(URL, Options);
```

API 요청 시, 에러 코드를 대비해 `fail` 모듈을 활용하여 에러 핸들링도 추가합니다.

```js
//해당 지역에 확진자 없음 (에러 코드 400)
if (response.status == 400) {
  throw fail.checkedError('해당 지역에 확진자 없음', 'NoPatients', null);
}
```

빅스비 캡슐에서 이러한 에러가 발생할 시, 프로세스를 중단하고 다시 기존 Action 으로 돌아가게끔 설계가 되어있습니다. 여기서 `fail.checkedError()` 에 해당되는 2번째 패러미터 `'NoPatients'` 는 저희가 선정한 Error ID 값으로, Action 모델에서도 연동해야 합니다.

```js
action (GetStatus) {
  // Input 부분 생략
  output (Status) {
    throws {
      error (NoPatients) {
        on-catch {
          halt {
            dialog {
              template ("해당 지역에는 확진자가 없습니다.")
            }
          }
        }
      }
    }
  }
}
```

다시 JavaScript 파일로 돌아가 API 요청 성공 시, 출력 값을 Return 합니다.

```js
return response.parsed;
```

하지만, 이대로 유저 발화시, API 요청은 이루어지지 않습니다. 마지막으로 해당 JavaScript 파일과 Action 모델을 endpoints.bxb 파일에서 연동시켜 주어야 합니다.

```js
endpoints {
  action-endpoints {
    action-endpoint (GetStatus) {
      accepted-inputs (CheckProvince, CheckCity, CheckStatus)
      local-endpoint (getStatus.js)
    }
  }
}
```

API 요청에 대한 상세한 설명과 부가 기능들은 [Bixby Developers Docs](https://bixbydevelopers.com/dev/docs/dev-guide/developers/actions.js-actions 'Calling APIs in Actions') 를 참고해주시기 바랍니다.

#### getPatients.js (GetPatients.model.bxb)

확진자를 불러오는 Action 모델도 동일하게 JavaScript 파일에 반영하면 됩니다. 한 가지 다른점은, API 요청을 통해 여러 데이터를 불러와, Timestamp 기준으로 정렬하기 위해 `compare()` function을 생성하여 적용합니다.

```js
function compare(a, b) {
  if (a.timestamp < b.timestamp) {
    return 1;
  }
  if (a.timestamp > b.timestamp) {
    return -1;
  }
  return 0;
}

...

return response.parsed.sort(compare)
```

---

## Bixby | 개발자 Insight - 4. 빅스비 뷰

<a href="https://www.youtube.com/watch?v=fKzjJXbk-Jk" target="_blank"><img src="https://i.imgur.com/wLyE7rW.png" 
alt="개발자 INSIGHT EP.4 - 코로나 알림" width="100%" height="100%" style="border: 5px solid black" /></a>

---

## Bixby | 개발자 Insight - 5. 학습

<a href="https://www.youtube.com/watch?v=AxXGTjJNFIM" target="_blank"><img src="https://i.imgur.com/XlQ3faC.png" 
alt="개발자 INSIGHT EP.5 - 코로나 알림" width="100%" height="100%" style="border: 5px solid black" /></a>

---

## Additional Resources

### Bixby에 대한 모든 것

- [Bixby Developer Center](http://bixbydevelopers.com) - Bixby 캡슐을 시작하기 위한 모든 것이 있습니다.
- [Bixby Developer Portal](https://bixby.developer.samsung.com/) - Bixby 최신 소식과 이벤트 정보들을 확인하실 수 있습니다.

### Guides & Best Practices

- [Quick Start Guide](https://bixbydevelopers.com/dev/docs/get-started/quick-start) - Bixby의 첫 캡슐을 만들어보세요.
- [Design Guides](https://bixbydevelopers.com/dev/docs/dev-guide/design-guides) - Bixby 캡슐을 디자인하기 위한 Best practices들을 배워보세요.
- [Developer Guides](https://bixbydevelopers.com/dev/docs/dev-guide/developers) - Bixby 캡슐을 만들기 위하여 필요한 A-Z를 배울 수 있습니다.
- [SW Expert Academy](https://swexpertacademy.com/main/learn/course/subjectList.do?courseId=BIXBY_CAPSULE) - Bixby 캡슐 개발을 위한 강의들을 보실 수 있습니다.

### Video Guides

- [Samsung Developer Youtube](https://www.youtube.com/user/SMInnov8) - Bixby 개발과 관련된 영상들을 확인하실 수 있습니다.
- [Bixby Developer Day Korea 2019](https://www.youtube.com/watch?v=Ty1ahLX7FlM&list=PL7PfK8Mp1rLE89RvwBh2IdCD3h6uAvgGm) - Bixby Developer Day Korea 2019에서 진행되었던 세션들을 만나보실 수 있습니다.
- [Bixby Developer Day Korea 2018](https://www.youtube.com/playlist?list=PL7PfK8Mp1rLH0vLvT0yv5VXh_3x2bCUHl) - Bixby Developer Day Korea 2018에서 진행되었던 세션들을 만나보실 수 있습니다.

### 도움이 필요하신가요?

- Bixby 커뮤니티에 참여하세요! [Bixby Developers Korea Slack](https://join.slack.com/t/bixbydeveloperskorea/shared_invite/enQtNTY2Mjc1NjUzNjA1LTYzOWYwZWE4MjExNTg4ZWUyNDg4OWViNDRiOWUyMjg0Yzg5NWI5N2NlNGU4Nzg4ZThiZGI0ZGEzZGY1OGE1MjI)
- 기능을 추가하고 싶으신가요? [Support Community](https://support.bixbydevelopers.com/hc/en-us/community/topics/360000183273-Feature-Requests)에 기능을 건의하여 주세요. 동일한 내용을 다른 분들이 이미 올렸다면, Vote 기능을 통해 추천을 해 주세요.
- 기술적인 지원이 필요하신가요? support@bixbydevelopers.com으로 이메일을 통하여 질문하여 주시거나 또는 [Stack Overflow](https://stackoverflow.com/questions/tagged/bixby)에 “bixby” 태그와 함께 질문하여 주세요.
