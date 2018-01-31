const mongoose = require('mongoose');
const { url, db, port } = require('../config');

const Tweet = require('../models/tweet');
const User = require('../models/user');

mongoose.connect(`mongodb://${url}:${port}/${db}`, { useMongoClient: true });

const tweets = [];


User.findOne({ username: 'pinky' })
  .then((user) => {
    for (let i = 0; i <= 10; i++) {
      tweets.push({ 
        tweet: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quisquam voluptate nihil, unde eos iusto nostrum ut illum, vel et sequi, corporis quae neque saepe exercitationem deserunt quo praesentium nesciunt dicta.',
        user_id: user._id,
        user_name: user.username,
      });
    }
    Tweet.create(tweets)
      .then((docs) => {
        console.log('created ✅');
        mongoose.disconnect(() => {
          console.log('DB closed');
        });
      })
      .catch((err) => {
        console.error(err);
      })

  })
  .catch((err) => {
    console.error(err);
  });

