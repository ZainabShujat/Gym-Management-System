// Local Storage Utilities

export const storage = {
  // Get item from localStorage
  get: (key, defaultValue = null) => {
    if (typeof window === 'undefined') return defaultValue;
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error(`Error getting ${key} from localStorage:`, error);
      return defaultValue;
    }
  },

  // Set item in localStorage
  set: (key, value) => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error setting ${key} in localStorage:`, error);
    }
  },

  // Remove item from localStorage
  remove: (key) => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing ${key} from localStorage:`, error);
    }
  },

  // Clear all localStorage
  clear: () => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  }
};

// Data management functions
export const dataManager = {
  // Members
  getMembers: () => storage.get('gym_members', []),
  setMembers: (members) => storage.set('gym_members', members),
  addMember: (member) => {
    const members = dataManager.getMembers();
    const newMember = { ...member, id: Date.now() };
    dataManager.setMembers([...members, newMember]);
    return newMember;
  },
  updateMember: (id, updatedData) => {
    const members = dataManager.getMembers();
    const updated = members.map(m => m.id === id ? { ...m, ...updatedData } : m);
    dataManager.setMembers(updated);
  },
  deleteMember: (id) => {
    const members = dataManager.getMembers();
    dataManager.setMembers(members.filter(m => m.id !== id));
  },

  // Trainers
  getTrainers: () => storage.get('gym_trainers', []),
  setTrainers: (trainers) => storage.set('gym_trainers', trainers),
  
  // Classes
  getClasses: () => storage.get('gym_classes', []),
  setClasses: (classes) => storage.set('gym_classes', classes),
  
  // Payments
  getPayments: () => storage.get('gym_payments', []),
  setPayments: (payments) => storage.set('gym_payments', payments),
  addPayment: (payment) => {
    const payments = dataManager.getPayments();
    const newPayment = { ...payment, id: Date.now() };
    dataManager.setPayments([...payments, newPayment]);
    return newPayment;
  }
};
