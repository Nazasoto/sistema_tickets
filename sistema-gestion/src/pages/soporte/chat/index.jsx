import React, { useState, useRef } from 'react';

// Datos de ejemplo para chats
const initialChats = [
  
];

const ChatPage = () => {
  const [chats, setChats] = useState(initialChats);
  const [activeChat, setActiveChat] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredChats = chats.filter(chat => 
    chat.sucursal.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSendMessage = () => {
    if (!newMessage.trim() || !activeChat) return;

    const updatedChats = chats.map(chat => {
      if (chat.id === activeChat.id) {
        const newMsg = {
          id: chat.mensajes.length + 1,
          texto: newMessage,
          enviadoPorUsuario: true,
          hora: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        
        return {
          ...chat,
          ultimoMensaje: newMessage,
          hora: 'Ahora',
          mensajes: [...chat.mensajes, newMsg]
        };
      }
      return chat;
    });

    setChats(updatedChats);
    setNewMessage('');
  };

  const handleSelectChat = (chat) => {
    const updatedChats = chats.map(c => {
      if (c.id === chat.id) {
        return { ...c, sinLeer: 0 };
      }
      return c;
    });
    
    setChats(updatedChats);
    setActiveChat(chat);
  };

  return (
    <div className="page-container p-0">
      <div className="chat-container">
        {/* Lista de chats */}
        <div className="chat-sidebar">
          <div className="chat-header">
            <h5>Chats</h5>
          </div>
          
          <div className="chat-search p-2 border-bottom">
            <div className="input-group">
              <span className="input-group-text">
                <i className="bi bi-search"></i>
              </span>
              <input 
                type="text" 
                className="form-control" 
                placeholder="Buscar chat..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div className="chat-list">
            {filteredChats.map(chat => (
              <div 
                key={chat.id} 
                className={`chat-list-item ${activeChat?.id === chat.id ? 'active' : ''}`}
                onClick={() => handleSelectChat(chat)}
              >
                <div className="chat-avatar">
                  <div className={`avatar ${chat.enLinea ? 'online' : ''}`}>
                    {chat.sucursal.charAt(0)}
                  </div>
                </div>
                <div className="chat-info">
                  <div className="d-flex justify-content-between">
                    <h6 className="mb-0">{chat.sucursal}</h6>
                    <small className="text-muted">{chat.hora}</small>
                  </div>
                  <p className="mb-0 text-truncate">
                    {chat.ultimoMensaje}
                  </p>
                </div>
                {chat.sinLeer > 0 && (
                  <span className="badge bg-primary rounded-pill">
                    {chat.sinLeer}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
        
        {/* Área de chat */}
        <div className="chat-main">
          {activeChat ? (
            <>
              <div className="chat-header">
                <div className="d-flex align-items-center">
                  <div className={`avatar ${activeChat.enLinea ? 'online' : ''} me-2`}>
                    {activeChat.sucursal.charAt(0)}
                  </div>
                  <div>
                    <h6 className="mb-0">{activeChat.sucursal}</h6>
                    <small className="text-muted">
                      {activeChat.enLinea ? 'En línea' : 'Desconectado'}
                    </small>
                  </div>
                </div>
              </div>
              
              <div className="chat-messages">
                {activeChat.mensajes.map((msg) => (
                  <div 
                    key={msg.id} 
                    className={`message ${msg.enviadoPorUsuario ? 'sent' : 'received'}`}
                  >
                    <div className="message-content">
                      <p className="mb-0">{msg.texto}</p>
                      <small className="text-muted">{msg.hora}</small>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
              
              <div className="chat-input">
                <div className="d-flex gap-2">
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Escribe un mensaje..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  />
                  <button 
                    className="btn btn-primary"
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                  >
                    <i className="bi bi-send"></i>
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="chat-welcome">
              <div className="text-center">
                <i className="bi bi-chat-square-text display-4 text-muted mb-3"></i>
                <h4>Selecciona un chat</h4>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
