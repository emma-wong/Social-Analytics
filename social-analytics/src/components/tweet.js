export default function tweet(handle) {

    const twit = require('twit');          //use the Twit package
    const config = require('../assets/config.js'); //grab the authentication info from the config.js file

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
                    let medias = status.entities.media;
                    if(medias != null){
                        for(let media of medias){
                            console.log(media.media_url);
                        }                
                    }
                }
                return data;
            }
            else {
                return 0;
              console.log('Something went wrong while SEARCHING...');
            }
        });
    }

    gtweet('mint_fuzzy');
}

 
//call the function
//gtweet('mint_fuzzy');