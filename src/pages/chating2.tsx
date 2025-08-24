 
import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, MicOff, Volume2, VolumeX, Settings, Pause, Play } from 'lucide-react';
import * as THREE from 'three';

const HumanLikeAIAvatar = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm Dr. Sarah, your personal Thalassemia specialist. I'm here to provide you with comprehensive care guidance, treatment information, and support. How can I help you today?",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  
  const [inputText, setInputText] = useState('');
  const [avatarState, setAvatarState] = useState('idle');
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(true);
  const [isMicEnabled, setIsMicEnabled] = useState(false);
  const [currentEmotion, setCurrentEmotion] = useState('neutral');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechProgress, setSpeechProgress] = useState(0);
  
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const avatarRef = useRef(null);
  const animationRef = useRef(null);
  const speechSynthesisRef = useRef(null);
const speakText = (text: string, lang: string = "hi-IN") => {
  if (!isVoiceEnabled || !("speechSynthesis" in window)) return;

  // cancel ongoing
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 0.9;
  utterance.pitch = 1.1;
  utterance.volume = 0.8;
  utterance.lang = lang;

  // ✅ load voices properly
  const voices = window.speechSynthesis.getVoices();
  const matchingVoice = voices.find(v => v.lang === lang);

  if (matchingVoice) {
    utterance.voice = matchingVoice;
  } else {
    console.warn(`No voice found for ${lang}, using default.`);
  }

  // events
  utterance.onstart = () => {
    setIsSpeaking(true);
    setAvatarState("speaking");
  };

  utterance.onend = () => {
    setIsSpeaking(false);
    setAvatarState("idle");
    setSpeechProgress(0);
  };

  utterance.onboundary = (event) => {
    const progress = event.charIndex / text.length;
    setSpeechProgress(progress);
  };

  speechSynthesisRef.current = utterance;
  window.speechSynthesis.speak(utterance);
};

// ✅ ensure voices are loaded before first use
window.speechSynthesis.onvoiceschanged = () => {
  console.log("Voices loaded:", window.speechSynthesis.getVoices());
};


  const stopSpeaking = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
    setAvatarState('idle');
    setSpeechProgress(0);
  };

  // Enhanced 3D Avatar Setup
  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 300 / 400, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true
    });
    renderer.setSize(300, 400);
    renderer.setClearColor(0x000000, 0);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    
    mountRef.current.appendChild(renderer.domElement);
    
    // Enhanced lighting setup
    const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
    scene.add(ambientLight);
    
    const keyLight = new THREE.DirectionalLight(0xffffff, 1.2);
    keyLight.position.set(3, 5, 5);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 2048;
    keyLight.shadow.mapSize.height = 2048;
    scene.add(keyLight);
    
    const fillLight = new THREE.DirectionalLight(0x87CEEB, 0.6);
    fillLight.position.set(-3, 3, 3);
    scene.add(fillLight);
    
    const rimLight = new THREE.DirectionalLight(0xFFE4E1, 0.8);
    rimLight.position.set(-2, 1, -2);
    scene.add(rimLight);
    
    // Create more human-like avatar
  const createHumanAvatar = () => {
  const avatarGroup = new THREE.Group();

  // More realistic head shape
  const headGeometry = new THREE.SphereGeometry(1, 32, 32);
  headGeometry.scale(1, 1.1, 0.9); // More oval shape
  const headMaterial = new THREE.MeshPhongMaterial({
    color: 0xFFCBA4,
    shininess: 20,
    specular: 0x111111,
    transparent: false,
  });
  const head = new THREE.Mesh(headGeometry, headMaterial);
  head.castShadow = true;
  head.receiveShadow = true;
  avatarGroup.add(head);

  // More realistic eyes
  const eyeSocketGeometry = new THREE.SphereGeometry(0.18, 16, 16);
  const eyeSocketMaterial = new THREE.MeshPhongMaterial({ color: 0xFFB6A3 });

  const leftEyeSocket = new THREE.Mesh(eyeSocketGeometry, eyeSocketMaterial);
  leftEyeSocket.position.set(-0.25, 0.15, 0.85);
  leftEyeSocket.scale.set(1, 0.8, 0.7);
  avatarGroup.add(leftEyeSocket);

  const rightEyeSocket = new THREE.Mesh(eyeSocketGeometry, eyeSocketMaterial);
  rightEyeSocket.position.set(0.25, 0.15, 0.85);
  rightEyeSocket.scale.set(1, 0.8, 0.7);
  avatarGroup.add(rightEyeSocket);

  // Eye whites
  const eyeGeometry = new THREE.SphereGeometry(0.12, 20, 20);
  const eyeWhiteMaterial = new THREE.MeshPhongMaterial({ color: 0xFFFFF0 });

  const leftEye = new THREE.Mesh(eyeGeometry, eyeWhiteMaterial);
  leftEye.position.set(-0.25, 0.15, 0.92);
  avatarGroup.add(leftEye);

  const rightEye = new THREE.Mesh(eyeGeometry, eyeWhiteMaterial);
  rightEye.position.set(0.25, 0.15, 0.92);
  avatarGroup.add(rightEye);

  // Iris and pupils
  const irisGeometry = new THREE.SphereGeometry(0.06, 16, 16);
  const irisLMaterial = new THREE.MeshPhongMaterial({ color: 0x2E7D32 });
  const irisRMaterial = new THREE.MeshPhongMaterial({ color: 0x2E7D32 });

  const leftIris = new THREE.Mesh(irisGeometry, irisLMaterial);
  leftIris.position.set(-0.25, 0.15, 0.98);
  avatarGroup.add(leftIris);

  const rightIris = new THREE.Mesh(irisGeometry, irisRMaterial);
  rightIris.position.set(0.25, 0.15, 0.98);
  avatarGroup.add(rightIris);

  const pupilGeometry = new THREE.SphereGeometry(0.03, 12, 12);
  const pupilMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });

  const leftPupil = new THREE.Mesh(pupilGeometry, pupilMaterial);
  leftPupil.position.set(-0.25, 0.15, 1.0);
  avatarGroup.add(leftPupil);

  const rightPupil = new THREE.Mesh(pupilGeometry, pupilMaterial);
  rightPupil.position.set(0.25, 0.15, 1.0);
  avatarGroup.add(rightPupil);

  // Eyelids
  const eyelidGeometry = new THREE.SphereGeometry(0.13, 16, 8, 0, Math.PI * 2, 0, Math.PI * 0.5);
  const eyelidMaterial = new THREE.MeshPhongMaterial({ color: 0xFFCBA4 });

  const leftUpperEyelid = new THREE.Mesh(eyelidGeometry, eyelidMaterial);
  leftUpperEyelid.position.set(-0.25, 0.22, 0.92);
  avatarGroup.add(leftUpperEyelid);

  const rightUpperEyelid = new THREE.Mesh(eyelidGeometry, eyelidMaterial);
  rightUpperEyelid.position.set(0.25, 0.22, 0.92);
  avatarGroup.add(rightUpperEyelid);

  // Eyebrows
  const eyebrowGeometry = new THREE.BoxGeometry(0.35, 0.08, 0.08);
  const eyebrowMaterial = new THREE.MeshPhongMaterial({ color: 0x8B4513 });

  const leftEyebrow = new THREE.Mesh(eyebrowGeometry, eyebrowMaterial);
  leftEyebrow.position.set(-0.25, 0.35, 0.88);
  leftEyebrow.rotation.z = 0.15;
  avatarGroup.add(leftEyebrow);

  const rightEyebrow = new THREE.Mesh(eyebrowGeometry, eyebrowMaterial);
  rightEyebrow.position.set(0.25, 0.35, 0.88);
  rightEyebrow.rotation.z = -0.15;
  avatarGroup.add(rightEyebrow);

  // More defined nose
  const noseGeometry = new THREE.BoxGeometry(0.12, 0.25, 0.15);
  const noseMaterial = new THREE.MeshPhongMaterial({ color: 0xFFB6A3 });
  const nose = new THREE.Mesh(noseGeometry, noseMaterial);
  nose.position.set(0, -0.05, 0.92);
  nose.rotation.x = 0.2;
  avatarGroup.add(nose);

  // Nostrils
  const nostrilGeometry = new THREE.SphereGeometry(0.03, 8, 8);
  const nostrilMaterial = new THREE.MeshPhongMaterial({ color: 0xFF9F8A });

  const leftNostril = new THREE.Mesh(nostrilGeometry, nostrilMaterial);
  leftNostril.position.set(-0.04, -0.12, 0.95);
  avatarGroup.add(leftNostril);

  const rightNostril = new THREE.Mesh(nostrilGeometry, nostrilMaterial);
  rightNostril.position.set(0.04, -0.12, 0.95);
  avatarGroup.add(rightNostril);

  // More realistic lips
  const upperLipGeometry = new THREE.SphereGeometry(0.15, 16, 8, 0, Math.PI * 2, Math.PI * 0.5, Math.PI * 0.5);
  const lipsLipMaterial = new THREE.MeshPhongMaterial({ color: 0xCC6677, shininess: 50 });

  const upperLip = new THREE.Mesh(upperLipGeometry, lipsLipMaterial);
  upperLip.position.set(0, -0.35, 0.88);
  upperLip.rotation.x = Math.PI;
  avatarGroup.add(upperLip);

  const lowerLipGeometry = new THREE.SphereGeometry(0.15, 16, 8, 0, Math.PI * 2, 0, Math.PI * 0.5);
  const lowerLip = new THREE.Mesh(lowerLipGeometry, lipsLipMaterial);
  lowerLip.position.set(0, -0.42, 0.88);
  avatarGroup.add(lowerLip);

  // Cheeks
  const cheekGeometry = new THREE.SphereGeometry(0.2, 16, 16);
  const cheekMaterial = new THREE.MeshPhongMaterial({ color: 0xFFB6A3, transparent: true, opacity: 0.8 });

  const leftCheek = new THREE.Mesh(cheekGeometry, cheekMaterial);
  leftCheek.position.set(-0.4, -0.1, 0.6);
  leftCheek.scale.set(0.8, 0.6, 0.4);
  avatarGroup.add(leftCheek);

  const rightCheek = new THREE.Mesh(cheekGeometry, cheekMaterial);
  rightCheek.position.set(0.4, -0.1, 0.6);
  rightCheek.scale.set(0.8, 0.6, 0.4);
  avatarGroup.add(rightCheek);

  // More realistic hair (modified to cover only the top)
  const hairGeometry = new THREE.SphereGeometry(1.1, 20, 20, 0, Math.PI * 2, 0, Math.PI * 0.5); // Reduced vertical span
  const hairMaterial = new THREE.MeshPhongMaterial({
    color: 0x4A2C2A,
    shininess: 80,
    specular: 0x222222
  });
  const hair = new THREE.Mesh(hairGeometry, hairMaterial);
  hair.position.set(0, 0.55, -0.1); // Adjusted vertical position
  avatarGroup.add(hair);

  // Remove the hair strands loop
  // for (let i = 0; i < 8; i++) {
  //   const strandGeometry = new THREE.CylinderGeometry(0.02, 0.01, 0.3);
  //   const strand = new THREE.Mesh(strandGeometry, hairMaterial);
  //   const angle = (i / 8) * Math.PI * 2;
  //   strand.position.set(
  //     Math.cos(angle) * 0.9,
  //     0.8 + Math.random() * 0.2,
  //     Math.sin(angle) * 0.4
  //   );
  //   strand.rotation.z = angle + Math.PI / 2;
  //   avatarGroup.add(strand);
  // }

  // Neck with more detail
  const neckGeometry = new THREE.CylinderGeometry(0.35, 0.4, 0.6);
  const neckMaterial = new THREE.MeshPhongMaterial({ color: 0xFFCBA4 });
  const neck = new THREE.Mesh(neckGeometry, neckMaterial);
  neck.position.set(0, -1.4, 0);
  avatarGroup.add(neck);

  // Professional attire
  const collarGeometry = new THREE.TorusGeometry(0.45, 0.05, 8, 16);
  const collarMaterial = new THREE.MeshPhongMaterial({ color: 0xFFFFFF });
  const collar = new THREE.Mesh(collarGeometry, collarMaterial);
  collar.position.set(0, -1.65, 0);
  avatarGroup.add(collar);

  const coatGeometry = new THREE.BoxGeometry(2.2, 1.8, 0.4);
  const coatMaterial = new THREE.MeshPhongMaterial({ color: 0xF8F8FF, shininess: 10 });
  const coat = new THREE.Mesh(coatGeometry, coatMaterial);
  coat.position.set(0, -2.8, -0.1);
  avatarGroup.add(coat);

  // Store references for animation
  avatarGroup.userData = {
    head,
    leftEye,
    rightEye,
    leftIris,
    rightIris,
    leftPupil,
    rightPupil,
    leftEyebrow,
    rightEyebrow,
    leftUpperEyelid,
    rightUpperEyelid,
    upperLip,
    lowerLip,
    leftCheek,
    rightCheek,
    nose
  };

  return avatarGroup;
};
    

    
    const avatar = createHumanAvatar();
    scene.add(avatar);
    
    camera.position.set(0, 0, 4.5);
    camera.lookAt(0, -0.5, 0);
    
    // Enhanced animation loop
    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);
      
      const time = Date.now() * 0.001;
      
      // Natural breathing
      avatar.position.y = Math.sin(time * 1.5) * 0.03;
      avatar.rotation.z = Math.sin(time * 0.8) * 0.01;
      
      // Eye movements and blinking
      const lookX = Math.sin(time * 0.7) * 0.02;
      const lookY = Math.cos(time * 0.5) * 0.01;
      
      if (avatar.userData.leftIris && avatar.userData.rightIris) {
        avatar.userData.leftIris.position.x = -0.25 + lookX;
        avatar.userData.leftIris.position.y = 0.15 + lookY;
        avatar.userData.rightIris.position.x = 0.25 + lookX;
        avatar.userData.rightIris.position.y = 0.15 + lookY;
        
        avatar.userData.leftPupil.position.x = -0.25 + lookX;
        avatar.userData.leftPupil.position.y = 0.15 + lookY;
        avatar.userData.rightPupil.position.x = 0.25 + lookX;
        avatar.userData.rightPupil.position.y = 0.15 + lookY;
      }
      
      // Natural blinking
      if (Math.random() < 0.008) {
        [avatar.userData.leftUpperEyelid, avatar.userData.rightUpperEyelid].forEach(eyelid => {
          if (eyelid) {
            eyelid.position.y = 0.15;
            setTimeout(() => {
              eyelid.position.y = 0.22;
            }, 120);
          }
        });
      }
      
      // Speaking animation with more realistic mouth movement
      if (isSpeaking) {
        const speechIntensity = 0.3 + Math.sin(time * 20) * 0.2;
        if (avatar.userData.upperLip && avatar.userData.lowerLip) {
          avatar.userData.upperLip.position.y = -0.35 + speechIntensity * 0.05;
          avatar.userData.lowerLip.position.y = -0.42 - speechIntensity * 0.08;
          avatar.userData.lowerLip.scale.y = 1 + speechIntensity * 0.3;
        }
        
        // Slight head movement while speaking
        avatar.rotation.x = Math.sin(time * 3) * 0.02;
        avatar.rotation.y = Math.sin(time * 2.5) * 0.03;
      } else {
        // Reset mouth position
        if (avatar.userData.upperLip && avatar.userData.lowerLip) {
          avatar.userData.upperLip.position.y = -0.35;
          avatar.userData.lowerLip.position.y = -0.42;
          avatar.userData.lowerLip.scale.y = 1;
        }
        avatar.rotation.x = 0;
        avatar.rotation.y = 0;
      }
      
      // Emotion-based expressions
      switch (currentEmotion) {
        case 'concerned':
          if (avatar.userData.leftEyebrow && avatar.userData.rightEyebrow) {
            avatar.userData.leftEyebrow.rotation.z = 0.3;
            avatar.userData.rightEyebrow.rotation.z = -0.3;
            avatar.userData.leftEyebrow.position.y = 0.4;
            avatar.userData.rightEyebrow.position.y = 0.4;
          }
          break;
        case 'happy':
        case 'friendly':
          if (avatar.userData.leftCheek && avatar.userData.rightCheek) {
            avatar.userData.leftCheek.position.y = -0.05;
            avatar.userData.rightCheek.position.y = -0.05;
          }
          if (avatar.userData.upperLip) {
            avatar.userData.upperLip.rotation.x = Math.PI - 0.3;
          }
          break;
        case 'thinking':
          avatar.rotation.y = Math.sin(time * 2) * 0.05;
          if (avatar.userData.leftEyebrow && avatar.userData.rightEyebrow) {
            avatar.userData.leftEyebrow.position.y = 0.38;
            avatar.userData.rightEyebrow.position.y = 0.32;
          }
          break;
        default:
          // Reset to neutral
          if (avatar.userData.leftEyebrow && avatar.userData.rightEyebrow) {
            avatar.userData.leftEyebrow.rotation.z = 0.15;
            avatar.userData.rightEyebrow.rotation.z = -0.15;
            avatar.userData.leftEyebrow.position.y = 0.35;
            avatar.userData.rightEyebrow.position.y = 0.35;
          }
          if (avatar.userData.leftCheek && avatar.userData.rightCheek) {
            avatar.userData.leftCheek.position.y = -0.1;
            avatar.userData.rightCheek.position.y = -0.1;
          }
          if (avatar.userData.upperLip) {
            avatar.userData.upperLip.rotation.x = Math.PI;
          }
      }
      
      renderer.render(scene, camera);
    };
    
    animate();
    
    sceneRef.current = { scene, camera, renderer, avatar };
    avatarRef.current = avatar;
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [currentEmotion, isSpeaking]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getAIResponse = async (userMessage) => {
    await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1500));
    
    const message = userMessage.toLowerCase();
    
    if (message.includes('pain') || message.includes('hurt') || message.includes('ache')) {
      setCurrentEmotion('concerned');
      return "I can see this is causing you distress, and I want you to know that your pain is valid and treatable. Pain in Thalassemia can stem from bone marrow expansion, iron overload affecting organs, or complications from treatments. Let's work together to identify the specific source and develop a comprehensive pain management plan. Can you describe where you're feeling the pain and how intense it is on a scale of 1 to 10?";
    }
    
    if (message.includes('tired') || message.includes('fatigue') || message.includes('energy')) {
      setCurrentEmotion('empathetic');
      return "I completely understand how exhausting it can be to live with chronic fatigue. This is one of the most challenging aspects of Thalassemia, and it's not just being 'tired' - it's a deep, overwhelming exhaustion that affects every aspect of your life. Your fatigue is directly linked to your hemoglobin levels and iron management. Let's discuss strategies to help boost your energy levels, including optimizing your transfusion schedule, ensuring proper iron chelation, and incorporating gentle movement that won't drain your limited energy reserves.";
    }
    
    if (message.includes('transfusion') || message.includes('blood')) {
      setCurrentEmotion('professional');
      return "Blood transfusions are indeed the cornerstone of your Thalassemia management, and I want to ensure you feel confident and comfortable with this essential treatment. The goal is to maintain your pre-transfusion hemoglobin between 9 to 10.5 grams per deciliter. This prevents complications like bone deformities, enlarged spleen, and growth issues. Pre-medication with acetaminophen and antihistamines helps prevent reactions. Are you experiencing any side effects or concerns about your current transfusion regimen? I'm here to address any worries you might have.";
    }
    
    if (message.includes('diet') || message.includes('food') || message.includes('nutrition')) {
      setCurrentEmotion('helpful');
      return "Nutrition is such a powerful tool in managing how you feel day-to-day with Thalassemia. The key is being strategic about what you eat. We want to limit iron-rich foods unless specifically advised otherwise - so avoiding red meat, liver, and iron-fortified cereals. Instead, focus on folate-rich foods like leafy greens, legumes, and citrus fruits to support healthy red blood cell production. Calcium and Vitamin D are crucial for bone health. Tea and coffee with meals can actually help reduce iron absorption. Would you like me to create a personalized meal plan that works with your lifestyle and preferences?";
    }
    
    if (message.includes('chelation') || message.includes('iron') || message.includes('desferal') || message.includes('exjade')) {
      setCurrentEmotion('serious');
      return "Iron chelation therapy is absolutely critical for your long-term health - it's what protects your heart, liver, and other organs from iron damage caused by regular transfusions. The three main chelators each have their benefits: Desferal is very effective but requires subcutaneous infusion, Exjade is convenient as a daily tablet, and Ferriprox is useful for heart iron removal. We monitor your progress through serum ferritin levels, MRI scans of your heart and liver, and regular organ function tests. Are you currently on a chelation regimen? Any concerns about side effects or compliance? Remember, this medication is literally protecting your future health.";
    }
    
    setCurrentEmotion('friendly');
    const responses = [
      "Thank you for trusting me with your question. As your Thalassemia specialist, I want to provide you with evidence-based, compassionate care that addresses not just your medical needs, but your emotional wellbeing too. Every person's journey with Thalassemia is unique, and I'm here to help you navigate yours with confidence and hope.",
      "I'm so glad you reached out today. Living with Thalassemia requires a strong partnership between you and your healthcare team, and I'm honored to be part of that support system. Let's explore this topic together and find solutions that work specifically for your situation and lifestyle.",
      "Your proactive approach to understanding your condition is truly admirable. Thalassemia management has come so far with new treatments and monitoring techniques. I want to ensure you have all the information you need to make empowered decisions about your health and live your fullest life."
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleSendMessage = async () => {
    if (!inputText.trim() || avatarState === 'thinking' || avatarState === 'speaking') return;

    const userMessage = {
      id: Date.now(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setAvatarState('thinking');
    setCurrentEmotion('thinking');

    try {
      const aiResponse = await getAIResponse(inputText);
      
      setAvatarState('speaking');
      
      const aiMessage = {
        id: Date.now() + 1,
        text: '',
        sender: 'ai',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
      
      // Start text-to-speech
      if (isVoiceEnabled) {
        speakText(aiResponse, "hi-IN");
      }
      
      // Typing animation synchronized with speech
      const typingSpeed = isSpeaking ? 50 : 30; // Slower when speaking
      for (let i = 0; i <= aiResponse.length; i++) {
        await new Promise(resolve => setTimeout(resolve, typingSpeed));
        setMessages(prev => 
          prev.map(msg => 
            msg.id === aiMessage.id 
              ? { ...msg, text: aiResponse.substring(0, i) }
              : msg
          )
        );
      }
      
      // If not speaking, set back to idle
      if (!isSpeaking) {
        setAvatarState('idle');
        setCurrentEmotion('neutral');
      }
      
    } catch (error) {
      console.error('Error:', error);
      setAvatarState('idle');
      setCurrentEmotion('neutral');
    }
  };

  // Load voices when available
  useEffect(() => {
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      console.log('Available voices:', voices);
    };
    
    if ('speechSynthesis' in window) {
      loadVoices();
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 flex flex-col h-screen max-w-7xl mx-auto ">
        {/* Header */}
        <header className="flex items-center     justify-between p-2 backdrop-blur-sm bg-black/20 border-b border-white/10">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-full flex items-center justify-center text-xl font-bold">
              Dr
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Dr. Sarah - Human-Like AI Specialist
              </h1>
              <p className="text-sm text-gray-400">Advanced Thalassemia Care with Realistic 3D Avatar & Voice</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={() => {
                setIsVoiceEnabled(!isVoiceEnabled);
                if (!isVoiceEnabled && isSpeaking) {
                  stopSpeaking();
                }
              }}
              className={`p-3 rounded-full transition-all ${isVoiceEnabled ? 'bg-blue-500 text-white' : 'bg-gray-600 text-gray-300'}`}
            >
              {isVoiceEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
            </button>
            {isSpeaking && (
              <button
                onClick={stopSpeaking}
                className="p-3 rounded-full bg-red-500 text-white hover:bg-red-600 transition-all animate-pulse"
              >
                <Pause className="w-5 h-5" />
              </button>
            )}
            <button className="p-3 rounded-full bg-gray-600 hover:bg-gray-500 text-white transition-all">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </header>

        <div className="flex flex-1 overflow-hidden">
          {/* 3D Avatar Section */}
          <div className="w-96 bg-black/20 backdrop-blur-sm border-r border-white/10 flex flex-col items-center justify-start p-8">
            <div className="relative mb-6">
              {/* 3D Avatar Container */}
              <div 
                ref={mountRef}
                className="w-80 h-96 rounded-2xl overflow-hidden shadow-2xl border border-white/20 bg-gradient-to-br from-blue-900/50 to-purple-900/50"
                style={{ 
                  background: 'radial-gradient(circle at center, rgba(59, 130, 246, 0.3) 0%, rgba(147, 51, 234, 0.1) 100%)'
                }}
              />
              
              {/* Status Overlay */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between bg-black/90 px-4 py-2 rounded-xl backdrop-blur-sm border border-white/10">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    avatarState === 'idle' ? 'bg-green-500' :
                    avatarState === 'listening' ? 'bg-blue-500 animate-pulse' :
                    avatarState === 'thinking' ? 'bg-yellow-500 animate-ping' :
                    'bg-purple-500 animate-bounce'
                  }`}></div>
                  <span className="text-sm text-gray-300 capitalize">
                    {avatarState === 'idle' ? 'Ready to help' :
                     avatarState === 'listening' ? 'Listening...' :
                     avatarState === 'thinking' ? 'Analyzing...' :
                     isSpeaking ? 'Speaking...' : 'Responding...'}
                  </span>
                </div>
                <div className="text-xs text-gray-400 capitalize">
                  {currentEmotion}
                </div>
              </div>

              {/* Speech Progress Bar */}
              {isSpeaking && (
                <div className="absolute bottom-16 left-4 right-4 bg-black/70 rounded-lg p-2 backdrop-blur-sm">
                  <div className="text-xs text-gray-300 mb-1">Speaking...</div>
                  <div className="w-full bg-gray-600 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${speechProgress * 100}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Avatar Info */}
            <div className="text-center mb-6"> 
              <div className="flex items-center justify-center space-x-4">
              
                <div className="px-4 py-2 bg-blue-500/20 rounded-full border border-blue-400/30">
                  <p className="text-xs font-medium text-blue-300 capitalize">{avatarState}</p>
                </div>
              </div>
            </div>
            
            {/* Voice & Audio Controls */}
            <div className="flex space-x-4 mb-6">
              <button
                onClick={() => setIsMicEnabled(!isMicEnabled)}
                className={`p-4 rounded-full transition-all shadow-lg ${
                  isMicEnabled 
                    ? 'bg-red-500 text-white animate-pulse shadow-red-500/30' 
                    : 'bg-gray-600 hover:bg-gray-500 text-gray-300 shadow-gray-600/30'
                }`}
              >
                {isMicEnabled ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
              </button>
              
              {isSpeaking && (
                <button
                  onClick={stopSpeaking}
                  className="p-4 rounded-full bg-red-500 text-white hover:bg-red-600 transition-all shadow-lg animate-pulse"
                >
                  <Pause className="w-6 h-6" />
                </button>
              )}
            </div>


          </div>

          {/* Chat Section */}
          <div className="flex-1 flex flex-col">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6" style={{ maxHeight: 'calc(100vh - 180px)' }}>
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-2xl ${message.sender === 'user' ? 'order-2' : ''}`}>
                    {message.sender === 'ai' && (
                      <div className="flex items-center space-x-2 mb-2 px-4">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-full flex items-center justify-center text-xs font-bold">
                          Dr
                        </div>
                        <span className="text-sm text-gray-400">Dr. Sarah</span>
                        {isSpeaking && message.id === messages[messages.length - 1]?.id && (
                          <div className="flex items-center space-x-1">
                            <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          </div>
                        )}
                      </div>
                    )}
                    <div className={`p-4 rounded-2xl shadow-lg ${
                      message.sender === 'user'
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                        : 'bg-white/10 backdrop-blur-sm text-white border border-white/20'
                    }`}>
                      <p className="leading-relaxed">{message.text}</p>
                    </div>
                    <div className="flex items-center justify-between mt-2 px-4">
                      <p className="text-xs text-gray-400">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                      {message.sender === 'ai' && (
                        <button
                          onClick={() => speakText(message.text)}
                          disabled={isSpeaking}
                          className="text-xs text-gray-400 hover:text-white disabled:opacity-50 flex items-center space-x-1"
                        >
                          <Play className="w-3 h-3" />
                          <span>Replay</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Section */}
            <div className="p-6 bg-black/20 backdrop-blur-sm border-t border-white/10">
              <div className="flex items-center space-x-4 bg-white/10 rounded-2xl p-3 border border-white/20">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleSendMessage();
                    }
                  }}
                  placeholder={
                    avatarState === 'idle' 
                      ? "Ask Dr. Sarah about Thalassemia management, treatments, lifestyle..." 
                      : avatarState === 'thinking'
                      ? "Dr. Sarah is analyzing your question..."
                      : "Dr. Sarah is responding..."
                  }
                  disabled={avatarState === 'thinking' || avatarState === 'speaking'}
                  className="flex-1 bg-transparent text-white placeholder-gray-400 px-4 py-3 focus:outline-none disabled:opacity-50"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputText.trim() || avatarState === 'thinking' || avatarState === 'speaking'}
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white p-3 rounded-xl hover:from-blue-600 hover:to-cyan-600 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
              
              {/* Quick Actions */}
              <div className="flex flex-wrap gap-3 mt-4">
                {[
                  "What is Thalassemia?",
                  "I'm experiencing pain",
                  "Feeling very tired lately",
                  "Blood transfusion questions",
                  "Iron chelation therapy help",
                  "Diet and nutrition advice",
                  "Exercise recommendations",
                  "Emotional support needed",
                  "Family planning guidance",
                  "Managing daily symptoms"
                ].map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => {
                      if (avatarState === 'idle') {
                        setInputText(suggestion);
                        inputRef.current?.focus();
                      }
                    }}
                    disabled={avatarState !== 'idle'}
                    className="px-4 py-2 text-sm bg-white/10 text-gray-300 rounded-full hover:bg-white/20 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 backdrop-blur-sm border border-white/20 shadow-sm"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>

              {/* Voice Status */}
              <div className="flex items-center justify-between mt-4 px-2">
                <div className="flex items-center space-x-2 text-xs text-gray-400">
                  {isVoiceEnabled ? (
                    <>
                      <Volume2 className="w-4 h-4 text-green-400" />
                      <span>Voice enabled - Dr. Sarah will speak responses</span>
                    </>
                  ) : (
                    <>
                      <VolumeX className="w-4 h-4 text-red-400" />
                      <span>Voice disabled - Text only mode</span>
                    </>
                  )}
                </div>
                <div className="text-xs text-gray-500">
                  {isMicEnabled ? 'Mic: ON' : 'Mic: OFF'} | {speechProgress > 0 ? `Speaking: ${Math.round(speechProgress * 100)}%` : 'Ready'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HumanLikeAIAvatar;