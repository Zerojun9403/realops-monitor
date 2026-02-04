"use client";

import { useState } from "react";
import { Moon, Sun, Cpu, HardDrive, Activity, Network } from "lucide-react";

export default function Home() {
  const [isDark, setIsDark] = useState(true);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div className={isDark ? "dark" : ""}>
      <main className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
        {/* 헤더 */}
        <header className="border-b border-gray-200 dark:border-gray-800">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Activity className="w-8 h-8 text-blue-500" />
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                RealOps Monitor
              </h1>
            </div>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              {isDark ? (
                <Sun className="w-5 h-5 text-yellow-500" />
              ) : (
                <Moon className="w-5 h-5 text-gray-600" />
              )}
            </button>
          </div>
        </header>

        {/* 메인 대시보드 */}
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* CPU 카드 */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  CPU
                </h3>
                <Cpu className="w-6 h-6 text-blue-500" />
              </div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                45%
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full"
                  style={{ width: "45%" }}
                ></div>
              </div>
            </div>

            {/* Memory 카드 */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Memory
                </h3>
                <Activity className="w-6 h-6 text-green-500" />
              </div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                68%
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full"
                  style={{ width: "68%" }}
                ></div>
              </div>
            </div>

            {/* Disk 카드 */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Disk
                </h3>
                <HardDrive className="w-6 h-6 text-purple-500" />
              </div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                82%
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="bg-purple-500 h-2 rounded-full"
                  style={{ width: "82%" }}
                ></div>
              </div>
            </div>

            {/* Network 카드 */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Network
                </h3>
                <Network className="w-6 h-6 text-orange-500" />
              </div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                124 MB/s
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                ↑ 45 MB/s ↓ 79 MB/s
              </div>
            </div>
          </div>

          {/* 설명 */}
          <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
            <h2 className="text-xl font-bold text-blue-900 dark:text-blue-100 mb-2">
              🎉 프로젝트 시작!
            </h2>
            <p className="text-blue-800 dark:text-blue-200">
              첫 화면 완성! KT 데이터센터 3년 경험을 담은 실시간 모니터링
              시스템입니다. 다크/라이트 모드 전환도 됩니다!
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
