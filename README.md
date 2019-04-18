# project3-mern

# Requirements (Total of 20 points)

### Due Date: Thursday, April 25 at 8am

### Aesthetics (4 pts)
Use HTML, CSS, and JavaScript to make your portfolio aesthetically pleasing.

#### Navigational/Structural Format (3 pts)
- 3pts: Content is presented in a clear manner that is easy to follow. Readers can get around your website with ease. There are no blind links.
- 2pts: Content is presented in a clear manner that is easy to follow. Navigation is difficult. Not intuitive.
- 1pts: Content is somewhat confusing and difficult to follow. Site is somewhat difficult to navigate. Too much textual information.
- 0pt: Content is confusing and difficult to follow. Site is difficult to navigate. Not intuitive. Large images that take long to load.

#### Simplicity and Color Scheme (1 pts)
- 1pt: Content is simple and to the point. Design is easy to understand in many ways color is appropriately used to produce an atmosphere that expresses the character of the Web site. 
- 0pts: Web page is too busy. People reading it cannot find what they want quickly. Excessive use of graphic elements

### Functionality (16 pts)

Make sure you include the following pages:

### While NOT logged in (6 pts)
#### Home (1 pt)
- Show a Sign In Form
- Show 5 most recent tweets of all public tweets sorted by latest.
#### Create a new User (3 pts)
- Include the following Username, Password, Image, Background Image
#### Search Tweets (2 pts)
- Show results of searched tweets

### While the User IS logged In (10 pts)
#### Home (2 pts)
- Show 5 most recent tweets of all tweets sorted by latest.
#### Personal Tweets (5 pts)
- Add New Tweet
- - Include a required Tweet message and optional image URL for each tweet 
- - Include a checkbox for tweets to only be seen by logged in user (private tweets)
- Include edit button for each tweet only by creator of tweet
#### Search Tweets (3 pts)
- Show results of searched tweets.

### Notes
- You can create an array of tweet objects in your model like this:
```
book: [{
          title : String,
          author : String
        }]
```

- You can get rid of the mounting warning with this article: https://www.robinwieruch.de/react-warning-cant-call-setstate-on-an-unmounted-component/

- You can add a unique ID to your messages when you push them to the server
```
// At the top, bring in the ObjectID object
var ObjectID = require('mongodb').ObjectID;

// Then use the _id key and the new ObjectID() function when you push
{$push: {todos: {_id: new ObjectID(), todo: req.body.todoItem}}}
```


### SMALL OFFSET CHALLENGE
- Create an offset const in your code so you can easily change the number of tweets a user sees on the Home page

### DIFFICULT FOLLOW CHALLENGE
- Include an additional page to show tweets of people you follow
- - Add friends from the all tweets page by clicking on the “star” next to their name.
