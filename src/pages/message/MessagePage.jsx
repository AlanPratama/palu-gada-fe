import React, { useState, useEffect } from 'react';
import { Input, Button, Card, CardBody, Badge, Tooltip, Checkbox } from '@nextui-org/react';
import { formatDistanceToNow, format, isToday, isYesterday } from 'date-fns';

const initialContacts = [
  {
    id: 1,
    name: 'John Doe',
    unread: 2,
    messages: [
      { sender: 'John Doe', text: 'Hi there!', timestamp: new Date() },
      { sender: 'John Doe', text: 'How are you?ewxrctysghjbjfkgbkjsadglkjagkjfdgkafsjdghfdaglkfjadgljfalkjfdglkjfaglkajfglkjaflgjldsfkjgldsfkgjldsfkgjlk', timestamp: new Date() },
      { sender: 'You', text: 'I am fine, thanks!', timestamp: new Date() },
      { sender: 'You', text: 'How are you?ewxrctysghjbjfkgbkjsadglkjagkjfdgkafsjdghfdaglkfjadgljfalkjfdglkjfaglkajfglkjaflgjldsfkjgldsfkgjldsfkgjlk', timestamp: new Date() },
    ],
  },
  {
    id: 2,
    name: 'Jane Smith',
    unread: 1,
    messages: [
      { sender: 'Jane Smith', text: 'Hello!', timestamp: new Date() },
      { sender: 'Jane Smith', text: 'Can we meet tomorrow?', timestamp: new Date() }
    ],
  },
];

export const MessagePage = () => {
  const [contacts, setContacts] = useState(initialContacts);
  const [selectedContact, setSelectedContact] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [deleteMode, setDeleteMode] = useState(false);
  const [selectedMessages, setSelectedMessages] = useState([]);

  const handleSendMessage = () => {
    if (newMessage.trim() !== '' && selectedContact) {
      const updatedContacts = contacts.map(contact =>
        contact.id === selectedContact.id
          ? {
              ...contact,
              messages: [
                ...contact.messages,
                { sender: 'You', text: newMessage, timestamp: new Date() }
              ],
            }
          : contact
      );
      setContacts(updatedContacts);
      setSelectedContact({
        ...selectedContact,
        messages: [
          ...selectedContact.messages,
          { sender: 'You', text: newMessage, timestamp: new Date() },
        ],
      });
      setNewMessage('');
    }
  };

  const handleDeleteMessages = () => {
    if (selectedContact) {
      const updatedMessages = selectedContact.messages.filter((_, index) => !selectedMessages.includes(index));
      const updatedContacts = contacts.map(contact =>
        contact.id === selectedContact.id
          ? { ...contact, messages: updatedMessages }
          : contact
      );
      setContacts(updatedContacts);
      setSelectedContact({ ...selectedContact, messages: updatedMessages });
      setDeleteMode(false);
      setSelectedMessages([]);
    }
  };

  useEffect(() => {
    if (selectedContact) {
      const updatedContacts = contacts.map(contact =>
        contact.id === selectedContact.id
          ? { ...contact, unread: 0 }
          : contact
      );
      setContacts(updatedContacts);
    }
  }, [selectedContact]);

  const filteredContacts = contacts
    .map(contact => ({
      ...contact,
      latestMessage: contact.messages[contact.messages.length - 1],
    }))
    .filter(contact => contact.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => b.latestMessage.timestamp - a.latestMessage.timestamp);

  const formatMessageTime = (timestamp) => {
    const messageDate = new Date(timestamp);
    if (isToday(messageDate)) {
      return `Today at ${format(messageDate, 'HH:mm')}`;
    } else if (isYesterday(messageDate)) {
      return `Yesterday at ${format(messageDate, 'HH:mm')}`;
    } else {
      return format(messageDate, 'dd MMM yyyy at HH:mm');
    }
  };

  const handleCheckboxChange = (index) => {
    if (selectedMessages.includes(index)) {
      setSelectedMessages(selectedMessages.filter(i => i !== index));
    } else {
      setSelectedMessages([...selectedMessages, index]);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md h-screen flex">
      <div className="rounded-2xl w-1/4 bg-white p-4 border-r dark:bg-gray-900 dark:border-gray-700">
        <h2 className="text-lg font-bold mb-4 dark:text-white">Contacts</h2>
        <Input
          clearable
          underlined
          placeholder="Search contacts..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="mb-4"
        />
        <ul>
          {filteredContacts.map(contact => (
            <li
              key={contact.id}
              className={`p-2 cursor-pointer rounded-lg ${selectedContact && selectedContact.id === contact.id ? 'bg-blue-100 dark:bg-blue-950 dark:text-white' : ''}`}
              onClick={() => setSelectedContact(contact)}
            >
              <div className="flex justify-between">
                <span>{contact.name}</span>
                {contact.unread > 0 && (
                  <Badge color="error" variant="flat">
                    {contact.unread}
                  </Badge>
                )}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {contact.latestMessage ? formatDistanceToNow(new Date(contact.latestMessage.timestamp), { addSuffix: true }) : 'No messages'}
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Percakapan */}
      <div className="w-3/4 rounded-2xl p-4 flex flex-col bg-gray-50 dark:bg-gray-900">
        {selectedContact ? (
          <div className="h-full flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold dark:text-white">{selectedContact.name}</h2>
              <Button
                auto
                light
                color="error"
                onClick={() => setDeleteMode(!deleteMode)}
                css={{ fontSize: '24px', padding: '10px', width: '50px', height: '50px' }}
              >
                <ion-icon name="trash-outline" style={{ fontSize: '32px' }}></ion-icon>
              </Button>
            </div>
            <div className="flex-1 overflow-y-auto mb-4">
              {selectedContact.messages.map((msg, index) => (
                <div
                  key={index}
                  className={`mb-2 flex ${msg.sender === 'You' ? 'justify-end' : 'justify-start'}`}
                >
                  <Card
                    className={`relative max-w-lg w-auto ${
                      msg.sender === 'You' ? 'bg-blue-100 dark:bg-blue-950 text-right' : 'bg-white dark:bg-gray-800'
                    }`}
                  > 
                    <CardBody className="relative p-4">
                      {deleteMode && (
                        <Checkbox
                          checked={selectedMessages.includes(index)}
                          onChange={() => handleCheckboxChange(index)}
                          className="absolute top-2 right-2"
                        />
                      )}
                      <p className="whitespace-pre-wrap break-words">{msg.text}</p>
                      {/* Display time at the bottom-right */}
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                        {msg.sender} | {formatMessageTime(msg.timestamp)}
                      </div>
                    </CardBody>
                  </Card>
                </div>
              ))}
            </div>
            {deleteMode && (
              <div className="flex justify-end mb-4">
                <Button color="error" onClick={handleDeleteMessages}>
                  Delete Selected
                </Button>
              </div>
            )}
            <div className="flex items-center border-t border-gray-300 bg-white dark:bg-gray-800 p-4">
              <Input
                clearable
                underlined
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="flex-1 mr-4"
              />
              <Button onClick={handleSendMessage} color="primary">Send</Button>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center text-center text-gray-500 dark:text-gray-400">
            <p>Select a contact to start chatting.</p>
          </div>
        )}
      </div>
    </div>
  );
};
    