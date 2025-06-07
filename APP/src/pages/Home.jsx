import React, { useState, useEffect, useRef } from 'react';
import { FaBars, FaTimes, FaSearch, FaPaperPlane, FaCommentDots } from 'react-icons/fa';

const ChatApp = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [messageInput, setMessageInput] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, text: "Hey Sarah! How are you doing today?", time: "10:30 AM", isReceived: true },
    { id: 2, text: "Hi Michael! I'm doing great, thanks for asking. How about you?", time: "10:32 AM", isReceived: false },
    { id: 3, text: "Pretty good! Just wanted to check if you're still up for lunch tomorrow?", time: "10:33 AM", isReceived: true },
    { id: 4, text: "Absolutely! 12:30 at the usual place?", time: "10:34 AM", isReceived: false },
    { id: 5, text: "Perfect! I'll see you there. By the way, did you get a chance to look at the project proposal I sent you?", time: "10:35 AM", isReceived: true },
    { id: 6, text: "Yes, I went through it yesterday. It looks really good! I just have a couple of small suggestions. I can share them with you tomorrow.", time: "10:37 AM", isReceived: false },
    { id: 7, text: "That would be great! Looking forward to it. Have a wonderful day!", time: "10:38 AM", isReceived: true },
    { id: 8, text: "You too! See you tomorrow 😊", time: "10:39 AM", isReceived: false }
  ]);
  const [activeContact, setActiveContact] = useState(0);
  
  const chatMessagesRef = useRef(null);
  const messageInputRef = useRef(null);

  const contacts = [
    { id: 0, name: "Michael Brown", lastMessage: "Hey, how are you doing?", time: "10:30 AM", unread: 3, avatar: "https://randomuser.me/api/portraits/men/32.jpg" },
    { id: 1, name: "Emily Wilson", lastMessage: "Meeting at 2 PM tomorrow", time: "Yesterday", unread: 0, avatar: "https://randomuser.me/api/portraits/women/65.jpg" },
    { id: 2, name: "David Miller", lastMessage: "Please review the documents", time: "Yesterday", unread: 1, avatar: "https://randomuser.me/api/portraits/men/75.jpg" },
    { id: 3, name: "Jessica Davis", lastMessage: "Thanks for your help!", time: "Monday", unread: 0, avatar: "https://randomuser.me/api/portraits/women/33.jpg" },
    { id: 4, name: "Robert Taylor", lastMessage: "Let's catch up soon", time: "Sunday", unread: 0, avatar: "https://randomuser.me/api/portraits/men/22.jpg" },
    { id: 5, name: "Jennifer Anderson", lastMessage: "Did you see the news?", time: "Friday", unread: 0, avatar: "https://randomuser.me/api/portraits/women/28.jpg" }
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const sendMessage = () => {
    if (messageInput.trim()) {
      const newMessage = {
        id: messages.length + 1,
        text: messageInput,
        time: getCurrentTime(),
        isReceived: false
      };
      
      setMessages([...messages, newMessage]);
      setMessageInput('');
      
      // Simulate reply
      setTimeout(() => {
        const replies = [
          "That's interesting!",
          "I see what you mean.",
          "Let me think about that.",
          "Thanks for sharing!",
          "I agree with you.",
          "What else is on your mind?",
          "That makes sense.",
          "I'll get back to you on that."
        ];
        const randomReply = replies[Math.floor(Math.random() * replies.length)];
        
        const replyMessage = {
          id: messages.length + 2,
          text: randomReply,
          time: getCurrentTime(),
          isReceived: true
        };
        
        setMessages(prev => [...prev, replyMessage]);
      }, 1000 + Math.random() * 2000);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  const getCurrentTime = () => {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    return `${hours}:${minutes} ${ampm}`;
  };

  const handleFabClick = () => {
    messageInputRef.current.focus();
  };

  const selectContact = (id) => {
    setActiveContact(id);
    if (window.innerWidth < 768) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="chat-app">

      
      {/* Menu Toggle (Mobile) */}
      <button className="menu-toggle" onClick={toggleMenu}>
        {isMenuOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Chat Container */}
      <div className="chat-container">
        {/* Sidebar */}
        <div className={`sidebar ${isMenuOpen ? 'active' : ''}`}>
          <div className="sidebar-header">
            <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Profile" className="profile-pic" />
            <div className="user-info">
              <h3>Sarah Johnson</h3>
              <p>Online</p>
            </div>
          </div>

          <div className="search-bar">
            <i><FaSearch /></i>
            <input type="text" placeholder="Search contacts..." />
          </div>

          <div className="contacts">
            {contacts.map(contact => (
              <div 
                key={contact.id} 
                className={`contact ${activeContact === contact.id ? 'active' : ''}`}
                onClick={() => selectContact(contact.id)}
              >
                <img src={contact.avatar} alt="Contact" className="contact-pic" />
                <div className="contact-info">
                  <h4>{contact.name}</h4>
                  <p>{contact.lastMessage}</p>
                </div>
                <span className="contact-time">{contact.time}</span>
                {contact.unread > 0 && (
                  <span className="contact-unread">{contact.unread}</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="chat-area">
          <div className="chat-header">
            <img src={contacts[activeContact].avatar} alt="Profile" className="profile-pic" />
            <div className="chat-header-info">
              <h3>{contacts[activeContact].name}</h3>
              <p>last seen today at 12:45 PM</p>
            </div>
            <div className="chat-status"></div>
          </div>

          <div className="chat-messages" ref={chatMessagesRef}>
            {messages.map(message => (
              <div key={message.id} className={`message ${message.isReceived ? 'received' : 'sent'}`}>
                <div className="message-content">
                  {message.text}
                </div>
                <div className="message-time">{message.time}</div>
              </div>
            ))}
          </div>

          <div className="chat-input">
            <input 
              type="text" 
              placeholder="Type a message..." 
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              onKeyPress={handleKeyPress}
              ref={messageInputRef}
            />
            <button className="send-btn" onClick={sendMessage}>
              <FaPaperPlane />
            </button>
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <div className="fab" onClick={handleFabClick}>
        <FaCommentDots />
      </div>
    </div>
  );
};

export default ChatApp;