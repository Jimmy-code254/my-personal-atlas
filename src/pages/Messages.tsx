
import { useState } from "react";
import { DashboardLayout } from "@/components/Dashboard/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageSquare, Search, User, Phone, Video, Send, Plus } from "lucide-react";

const Messages = () => {
  const [activeChat, setActiveChat] = useState(1);
  const [messageText, setMessageText] = useState("");
  
  // Mock data for conversations
  const conversations = [
    {
      id: 1,
      person: "Mrs. Johnson",
      role: "Mathematics Teacher",
      online: true,
      avatar: "J",
      lastMessage: "Did you complete the homework assignment?",
      time: "10:30 AM",
      unread: 2
    },
    {
      id: 2,
      person: "Principal Ochieng",
      role: "School Principal",
      online: false,
      avatar: "O",
      lastMessage: "Please remind your parents about the upcoming meeting",
      time: "Yesterday",
      unread: 0
    },
    {
      id: 3,
      person: "Mr. Chen",
      role: "Physics Teacher",
      online: true,
      avatar: "C",
      lastMessage: "Great work on your lab report!",
      time: "Yesterday",
      unread: 1
    },
    {
      id: 4,
      person: "Study Group",
      role: "5 members",
      online: false,
      avatar: "SG",
      lastMessage: "James: Can we meet tomorrow to prepare?",
      time: "2 days ago",
      unread: 0
    },
    {
      id: 5,
      person: "Mrs. Odhiambo",
      role: "History Teacher",
      online: false,
      avatar: "O",
      lastMessage: "The essay deadline has been extended",
      time: "1 week ago",
      unread: 0
    }
  ];
  
  // Mock chat messages
  const messages = [
    {
      id: 1,
      sender: "Mrs. Johnson",
      content: "Hello! Have you completed the algebra homework?",
      time: "10:15 AM",
      isMe: false
    },
    {
      id: 2,
      sender: "You",
      content: "Hi Mrs. Johnson! I'm working on it now, but I'm having trouble with problem #5.",
      time: "10:18 AM",
      isMe: true
    },
    {
      id: 3,
      sender: "Mrs. Johnson",
      content: "Let me see if I can help. In problem #5, you need to factor the quadratic expression first.",
      time: "10:22 AM",
      isMe: false
    },
    {
      id: 4,
      sender: "Mrs. Johnson",
      content: "Start by identifying the coefficients a, b, and c in ax² + bx + c",
      time: "10:23 AM", 
      isMe: false
    },
    {
      id: 5,
      sender: "You",
      content: "Oh, I see. So for 3x² - 10x + 7, a=3, b=-10, and c=7?",
      time: "10:25 AM",
      isMe: true
    },
    {
      id: 6,
      sender: "Mrs. Johnson",
      content: "Exactly! Now try to find two numbers that multiply to give ac (which is 21) and add to give b (which is -10).",
      time: "10:28 AM",
      isMe: false
    },
    {
      id: 7,
      sender: "Mrs. Johnson",
      content: "Did you complete the homework assignment?",
      time: "10:30 AM",
      isMe: false
    }
  ];

  const handleSendMessage = () => {
    if (messageText.trim()) {
      // In a real app with Supabase, this would save the message to the database
      console.log("Sending message:", messageText);
      setMessageText("");
    }
  };

  const activeConversation = conversations.find(conv => conv.id === activeChat);

  return (
    <DashboardLayout>
      <div className="h-[calc(100vh-12rem)] flex flex-col">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Messages</h2>
        
        <div className="flex h-full rounded-lg overflow-hidden border">
          {/* Conversations Sidebar */}
          <div className="w-80 border-r bg-white flex flex-col">
            <div className="p-4 border-b">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input 
                  type="text"
                  placeholder="Search conversations..." 
                  className="pl-9" 
                />
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto">
              {conversations.map(conversation => (
                <div 
                  key={conversation.id}
                  onClick={() => setActiveChat(conversation.id)}
                  className={`
                    p-4 border-b cursor-pointer hover:bg-gray-50 transition-colors
                    ${activeChat === conversation.id ? 'bg-blue-50' : ''}
                  `}
                >
                  <div className="flex items-center">
                    <div className={`
                      w-10 h-10 rounded-full flex items-center justify-center text-white font-medium mr-3
                      ${activeChat === conversation.id ? 'bg-blue-600' : 'bg-gray-500'}
                    `}>
                      {conversation.avatar}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium truncate">{conversation.person}</h4>
                        <span className="text-xs text-gray-500">{conversation.time}</span>
                      </div>
                      <p className="text-sm text-gray-600 truncate">{conversation.lastMessage}</p>
                      <p className="text-xs text-gray-500">{conversation.role}</p>
                    </div>
                    
                    {conversation.unread > 0 && (
                      <span className="ml-2 bg-blue-600 text-white text-xs font-medium w-5 h-5 flex items-center justify-center rounded-full">
                        {conversation.unread}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="p-4 border-t">
              <Button className="w-full">
                <Plus className="mr-2 h-4 w-4" />
                New Message
              </Button>
            </div>
          </div>
          
          {/* Chat Area */}
          <div className="flex-1 flex flex-col bg-gray-50">
            {activeConversation ? (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b bg-white flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={`
                      w-10 h-10 rounded-full flex items-center justify-center text-white font-medium mr-3
                      bg-blue-600 relative
                    `}>
                      {activeConversation.avatar}
                      {activeConversation.online && (
                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                      )}
                    </div>
                    <div>
                      <h4 className="font-medium">{activeConversation.person}</h4>
                      <p className="text-xs text-gray-500">{activeConversation.online ? "Online" : "Offline"}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="icon">
                      <Phone className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Video className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <User className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
                
                {/* Messages */}
                <div className="flex-1 p-4 overflow-y-auto">
                  <div className="space-y-4">
                    {messages.map(message => (
                      <div 
                        key={message.id} 
                        className={`
                          flex
                          ${message.isMe ? 'justify-end' : 'justify-start'}
                        `}
                      >
                        <div className={`
                          max-w-[80%] px-4 py-2 rounded-lg
                          ${message.isMe 
                            ? 'bg-blue-600 text-white rounded-br-none' 
                            : 'bg-white border rounded-bl-none'
                          }
                        `}>
                          <p>{message.content}</p>
                          <span className={`
                            text-xs block mt-1 
                            ${message.isMe ? 'text-blue-200' : 'text-gray-500'}
                          `}>
                            {message.time}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Message Input */}
                <div className="p-4 border-t bg-white">
                  <div className="flex items-center">
                    <Input 
                      type="text"
                      placeholder="Type a message..." 
                      className="mr-2"
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                    />
                    <Button onClick={handleSendMessage}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <MessageSquare className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-lg font-medium">No conversation selected</h3>
                  <p className="text-gray-500">Choose a conversation from the sidebar</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Messages;
