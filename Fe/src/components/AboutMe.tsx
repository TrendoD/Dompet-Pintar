import React from 'react';
import { 
  Wallet, 
  ChartLine, 
  PiggyBank, 
  Target, 
  Shield, 
  Lightbulb,
  Sparkle,
  Heart,
  GithubLogo,
  EnvelopeSimple,
  MapPin
} from '@phosphor-icons/react';

const AboutMe: React.FC = () => {
  const features = [
    {
      icon: ChartLine,
      title: "Smart Analytics",
      description: "Powerful financial insights and spending analysis"
    },
    {
      icon: PiggyBank,
      title: "Budget Management",
      description: "Create and track budgets with intelligent recommendations"
    },
    {
      icon: Target,
      title: "Goal Setting",
      description: "Set and achieve your financial goals with guided planning"
    },
    {
      icon: Sparkle,
      title: "AI Assistant",
      description: "Get personalized financial advice and insights"
    },
    {
      icon: Shield,
      title: "Secure Platform",
      description: "Bank-level security to protect your financial data"
    },
    {
      icon: Lightbulb,
      title: "Smart Recommendations",
      description: "AI-powered suggestions to optimize your finances"
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header Section */}
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center">
            <Wallet weight="fill" className="w-8 h-8 text-white" />
          </div>
        </div>
        <h1 className="text-4xl font-bold text-gray-900">Tentang Dompet Pintar</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Solusi finansial cerdas untuk mengelola keuangan pribadi dengan teknologi AI terdepan
        </p>
      </div>

      {/* App Description */}
      <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Apa itu Dompet Pintar?</h2>
        <p className="text-gray-600 leading-relaxed text-lg">
          Dompet Pintar adalah aplikasi manajemen keuangan pribadi yang dirancang untuk membantu Anda 
          mengambil kontrol penuh atas keuangan Anda. Dengan teknologi AI yang canggih, kami memberikan 
          wawasan mendalam tentang pola pengeluaran, membantu merencanakan budget yang realistis, dan 
          mencapai tujuan finansial Anda dengan lebih efektif.
        </p>
      </div>

      {/* Purpose & Features */}
      <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Fitur Utama</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="space-y-3">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">{feature.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mission */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8 border border-blue-200">
        <div className="flex items-center gap-3 mb-4">
          <Heart weight="fill" className="w-6 h-6 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-900">Misi Kami</h2>
        </div>
        <p className="text-gray-700 leading-relaxed text-lg">
          Kami percaya bahwa setiap orang berhak memiliki akses ke alat finansial yang cerdas dan mudah digunakan. 
          Misi kami adalah memberdayakan individu untuk membuat keputusan finansial yang lebih baik melalui 
          teknologi yang inovatif dan edukasi yang berkelanjutan.
        </p>
      </div>

      {/* Team Information */}
      <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Tim Pengembang</h2>
        <div className="space-y-4">
          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center text-white font-semibold">
              TD
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">TrendoD</h3>
              <p className="text-gray-600">Lead Developer & Product Manager</p>
              <p className="text-sm text-gray-500">Spesialisasi dalam pengembangan frontend dan UX design</p>
            </div>
          </div>
          <div className="text-center text-gray-500 text-sm">
            <p>Dikembangkan dengan ❤️ oleh tim yang berdedikasi untuk inovasi finansial</p>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Hubungi Kami</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <EnvelopeSimple className="w-5 h-5 text-blue-600" />
              <div>
                <p className="font-medium text-gray-900">Email</p>
                <p className="text-gray-600">contact@dompetpintar.id</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <GithubLogo className="w-5 h-5 text-blue-600" />
              <div>
                <p className="font-medium text-gray-900">GitHub</p>
                <p className="text-gray-600">github.com/dompet-pintar</p>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-blue-600" />
              <div>
                <p className="font-medium text-gray-900">Lokasi</p>
                <p className="text-gray-600">Jakarta, Indonesia</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Version Information */}
      <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Informasi Aplikasi</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-2xl font-bold text-blue-600">v1.0.0</p>
            <p className="text-gray-600 text-sm">Versi Aplikasi</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-2xl font-bold text-green-600">React 18</p>
            <p className="text-gray-600 text-sm">Framework</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-2xl font-bold text-purple-600">2024</p>
            <p className="text-gray-600 text-sm">Tahun Rilis</p>
          </div>
        </div>
        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-800">
            <strong>Update Terbaru:</strong> Peluncuran fitur AI Assistant dan analitik mendalam untuk 
            pengalaman manajemen keuangan yang lebih personal dan cerdas.
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center py-6">
        <p className="text-gray-500 text-sm">
          © 2024 Dompet Pintar. Semua hak dilindungi undang-undang.
        </p>
        <p className="text-gray-400 text-xs mt-2">
          Dibuat dengan teknologi modern untuk masa depan finansial yang lebih cerah.
        </p>
      </div>
    </div>
  );
};

export default AboutMe;