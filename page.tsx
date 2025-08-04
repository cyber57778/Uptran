
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { authManager } from '../lib/auth';

export default function WithdrawalPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    amount: '',
    walletAddress: '',
    currency: 'BTC',
    note: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState('withdraw');

  const currencies = [
    { id: 'BTC', name: 'Bitcoin', icon: 'ri-bit-coin-line', color: 'text-orange-400' },
    { id: 'USDT', name: 'Tether', icon: 'ri-money-dollar-circle-line', color: 'text-green-400' },
    { id: 'ETH', name: 'Ethereum', icon: 'ri-exchange-line', color: 'text-blue-400' }
  ];

  useEffect(() => {
    const currentUser = authManager.getCurrentUser();
    if (!currentUser) {
      router.push('/login');
    } else if (!currentUser.isApproved) {
      router.push('/dashboard');
    } else {
      setUser(currentUser);
    }
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const amount = parseFloat(formData.amount);
    if (amount > 0 && amount <= user.balance && formData.walletAddress) {
      try {
        const result = authManager.addWithdrawalRequest(user.id, {
          amount: amount,
          walletAddress: formData.walletAddress,
          currency: formData.currency,
          note: formData.note
        });

        if (result) {
          setSuccess(true);
          setFormData({
            amount: '',
            walletAddress: '',
            currency: 'BTC',
            note: ''
          });
        }
      } catch (error) {
        console.error('Withdrawal request failed:', error);
      }
    }
    setLoading(false);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const getWithdrawalHistory = () => {
    return authManager.withdrawalRequests.filter(r => r.userId === user?.id) || [];
  };

  if (!user) return <div className="min-h-screen bg-black flex items-center justify-center">
    <div className="text-white">Loading...</div>
  </div>;

  if (!user.isApproved) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Account Not Approved</h2>
          <p className="text-gray-400">Please wait for admin approval to access withdrawals.</p>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen bg-black text-white overflow-hidden relative">
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url('https://readdy.ai/api/search-image?query=futuristic%20cryptocurrency%20withdrawal%20success%20interface%20with%20holographic%20confirmation%20display%2C%20modern%20digital%20wallet%20transaction%20completed%20screen%20with%20neon%20green%20success%20indicators%20and%20Uptran%20branding&width=1920&height=1080&seq=withdrawal-success&orientation=landscape')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-gray-900/50 to-black/70 backdrop-blur-sm" />
        
        <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
          <div className="w-full max-w-md text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <i className="ri-check-line text-white text-3xl" />
            </div>
            
            <h1 className="text-3xl font-bold text-white mb-4">Withdrawal Request Submitted</h1>
            <p className="text-gray-300 mb-8">Your withdrawal request has been submitted successfully. It will be reviewed by our admin team.</p>
            
            <div className="space-y-3">
              <Link href="/dashboard" className="block w-full py-3 bg-gradient-to-r from-amber-400 to-yellow-600 text-black font-bold rounded-lg transition-all duration-300 hover:shadow-lg cursor-pointer !rounded-button">
                BACK TO DASHBOARD
              </Link>
              
              <button 
                onClick={() => setSuccess(false)}
                className="block w-full py-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-medium rounded-lg transition-all duration-300 hover:bg-white/20 cursor-pointer !rounded-button"
              >
                New Withdrawal
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url('https://readdy.ai/api/search-image?query=futuristic%20cryptocurrency%20withdrawal%20interface%20with%20holographic%20wallet%20displays%20and%20transparent%20glass%20panels%2C%20modern%20Uptran%20digital%20payment%20processing%20dashboard%20with%20golden%20neon%20data%20visualization&width=1920&height=1080&seq=withdrawal-bg&orientation=landscape')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      
      <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-gray-900/50 to-black/70 backdrop-blur-sm" />

      <div className="relative z-10 min-h-screen p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Link href="/dashboard" className="w-8 h-8 flex items-center justify-center text-amber-400 cursor-pointer">
              <i className="ri-arrow-left-line text-xl" />
            </Link>
            <div>
              <h1 className="text-xl font-bold">Withdraw Funds</h1>
              <p className="text-amber-400 text-sm">Request withdrawal</p>
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-sm text-gray-400">Available Balance</div>
            <div className="text-lg font-bold text-white">${user.balance.toFixed(2)}</div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-2 mb-6">
          <button
            onClick={() => setActiveTab('withdraw')}
            className={`px-4 py-2 rounded-full transition-all duration-300 cursor-pointer text-sm ${
              activeTab === 'withdraw'
                ? 'bg-amber-400/20 text-amber-400 border border-amber-400/30'
                : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
            }`}
          >
            New Withdrawal
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`px-4 py-2 rounded-full transition-all duration-300 cursor-pointer text-sm ${
              activeTab === 'history'
                ? 'bg-amber-400/20 text-amber-400 border border-amber-400/30'
                : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
            }`}
          >
            Withdrawal History
          </button>
        </div>

        {/* Withdrawal Form */}
        {activeTab === 'withdraw' && (
          <div className="bg-black/40 backdrop-blur-md border border-amber-400/20 rounded-2xl p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Currency Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-3">Select Currency</label>
                <div className="grid grid-cols-3 gap-3">
                  {currencies.map((currency) => (
                    <button
                      key={currency.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, currency: currency.id })}
                      className={`p-4 rounded-lg border transition-all duration-300 cursor-pointer ${
                        formData.currency === currency.id
                          ? 'bg-amber-400/20 border-amber-400 text-amber-400'
                          : 'bg-gray-800/50 border-gray-600 text-gray-300 hover:border-gray-500'
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-2 ${
                        formData.currency === currency.id ? 'bg-amber-400/20' : 'bg-gray-700'
                      }`}>
                        <i className={`${currency.icon} ${currency.color} text-lg`} />
                      </div>
                      <div className="text-xs font-medium">{currency.id}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Amount */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Withdrawal Amount</label>
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  min="0"
                  max={user.balance}
                  step="0.01"
                  required
                  className="w-full px-4 py-3 bg-black/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-amber-400 focus:outline-none transition-colors duration-300"
                  placeholder="0.00"
                />
                <div className="text-xs text-gray-400 mt-1">
                  Maximum: ${user.balance.toFixed(2)}
                </div>
              </div>

              {/* Wallet Address */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  {formData.currency} Wallet Address
                </label>
                <input
                  type="text"
                  name="walletAddress"
                  value={formData.walletAddress}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-black/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-amber-400 focus:outline-none transition-colors duration-300"
                  placeholder={`Enter your ${formData.currency} wallet address`}
                />
              </div>

              {/* Note */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Note (Optional)</label>
                <textarea
                  name="note"
                  value={formData.note}
                  onChange={handleChange}
                  rows={3}
                  maxLength={500}
                  className="w-full px-4 py-3 bg-black/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-amber-400 focus:outline-none transition-colors duration-300 resize-none"
                  placeholder="Additional notes for withdrawal..."
                />
                <div className="text-xs text-gray-400 mt-1">
                  {formData.note.length}/500 characters
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading || !formData.amount || !formData.walletAddress}
                className="w-full py-3 bg-gradient-to-r from-amber-400 to-yellow-600 text-black font-bold hover:shadow-lg hover:shadow-amber-500/25 transition-all duration-300 rounded-lg cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed !rounded-button"
              >
                {loading ? 'SUBMITTING REQUEST...' : 'SUBMIT WITHDRAWAL REQUEST'}
              </button>
            </form>
          </div>
        )}

        {/* Withdrawal History */}
        {activeTab === 'history' && (
          <div className="bg-black/40 backdrop-blur-md border border-amber-400/20 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-4">Withdrawal History</h2>
            
            <div className="space-y-3">
              {getWithdrawalHistory().length > 0 ? (
                getWithdrawalHistory().slice().reverse().map((request) => (
                  <div key={request.id} className="bg-gray-800/30 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          request.status === 'pending' ? 'bg-yellow-400/20' :
                          request.status === 'approved' ? 'bg-green-400/20' : 'bg-red-400/20'
                        }`}>
                          <i className={`${
                            request.status === 'pending' ? 'ri-time-line text-yellow-400' :
                            request.status === 'approved' ? 'ri-check-line text-green-400' :
                            'ri-close-line text-red-400'
                          }`} />
                        </div>
                        <div>
                          <div className="text-white font-medium">{request.currency}</div>
                          <div className="text-gray-400 text-sm">
                            {new Date(request.requestDate).toLocaleString()}
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="text-white font-bold">${request.amount.toFixed(2)}</div>
                        <div className={`text-xs px-2 py-1 rounded-full mt-1 ${
                          request.status === 'approved' ? 'bg-green-400/20 text-green-400' :
                          request.status === 'pending' ? 'bg-yellow-400/20 text-yellow-400' :
                          'bg-red-400/20 text-red-400'
                        }`}>
                          {request.status === 'approved' ? 'Withdrawal Successful' : request.status}
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-xs text-gray-400 font-mono mt-2">
                      To: {request.walletAddress.slice(0, 10)}...{request.walletAddress.slice(-10)}
                    </div>
                    
                    {request.note && (
                      <div className="text-xs text-gray-400 mt-2">
                        Note: {request.note}
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-400">
                  <i className="ri-inbox-line text-4xl mb-4" />
                  <div>No withdrawal history found</div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
