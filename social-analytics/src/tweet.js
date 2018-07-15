var twit = require('twit'); //use the Twit package
var config = require('./config.js'); //grab the authentication info from the config.js file

var Twitter = new twit(config);

//Function for retrieving the tweets
var gtweet = function(handle) {
    //Parameter of the search. Set to take the most recent 100 English tweets of the specified user
    var params = {
        q: handle, // Should be a string contain someone's handle without the '@' character
        count: '100',
        result_type: 'recent',
        lang: 'en'
    }
    
    //For more parameters and functions, see: https://dev.twitter.com/rest/reference/get/search/tweets

    Twitter.get('search/tweets', params, function(err, data) {
        if (!err) {
            //Loop through the retrieved tweets (up to 100) and output text and image data
            var i;
            for(i = 0; i < data.statuses.length; i++){
                console.log(data.statuses[i].text);
                //console.log(data.statuses[i].entities); //Look at entities (contains media info)
                //media will contain a media url for images in the tweets, but may not be present
                if(data.statuses[i].entities.media != null){
                    var j;
                    for(j = 0; j < data.statuses[i].entities.media.length; j++){
                        console.log(data.statuses[i].entities.media[j]);
                        //console.log(data.statuses[i].entities.media[j].type); //Saved for trouble-shooting gif/video aquisition
                    }                
                }
            }
        	
       }
        else {
          console.log('Something went wrong while SEARCHING...');
        }
    });
}
 
//Call the function
//gtweet('Twitter_user');