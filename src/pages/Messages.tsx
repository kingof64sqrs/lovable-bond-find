import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Send,
  Search,
  MoreVertical,
  ArrowLeft,
  Smile,
  Paperclip,
  Phone,
  Video
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface Message {
  id: number;
  senderId: number;
  text: string;
  time: string;
  isOwn: boolean;
}

interface Conversation {
  id: number;
  name: string;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
}

const Messages = () => {
  const [selectedConversation, setSelectedConversation] = useState<number | null>(1);
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const conversations: Conversation[] = [
    {
      id: 1,
      name: "Priya Sharma",
      lastMessage: "Thank you for connecting!",
      time: "10:30 AM",
      unread: 2,
      online: true
    },
    {
      id: 2,
      name: "Ananya Patel",
      lastMessage: "Would love to know more about you",
      time: "Yesterday",
      unread: 0,
      online: false
    },
    {
      id: 3,
      name: "Sneha Reddy",
      lastMessage: "Nice to meet you",
      time: "2 days ago",
      unread: 1,
      online: true
    },
    {
      id: 4,
      name: "Kavya Iyer",
      lastMessage: "Looking forward to talking",
      time: "3 days ago",
      unread: 0,
      online: false
    }
  ];

  const messages: Message[] = [
    {
      id: 1,
      senderId: 1,
      text: "Hi! Thank you for connecting with me.",
      time: "10:15 AM",
      isOwn: false
    },
    {
      id: 2,
      senderId: 2,
      text: "Hello! Nice to connect with you too.",
      time: "10:20 AM",
      isOwn: true
    },
    {
      id: 3,
      senderId: 1,
      text: "Would you like to know more about me?",
      time: "10:25 AM",
      isOwn: false
    },
    {
      id: 4,
      senderId: 2,
      text: "Yes, I'd love to! Tell me about your interests.",
      time: "10:28 AM",
      isOwn: true
    },
    {
      id: 5,
      senderId: 1,
      text: "Thank you for connecting!",
      time: "10:30 AM",
      isOwn: false
    }
  ];

  const selectedConv = conversations.find(c => c.id === selectedConversation);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Add message logic here
      setNewMessage("");
    }
  };

  const filteredConversations = conversations.filter(conv =>
    conv.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-1 bg-muted/30">
        <div className="container py-8">
          <Link to="/dashboard" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6">
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>

          <Card className="shadow-soft overflow-hidden">
            <div className="grid md:grid-cols-3 h-[600px]">
              {/* Conversations List */}
              <div className="border-r">
                <div className="p-4 border-b">
                  <h2 className="text-xl font-bold mb-4">Messages</h2>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search conversations..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <ScrollArea className="h-[490px]">
                  {filteredConversations.map((conv) => (
                    <div
                      key={conv.id}
                      onClick={() => setSelectedConversation(conv.id)}
                      className={`p-4 border-b cursor-pointer hover:bg-muted/50 transition-colors ${
                        selectedConversation === conv.id ? 'bg-muted/50' : ''
                      }`}
                    >
                      <div className="flex gap-3">
                        <div className="relative">
                          <Avatar className="h-12 w-12">
                            <AvatarFallback className="gradient-accent text-white">
                              {conv.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          {conv.online && (
                            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background"></div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-semibold truncate">{conv.name}</h4>
                            <span className="text-xs text-muted-foreground">{conv.time}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <p className="text-sm text-muted-foreground truncate">
                              {conv.lastMessage}
                            </p>
                            {conv.unread > 0 && (
                              <Badge className="ml-2 bg-primary text-white">{conv.unread}</Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </ScrollArea>
              </div>

              {/* Chat Area */}
              <div className="md:col-span-2 flex flex-col">
                {selectedConv ? (
                  <>
                    {/* Chat Header */}
                    <div className="p-4 border-b flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <Avatar className="h-10 w-10">
                            <AvatarFallback className="gradient-accent text-white">
                              {selectedConv.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          {selectedConv.online && (
                            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background"></div>
                          )}
                        </div>
                        <div>
                          <h3 className="font-semibold">{selectedConv.name}</h3>
                          <p className="text-xs text-muted-foreground">
                            {selectedConv.online ? 'Online' : 'Offline'}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="icon" variant="ghost">
                          <Phone className="h-4 w-4" />
                        </Button>
                        <Button size="icon" variant="ghost">
                          <Video className="h-4 w-4" />
                        </Button>
                        <Button size="icon" variant="ghost">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Messages */}
                    <ScrollArea className="flex-1 p-4">
                      <div className="space-y-4">
                        {messages.map((message) => (
                          <div
                            key={message.id}
                            className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
                          >
                            <div
                              className={`max-w-[70%] rounded-lg p-3 ${
                                message.isOwn
                                  ? 'bg-primary text-primary-foreground'
                                  : 'bg-muted'
                              }`}
                            >
                              <p className="text-sm">{message.text}</p>
                              <p className={`text-xs mt-1 ${
                                message.isOwn ? 'text-primary-foreground/70' : 'text-muted-foreground'
                              }`}>
                                {message.time}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>

                    {/* Message Input */}
                    <div className="p-4 border-t">
                      <div className="flex gap-2">
                        <Button size="icon" variant="ghost">
                          <Paperclip className="h-4 w-4" />
                        </Button>
                        <Button size="icon" variant="ghost">
                          <Smile className="h-4 w-4" />
                        </Button>
                        <Input
                          placeholder="Type a message..."
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                          className="flex-1"
                        />
                        <Button
                          className="gradient-accent"
                          onClick={handleSendMessage}
                          disabled={!newMessage.trim()}
                        >
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex-1 flex items-center justify-center text-center p-8">
                    <div>
                      <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                        <Send className="h-10 w-10 text-muted-foreground" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">Select a conversation</h3>
                      <p className="text-muted-foreground">
                        Choose a conversation from the list to start messaging
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Messages;
