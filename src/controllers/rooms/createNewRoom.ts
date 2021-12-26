import ChatRoom from "../../models/chatRoom";

const createNewRoom = async (user1Id: string, user2Id: string) => {
  const newChatRoom = await ChatRoom.create({
    users: [user1Id, user2Id],
    messages: []
  });
  return newChatRoom;
};

export default createNewRoom;
