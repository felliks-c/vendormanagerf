'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-950 to-gray-900 text-white px-6">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-3xl text-center"
      >
        <h1 className="text-5xl sm:text-6xl font-bold mb-6 leading-tight">
          Vendor Manager — <span className="text-emerald-400">умный способ</span> управлять поставщиками
        </h1>
        <p className="text-lg sm:text-xl text-gray-400 mb-10">
          Создавай, редактируй и управляй своими вендорами за минуты.  
          Мини full-stack демо с Node / Express и React — быстро, чисто, современно.
        </p>

        <Link
          href="/vendors"
          className="inline-block bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold transition-all shadow-md"
        >
          🚀 Попробовать демо
        </Link>
      </motion.div>

      {/* Features */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="grid sm:grid-cols-3 gap-8 mt-20 max-w-4xl"
      >
        <Feature
          title="Создание"
          description="Добавляй вендоров с именем, категорией и рейтингом — без лишней бюрократии."
          icon="📝"
        />
        <Feature
          title="Просмотр"
          description="Визуальный список поставщиков с категориями и рейтингами — всё на одном экране."
          icon="📋"
        />
        <Feature
          title="Редактирование"
          description="Измени контактные данные или рейтинг в пару кликов. Данные обновляются мгновенно."
          icon="⚙️"
        />
      </motion.div>

      {/* Footer */}
      <footer className="mt-20 text-gray-500 text-sm text-center">
        <p>Сделано с ❤️ за 2 часа — Mini Full-Stack Feature</p>
        <p>
          Backend: <span className="text-gray-400">Python / FastAPI / SQLite</span> · Frontend: <span className="text-gray-400">Next.js + React</span>
        </p>
      </footer>
    </div>
  );
}

function Feature({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: string;
}) {
  return (
    <div className="bg-gray-800 rounded-xl p-6 hover:bg-gray-750 transition-colors shadow-md text-left">
      <div className="text-3xl mb-3">{icon}</div>
      <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
      <p className="text-gray-400 text-sm">{description}</p>
    </div>
  );
}
