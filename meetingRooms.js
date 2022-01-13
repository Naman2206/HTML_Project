/*There are multiple meeting rooms available to be booked throughout the day and there are multiple stakeholders 
interested in booking slots of these rooms. 
You need to create a meeting room app that would help folks on this. 

i/p : 


APIs: 
    search-for-a-room/{timing interval object}
        startTime: 11 hrs
        endTime : 12 hrs
    [room1, room2,...]

    book/room_id
    room obj

Search : 
1. Assuming: i/p time is valid (0 : 24)
2. Multiple avl rooms (when a room is avl for complete durationm)
3. While a user tries to book from the avl rooms, throw an error if already booked.
4. 

Flow:
user searches -> user selects from the avl -> book & exit if successful, else to step 2


o/p : List of avl rooms in required interval
*/

rooms = [
    {
        id: 1,
        desc: "",
        bookedTimings: [[1, 2, 101],[3, 5, 101]]
      },
      {
        id: 2,
        desc: "",
        bookedTimings: [[1, 2, 101],[3, 5, 101]]
      }
];

// roomA = {
//   id: 1,
//   desc: "",
//   bookedTimings: [[1, 2, 101],[3, 5, 101]]
// };

function overlappingIntervals(startTime, endTime, room){
    let bookingTimings = room.bookedTimings;
    for(let bookTime of bookingTimings){
        if(mergeIntervals(startTime, endTime, bookTime[0], bookTime[1])) {
            return false;
        }
    }
    return true;
}

function mergeIntervals(s1, e1, s2, e2){  
    // non-overlapping cases : // 4-5, 4.5-7 // 2-3, 1 - 5
    if(e1<=s2 || e2<=s1){
        return false;
    }
    return true;
}

function searchRooms (startTime, endTime) {

    if (!ValidityState(startTime, endTime)){
        throw new Error("invalid time");
    }

    let availableRooms = [];
    for(let room of rooms){
        if (isRoomAvl(startTime, endTime, room)){
            availableRooms.push(room.id);
        }
    }

    return availableRooms;
}

function isRoomAvl(startTime, endTime, room){ // returns boolean
    return !overlappingIntervals(startTime, endTime, room);
}

function bookARoom(roomid, userid, startTime, endTime) {
    let room = getRoom(roomid);
    if(isRoomAvl(startTime, endTime, room)){
        room.bookedTimings.push([startTime, endTime, userid]); /// push in sort -  to optimize search time to O(n log(n))
        room.bookedTimings.sort(interval => interval[0],interval[1]); // customizing sorting
        alert("Room successfully booked");
    } else {
        alert("Try again!");
    }
}

function getRoom(roomId) { // room object
    for(let room of rooms){
        if(room.id === roomId){
            return room;
        }
    }
    return null;
}


