import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, Loader2, Smartphone } from 'lucide-react';

interface PaymentModalProps {
  amount: number;
  label: string;
  onClose: () => void;
  onSuccess: () => void;
}

type PaymentStep = 'method' | 'phone' | 'processing' | 'success';

const PaymentModal: React.FC<PaymentModalProps> = ({ amount, label, onClose, onSuccess }) => {
  const [step, setStep] = useState<PaymentStep>('method');
  const [selectedMethod, setSelectedMethod] = useState<'OM' | 'MOMO' | 'WAVE' | null>(null);
  const [phoneNumber, setPhoneNumber] = useState('');

  const methods = [
    { id: 'OM', name: 'Orange Money', color: 'bg-orange-500', icon: '🟠' },
    { id: 'MOMO', name: 'MTN Momo', color: 'bg-yellow-400', icon: '🟡' },
    { id: 'WAVE', name: 'Wave', color: 'bg-blue-500', icon: '🔵' },
  ];

  const handleMethodSelect = (id: 'OM' | 'MOMO' | 'WAVE') => {
    setSelectedMethod(id);
    setStep('phone');
  };

  const handlePay = () => {
    setStep('processing');
    // Simulate USSD/API delay
    setTimeout(() => {
      setStep('success');
      setTimeout(() => {
          onSuccess();
      }, 2000); // Allow user to see success briefly before closing or external handling
    }, 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 sm:p-0">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      
      <motion.div 
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        className="bg-white w-full max-w-sm rounded-t-3xl sm:rounded-3xl z-50 overflow-hidden relative"
      >
        {/* Header */}
        <div className="p-4 border-b border-slate-100 flex justify-between items-center">
          <h3 className="font-bold text-slate-800">Paiement Sécurisé</h3>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-slate-100">
            <X size={20} className="text-slate-500" />
          </button>
        </div>

        <div className="p-6">
            <div className="mb-6 text-center">
                <p className="text-xs text-slate-400 uppercase tracking-wider">Montant à payer</p>
                <h2 className="text-3xl font-bold text-slate-900">{amount.toLocaleString()} FCFA</h2>
                <p className="text-sm text-slate-500 mt-1">{label}</p>
            </div>

            <AnimatePresence mode="wait">
                {step === 'method' && (
                    <motion.div 
                        key="method"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-3"
                    >
                        {methods.map((m) => (
                            <button
                                key={m.id}
                                onClick={() => handleMethodSelect(m.id as any)}
                                className="w-full p-4 rounded-2xl border border-slate-100 flex items-center justify-between hover:bg-slate-50 transition-colors group"
                            >
                                <div className="flex items-center gap-3">
                                    <div className={`w-10 h-10 rounded-full ${m.color} flex items-center justify-center text-white font-bold shadow-sm`}>
                                        {m.id[0]}
                                    </div>
                                    <span className="font-semibold text-slate-700">{m.name}</span>
                                </div>
                                <div className="w-4 h-4 rounded-full border-2 border-slate-300 group-hover:border-blue-500"></div>
                            </button>
                        ))}
                    </motion.div>
                )}

                {step === 'phone' && (
                    <motion.div
                        key="phone"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                    >
                        <div className="bg-slate-50 p-4 rounded-2xl mb-4 flex items-center gap-3 border border-slate-200">
                            <Smartphone className="text-slate-400" />
                            <input 
                                type="tel" 
                                placeholder="Numéro Mobile Money"
                                className="bg-transparent w-full focus:outline-none font-mono text-lg font-bold text-slate-800 placeholder:text-slate-300"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                autoFocus
                            />
                        </div>
                        <p className="text-xs text-slate-400 mb-6 text-center">
                            Veuillez valider le paiement via le code USSD qui s'affichera sur votre téléphone.
                        </p>
                        <button 
                            onClick={handlePay}
                            disabled={phoneNumber.length < 8}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-bold shadow-lg shadow-blue-200 disabled:opacity-50 disabled:shadow-none"
                        >
                            Confirmer le paiement
                        </button>
                    </motion.div>
                )}

                {step === 'processing' && (
                    <motion.div
                        key="processing"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex flex-col items-center py-8"
                    >
                        <div className="relative">
                            <div className="absolute inset-0 bg-blue-100 rounded-full animate-ping opacity-50"></div>
                            <div className="bg-white p-4 rounded-full shadow-md relative z-10">
                                <Loader2 size={48} className="text-blue-600 animate-spin" />
                            </div>
                        </div>
                        <h4 className="mt-6 font-bold text-slate-800">Traitement en cours...</h4>
                        <p className="text-sm text-slate-500 mt-2 text-center max-w-[200px]">
                            Vérifiez votre téléphone pour valider la transaction.
                        </p>
                    </motion.div>
                )}

                {step === 'success' && (
                    <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex flex-col items-center py-6"
                    >
                         <div className="bg-emerald-100 p-4 rounded-full mb-4 text-emerald-600 shadow-sm">
                             <CheckCircle2 size={48} />
                         </div>
                         <h4 className="font-bold text-slate-800 text-xl">Paiement Réussi !</h4>
                         <p className="text-slate-500 mt-1 mb-6">Transaction ID: #TX-{Math.floor(Math.random() * 1000000)}</p>
                         <div className="w-full bg-slate-50 p-4 rounded-xl border border-dashed border-slate-200">
                             <div className="flex justify-between text-sm mb-2">
                                 <span className="text-slate-500">Montant</span>
                                 <span className="font-bold text-slate-800">{amount.toLocaleString()} FCFA</span>
                             </div>
                             <div className="flex justify-between text-sm">
                                 <span className="text-slate-500">Méthode</span>
                                 <span className="font-bold text-slate-800">{selectedMethod === 'OM' ? 'Orange Money' : selectedMethod === 'MOMO' ? 'MTN Momo' : 'Wave'}</span>
                             </div>
                         </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default PaymentModal;
