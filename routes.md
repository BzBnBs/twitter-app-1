| method | action | description | logged | status |
|:--------|:--------|:--------|:-------:|:-------:|
| GET |  /signup   |  show form signup  | ❌ | done |
| POST | /signup   |  create user | ❌ | done |
| GET | /login   |  show form login | ❌ | done |
| POST | /login | login user session | ❌ | done |
| GET | /logout | destroy user session | ❌ | done |
| GET | /timeline | show all tweets of logged user | ✅ | done |
| GET | /profile/:username | show profile of :username and all tweets of that user | ❌ |
| POST | /profile/:username/follow | follow :username from logged user | ✅ |
<!-- | GET | /profile/:username/timeline | show :username | ✅ | -->
| GET | /tweets | show all tweets from logged user | ✅ |
| GET | /tweets/new | show form create tweet of logged user | ✅ | done |
| POST | /tweets | create user tweet of logged user | ✅ | done |