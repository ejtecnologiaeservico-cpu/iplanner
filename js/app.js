// Funções Globais iRunner PLAN (Versão com Firebase Firestore!)
// Firebase Configuration (replace with your own Firebase project config!)
const firebaseConfig = {
  apiKey: "AIzaSyAyvnkPnq6IoImawmWGrXFDA2400jb5SHU",
  authDomain: "irunner-plan.firebaseapp.com",
  projectId: "irunner-plan",
  storageBucket: "irunner-plan.firebasestorage.app",
  messagingSenderId: "412798052391",
  appId: "1:412798052391:web:74e1153133a6abfa7dc602"
  measurementId: "G-8RVX8ZL2DX"
};

// Initialize Firebase
try {
  firebase.initializeApp(firebaseConfig);
  console.log("✅ Firebase initialized successfully!");
} catch (e) {
  console.log("⚠️ Firebase already initialized");
}
const db = firebase.firestore();
console.log("🔥 Firestore database reference obtained!");

// Default avatar (placeholder)
const DEFAULT_AVATAR = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23B026FF'%3E%3Cpath d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'/%3E%3C/svg%3E";

// Configurações padrão de Pagamento e Notificações
const DEFAULT_CONFIG = {
  pixCode: "00020126360014BR.GOV.BCB.PIX0114+55749981841425204000053039865406100.005802BR5901N6001C62230519ASSESSORIAESPORTIVA63045207",
  notificationEmail: "ejtecnologiaeservico@gmail.com",
  notificationWhatsapp: "74998161511",
  qrCodeImage: "" // Vamos usar o QR fornecido
};

// Dados padrão
const DEFAULT_USERS = [
  {
    id: 1,
    role: "admin",
    name: "Administrador",
    email: "admin",
    password: "ej99763463"
  },
  {
    id: 2,
    role: "athlete",
    name: "João Silva",
    email: "joao",
    password: "123456",
    idade: 25,
    peso: 70,
    altura: 1.75,
    objetivo: "Correr uma maratona",
    experiencia: "1 ano",
    inicioTreinamento: "01/01/2024",
    provaAlvo: "Maratona de São Paulo",
    treinador: "Administrador",
    avatar: DEFAULT_AVATAR
  }
];

// Dados padrão de pagamentos
function getDefaultPayments() {
  return [
    {
      id: 1,
      athleteId: 2,
      athleteName: "João Silva",
      type: "mensalidade",
      amount: 150.00,
      dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      status: "pendente",
      notes: "Mensalidade de julho"
    }
  ];
}

function getDefaultWorkouts() {
  const today = new Date();
  return [
    {
      id: 1,
      athleteId: 2,
      athleteName: "João Silva",
      week: 1,
      day: "Seg",
      dayDate: today.toLocaleDateString('pt-BR'),
      description: "Treino de base - Corrida contínua",
      exercises: [
        { name: "Corrida Leve", sets: "1", reps: "30 min", intensity: "Z2" },
        { name: "Intervalado", sets: "8", reps: "400m", intensity: "Z4" }
      ],
      checkIn: null
    }
  ];
}

// Dados padrão de métricas de performance
function getDefaultPerformanceMetrics() {
  return [
    {
      id: 1,
      athleteId: 2,
      athleteName: "João Silva",
      date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toLocaleDateString('pt-BR'),
      metrics: {
        pace: "6:30", // min/km
        distance: 5, // km
        duration: 32.5, // min
        heartRate: 155 // bpm
      }
    },
    {
      id: 2,
      athleteId: 2,
      athleteName: "João Silva",
      date: new Date().toLocaleDateString('pt-BR'),
      metrics: {
        pace: "6:15",
        distance: 6,
        duration: 37.5,
        heartRate: 158
      }
    }
  ];
}

// ================== FUNÇÕES DE ARMAZENAMENTO SEGURO (FIRESTORE!) ==================

// Função para inicializar Firestore com dados padrão, se o banco estiver vazio
async function initData() {
  console.log("🔄 Starting initData()...");
  try {
    // Verificar se a coleção 'users' existe e tem dados
    console.log("📥 Checking 'users' collection...");
    const usersSnapshot = await db.collection('users').get();
    console.log("✅ 'users' snapshot size:", usersSnapshot.size);
    if (usersSnapshot.empty) {
      console.log("📝 Adding default users...");
      // Adicionar usuários padrão
      for (const user of DEFAULT_USERS) {
        console.log("Adding user:", user.email);
        await db.collection('users').doc(String(user.id)).set(user);
      }
      console.log("✅ Default users added!");
    } else {
      console.log("✅ Users already exist, skipping.");
    }

    // Verificar treinos
    console.log("📥 Checking 'workouts' collection...");
    const workoutsSnapshot = await db.collection('workouts').get();
    if (workoutsSnapshot.empty) {
      console.log("📝 Adding default workouts...");
      const defaultWorkouts = getDefaultWorkouts();
      for (const workout of defaultWorkouts) {
        await db.collection('workouts').doc(String(workout.id)).set(workout);
      }
      console.log("✅ Default workouts added!");
    }

    // Verificar pagamentos
    console.log("📥 Checking 'payments' collection...");
    const paymentsSnapshot = await db.collection('payments').get();
    if (paymentsSnapshot.empty) {
      console.log("📝 Adding default payments...");
      const defaultPayments = getDefaultPayments();
      for (const payment of defaultPayments) {
        await db.collection('payments').doc(String(payment.id)).set(payment);
      }
      console.log("✅ Default payments added!");
    }

    // Verificar configurações
    console.log("📥 Checking 'config' document...");
    const configDoc = await db.collection('config').doc('system').get();
    if (!configDoc.exists) {
      console.log("📝 Adding default config...");
      await db.collection('config').doc('system').set(DEFAULT_CONFIG);
      console.log("✅ Default config added!");
    }

    // Verificar métricas de performance
    console.log("📥 Checking 'performance' collection...");
    const performanceSnapshot = await db.collection('performance').get();
    if (performanceSnapshot.empty) {
      console.log("📝 Adding default performance metrics...");
      const defaultPerformance = getDefaultPerformanceMetrics();
      for (const metric of defaultPerformance) {
        await db.collection('performance').doc(String(metric.id)).set(metric);
      }
      console.log("✅ Default performance metrics added!");
    }
    console.log("✅ initData() completed!");
  } catch (error) {
    console.error("❌ Erro na inicialização dos dados:", error);
    // Fallback para localStorage se Firebase falhar
    console.log("⚠️ Falling back to localStorage...");
    initLocalStorageFallback();
  }
}

function initLocalStorageFallback() {
  try {
    // Inicializar apenas os dados que não existem
    if (!localStorage.getItem('irunner_users')) {
      localStorage.setItem('irunner_users', JSON.stringify(DEFAULT_USERS));
    }
    
    if (!localStorage.getItem('irunner_workouts')) {
      localStorage.setItem('irunner_workouts', JSON.stringify(getDefaultWorkouts()));
    }
    
    if (!localStorage.getItem('irunner_payments')) {
      localStorage.setItem('irunner_payments', JSON.stringify(getDefaultPayments()));
    }

    if (!localStorage.getItem('irunner_config')) {
      localStorage.setItem('irunner_config', JSON.stringify(DEFAULT_CONFIG));
    }

    if (!localStorage.getItem('irunner_performance')) {
      localStorage.setItem('irunner_performance', JSON.stringify(getDefaultPerformanceMetrics()));
    }
  } catch (error) {
    console.error("Erro na inicialização dos dados (fallback):", error);
  }
}

// Funções de dados com Firestore (e fallback para localStorage)
async function getConfig() {
  try {
    const doc = await db.collection('config').doc('system').get();
    if (doc.exists) {
      return doc.data();
    } else {
      return DEFAULT_CONFIG;
    }
  } catch (error) {
    console.error("Erro ao carregar config:", error);
    // Fallback para localStorage
    try {
      const data = localStorage.getItem('irunner_config');
      return data ? JSON.parse(data) : DEFAULT_CONFIG;
    } catch (e) {
      return DEFAULT_CONFIG;
    }
  }
}

async function saveConfig(config) {
  try {
    await db.collection('config').doc('system').set(config);
    // Atualizar também o localStorage para fallback
    localStorage.setItem('irunner_config', JSON.stringify(config));
    return true;
  } catch (error) {
    console.error("Erro ao salvar config:", error);
    // Fallback para localStorage
    try {
      localStorage.setItem('irunner_config', JSON.stringify(config));
      return true;
    } catch (e) {
      return false;
    }
  }
}

async function getUsers() {
  console.log("🔍 getUsers() called!");
  try {
    console.log("📥 Fetching users from Firestore...");
    const snapshot = await db.collection('users').get();
    const users = [];
    snapshot.forEach(doc => users.push(doc.data()));
    console.log("✅ Found users in Firestore:", users.map(u => u.email));
    return users;
  } catch (error) {
    console.error("❌ Erro ao carregar usuários do Firestore:", error);
    // Fallback para localStorage
    try {
      console.log("⚠️ Falling back to localStorage for users...");
      const data = localStorage.getItem('irunner_users');
      const users = data ? JSON.parse(data) : [];
      console.log("✅ Found users in localStorage:", users.map(u => u.email));
      return users;
    } catch (e) {
      console.error("❌ Erro ao carregar do localStorage:", e);
      return [];
    }
  }
}

async function getWorkouts() {
  try {
    const snapshot = await db.collection('workouts').get();
    const workouts = [];
    snapshot.forEach(doc => workouts.push(doc.data()));
    return workouts;
  } catch (error) {
    console.error("Erro ao carregar treinos:", error);
    // Fallback para localStorage
    try {
      const data = localStorage.getItem('irunner_workouts');
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }
}

async function getPayments() {
  try {
    const snapshot = await db.collection('payments').get();
    const payments = [];
    snapshot.forEach(doc => payments.push(doc.data()));
    return payments;
  } catch (error) {
    console.error("Erro ao carregar pagamentos:", error);
    // Fallback para localStorage
    try {
      const data = localStorage.getItem('irunner_payments');
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }
}

async function saveUsers(users) {
  try {
    // Limpar coleção e adicionar todos os usuários de uma vez
    const batch = db.batch();
    // Primeiro deletar todos os documentos
    const snapshot = await db.collection('users').get();
    snapshot.forEach(doc => batch.delete(doc.ref));
    // Depois adicionar os novos
    users.forEach(user => {
      const docRef = db.collection('users').doc(String(user.id));
      batch.set(docRef, user);
    });
    await batch.commit();
    // Atualizar localStorage para fallback
    localStorage.setItem('irunner_users', JSON.stringify(users));
    return true;
  } catch (error) {
    console.error("Erro ao salvar usuários:", error);
    // Fallback para localStorage
    try {
      localStorage.setItem('irunner_users', JSON.stringify(users));
      return true;
    } catch (e) {
      return false;
    }
  }
}

async function saveWorkouts(workouts) {
  try {
    const batch = db.batch();
    const snapshot = await db.collection('workouts').get();
    snapshot.forEach(doc => batch.delete(doc.ref));
    workouts.forEach(workout => {
      const docRef = db.collection('workouts').doc(String(workout.id));
      batch.set(docRef, workout);
    });
    await batch.commit();
    localStorage.setItem('irunner_workouts', JSON.stringify(workouts));
    return true;
  } catch (error) {
    console.error("Erro ao salvar treinos:", error);
    try {
      localStorage.setItem('irunner_workouts', JSON.stringify(workouts));
      return true;
    } catch (e) {
      return false;
    }
  }
}

async function savePayments(payments) {
  try {
    const batch = db.batch();
    const snapshot = await db.collection('payments').get();
    snapshot.forEach(doc => batch.delete(doc.ref));
    payments.forEach(payment => {
      const docRef = db.collection('payments').doc(String(payment.id));
      batch.set(docRef, payment);
    });
    await batch.commit();
    localStorage.setItem('irunner_payments', JSON.stringify(payments));
    return true;
  } catch (error) {
    console.error("Erro ao salvar pagamentos:", error);
    try {
      localStorage.setItem('irunner_payments', JSON.stringify(payments));
      return true;
    } catch (e) {
      return false;
    }
  }
}

async function getPerformanceMetrics() {
  try {
    const snapshot = await db.collection('performance').get();
    const metrics = [];
    snapshot.forEach(doc => metrics.push(doc.data()));
    return metrics;
  } catch (error) {
    console.error("Erro ao carregar métricas de performance:", error);
    try {
      const data = localStorage.getItem('irunner_performance');
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }
}

async function savePerformanceMetrics(metrics) {
  try {
    const batch = db.batch();
    const snapshot = await db.collection('performance').get();
    snapshot.forEach(doc => batch.delete(doc.ref));
    metrics.forEach(metric => {
      const docRef = db.collection('performance').doc(String(metric.id));
      batch.set(docRef, metric);
    });
    await batch.commit();
    localStorage.setItem('irunner_performance', JSON.stringify(metrics));
    return true;
  } catch (error) {
    console.error("Erro ao salvar métricas de performance:", error);
    try {
      localStorage.setItem('irunner_performance', JSON.stringify(metrics));
      return true;
    } catch (e) {
      return false;
    }
  }
}

// Gerador de IDs seguro
function generateUniqueId(array) {
  if (!array || !Array.isArray(array)) return 1;
  
  const maxId = array.length > 0 
    ? Math.max(...array.map(item => item.id || 0), 0)
    : 0;
  return maxId + 1;
}

// ================== SISTEMA DE AUTENTICAÇÃO MELHORADO ==================

function saveCurrentUser(user) {
  try {
    // Não salvar a senha no sessionStorage por segurança
    const safeUser = {...user};
    delete safeUser.password;
    sessionStorage.setItem('currentUser', JSON.stringify(safeUser));
    return true;
  } catch (error) {
    console.error("Erro ao salvar usuário logado:", error);
    return false;
  }
}

function getCurrentUser() {
  try {
    const data = sessionStorage.getItem('currentUser');
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error("Erro ao recuperar usuário logado:", error);
    return null;
  }
}

function logout() {
  try {
    sessionStorage.removeItem('currentUser');
    window.location.href = 'index.html';
  } catch (error) {
    console.error("Erro no logout:", error);
    window.location.href = 'index.html';
  }
}

// Verificar autenticação e redirecionar para painel correto
async function checkAuth() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const user = getCurrentUser();
  
  try {
    if (!user && currentPage !== 'index.html' && currentPage !== '') {
      window.location.href = 'index.html';
      return false;
    }
    
    if (user) {
      if (currentPage === 'index.html' || currentPage === '') {
        if (user.role === 'admin') {
          window.location.href = 'admin-dashboard.html';
        } else {
          window.location.href = 'athlete-dashboard.html';
        }
        return false;
      }
      
      if (user.role === 'admin' && currentPage.startsWith('athlete-')) {
        window.location.href = 'admin-dashboard.html';
        return false;
      }
      
      if (user.role === 'athlete' && currentPage.startsWith('admin-')) {
        window.location.href = 'athlete-dashboard.html';
        return false;
      }
    }
  } catch (error) {
    console.error("Erro na verificação de autenticação:", error);
    window.location.href = 'index.html';
    return false;
  }
  
  return true;
}

// ================== FUNÇÕES DE LOGIN ==================

async function validateLogin(email, password) {
  console.log("🔑 validateLogin() called with email:", email);
  try {
    if (!email || !password) {
      console.log("⚠️ Missing email or password");
      return { success: false, error: "Preencha todos os campos" };
    }
    
    console.log("📥 Fetching users to validate...");
    const users = await getUsers();
    console.log("👥 All users found:", users.map(u => ({ email: u.email, id: u.id })));
    const user = users.find(u => u.email === email);
    
    if (!user) {
      console.log("❌ User not found for email:", email);
      return { success: false, error: "Usuário não encontrado" };
    }
    
    console.log("✅ User found! Checking password...");
    if (user.password !== password) {
      console.log("❌ Incorrect password for user:", email);
      return { success: false, error: "Senha incorreta" };
    }
    
    console.log("✅ Login successful for user:", email);
    return { success: true, user };
  } catch (error) {
    console.error("❌ Erro na validação do login:", error);
    return { success: false, error: "Erro interno no sistema. Tente novamente." };
  }
}

// ================== FUNÇÕES DE INTERFACE ==================

function updateNavbar() {
  try {
    const user = getCurrentUser();
    const welcomeEl = document.getElementById('welcome-text');
    if (user && welcomeEl) {
      welcomeEl.textContent = `Olá, ${user.name}!`;
    }
  } catch (error) {
    console.error("Erro ao atualizar navbar:", error);
  }
}

function showAlert(message, type = 'success') {
  try {
    const container = document.createElement('div');
    container.className = `alert ${type}`;
    container.textContent = message;
    
    const existingAlerts = document.querySelectorAll('.alert');
    existingAlerts.forEach(el => el.remove());
    
    const targetContainer = document.querySelector('.container');
    if (targetContainer) {
      const firstChild = targetContainer.firstChild;
      targetContainer.insertBefore(container, firstChild);
    } else {
      document.body.insertBefore(container, document.body.firstChild);
    }
    
    setTimeout(() => {
      if (container && container.parentNode) {
        container.remove();
      }
    }, 5000);
  } catch (error) {
    console.error("Erro ao exibir alerta:", error);
  }
}

// Dados simulados para IA
const MOCK_EXTRACTED_DATA = {
  nome_atleta: "João Silva",
  data: new Date().toLocaleDateString('pt-BR'),
  exercicios: [
    { nome: "Corrida Leve", series: 1, repeticoes: "30 min", intensidade: "Z2" },
    { nome: "Intervalado", series: 8, repeticoes: "400m", intensidade: "Z4" }
  ]
};

// Gerar PDF (simulado)
function downloadPDF(athleteName, workouts) {
  alert(`PDF para ${athleteName} gerado com sucesso! (Demo)`);
}

// ================== FUNÇÕES DE TREINO ==================

async function checkInWorkout(workoutId) {
  try {
    const workouts = await getWorkouts();
    const workoutIndex = workouts.findIndex(w => w.id === workoutId);
    
    if (workoutIndex !== -1) {
      workouts[workoutIndex].checkIn = new Date().toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
      
      if (await saveWorkouts(workouts)) {
        return true;
      } else {
        showAlert('Erro ao salvar! Tente novamente.', 'error');
        return false;
      }
    }
    return false;
  } catch (error) {
    console.error("Erro no check-in:", error);
    showAlert('Erro ao finalizar treino! Tente novamente.', 'error');
    return false;
  }
}

// ================== FUNÇÕES DE PAGAMENTO ==================

async function getUpcomingPayments(athleteId) {
  try {
    const payments = await getPayments();
    const athletePayments = payments.filter(p => p.athleteId === athleteId && p.status === 'pendente');
    const today = new Date();
    
    return athletePayments.filter(p => {
      const dueDate = new Date(p.dueDate);
      const diffTime = dueDate - today;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays >= 0 && diffDays <= 7;
    });
  } catch (error) {
    console.error("Erro ao carregar pagamentos próximos:", error);
    return [];
  }
}

async function checkPaymentNotifications(athleteId) {
  try {
    const payments = await getPayments();
    const athletePayments = payments.filter(p => p.athleteId === athleteId && p.status === 'pendente');
    const today = new Date();
    
    return athletePayments.filter(p => {
      const dueDate = new Date(p.dueDate);
      const diffTime = dueDate - today;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays === 2 || diffDays === 1 || diffDays === 0 || diffDays < 0;
    });
  } catch (error) {
    console.error("Erro ao verificar notificações de pagamento:", error);
    return [];
  }
}

function formatDate(dateStr) {
  try {
    const date = new Date(dateStr);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  } catch (error) {
    console.error("Erro ao formatar data:", error);
    return dateStr || "";
  }
}

// ================== INFORMAÇÕES NUTRICIONAIS ==================

function getNutritionalAdvice(athlete) {
  try {
    const advice = [];
    
    if (athlete.peso) {
      const waterIntake = Math.round(athlete.peso * 35);
      advice.push({
        icon: "💧",
        title: "Consumo de Água",
        content: `Recomendamos ingerir pelo menos ${waterIntake}ml de água por dia. Beba ${Math.round(waterIntake / 8)}ml a cada 1-2 horas.`
      });
    }
    
    if (athlete.objetivo) {
      const isMarathon = athlete.objetivo.toLowerCase().includes('maratona');
      const is5k = athlete.objetivo.toLowerCase().includes('5k') || athlete.objetivo.toLowerCase().includes('5 km');
      
      if (isMarathon) {
        advice.push({
          icon: "🍞",
          title: "Carboidratos para Maratona",
          content: "Priorize carboidratos complexos (aveia, quinoa, batata doce) na semana anterior à prova. 5-7g de carboidrato por kg de peso/dia."
        });
      } else if (is5k) {
        advice.push({
          icon: "🍌",
          title: "Energia para Provas Curtas",
          content: "Para provas de 5k, foque em carboidratos de digestão rápida 1-2 horas antes do treino: banana, pão branco ou mel."
        });
      }
    }
    
    advice.push({
      icon: "⚡",
      title: "Uso de Gel de Carboidrato",
      content: "Use gel de carboidrato em treinos ou provas com duração superior a 60 minutos. Tome 1 gel a cada 45-60 minutos, sempre com água."
    });
    
    if (athlete.peso) {
      const proteinIntake = Math.round(athlete.peso * 1.6);
      advice.push({
        icon: "🥩",
        title: "Proteínas para Recuperação",
        content: `Consuma ${proteinIntake}-${Math.round(athlete.peso * 2)}g de proteína por dia para auxiliar na recuperação muscular.`
      });
    }
    
    return advice;
  } catch (error) {
    console.error("Erro ao gerar conselhos nutricionais:", error);
    return [];
  }
}

function getWorkoutNutritionAdvice(exercises) {
  try {
    const hasHighIntensity = exercises.some(e => 
      e.intensity && (e.intensity.includes('Z4') || e.intensity.includes('Z5') || e.intensity.includes('max'))
    );
    
    const duration = exercises.reduce((total, e) => {
      if (e.reps && e.reps.includes('min')) {
        const mins = parseInt(e.reps);
        return total + (isNaN(mins) ? 0 : mins);
      }
      return total + 30;
    }, 0);
    
    const advice = [];
    
    if (duration > 60) {
      advice.push({
        type: "treino_longo",
        title: "Para Treinos Longos (>60min)",
        content: "Consuma 30-60g de carboidratos por hora de treino. Use géis ou bebidas esportivas."
      });
    }
    
    if (hasHighIntensity) {
      advice.push({
        type: "alta_intensidade",
        title: "Para Treinos de Alta Intensidade",
        content: "Garanta que seu último prato antes do treino seja rico em carboidratos (2-3 horas antes). Evite gorduras em excesso."
      });
    }
    
    advice.push({
      type: "pos_treino",
      title: "Pós-Treino Imediato",
      content: "Dentro de 45 minutos após o treino, consuma 4:1 de carboidratos para proteínas. Exemplo: banana com whey ou sanduíche de pão com queijo."
    });
    
    return advice;
  } catch (error) {
    console.error("Erro ao gerar conselhos de treino:", error);
    return [];
  }
}

// Copiar texto para clipboard
async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    // Fallback para navegadores antigos
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    return true;
  }
}

// Tocar som de notificação
function playNotificationSound() {
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  
  oscillator.frequency.value = 880; // Lá
  oscillator.type = 'sine';
  gainNode.gain.value = 0.3;
  
  oscillator.start();
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
  oscillator.stop(audioContext.currentTime + 0.5);
}

// Enviar notificações para o treinador
async function notifyTrainer(athleteName, paymentDetails) {
  const config = await getConfig();
  playNotificationSound();
  showAlert(`ATLETA ${athleteName} REALIZOU PAGAMENTO!`, 'success');
  
  // Abrir email
  if (confirm('Enviar aviso por Email?')) {
    window.open(`mailto:${config.notificationEmail}?subject=Pagamento Recebido de ${athleteName}&body=O atleta ${athleteName} acabou de realizar um pagamento de R$${paymentDetails.amount.toFixed(2)} referente a ${paymentDetails.type}!`);
  }
  
  // Abrir WhatsApp
  if (confirm('Enviar aviso por WhatsApp?')) {
    window.open(`https://wa.me/55${config.notificationWhatsapp}?text=O atleta ${athleteName} acabou de realizar um pagamento de R$${paymentDetails.amount.toFixed(2)} referente a ${paymentDetails.type}!`);
  }
}

// Inicializar dados no carregamento
initData();
