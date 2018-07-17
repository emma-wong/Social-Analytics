const twit = require('twit');          //use the Twit package
const config = require('./config.js'); //grab the authentication info from the config.js file

const Twitter = new twit(config);

//function for retrieving the tweets
const gtweet = function getTextAndImagesFromTweetsOfHandle(handle) {
    //parameter of the search. Set to take the most recent 100 English tweets of the specified user
    const params = {
        q: handle, //should be a string contain someone's handle without the '@' character
        count: '100',
        result_type: 'recent',
        lang: 'en'
    }
    
    //for more parameters and functions, see: https://dev.twitter.com/rest/reference/get/search/tweets

    Twitter.get('search/tweets', params, function(err, data) {
        if (!err) {
            //loop through the retrieved tweets (up to 100) and output text and image data
            let statuses = data.statuses;
            for(let status of statuses){
                console.log(status.text);
                //console.log(status.entities); //look at entities (contains media info)
                //media will contain a media url for images in the tweets, but may not be present
                let medias = status.entities.media;
                if(medias != null){
                    for(let media of medias){
                        console.log(media.media_url);
                        //console.log(media.type); //Saved for trouble-shooting gif/video aquisition
                    }                
                }
            }
        }
        else {
          console.log('Something went wrong while SEARCHING...');
        }
    });
}
 
//call the function
//gtweet('mint_fuzzy');