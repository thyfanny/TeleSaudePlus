// NÃO use imports ES6 aqui
importScripts('https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.22.0/firebase-messaging-compat.js');

// Sua configuração do Firebase (copie do arquivo de configuração)
const firebaseConfig = {
  apiKey: "AIzaSyDTxVNoEpr_NpV9JfAsdC0QIV4I1-kSkbk",
  authDomain: "notificacoes-e17e8.firebaseapp.com",
  projectId: "notificacoes-e17e8",
  storageBucket: "notificacoes-e17e8.firebasestorage.app",
  messagingSenderId: "355252728644",
  appId: "1:355252728644:web:834d8bc3005c033c02dd11",
  measurementId: "G-SE88NLKMG2"
};

// Inicialize o Firebase
firebase.initializeApp(firebaseConfig);

// Obtenha uma instância do Firebase Messaging
const messaging = firebase.messaging();

// Manipule mensagens em segundo plano
messaging.onBackgroundMessage((payload) => {
  console.log('Mensagem recebida em segundo plano:', payload);
  
  // Customize a notificação aqui
  const notificationTitle = payload.notification.title || 'Nova notificação';
  const notificationOptions = {
    body: payload.notification.body || '',
    icon: '/favicon.ico', // Ajuste para o caminho do seu ícone
    badge: '/badge-icon.png', // Opcional
    data: payload.data
  };

  return self.registration.showNotification(notificationTitle, notificationOptions);
});