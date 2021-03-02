<p align="center">
  <img src="https://camo.githubusercontent.com/745c6ad37a844ec4f3d533e299ab5756107f99e8/68747470733a2f2f6269786279646576656c6f706572732e636f6d2f6465762f646f63732d6173736574732f7265736f75726365732f6465762d67756964652f62697862795f6c6f676f5f6769746875622d31313232313934303037303237383032383336392e706e67">
</p>

# Bixby Developer Insight [COVID-19 App/Capsule]

Hi, I'm Joon Choi, the developer of COVID-19 Bixby Capsule.

This is an English translation of a document detailing the project I worked in partnership with Samsung Bixby; this repository entails the full-stack development process of the COVID-19 Bixby Capsule.

---

## Bixby | Developer Insight - 1. Introduction

<a href="http://www.youtube.com/watch?feature=player_embedded&v=iNFlq-O6aRM
" target="_blank"><img src="https://i.imgur.com/GHeg0fI.jpg" 
alt="개발자 INSIGHT EP.1 - 코로나 알림" width="100%" height="100%" style="border: 5px solid black" /></a>

Published in Feb 2020 on Bixby Marketplace, the COVID-19 Bixby Capsule provides latest news and updates on COVID-19 status, nearby hotspots and mask sellers to Samsung Bixby users. As there are no public COVID-19 APIs currently available, most of the information originate from South Korea's [CDC](http://ncov.mohw.go.kr 'COVID-19 CDC Website') Website.

### The following capsule serves educational purposes and the devlopment process is as follows:

**Modeling** &rarr; **Coding** &rarr; **Bixby Views (UI/UX)** &rarr; **Training**

---

## Bixby | Developer Insight - 2. Modeling

<a href="http://www.youtube.com/watch?feature=player_embedded&v=S2Jbey_a7tw
" target="_blank"><img src="https://i.imgur.com/TgbamG2.jpg" 
alt="개발자 INSIGHT EP.2 - 코로나 알림" width="100%" height="100%" style="border: 5px solid black" /></a>

### We will only cover 2 Utterances/Action in this document for educational purposes:

#### "Get COVID-19 Status" &rarr; GetStatus.model.bxb

```js
action (GetStatus) {
  type (Search)
  description (Get COVID-19 Status)
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

#### "Retrieve COVID-19 Patients" &rarr; GetPatients.model.bxb

```js
action (GetPatients) {
  type (Search)
  description (Retrieve Patients)
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

### You can think of Actions as the text and speech (user utterance) that interact with the users.

```js
//Get me status on Suwon, Gyeonggi Province
action (GetStatus) {
  type (Search)
  description (현황 불러오기)
  collect {
    //Gyeonggi
    input (CheckProvince) {
      type (CheckProvince)
      min (Optional) max (One)
    }
    //Suwon
    input (CheckCity) {
      type (CheckCity)
      min (Optional) max (One)
    }
    //Status
    input (CheckStatus) {
      type (CheckStatus)
      min (Required) max (One)
    }
  }
  output (Status)
}
```

---

## Bixby | Developer Insight - 3. Coding

<a href="http://www.youtube.com/watch?feature=player_embedded&v=QJDK5gBSwu4
" target="_blank"><img src="https://i.imgur.com/84HLKU5.jpg" 
alt="개발자 INSIGHT EP.3 - 코로나 알림" width="100%" height="100%" style="border: 5px solid black" /></a>

As there are no public APIs available, we must create our own custom API (back-end). In this tutorial, we will be using AWS to provide us with the tools for Database and REST API. To learn more about AWS use, please refer to the [Bixby_Master_Corona_AWS](https://github.com/starjoon/Bixby_Master_Corona_AWS 'Back-end development using AWS') repository!

Once we've set up our back-end, we can finish our additional coding (JavaScript) on Bixby Developer Studio, and link the API calls to the corresponding Actions/User Utterances.

#### getStatus.js (GetStatus.model.bxb)

Bixby Developer Studio provides JavaScript ECMAScript5 (ES5) environment, so there are some limitations as to modules we can use.

```js
var console = require('console');
var http = require('http');
var fail = require('fail');
```

JavaScript files should resemble the Action files we constructed earlier in terms of functionality.

```js
action (GetStatus) {
  type (Search)
  description (Get Status)
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
  // API request and process data
  return Status;
};
```

First, we will extract query variables or "keywords" to use in our API request from user utterances. Here, we have to consider all combinations that could result from different utterances.

```js
//Set Query variables
var searchRegion;
if (CheckCity != null) {
  searchRegion = CheckCity;
} else if (CheckProvince != null) {
  searchRegion = CheckProvince;
} else {
  searchRegion = 'SouthKorea';
}
```

API calls will be made using the `http` module. This module contains `getUrl()` method with `URL` and `Options` required parameters.

```js
//Set API call parameters
var URL = 'Enter API URL';
var Options = {
  format: 'json',
  returnHeaders: true,
  query: {
    region: searchRegion,
  },
};

//API request
var response = http.getUrl(URL, Options);
```

We will use the `fail` module for error handling in case of an error during our API request.

```js
//No patient found in said region (Error Code 400)
if (response.status == 400) {
  throw fail.checkedError('No patient found', 'NoPatients', null);
}
```

We have designed our capsule, so that in case such error occurs, all processes will come to a halt and revert back to the original Action. Here, the second parameter of `fail.checkedError()` which we defined as `'NoPatients'` is the assigned Error ID, and we must indicate this ID in our Action model as well.

```js
action (GetStatus) {
  // Same input as before
  output (Status) {
    throws {
      error (NoPatients) {
        on-catch {
          halt {
            dialog {
              template ("There are no patients in this area.")
            }
          }
        }
      }
    }
  }
}
```

Now, we can go back to our JavaScript file and simply return our values if the API request is successful.

```js
return response.parsed;
```

However, the API request still won't work in the current state when a user asks a question. We have to link the JavaScript file to the Action model by creating endpoints to connect the two for the final step.

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

To find out more about API request and additional features available on Bixby Developer Studio, please refer to [Bixby Developers Docs](https://bixbydevelopers.com/dev/docs/dev-guide/developers/actions.js-actions 'Calling APIs in Actions').

#### getPatients.js (GetPatients.model.bxb)

The same thing applies to the Action model for retrieving patients. The only difference would be the addition of the `compare()` function to compare timestamps for displaying patient information (latest to oldest).

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

## Bixby | Developer Insight - 4. Bixby View

<a href="https://www.youtube.com/watch?v=fKzjJXbk-Jk" target="_blank"><img src="https://i.imgur.com/wLyE7rW.png" 
alt="개발자 INSIGHT EP.4 - 코로나 알림" width="100%" height="100%" style="border: 5px solid black" /></a>

---

## Bixby | Developer Insight - 5. Training

<a href="https://www.youtube.com/watch?v=AxXGTjJNFIM" target="_blank"><img src="https://i.imgur.com/XlQ3faC.png" 
alt="개발자 INSIGHT EP.5 - 코로나 알림" width="100%" height="100%" style="border: 5px solid black" /></a>

---

## Additional Resources

### Everything there is to Bixby

- [Bixby Developer Center](http://bixbydevelopers.com) - Find out everything you need to get started on your Bixby capsule.
- [Bixby Developer Portal](https://bixby.developer.samsung.com/) - Get the latest news and updates on Samsung Bixby.

### Guides & Best Practices

- [Quick Start Guide](https://bixbydevelopers.com/dev/docs/get-started/quick-start) - Create your very first Bixby capsule.
- [Design Guides](https://bixbydevelopers.com/dev/docs/dev-guide/design-guides) - Learn the best practices for designing your Bixby capsule.
- [Developer Guides](https://bixbydevelopers.com/dev/docs/dev-guide/developers) - Everything you need to know for developing your Bixby capsule.
- [SW Expert Academy](https://swexpertacademy.com/main/learn/course/subjectList.do?courseId=BIXBY_CAPSULE) - Watch tutorial videos on how to create your own Bixby capsule.

### Video Guides

- [Samsung Developer Youtube](https://www.youtube.com/user/SMInnov8) - Watch videos on Bixby capsule development.
- [Bixby Developer Day Korea 2019](https://www.youtube.com/watch?v=Ty1ahLX7FlM&list=PL7PfK8Mp1rLE89RvwBh2IdCD3h6uAvgGm) - Watch recorded sessions held at Bixby Developer Day Korea 2019.
- [Bixby Developer Day Korea 2018](https://www.youtube.com/playlist?list=PL7PfK8Mp1rLH0vLvT0yv5VXh_3x2bCUHl) - Watch recorded sessions held at Bixby Developer Day Korea 2018.

### Need some help?

- Join the Bixby Developer Community! [Bixby Developers Korea Slack](https://join.slack.com/t/bixbydeveloperskorea/shared_invite/enQtNTY2Mjc1NjUzNjA1LTYzOWYwZWE4MjExNTg4ZWUyNDg4OWViNDRiOWUyMjg0Yzg5NWI5N2NlNGU4Nzg4ZThiZGI0ZGEzZGY1OGE1MjI)
- Is there a feature you would like to add? Contact [Support Community](https://support.bixbydevelopers.com/hc/en-us/community/topics/360000183273-Feature-Requests) and let us know what features you would like to see on Bixby. If you already see a similar feature posted, make sure to like the post for recognition!
- Need technical assistance? Contact us at support@bixbydevelopers.com or post your question on [Stack Overflow](https://stackoverflow.com/questions/tagged/bixby) with the tag **bixby**.
