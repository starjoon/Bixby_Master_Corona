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
alt="개발자 INSIGHT EP.1 - 코로나 알림" width="100%" height="100%" style="border: 5px solid black" /></a>

### 교육 차원에서 발화 기능 / Action 은 총 2가지로 간주됩니다:

> "현황 알려줘" &rarr; GetStatus.model.bxb

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

> "확진자 알려줘" &rarr; GetPatients.model.bxb

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
