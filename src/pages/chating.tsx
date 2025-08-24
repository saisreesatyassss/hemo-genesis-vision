// import React, { useState, useRef, useEffect } from 'react';
// import { Send, Heart, Activity, User, Bot } from 'lucide-react';

// const ThalassemiaAIchat = () => {
//   const [messages, setMessages] = useState([
//     {
//       id: 1,
//       text: "Hello! I'm HemoAI, your personal Thalassemia care assistant. I'm here to help you with information about managing your condition, treatment options, lifestyle tips, and answer any questions you may have. How can I assist you today?",
//       sender: 'ai',
//       timestamp: new Date()
//     }
//   ]);
  
//   const [inputText, setInputText] = useState('');
//   const [avatarState, setAvatarState] = useState('listening'); // listening, processing, speaking
//   const [isTyping, setIsTyping] = useState(false);
//   const messagesEndRef = useRef(null);
//   const inputRef = useRef(null);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   const simulateAIResponse = async (userMessage) => {
//     // Simulate API call delay
//     await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 2000));
    
//     // Sample responses for Thalassemia-related queries
//     const responses = [
//       "Based on current medical guidelines for Thalassemia management, it's important to maintain regular blood transfusions as prescribed by your hematologist. Iron chelation therapy is also crucial to prevent iron overload. Would you like more specific information about any of these treatments?",
      
//       "For Thalassemia patients, maintaining a balanced diet rich in folic acid and avoiding iron-rich foods (unless specifically advised by your doctor) is important. Foods like leafy greens, citrus fruits, and whole grains are beneficial. Are you looking for specific dietary recommendations?",
      
//       "Regular monitoring is essential for Thalassemia management. This typically includes complete blood counts, iron studies (serum ferritin, transferrin saturation), liver function tests, and cardiac assessments. How often do you currently have your check-ups?",
      
//       "Exercise can be beneficial for Thalassemia patients, but it should be tailored to your energy levels and hemoglobin status. Light to moderate activities like walking, swimming, or yoga are often recommended. Always consult with your healthcare team before starting new exercise routines.",
      
//       "Emotional support is just as important as medical treatment. Living with Thalassemia can be challenging, and it's normal to have concerns. Consider joining patient support groups or speaking with a counselor who understands chronic conditions. Would you like information about support resources?"
//     ];
    
//     // Select a relevant response or provide a general helpful response
//     let response = responses[Math.floor(Math.random() * responses.length)];
    
//     // Add some context-aware responses
//     if (userMessage.toLowerCase().includes('pain') || userMessage.toLowerCase().includes('hurt')) {
//       response = "I understand you're experiencing discomfort. Pain management in Thalassemia can involve various approaches. It's important to communicate with your healthcare team about any pain you're experiencing, as it could be related to your condition or treatments. Are you able to describe the type and location of your pain?";
//     } else if (userMessage.toLowerCase().includes('tired') || userMessage.toLowerCase().includes('fatigue')) {
//       response = "Fatigue is a common symptom in Thalassemia, often related to anemia. Ensuring adequate rest, maintaining your transfusion schedule, and managing iron levels can help. Light exercise and stress management techniques may also improve energy levels. Have you discussed your fatigue levels with your doctor recently?";
//     } else if (userMessage.toLowerCase().includes('transfusion')) {
//       response = "Blood transfusions are a cornerstone of Thalassemia treatment. The frequency depends on your specific type and severity. It's crucial to maintain your scheduled transfusions to prevent complications. Pre-medication and staying hydrated can help reduce side effects. Do you have any specific concerns about your transfusion regimen?";
//     }
    
//     return response;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!inputText.trim() || avatarState !== 'listening') return;

//     const userMessage = {
//       id: Date.now(),
//       text: inputText,
//       sender: 'user',
//       timestamp: new Date()
//     };

//     setMessages(prev => [...prev, userMessage]);
//     setInputText('');
//     setAvatarState('processing');

//     try {
//       // Here you would integrate with your Azure OpenAI endpoint
//       // const response = await callAzureOpenAI(inputText);
      
//       const aiResponse = await simulateAIResponse(inputText);
      
//       setAvatarState('speaking');
//       setIsTyping(true);
      
//       // Simulate typing effect
//       const aiMessage = {
//         id: Date.now() + 1,
//         text: '',
//         sender: 'ai',
//         timestamp: new Date()
//       };
      
//       setMessages(prev => [...prev, aiMessage]);
      
//       // Type out the response character by character
//       for (let i = 0; i <= aiResponse.length; i++) {
//         await new Promise(resolve => setTimeout(resolve, 30));
//         setMessages(prev => 
//           prev.map(msg => 
//             msg.id === aiMessage.id 
//               ? { ...msg, text: aiResponse.substring(0, i) }
//               : msg
//           )
//         );
//       }
      
//       setIsTyping(false);
//       setAvatarState('listening');
      
//     } catch (error) {
//       console.error('Error getting AI response:', error);
//       setAvatarState('listening');
//       setIsTyping(false);
//     }
//   };

//   const getAvatarContent = () => {
//     switch (avatarState) {
//       case 'listening':
//         return (
//           <div className="relative">
//             <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
//               <Heart className="w-8 h-8 text-white animate-pulse" />
//             </div>
//             <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
//           </div>
//         );
//       case 'processing':
//         return (
//           <div className="relative">
//             <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center shadow-lg animate-pulse">
//               <Activity className="w-8 h-8 text-white animate-spin" />
//             </div>
//             <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-orange-500 rounded-full border-2 border-white animate-pulse"></div>
//           </div>
//         );
//       case 'speaking':
//         return (
//           <div className="relative">
//             <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
//               <Bot className="w-8 h-8 text-white animate-bounce" />
//             </div>
//             <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-purple-500 rounded-full border-2 border-white animate-ping"></div>
//           </div>
//         );
//       default:
//         return null;
//     }
//   };

//   const getStatusText = () => {
//     switch (avatarState) {
//       case 'listening':
//         return 'Ready to help';
//       case 'processing':
//         return 'Thinking...';
//       case 'speaking':
//         return 'Responding';
//       default:
//         return '';
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
//       {/* Header */}
//       <header className="bg-white shadow-sm border-b-2 border-blue-200 p-4">
//         <div className="max-w-4xl mx-auto flex items-center justify-between">
//           <div className="flex items-center space-x-3">
//             <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-pink-600 rounded-full flex items-center justify-center">
//               <Heart className="w-6 h-6 text-white" />
//             </div>
//             <div>
//               <h1 className="text-xl font-bold text-gray-800">HemoAI Assistant</h1>
//               <p className="text-sm text-gray-600">Thalassemia Care Support</p>
//             </div>
//           </div>
//           <div className="text-right">
//             <div className="flex items-center space-x-2">
//               {getAvatarContent()}
//               <div>
//                 <p className="text-sm font-medium text-gray-700">{getStatusText()}</p>
//                 <p className="text-xs text-gray-500">Always here to help</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* Messages Container */}
//       <div className="flex-1 max-w-4xl mx-auto w-full p-4 overflow-hidden flex flex-col">
//         <div className="flex-1 overflow-y-auto space-y-4 mb-4" style={{ maxHeight: 'calc(100vh - 240px)' }}>
//           {messages.map((message) => (
//             <div
//               key={message.id}
//               className={`flex items-start space-x-3 ${
//                 message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
//               }`}
//             >
//               <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
//                 message.sender === 'user' 
//                   ? 'bg-gradient-to-br from-green-400 to-green-600' 
//                   : 'bg-gradient-to-br from-blue-400 to-blue-600'
//               }`}>
//                 {message.sender === 'user' ? (
//                   <User className="w-5 h-5 text-white" />
//                 ) : (
//                   <Bot className="w-5 h-5 text-white" />
//                 )}
//               </div>
              
//               <div className={`max-w-xs sm:max-w-md lg:max-w-lg xl:max-w-xl ${
//                 message.sender === 'user' ? 'ml-auto' : 'mr-auto'
//               }`}>
//                 <div className={`p-3 rounded-2xl shadow-sm ${
//                   message.sender === 'user'
//                     ? 'bg-gradient-to-br from-green-500 to-green-600 text-white'
//                     : 'bg-white text-gray-800 border border-gray-200'
//                 }`}>
//                   <p className="text-sm leading-relaxed">{message.text}</p>
//                   {isTyping && message.sender === 'ai' && message.id === messages[messages.length - 1]?.id && (
//                     <div className="flex items-center space-x-1 mt-2">
//                       <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
//                       <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
//                       <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
//                     </div>
//                   )}
//                 </div>
//                 <p className="text-xs text-gray-500 mt-1 px-3">
//                   {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
//                 </p>
//               </div>
//             </div>
//           ))}
//           <div ref={messagesEndRef} />
//         </div>

//         {/* Input Section */}
//         <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-4">
//           <div className="flex items-center space-x-3">
//             <input
//               ref={inputRef}
//               type="text"
//               value={inputText}
//               onChange={(e) => setInputText(e.target.value)}
//               onKeyPress={(e) => {
//                 if (e.key === 'Enter') {
//                   handleSubmit(e);
//                 }
//               }}
//               placeholder={
//                 avatarState === 'listening' 
//                   ? "Ask me about Thalassemia management, symptoms, treatments..." 
//                   : "Please wait..."
//               }
//               disabled={avatarState !== 'listening'}
//               className="flex-1 p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed text-gray-700"
//             />
//             <button
//               onClick={handleSubmit}
//               disabled={!inputText.trim() || avatarState !== 'listening'}
//               className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-3 rounded-xl hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-md"
//             >
//               <Send className="w-5 h-5" />
//             </button>
//           </div>
          
//           {/* Quick Action Buttons */}
//           <div className="flex flex-wrap gap-2 mt-3">
//             {[
//               "Tell me about Thalassemia",
//               "Diet recommendations",
//               "Managing fatigue",
//               "Blood transfusions",
//               "Iron chelation therapy"
//             ].map((suggestion) => (
//               <button
//                 key={suggestion}
//                 type="button"
//                 onClick={() => {
//                   if (avatarState === 'listening') {
//                     setInputText(suggestion);
//                     inputRef.current?.focus();
//                   }
//                 }}
//                 disabled={avatarState !== 'listening'}
//                 className="px-3 py-2 text-xs bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
//               >
//                 {suggestion}
//               </button>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ThalassemiaAIchat;

import React, { useState, useRef, useEffect } from 'react';
import { Send, Heart, Activity, User, Bot } from 'lucide-react';

const ThalassemiaAIchat = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm HemoAI, your personal Thalassemia care assistant. I'm here to help you with information about managing your condition, treatment options, lifestyle tips, and answer any questions you may have. How can I assist you today?",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  
  const [inputText, setInputText] = useState('');
  const [avatarState, setAvatarState] = useState('listening'); // listening, processing, speaking
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const simulateAIResponse = async (userMessage) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 2000));
    
    // Sample responses for Thalassemia-related queries
    const responses = [
      "Based on current medical guidelines for Thalassemia management, it's important to maintain regular blood transfusions as prescribed by your hematologist. Iron chelation therapy is also crucial to prevent iron overload. Would you like more specific information about any of these treatments?",
      
      "For Thalassemia patients, maintaining a balanced diet rich in folic acid and avoiding iron-rich foods (unless specifically advised by your doctor) is important. Foods like leafy greens, citrus fruits, and whole grains are beneficial. Are you looking for specific dietary recommendations?",
      
      "Regular monitoring is essential for Thalassemia management. This typically includes complete blood counts, iron studies (serum ferritin, transferrin saturation), liver function tests, and cardiac assessments. How often do you currently have your check-ups?",
      
      "Exercise can be beneficial for Thalassemia patients, but it should be tailored to your energy levels and hemoglobin status. Light to moderate activities like walking, swimming, or yoga are often recommended. Always consult with your healthcare team before starting new exercise routines.",
      
      "Emotional support is just as important as medical treatment. Living with Thalassemia can be challenging, and it's normal to have concerns. Consider joining patient support groups or speaking with a counselor who understands chronic conditions. Would you like information about support resources?"
    ];
    
    // Select a relevant response or provide a general helpful response
    let response = responses[Math.floor(Math.random() * responses.length)];
    
    // Add some context-aware responses
    if (userMessage.toLowerCase().includes('pain') || userMessage.toLowerCase().includes('hurt')) {
      response = "I understand you're experiencing discomfort. Pain management in Thalassemia can involve various approaches. It's important to communicate with your healthcare team about any pain you're experiencing, as it could be related to your condition or treatments. Are you able to describe the type and location of your pain?";
    } else if (userMessage.toLowerCase().includes('tired') || userMessage.toLowerCase().includes('fatigue')) {
      response = "Fatigue is a common symptom in Thalassemia, often related to anemia. Ensuring adequate rest, maintaining your transfusion schedule, and managing iron levels can help. Light exercise and stress management techniques may also improve energy levels. Have you discussed your fatigue levels with your doctor recently?";
    } else if (userMessage.toLowerCase().includes('transfusion')) {
      response = "Blood transfusions are a cornerstone of Thalassemia treatment. The frequency depends on your specific type and severity. It's crucial to maintain your scheduled transfusions to prevent complications. Pre-medication and staying hydrated can help reduce side effects. Do you have any specific concerns about your transfusion regimen?";
    }
    
    return response;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputText.trim() || avatarState !== 'listening') return;

    const userMessage = {
      id: Date.now(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setAvatarState('processing');

    try {
      // Here you would integrate with your Azure OpenAI endpoint
      // const response = await callAzureOpenAI(inputText);
      
      const aiResponse = await simulateAIResponse(inputText);
      
      setAvatarState('speaking');
      setIsTyping(true);
      
      // Simulate typing effect
      const aiMessage = {
        id: Date.now() + 1,
        text: '',
        sender: 'ai',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
      
      // Type out the response character by character
      for (let i = 0; i <= aiResponse.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 30));
        setMessages(prev => 
          prev.map(msg => 
            msg.id === aiMessage.id 
              ? { ...msg, text: aiResponse.substring(0, i) }
              : msg
          )
        );
      }
      
      setIsTyping(false);
      setAvatarState('listening');
      
    } catch (error) {
      console.error('Error getting AI response:', error);
      setAvatarState('listening');
      setIsTyping(false);
    }
  };

  const getAvatarContent = () => {
    switch (avatarState) {
      case 'listening':
        return (
          <div className="relative">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
              <Heart className="w-8 h-8 text-white animate-pulse" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
          </div>
        );
      case 'processing':
        return (
          <div className="relative">
            <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center shadow-lg animate-pulse">
              <Activity className="w-8 h-8 text-white animate-spin" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-orange-500 rounded-full border-2 border-white animate-pulse"></div>
          </div>
        );
      case 'speaking':
        return (
          <div className="relative">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
              <Bot className="w-8 h-8 text-white animate-bounce" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-purple-500 rounded-full border-2 border-white animate-ping"></div>
          </div>
        );
      default:
        return null;
    }
  };

  const getStatusText = () => {
    switch (avatarState) {
      case 'listening':
        return 'Ready to help';
      case 'processing':
        return 'Thinking...';
      case 'speaking':
        return 'Responding';
      default:
        return '';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm border-b-2 border-blue-200 p-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-pink-600 rounded-full flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">HemoAI Assistant</h1>
              <p className="text-sm text-gray-600">Thalassemia Care Support</p>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center space-x-2">
              {getAvatarContent()}
              <div>
                <p className="text-sm font-medium text-gray-700">{getStatusText()}</p>
                <p className="text-xs text-gray-500">Always here to help</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Messages Container */}
      <div className="flex-1 max-w-4xl mx-auto w-full p-4 overflow-hidden flex flex-col">
        <div className="flex-1 overflow-y-auto space-y-4 mb-4" style={{ maxHeight: 'calc(100vh - 240px)' }}>
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start space-x-3 ${
                message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
              }`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                message.sender === 'user' 
                  ? 'bg-gradient-to-br from-green-400 to-green-600' 
                  : 'bg-gradient-to-br from-blue-400 to-blue-600'
              }`}>
                {message.sender === 'user' ? (
                  <User className="w-5 h-5 text-white" />
                ) : (
                  <Bot className="w-5 h-5 text-white" />
                )}
              </div>
              
              <div className={`max-w-xs sm:max-w-md lg:max-w-lg xl:max-w-xl ${
                message.sender === 'user' ? 'ml-auto' : 'mr-auto'
              }`}>
                <div className={`p-3 rounded-2xl shadow-sm ${
                  message.sender === 'user'
                    ? 'bg-gradient-to-br from-green-500 to-green-600 text-white'
                    : 'bg-white text-gray-800 border border-gray-200'
                }`}>
                  <p className="text-sm leading-relaxed">{message.text}</p>
                  {isTyping && message.sender === 'ai' && message.id === messages[messages.length - 1]?.id && (
                    <div className="flex items-center space-x-1 mt-2">
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-1 px-3">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-4">
          <div className="flex items-center space-x-3">
            <input
              ref={inputRef}
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleSubmit(e);
                }
              }}
              placeholder={
                avatarState === 'listening' 
                  ? "Ask me about Thalassemia management, symptoms, treatments..." 
                  : "Please wait..."
              }
              disabled={avatarState !== 'listening'}
              className="flex-1 p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed text-gray-700"
            />
            <button
              onClick={handleSubmit}
              disabled={!inputText.trim() || avatarState !== 'listening'}
              className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-3 rounded-xl hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-md"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          
          {/* Quick Action Buttons */}
          <div className="flex flex-wrap gap-2 mt-3">
            {[
              "Tell me about Thalassemia",
              "Diet recommendations",
              "Managing fatigue",
              "Blood transfusions",
              "Iron chelation therapy"
            ].map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                onClick={() => {
                  if (avatarState === 'listening') {
                    setInputText(suggestion);
                    inputRef.current?.focus();
                  }
                }}
                disabled={avatarState !== 'listening'}
                className="px-3 py-2 text-xs bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThalassemiaAIchat;