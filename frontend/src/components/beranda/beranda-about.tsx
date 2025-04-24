import type React from "react"
import { LightbulbIcon, SparklesIcon, ShieldCheckIcon, ZapIcon } from "lucide-react"
import { MapPin, Clock, Sparkles } from "lucide-react"
import { OwnButton } from "../OwnButton"

export default function BerandaAbout() {
  return (
    <section className="w-full py-10 md:py-16 px-10 md:px-16 lg:px-24" id="tentang-kami">
      <div className="mx-auto text-center relative z-10">
        <div className="inline-block">
          <div className="bg-primary-500 text-white font-medium py-1.5 px-6 rounded-full text-[10px] md:text-[12px] lg:text-[14px]">TENTANG KAMI</div>
        </div>

        <h2 className="text-2xl md:text-3xl font-bold mt-6 mb-4 text-neutral-900">Mengapa Memilih Jogja Smart Tour?</h2>

        <p className="text-sm md:text-base max-w-3xl mx-auto text-neutral-700 mb-12">
          Dengan teknologi AI cerdas, kami membantu merancang perjalanan yang efisien, memberikan estimasi biaya
          transparan, serta rekomendasi destinasi terbaik agar pengalaman wisatamu lebih maksimal!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 rounded-xl overflow-hidden relative h-[fit-content]">
          {/* Gradient at bottom left (behind AI Pintar) */}
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-300 rounded-full filter blur-3xl opacity-20 z-0"></div>

          {/* Gradient in the middle */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary-300 rounded-full filter blur-3xl opacity-20 z-0"></div>

          {/* Gradient at top right */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-primary-300 rounded-full filter blur-3xl opacity-20 z-0"></div>

          <FeatureCard
            icon={<LightbulbIcon className="w-6 h-6" />}
            title="AI Pintar"
            description="Teknologi AI kami menganalisis preferensi Anda untuk merencanakan perjalanan yang sesuai dengan minat dan kebutuhan Anda secara personal."
            className="bg-primary-500"
          />

          <FeatureCard
            icon={<SparklesIcon className="w-6 h-6" />}
            title="Rekomendasi Akurat"
            description="Dapatkan rekomendasi destinasi wisata terbaik berdasarkan data real-time, cuaca, dan tingkat keramaian untuk pengalaman optimal."
            className="bg-primary-500"
          />

          <FeatureCard
            icon={<ShieldCheckIcon className="w-6 h-6" />}
            title="Terpercaya"
            description="Ribuan wisatawan telah mempercayakan perjalanan mereka pada kami dengan rating kepuasan pelanggan mencapai 4.8/5."
            className="bg-primary-500"
          />

          <FeatureCard
            icon={<ZapIcon className="w-6 h-6" />}
            title="Cepat & Efisien"
            description="Hemat waktu dan biaya dengan rute perjalanan yang dioptimalkan dan estimasi biaya yang transparan tanpa biaya tersembunyi."
            className="bg-primary-500"
          />
        </div>
      </div>

      <div className="w-full py-16 md:py-24 lg:py-32 lg:px-10 ">
        <div className="grid gap-8 lg:grid-cols-[2fr_3fr] lg:gap-12 items-start">
          {/* Left side content - smaller */}
          <div className="space-y-6 text-center lg:text-left">
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-primary-700">Bagaimana Cara Kerja Jogja Smart Tour?</h2>
            <p className="text-sm md:text-base text-neutral-900">
              Pilih dari berbagai kategori wisata dan nikmati pengalaman terbaik di Jogja, mulai dari petualangan alam
              hingga wisata kuliner yang menggugah selera.
            </p>

            {/* show on mobile only */}
            <div className="lg:hidden block">
            <div className="w-full h-[300px] md:h-[400px] lg:h-[600px] bg-white rounded-lg shadow-xl overflow-hidden border border-gray-200">
              {/* Browser top bar */}
              <div className="h-12 bg-gray-100 border-b border-gray-200 flex items-center px-4">
                <div className="flex space-x-2 items-center">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="hidden md:flex items-center mx-4 space-x-4">
                  <div className="text-gray-400">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="15 18 9 12 15 6"></polyline>
                    </svg>
                  </div>
                  <div className="text-gray-400">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                  </div>
                </div>
                <div className="flex-1 max-w-md mx-auto ml-4">
                  <div className="bg-gray-200 rounded-md flex items-center px-3 py-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-gray-500 mr-2"
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="2" y1="12" x2="22" y2="12"></line>
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                    </svg>
                    <span className="text-sm text-gray-600">smart.jogja.id</span>
                  </div>
                </div>
                <div className="hidden sm2:flex items-center ml-4 space-x-4">
                  <div className="text-gray-400">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M18 15v3H6v-3"></path>
                      <path d="M12 3v12"></path>
                      <path d="M17 8l-5-5-5 5"></path>
                    </svg>
                  </div>
                  <div className="text-gray-400">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="12" y1="5" x2="12" y2="19"></line>
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                  </div>
                  <div className="text-gray-400">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Browser content - empty white space - taller */}
              <div className="h-[400px] bg-white"></div>
            </div>
          </div>

            <div className="space-y-6 text-left text-sm md:text-base">
              <div className="bg-white rounded-lg shadow-md p-4 flex items-center gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-md bg-primary-500 flex items-center justify-center text-white">
                  <MapPin size={24} />
                </div>
                <p className="text-neutral-900">Tentukan destinasi wisata yang ingin kamu kunjungi</p>
              </div>

              <div className="bg-white rounded-lg shadow-md p-4 flex items-center gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-md bg-primary-500 flex items-center justify-center text-white">
                  <Clock size={24} />
                </div>
                <p className="text-neutral-900">Sesuaikan durasi dan waktu kunjungan sesuai preferensimu</p>
              </div>

              <div className="bg-white rounded-lg shadow-md p-4 flex items-center gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-md bg-primary-500 flex items-center justify-center text-white">
                  <Sparkles size={24} />
                </div>
                <p className="text-neutral-900">AI akan memberikan rekomendasi itinerary terbaik untukmu</p>
              </div>
            </div>

            <OwnButton>Coba Sekarang!</OwnButton>
          </div>

          {/* Right side browser frame - bigger */}
          <div className="hidden lg:block">
            <div className="w-full h-[600px] bg-white rounded-lg shadow-xl overflow-hidden border border-gray-200">
              {/* Browser top bar */}
              <div className="h-12 bg-gray-100 border-b border-gray-200 flex items-center px-4">
                <div className="flex space-x-2 items-center">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="flex items-center mx-4 space-x-4">
                  <div className="text-gray-400">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="15 18 9 12 15 6"></polyline>
                    </svg>
                  </div>
                  <div className="text-gray-400">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                  </div>
                </div>
                <div className="flex-1 max-w-md mx-auto">
                  <div className="bg-gray-200 rounded-md flex items-center px-3 py-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-gray-500 mr-2"
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="2" y1="12" x2="22" y2="12"></line>
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                    </svg>
                    <span className="text-sm text-gray-600">smart.jogja.id</span>
                  </div>
                </div>
                <div className="flex items-center ml-4 space-x-4">
                  <div className="text-gray-400">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M18 15v3H6v-3"></path>
                      <path d="M12 3v12"></path>
                      <path d="M17 8l-5-5-5 5"></path>
                    </svg>
                  </div>
                  <div className="text-gray-400">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="12" y1="5" x2="12" y2="19"></line>
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                  </div>
                  <div className="text-gray-400">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Browser content - empty white space - taller */}
              <div className="h-[400px] bg-white"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
  className?: string
}

function FeatureCard({ icon, title, description, className }: FeatureCardProps) {
  return (
    <div className={`p-8 border-t md:border-r border-primary-300 last:border-r-0 text-left ${className}`}>
      <div className="bg-[#A6F2F6] w-12 h-12 rounded-md flex items-center justify-center text-primary-700 mb-4">{icon}</div>
      <h3 className="text-sm md:text-lg lg:text-xl font-semibold text-white mb-3">{title}</h3>
      <p className="text-sm md:text-base text-white">{description}</p>
    </div>
  )
}

