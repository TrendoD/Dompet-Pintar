import React from 'react';
import { 
  Wallet, 
  Sparkle, 
  ArrowRight, 
  PlayCircle,
  Robot,
  ChartBar,
  Lightbulb,
  ChartLineUp,
  CheckCircle,
  XCircle,
  InstagramLogo,
  TwitterLogo,
  FacebookLogo,
  YoutubeLogo
} from '@phosphor-icons/react';
import WaitlistCounter from './WaitlistCounter';

const LandingPageV2: React.FC<{ onNavigate: (page: string) => void }> = ({ onNavigate }) => {
  const googleFormUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSeSJVTqvbP3v5i7IJND6rZtKLtsAjYsxVyd4DQqvH4eEGWxTw/viewform?usp=header';
  
  const handleJoinWaitlist = () => {
    window.open(googleFormUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center py-4">
            <a href="#" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-[10px] flex items-center justify-center">
                <Wallet size={24} className="text-white" weight="fill" />
              </div>
              <span className="text-xl font-bold text-gray-900">Dompet Pintar</span>
            </a>
            
            <div className="hidden md:flex items-center gap-10">
              <a href="#features" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">Features</a>
              <a href="#pricing" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">Pricing</a>
              <button 
                onClick={() => onNavigate('about')}
                className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
              >
                About
              </button>
            </div>
            
            <div className="flex gap-4">
              <button 
                onClick={handleJoinWaitlist}
                className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 hover:-translate-y-0.5 hover:shadow-md transition-all"
              >
                Join Waitlist
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="max-w-[540px]">
              <div className="inline-flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full text-sm font-semibold text-blue-600 mb-5">
                <Sparkle size={16} weight="fill" />
                <span>Powered by AI</span>
              </div>
              <h1 className="text-5xl font-extrabold text-gray-900 leading-tight mb-5">
                Kelola Keuangan Cerdas dengan <span className="text-blue-600">AI Assistant</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed mb-6">
                Dompet Pintar membantu mahasiswa Indonesia mengatur uang bulanan dengan AI Assistant yang memberikan insight personal dan rekomendasi real-time
              </p>
              
              <div className="mb-8">
                <WaitlistCounter className="text-lg" />
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 items-center mb-12">
                <button 
                  onClick={handleJoinWaitlist}
                  className="px-8 py-4 bg-blue-600 text-white font-semibold text-lg rounded-xl hover:bg-blue-700 hover:-translate-y-0.5 hover:shadow-md transition-all flex items-center gap-2"
                >
                  Join Waitlist
                  <ArrowRight size={20} />
                </button>
                <button 
                  onClick={() => onNavigate('dashboard')}
                  className="px-8 py-4 text-gray-900 font-semibold text-lg border-2 border-gray-100 rounded-xl hover:bg-gray-50 transition-all flex items-center gap-2"
                >
                  <PlayCircle size={20} />
                  Lihat Demo
                </button>
              </div>
              
              <div className="flex gap-10">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-1">AI</div>
                  <div className="text-sm text-gray-600">AI Powered</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-1">30%</div>
                  <div className="text-sm text-gray-600">Target Hemat</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-1">24/7</div>
                  <div className="text-sm text-gray-600">AI Support</div>
                </div>
              </div>
            </div>
            
            <div className="relative hidden lg:block">
              <div className="w-[300px] h-[600px] bg-gray-900 rounded-[40px] p-5 shadow-2xl mx-auto">
                <div className="w-full h-full bg-white rounded-[20px] overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-b from-blue-50 to-blue-100 flex items-center justify-center">
                    <span className="text-gray-400">App Preview</span>
                  </div>
                </div>
              </div>
              
              {/* Floating Cards */}
              <div className="absolute top-[20%] -left-20 bg-white rounded-xl p-4 shadow-lg animate-float">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mb-2">
                  <ChartLineUp size={18} className="text-white" weight="fill" />
                </div>
                <div className="text-sm font-semibold text-gray-900 mb-0.5">Hemat Bulan Ini</div>
                <div className="text-lg font-bold text-green-600">Rp 450.000</div>
              </div>
              
              <div className="absolute bottom-[30%] -right-20 bg-white rounded-xl p-4 shadow-lg animate-float-delayed">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mb-2">
                  <Lightbulb size={18} className="text-white" weight="fill" />
                </div>
                <div className="text-sm font-semibold text-gray-900 mb-0.5">AI Insight</div>
                <div className="text-lg font-bold text-green-600">3 Tips Baru</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20" id="features">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Fitur Unggulan</h2>
            <p className="text-lg text-gray-600">
              Teknologi AI terdepan untuk membantu kamu mengelola keuangan dengan lebih baik
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-2xl p-8 text-center hover:-translate-y-2 hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-5">
                <Robot size={32} className="text-white" weight="fill" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">AI-Powered Insights</h3>
              <p className="text-gray-600">
                AI Assistant menganalisis pola pengeluaranmu dan memberikan saran yang dipersonalisasi sesuai kebutuhanmu
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-2xl p-8 text-center hover:-translate-y-2 hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-5">
                <ChartBar size={32} className="text-white" weight="fill" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Real-time Tracking</h3>
              <p className="text-gray-600">
                Pantau setiap transaksi secara real-time dengan kategorisasi otomatis dan visualisasi yang mudah dipahami
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-2xl p-8 text-center hover:-translate-y-2 hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-5">
                <Lightbulb size={32} className="text-white" weight="fill" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Personalized Tips</h3>
              <p className="text-gray-600">
                Dapatkan tips hemat yang disesuaikan dengan gaya hidup dan target finansial kamu
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Cara Kerja</h2>
            <p className="text-lg text-gray-600">
              Mulai kelola keuanganmu dalam 3 langkah mudah
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="text-center relative">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-5 text-3xl font-bold text-blue-600 shadow-md">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Connect Accounts</h3>
              <p className="text-gray-600">
                Hubungkan rekening bank dan e-wallet kamu dengan aman menggunakan enkripsi bank-level
              </p>
              <div className="hidden md:block absolute top-10 -right-10 w-20 h-0.5 bg-blue-600 opacity-30"></div>
            </div>
            
            <div className="text-center relative">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-5 text-3xl font-bold text-blue-600 shadow-md">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">AI Analysis</h3>
              <p className="text-gray-600">
                AI Assistant menganalisis transaksimu dan memberikan insight mendalam tentang pola pengeluaran
              </p>
              <div className="hidden md:block absolute top-10 -right-10 w-20 h-0.5 bg-blue-600 opacity-30"></div>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-5 text-3xl font-bold text-blue-600 shadow-md">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Get Recommendations</h3>
              <p className="text-gray-600">
                Terima rekomendasi personal untuk menghemat dan mencapai target finansialmu
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-gray-50" id="pricing">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Pilih Paket Terbaik</h2>
            <p className="text-lg text-gray-600">
              Mulai gratis, upgrade kapan saja sesuai kebutuhanmu
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-10 border-2 border-transparent hover:shadow-lg transition-all">
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">Free</h3>
              <div className="text-5xl font-bold text-blue-600 mb-1">
                Rp 0<span className="text-base text-gray-600 font-normal">/bulan</span>
              </div>
              <p className="text-sm text-gray-600 mb-8">Gratis selamanya</p>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3">
                  <CheckCircle size={20} className="text-green-600" weight="fill" />
                  <span className="text-gray-700">Track pengeluaran manual</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle size={20} className="text-green-600" weight="fill" />
                  <span className="text-gray-700">Kategori dasar</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle size={20} className="text-green-600" weight="fill" />
                  <span className="text-gray-700">Laporan bulanan</span>
                </li>
                <li className="flex items-center gap-3 opacity-50">
                  <XCircle size={20} className="text-gray-400" />
                  <span className="text-gray-500">AI Insights</span>
                </li>
                <li className="flex items-center gap-3 opacity-50">
                  <XCircle size={20} className="text-gray-400" />
                  <span className="text-gray-500">Bank sync otomatis</span>
                </li>
              </ul>
              
              <button 
                onClick={handleJoinWaitlist}
                className="w-full py-3 text-gray-900 font-semibold border-2 border-gray-100 rounded-xl hover:bg-gray-50 transition-all"
              >
                Join Waitlist
              </button>
            </div>
            
            <div className="bg-white rounded-2xl p-10 border-2 border-blue-600 hover:shadow-lg transition-all relative transform scale-105">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-xs font-semibold">
                MOST POPULAR
              </span>
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">Premium</h3>
              <div className="text-5xl font-bold text-blue-600 mb-1">
                Rp 29K<span className="text-base text-gray-600 font-normal">/bulan</span>
              </div>
              <p className="text-sm text-gray-600 mb-8">Hemat 20% bayar tahunan</p>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3">
                  <CheckCircle size={20} className="text-green-600" weight="fill" />
                  <span className="text-gray-700">Semua fitur Free</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle size={20} className="text-green-600" weight="fill" />
                  <span className="text-gray-700">AI Insights unlimited</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle size={20} className="text-green-600" weight="fill" />
                  <span className="text-gray-700">Bank & e-wallet sync</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle size={20} className="text-green-600" weight="fill" />
                  <span className="text-gray-700">Chat dengan AI 24/7</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle size={20} className="text-green-600" weight="fill" />
                  <span className="text-gray-700">Export data Excel/PDF</span>
                </li>
              </ul>
              
              <button 
                onClick={handleJoinWaitlist}
                className="w-full py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all"
              >
                Join Waitlist - Get Premium Access
              </button>
            </div>
            
            <div className="bg-white rounded-2xl p-10 border-2 border-transparent hover:shadow-lg transition-all">
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">Team</h3>
              <div className="text-5xl font-bold text-blue-600 mb-1">
                Rp 99K<span className="text-base text-gray-600 font-normal">/bulan</span>
              </div>
              <p className="text-sm text-gray-600 mb-8">Per 5 users</p>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3">
                  <CheckCircle size={20} className="text-green-600" weight="fill" />
                  <span className="text-gray-700">Semua fitur Premium</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle size={20} className="text-green-600" weight="fill" />
                  <span className="text-gray-700">Shared budget planning</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle size={20} className="text-green-600" weight="fill" />
                  <span className="text-gray-700">Team analytics</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle size={20} className="text-green-600" weight="fill" />
                  <span className="text-gray-700">Priority support</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle size={20} className="text-green-600" weight="fill" />
                  <span className="text-gray-700">API access</span>
                </li>
              </ul>
              
              <button 
                onClick={handleJoinWaitlist}
                className="w-full py-3 text-gray-900 font-semibold border-2 border-gray-100 rounded-xl hover:bg-gray-50 transition-all"
              >
                Join Waitlist - Team Access
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
            <div className="md:col-span-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-white rounded-[10px] flex items-center justify-center">
                  <Wallet size={24} className="text-blue-600" weight="fill" />
                </div>
                <span className="text-xl font-bold">Dompet Pintar</span>
              </div>
              <p className="text-gray-400 text-sm mb-5">
                Solusi keuangan cerdas untuk mahasiswa Indonesia. Kelola uangmu dengan bantuan AI dan capai financial freedom.
              </p>
              <div className="flex gap-3">
                <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
                  <InstagramLogo size={20} weight="fill" />
                </a>
                <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
                  <TwitterLogo size={20} weight="fill" />
                </a>
                <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
                  <FacebookLogo size={20} weight="fill" />
                </a>
                <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
                  <YoutubeLogo size={20} weight="fill" />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="text-base font-semibold mb-4">Product</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Features</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Pricing</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Security</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">API</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-base font-semibold mb-4">Company</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Blog</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Careers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Press Kit</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-base font-semibold mb-4">Support</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Help Center</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Contact Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/10 pt-8 text-center">
            <p className="text-gray-400 text-sm">
              &copy; 2024 Dompet Pintar. All rights reserved. Made with ❤️ in Indonesia
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPageV2;