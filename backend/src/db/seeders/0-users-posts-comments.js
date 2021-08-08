'use strict';
const uuid = require('uuid')
const usersData=require('../data/users.json')
const postsData=require('../data/posts.json')
const commentsData=require('../data/comments.json')
module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const users=usersData.map((item)=>({ ...item, id: uuid.v4(), public_user_id: uuid.v4() })) 
    
    await queryInterface.bulkInsert('users', users, {})
    const posts=postsData.map((item, index)=>({ ...item, id: uuid.v4(), user_id: users[index].id, likes: 0 }))
    
    await queryInterface.bulkInsert('posts', posts, {})    

    let comments=[]
   
    for ( let index=0; index<commentsData.length; index++ ) {
      for ( let subIndex=0; subIndex<posts.length; subIndex++ ) {
        comments.push( { id: uuid.v4(), content: commentsData[index].content, post_id: posts[subIndex].id, user_id: users[subIndex].id  } )
      }
    }
   await queryInterface.bulkInsert('comments', comments, {})
   
   const likes=posts.map((item, index)=>( { id: uuid.v4(), user_id: posts[index].id, post_id: posts[index].id  } ))

   await queryInterface.bulkInsert('likes', likes, {})
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('users', null, {});
     await queryInterface.bulkDelete('posts', null, {});
     await queryInterface.bulkDelete('comments', null, {});
     await queryInterface.bulkDelete('likes', null, {});
  }
};
