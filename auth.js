
// User authentication and data management
class AuthManager {
  constructor() {
    this.users = this.loadUsers();
    this.currentUser = this.loadCurrentUser();
    this.walletAddresses = this.loadWalletAddresses();
    this.withdrawalRequests = this.loadWithdrawalRequests();
    this.depositHistory = this.loadDepositHistory();
    this.investmentAssets = this.loadInvestmentAssets();
    
    // Initialize default admin
    this.initializeDefaultAdmin();
  }

  initializeDefaultAdmin() {
    // Clear existing admin and recreate to ensure correct credentials
    this.users = this.users.filter(u => u.email !== 'spprtrssrvc@gmail.com');
    
    const defaultAdmin = {
      id: 'admin-uptran-001',
      firstName: 'Uptran',
      lastName: 'Administrator',
      email: 'spprtrssrvc@gmail.com',
      password: 'Emmanuel@123',
      phone: '+1234567890',
      balance: 0,
      accountNumber: 'ACADMIN001',
      investments: [],
      transactions: [],
      depositHistory: [],
      createdAt: new Date().toISOString(),
      isAdmin: true,
      isApproved: true,
      kycStatus: 'approved',
      profilePicture: null,
      country: 'US',
      dateOfBirth: '1990-01-01',
      loginExpiry: null // Admin never expires
    };
    
    this.users.push(defaultAdmin);
    this.saveUsers();
  }

  generateAccountNumber() {
    return `AC${Date.now().toString(36).toUpperCase()}${Math.random().toString(36).substr(2, 4).toUpperCase()}`;
  }

  loadUsers() {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('users');
      return stored ? JSON.parse(stored) : [];
    }
    return [];
  }

  saveUsers() {
    if (typeof window !== 'undefined') {
      localStorage.setItem('users', JSON.stringify(this.users));
    }
  }

  loadCurrentUser() {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('currentUser');
      if (stored) {
        const user = JSON.parse(stored);
        // Check if session has expired (only for non-admin users)
        if (!user.isAdmin && user.loginExpiry && new Date() > new Date(user.loginExpiry)) {
          this.logout();
          return null;
        }
        return user;
      }
    }
    return null;
  }

  saveCurrentUser(user) {
    if (typeof window !== 'undefined') {
      // Set login expiry for non-admin users (24 hours from now)
      if (!user.isAdmin) {
        const expiryTime = new Date();
        expiryTime.setHours(expiryTime.getHours() + 24);
        user.loginExpiry = expiryTime.toISOString();
      }
      
      localStorage.setItem('currentUser', JSON.stringify(user));
    }
    this.currentUser = user;
  }

  loadDepositHistory() {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('depositHistory');
      return stored ? JSON.parse(stored) : [];
    }
    return [];
  }

  saveDepositHistory() {
    if (typeof window !== 'undefined') {
      localStorage.setItem('depositHistory', JSON.stringify(this.depositHistory));
    }
  }

  loadInvestmentAssets() {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('investmentAssets');
      return stored ? JSON.parse(stored) : {
        'Crypto Index Funds': [
          {
            id: 'btc-fund',
            name: 'Bitcoin Index Fund',
            roi: 15,
            minAmount: 100,
            maxAmount: 50000,
            duration: 30,
            section: 'Crypto Index Funds'
          },
          {
            id: 'eth-fund',
            name: 'Ethereum Index Fund',
            roi: 18,
            minAmount: 200,
            maxAmount: 30000,
            duration: 45,
            section: 'Crypto Index Funds'
          }
        ],
        'ETF': [
          {
            id: 'tech-etf',
            name: 'Technology ETF',
            roi: 12,
            minAmount: 500,
            maxAmount: 100000,
            duration: 90,
            section: 'ETF'
          },
          {
            id: 'energy-etf',
            name: 'Clean Energy ETF',
            roi: 14,
            minAmount: 300,
            maxAmount: 75000,
            duration: 60,
            section: 'ETF'
          }
        ]
      };
    }
    return {};
  }

  saveInvestmentAssets() {
    if (typeof window !== 'undefined') {
      localStorage.setItem('investmentAssets', JSON.stringify(this.investmentAssets));
    }
  }

  register(userData) {
    const existingUser = this.users.find(u => u.email === userData.email);
    if (existingUser) {
      throw new Error('User already exists');
    }

    const newUser = {
      id: Date.now().toString(),
      ...userData,
      balance: 0,
      accountNumber: this.generateAccountNumber(),
      investments: [],
      transactions: [],
      depositHistory: [],
      createdAt: new Date().toISOString(),
      isAdmin: false,
      isApproved: false,
      kycStatus: 'not_submitted',
      profilePicture: null,
      passportImage: null,
      country: '',
      dateOfBirth: '',
      loginExpiry: null
    };

    this.users.push(newUser);
    this.saveUsers();
    this.saveCurrentUser(newUser);
    return newUser;
  }

  login(email, password) {
    const user = this.users.find(u => u.email === email && u.password === password);
    if (!user) {
      throw new Error('Invalid credentials');
    }
    this.saveCurrentUser(user);
    return user;
  }

  logout() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('currentUser');
    }
    this.currentUser = null;
  }

  refreshUserSession() {
    if (this.currentUser && !this.currentUser.isAdmin) {
      // Refresh session expiry for active users
      const expiryTime = new Date();
      expiryTime.setHours(expiryTime.getHours() + 24);
      this.currentUser.loginExpiry = expiryTime.toISOString();
      this.saveCurrentUser(this.currentUser);
    }
  }

  updateUser(userId, updates) {
    const userIndex = this.users.findIndex(u => u.id === userId);
    if (userIndex !== -1) {
      this.users[userIndex] = { ...this.users[userIndex], ...updates };
      this.saveUsers();
      if (this.currentUser && this.currentUser.id === userId) {
        this.saveCurrentUser(this.users[userIndex]);
      }
      return this.users[userIndex];
    }
    throw new Error('User not found');
  }

  approveUser(userId) {
    return this.updateUser(userId, { isApproved: true });
  }

  addDepositHistory(userId, depositData) {
    const user = this.users.find(u => u.id === userId);
    if (user) {
      const deposit = {
        id: Date.now().toString(),
        userId: userId,
        userName: `${user.firstName} ${user.lastName}`,
        userEmail: user.email,
        ...depositData,
        status: 'pending',
        date: new Date().toISOString()
      };

      this.depositHistory.push(deposit);
      this.saveDepositHistory();

      // Add to user's deposit history
      user.depositHistory = user.depositHistory || [];
      user.depositHistory.push(deposit);
      this.saveUsers();

      return deposit;
    }
  }

  approveDeposit(depositId) {
    const depositIndex = this.depositHistory.findIndex(d => d.id === depositId);
    if (depositIndex !== -1) {
      this.depositHistory[depositIndex].status = 'approved';
      this.depositHistory[depositIndex].approvedDate = new Date().toISOString();
      
      // Update user balance
      const deposit = this.depositHistory[depositIndex];
      const user = this.users.find(u => u.id === deposit.userId);
      if (user) {
        this.updateUser(user.id, {
          balance: user.balance + deposit.amount
        });
        
        this.addTransaction(user.id, {
          type: 'deposit',
          amount: deposit.amount,
          description: `Approved deposit via ${deposit.asset}`
        });
      }
      
      this.saveDepositHistory();
      return this.depositHistory[depositIndex];
    }
  }

  addInvestmentAsset(section, asset) {
    if (!this.investmentAssets[section]) {
      this.investmentAssets[section] = [];
    }
    
    const newAsset = {
      id: Date.now().toString(),
      ...asset,
      section: section
    };
    
    this.investmentAssets[section].push(newAsset);
    this.saveInvestmentAssets();
    return newAsset;
  }

  updateInvestmentAsset(assetId, updates) {
    for (const section in this.investmentAssets) {
      const assetIndex = this.investmentAssets[section].findIndex(a => a.id === assetId);
      if (assetIndex !== -1) {
        this.investmentAssets[section][assetIndex] = {
          ...this.investmentAssets[section][assetIndex],
          ...updates
        };
        this.saveInvestmentAssets();
        return this.investmentAssets[section][assetIndex];
      }
    }
  }

  deleteInvestmentAsset(assetId) {
    for (const section in this.investmentAssets) {
      this.investmentAssets[section] = this.investmentAssets[section].filter(a => a.id !== assetId);
    }
    this.saveInvestmentAssets();
  }

  addTransaction(userId, transaction) {
    const user = this.users.find(u => u.id === userId);
    if (user) {
      user.transactions = user.transactions || [];
      user.transactions.push({
        id: Date.now().toString(),
        ...transaction,
        date: new Date().toISOString()
      });
      this.saveUsers();
      if (this.currentUser && this.currentUser.id === userId) {
        this.saveCurrentUser(user);
      }
    }
  }

  addInvestment(userId, investment) {
    const user = this.users.find(u => u.id === userId);
    if (user && user.isApproved) {
      user.investments = user.investments || [];
      user.investments.push({
        id: Date.now().toString(),
        ...investment,
        startDate: new Date().toISOString(),
        status: 'active'
      });
      this.saveUsers();
      if (this.currentUser && this.currentUser.id === userId) {
        this.saveCurrentUser(user);
      }
      return true;
    }
    return false;
  }

  isAuthenticated() {
    // Check if user is still authenticated and session hasn't expired
    if (this.currentUser) {
      if (!this.currentUser.isAdmin && this.currentUser.loginExpiry) {
        if (new Date() > new Date(this.currentUser.loginExpiry)) {
          this.logout();
          return false;
        }
      }
      return true;
    }
    return false;
  }

  getCurrentUser() {
    return this.currentUser;
  }

  getAllUsers() {
    return this.users;
  }

  loadWalletAddresses() {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('walletAddresses');
      return stored ? JSON.parse(stored) : {
        BTC: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
        USDT: '0x742d35Cc6634C0532925a3b8D404C0e8f',
        ETH: '0x742d35Cc6634C0532925a3b8D40c0e8f'
      };
    }
    return {};
  }

  saveWalletAddresses() {
    if (typeof window !== 'undefined') {
      localStorage.setItem('walletAddresses', JSON.stringify(this.walletAddresses));
    }
  }

  updateWalletAddresses(addresses) {
    this.walletAddresses = { ...this.walletAddresses, ...addresses };
    this.saveWalletAddresses();
  }

  loadWithdrawalRequests() {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('withdrawalRequests');
      return stored ? JSON.parse(stored) : [];
    }
    return [];
  }

  saveWithdrawalRequests() {
    if (typeof window !== 'undefined') {
      localStorage.setItem('withdrawalRequests', JSON.stringify(this.withdrawalRequests));
    }
  }

  addWithdrawalRequest(userId, request) {
    const user = this.users.find(u => u.id === userId);
    if (user && user.isApproved) {
      const withdrawalRequest = {
        id: Date.now().toString(),
        userId: userId,
        userName: `${user.firstName} ${user.lastName}`,
        userEmail: user.email,
        ...request,
        status: 'pending',
        requestDate: new Date().toISOString()
      };
      this.withdrawalRequests.push(withdrawalRequest);
      this.saveWithdrawalRequests();
      return withdrawalRequest;
    }
    return null;
  }

  approveWithdrawalRequest(requestId) {
    const requestIndex = this.withdrawalRequests.findIndex(r => r.id === requestId);
    if (requestIndex !== -1) {
      this.withdrawalRequests[requestIndex].status = 'approved';
      this.withdrawalRequests[requestIndex].approvedDate = new Date().toISOString();
      
      // Deduct from user balance
      const request = this.withdrawalRequests[requestIndex];
      const user = this.users.find(u => u.id === request.userId);
      if (user && user.balance >= request.amount) {
        this.updateUser(user.id, {
          balance: user.balance - request.amount
        });
        
        this.addTransaction(user.id, {
          type: 'withdraw',
          amount: request.amount,
          description: `Approved withdrawal to ${request.currency} wallet`
        });
      }
      
      this.saveWithdrawalRequests();
      return this.withdrawalRequests[requestIndex];
    }
  }

  rejectWithdrawalRequest(requestId) {
    const requestIndex = this.withdrawalRequests.findIndex(r => r.id === requestId);
    if (requestIndex !== -1) {
      this.withdrawalRequests[requestIndex].status = 'rejected';
      this.withdrawalRequests[requestIndex].rejectedDate = new Date().toISOString();
      this.saveWithdrawalRequests();
      return this.withdrawalRequests[requestIndex];
    }
  }

  calculateInvestmentProfit(investment) {
    if (!investment.startDate) return null;

    const startDate = new Date(investment.startDate);
    const currentDate = new Date();
    const durationInDays = investment.duration || 30;
    const roiPercentage = investment.roi / 100;

    const daysPassed = Math.min(
      Math.floor((currentDate - startDate) / (1000 * 60 * 60 * 24)),
      durationInDays
    );

    const dailyProfit = (investment.amount * roiPercentage) / durationInDays;
    const currentProfit = dailyProfit * daysPassed;

    return {
      currentProfit: Math.max(0, currentProfit),
      dailyProfit,
      daysPassed,
      durationInDays,
      isCompleted: daysPassed >= durationInDays,
      progressPercentage: Math.min((daysPassed / durationInDays) * 100, 100)
    };
  }

  withdrawInvestmentProfit(userId, investmentId) {
    const user = this.users.find(u => u.id === userId);
    if (!user || !user.investments || !user.isApproved) return null;

    const investment = user.investments.find(inv => inv.id === investmentId);
    if (!investment) return null;

    const profitData = this.calculateInvestmentProfit(investment);

    if (profitData && profitData.currentProfit > 0) {
      // Update user balance
      const updatedUser = this.updateUser(userId, {
        balance: user.balance + profitData.currentProfit
      });

      // Mark investment as profit withdrawn
      investment.profitWithdrawn = true;
      investment.withdrawnProfit = profitData.currentProfit;
      investment.withdrawnDate = new Date().toISOString();

      if (profitData.isCompleted) {
        investment.status = 'completed';
      }

      this.saveUsers();

      // Add transaction
      this.addTransaction(userId, {
        type: 'profit_withdrawal',
        amount: profitData.currentProfit,
        description: `Profit withdrawal from ${investment.planName}`
      });

      return { updatedUser, withdrawnAmount: profitData.currentProfit };
    }

    return null;
  }

  updateKycStatus(userId, status, rejectionReason = null) {
    const userIndex = this.users.findIndex(u => u.id === userId);
    if (userIndex !== -1) {
      this.users[userIndex].kycStatus = status;
      this.users[userIndex].kycUpdateDate = new Date().toISOString();
      if (rejectionReason) {
        this.users[userIndex].kycRejectionReason = rejectionReason;
      }
      
      // Auto-approve user account when KYC is approved
      if (status === 'approved') {
        this.users[userIndex].isApproved = true;
      }
      
      this.saveUsers();
      if (this.currentUser && this.currentUser.id === userId) {
        this.saveCurrentUser(this.users[userIndex]);
      }
      return this.users[userIndex];
    }
    throw new Error('User not found');
  }

  getUsersWithPendingKyc() {
    return this.users.filter(u => u.kycStatus === 'submitted' && !u.isAdmin);
  }
}

export const authManager = new AuthManager();