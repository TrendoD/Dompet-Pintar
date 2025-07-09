import React from 'react';
import { 
  Wallet, 
  Brain, 
  Shield, 
  TrendingUp, 
  Smartphone, 
  BarChart3,
  MessageCircle,
  Target,
  ChevronRight,
  CheckCircle,
  Sparkles
} from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900">
      {/* Header */}
      <header className="relative z-50 px-6 py-4">
        <nav className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-teal-400 to-emerald-400 p-2 rounded-xl">
              <Wallet className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-white">Dompet Pintar</span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-300 hover:text-white transition-colors">Features</a>
            <a href="#how-it-works" className="text-gray-300 hover:text-white transition-colors">How It Works</a>
            <a href="#security" className="text-gray-300 hover:text-white transition-colors">Security</a>
            <button
              onClick={onGetStarted}
              className="bg-gradient-to-r from-teal-500 to-emerald-500 text-white px-6 py-2 rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              Get Started
            </button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="inline-flex items-center space-x-2 bg-teal-500/10 border border-teal-500/20 rounded-full px-4 py-2">
                  <Sparkles className="h-4 w-4 text-teal-400" />
                  <span className="text-teal-300 text-sm">AI-Powered Financial Management</span>
                </div>
                <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight">
                  Kelola Keuangan
                  <span className="bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent"> Pintar</span>
                </h1>
                <p className="text-xl text-gray-300 leading-relaxed">
                  Aplikasi manajemen keuangan digital dengan AI yang membantu Anda mencapai tujuan finansial. 
                  Pelacakan real-time, analisis mendalam, dan rekomendasi personal.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <button
                  onClick={onGetStarted}
                  className="group bg-gradient-to-r from-teal-500 to-emerald-500 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  <span>Mulai Sekarang</span>
                  <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="border border-gray-600 text-gray-300 px-8 py-4 rounded-xl font-semibold hover:bg-gray-800 transition-colors">
                  Demo Live
                </button>
              </div>
              <div className="flex items-center space-x-8 text-gray-400">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-teal-400" />
                  <span>100% Aman</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-teal-400" />
                  <span>Enkripsi Bank</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-teal-400" />
                  <span>AI Assistant</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-r from-teal-500/20 to-emerald-500/20 rounded-3xl p-8 backdrop-blur-sm border border-teal-500/20">
                <div className="bg-slate-800/50 rounded-2xl p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-white font-semibold">Total Balance</h3>
                    <TrendingUp className="h-5 w-5 text-teal-400" />
                  </div>
                  <div className="text-3xl font-bold text-white">Rp 25,480,000</div>
                  <div className="flex items-center space-x-2 text-teal-400">
                    <span className="text-sm">+12.5% from last month</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 pt-4">
                    <div className="bg-slate-700/30 rounded-lg p-3">
                      <div className="text-gray-400 text-sm">Income</div>
                      <div className="text-white font-semibold">Rp 18,200,000</div>
                    </div>
                    <div className="bg-slate-700/30 rounded-lg p-3">
                      <div className="text-gray-400 text-sm">Expenses</div>
                      <div className="text-white font-semibold">Rp 12,720,000</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold text-white">Fitur Unggulan</h2>
            <p className="text-xl text-gray-300">Kelola keuangan dengan teknologi AI terdepan</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Brain className="h-8 w-8" />,
                title: "AI Insights",
                description: "Analisis mendalam dengan rekomendasi personal berbasis kecerdasan buatan"
              },
              {
                icon: <BarChart3 className="h-8 w-8" />,
                title: "Real-time Analytics",
                description: "Dashboard interaktif dengan visualisasi data keuangan secara real-time"
              },
              {
                icon: <Shield className="h-8 w-8" />,
                title: "Keamanan Bank",
                description: "Enkripsi setara perbankan dengan autentikasi berlapis untuk data Anda"
              },
              {
                icon: <Target className="h-8 w-8" />,
                title: "Smart Budgeting",
                description: "Pengaturan anggaran cerdas dengan tracking otomatis dan alert proaktif"
              },
              {
                icon: <MessageCircle className="h-8 w-8" />,
                title: "AI Assistant",
                description: "Chat assistant 24/7 untuk konsultasi keuangan dan tips finansial"
              },
              {
                icon: <Smartphone className="h-8 w-8" />,
                title: "Mobile First",
                description: "Desain responsif mobile-first untuk akses mudah kapan saja, dimana saja"
              }
            ].map((feature, index) => (
              <div key={index} className="group bg-slate-800/30 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 hover:bg-slate-800/50 transition-all duration-300 hover:transform hover:scale-105">
                <div className="text-teal-400 mb-4 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-300 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 px-6 bg-slate-800/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold text-white">Cara Kerja</h2>
            <p className="text-xl text-gray-300">Mulai dalam 3 langkah mudah</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Hubungkan Akun",
                description: "Sambungkan bank atau e-wallet Anda dengan aman menggunakan enkripsi tingkat perbankan"
              },
              {
                step: "02",
                title: "Analisis Otomatis",
                description: "Sistem AI menganalisis transaksi dan pola pengeluaran Anda secara real-time"
              },
              {
                step: "03",
                title: "Terima Insight",
                description: "Dapatkan rekomendasi personal dan tips finansial untuk mencapai tujuan Anda"
              }
            ].map((step, index) => (
              <div key={index} className="relative text-center">
                <div className="bg-gradient-to-r from-teal-500 to-emerald-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-white font-bold text-lg">{step.step}</span>
                </div>
                <h3 className="text-2xl font-semibold text-white mb-4">{step.title}</h3>
                <p className="text-gray-300 leading-relaxed">{step.description}</p>
                {index < 2 && (
                  <div className="hidden md:block absolute top-8 left-full w-full">
                    <ChevronRight className="h-8 w-8 text-teal-400 mx-auto" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-teal-500/10 to-emerald-500/10 backdrop-blur-sm border border-teal-500/20 rounded-3xl p-12">
            <h2 className="text-4xl font-bold text-white mb-6">
              Siap Mengelola Keuangan Lebih Pintar?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Bergabunglah dengan ribuan pengguna yang telah merasakan kemudahan mengelola keuangan dengan AI
            </p>
            <button
              onClick={onGetStarted}
              className="group bg-gradient-to-r from-teal-500 to-emerald-500 text-white px-12 py-4 rounded-xl font-semibold text-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-200 flex items-center space-x-3 mx-auto"
            >
              <span>Mulai Gratis Sekarang</span>
              <ChevronRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-gray-800">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="bg-gradient-to-r from-teal-400 to-emerald-400 p-2 rounded-xl">
              <Wallet className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-white">Dompet Pintar</span>
          </div>
          <p className="text-gray-400">© 2025 Dompet Pintar. Semua hak dilindungi.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;