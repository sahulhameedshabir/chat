var userDb = []

// adding user 
const addUser = (newUser)=>{
    userDb.push(newUser)
}

//  getting the current user
const getUser = (userId)=>{
    let currentUser = userDb.find((user)=>{
        return user.id === userId
    })
    return currentUser
}

// getting the room of the user
const getUserRoom = (userRoom) =>{
    // filter returns a new array users from same room
    let usersInSameRoom = userDb.filter((user)=>{
        return user.room === userRoom
    })
    return usersInSameRoom
}

// removing an user using the id by finding the index value
const removeUser = (userId)=>{
    let indexValue = userDb.findIndex((user)=>{
        return user.id === userId
    })
    if(indexValue !== -1){
        return userDb.splice(indexValue,1)[0]
    }
}

module.exports = {addUser, getUser,getUserRoom,removeUser}