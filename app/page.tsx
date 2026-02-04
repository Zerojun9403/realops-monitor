"use client";

import { useState, useEffect } from "react";
import {
  Moon,
  Sun,
  Cpu,
  HardDrive,
  Activity,
  Network,
  Server,
  Zap,
  AlertTriangle,
  Wifi,
} from "lucide-react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const generateChartData = () => {
  const data = [];
  for (let i = 0; i < 30; i++) {
    data.push({
      time: `${i}s`,
      cpu: Math.floor(Math.random() * 40) + 30,
      memory: Math.floor(Math.random() * 30) + 50,
      network: Math.floor(Math.random() * 60) + 40,
    });
  }
  return data;
};

export default function Home() {
  const [isDark, setIsDark] = useState(true);
  const [chartData, setChartData] = useState(generateChartData());
  const [metrics, setMetrics] = useState({
    cpu: 0,
    memory: 0,
    disk: 0,
    network: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  // 백엔드에서 데이터 가져오기
  const fetchMetrics = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/metrics");
      if (!response.ok) throw new Error("API 호출 실패");

      const data = await response.json();

      setMetrics({
        cpu: data.cpu,
        memory: data.memory,
        disk: data.disk,
        network: data.network,
      });

      // 차트 데이터도 업데이트
      setChartData((prev) => {
        const newData = [
          ...prev.slice(1),
          {
            time: `${prev.length}s`,
            cpu: data.cpu,
            memory: data.memory,
            network: data.network,
          },
        ];
        return newData;
      });

      setIsLoading(false);
      setError("");
    } catch (err) {
      console.error("API 에러:", err);
      setError("백엔드 연결 실패");
      setIsLoading(false);
    }
  };

  // 최초 로드 & 2초마다 업데이트
  useEffect(() => {
    fetchMetrics(); // 첫 로드
    const interval = setInterval(fetchMetrics, 2000); // 2초마다
    return () => clearInterval(interval);
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div className={isDark ? "dark" : ""}>
      <main className="min-h-screen bg-black dark:bg-black transition-colors relative overflow-hidden">
        {/* 사이버펑크 배경 그리드 */}
        <div className="absolute inset-0 opacity-20">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
              linear-gradient(rgba(0, 240, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 240, 255, 0.1) 1px, transparent 1px)
            `,
              backgroundSize: "50px 50px",
            }}
          ></div>
        </div>

        {/* 네온 글로우 효과 */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/30 rounded-full blur-[120px] animate-pulse"></div>
        <div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/30 rounded-full blur-[120px] animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>

        <div className="relative z-10">
          {/* 사이버펑크 헤더 */}
          <header className="border-b border-cyan-500/30 backdrop-blur-md bg-black/50 sticky top-0 z-50">
            <div className="container mx-auto px-4 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="absolute inset-0 bg-cyan-500 blur-xl opacity-50 animate-pulse"></div>
                    <Server
                      className="relative w-10 h-10 text-cyan-400"
                      style={{
                        filter: "drop-shadow(0 0 10px rgba(0, 240, 255, 0.8))",
                      }}
                    />
                  </div>
                  <div>
                    <h1
                      className="text-3xl font-black tracking-wider bg-gradient-to-r from-cyan-400 via-pink-500 to-yellow-400 bg-clip-text text-transparent uppercase"
                      style={{
                        textShadow: "0 0 20px rgba(0, 240, 255, 0.5)",
                        fontFamily: "monospace",
                      }}
                    >
                      REALOPS//MONITOR
                    </h1>
                    <div className="flex items-center gap-2 mt-1">
                      <div
                        className="w-2 h-2 bg-green-400 rounded-full animate-pulse"
                        style={{
                          boxShadow: "0 0 10px rgba(34, 197, 94, 0.8)",
                        }}
                      ></div>
                      <span className="text-xs text-green-400 font-mono uppercase tracking-widest">
                        {isLoading
                          ? "CONNECTING..."
                          : error
                            ? "OFFLINE"
                            : "LIVE CONNECTION // BACKEND LINKED"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="hidden md:flex items-center gap-4 px-4 py-2 border border-cyan-500/30 rounded-lg bg-black/50">
                    <div className="flex items-center gap-2">
                      <Wifi className="w-4 h-4 text-cyan-400" />
                      <span className="text-xs text-cyan-400 font-mono">
                        API: CONNECTED
                      </span>
                    </div>
                    <div className="w-px h-4 bg-cyan-500/30"></div>
                    <div className="flex items-center gap-2">
                      <Activity className="w-4 h-4 text-pink-400" />
                      <span className="text-xs text-pink-400 font-mono">
                        REAL-TIME
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={toggleTheme}
                    className="p-2 border border-cyan-500/50 rounded-lg bg-black/50 hover:bg-cyan-500/20 transition-all"
                    style={{ boxShadow: "0 0 20px rgba(0, 240, 255, 0.3)" }}
                  >
                    {isDark ? (
                      <Sun className="w-5 h-5 text-yellow-400" />
                    ) : (
                      <Moon className="w-5 h-5 text-cyan-400" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </header>

          <div className="container mx-auto px-4 py-8">
            {/* 에러 메시지 */}
            {error && (
              <div className="mb-6 p-4 border border-red-500/50 rounded-lg bg-red-500/10">
                <p className="text-red-400 font-mono text-sm">
                  ⚠️ {error} - Spring Boot 서버가 실행 중인지 확인하세요
                </p>
              </div>
            )}

            {/* 메인 대시보드 그리드 */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              {/* 왼쪽: 메트릭 카드들 */}
              <div className="space-y-4">
                {/* CPU */}
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg blur opacity-30 group-hover:opacity-60 transition duration-300"></div>
                  <div className="relative border border-cyan-500/30 rounded-lg bg-black/80 backdrop-blur-xl p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Cpu className="w-5 h-5 text-cyan-400" />
                        <span className="text-cyan-400 font-mono text-sm uppercase tracking-wider">
                          CPU
                        </span>
                      </div>
                      <div
                        className="text-2xl font-bold text-cyan-400 font-mono tabular-nums"
                        style={{
                          textShadow: "0 0 10px rgba(0, 240, 255, 0.8)",
                        }}
                      >
                        {metrics.cpu}%
                      </div>
                    </div>
                    <div className="relative h-2 bg-gray-900 rounded-full overflow-hidden">
                      <div
                        className="absolute h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-500"
                        style={{
                          width: `${metrics.cpu}%`,
                          boxShadow: "0 0 10px rgba(0, 240, 255, 0.8)",
                        }}
                      ></div>
                    </div>
                    <div className="mt-2 text-xs text-gray-500 font-mono">
                      {metrics.cpu > 70 ? (
                        <span className="text-yellow-400 flex items-center gap-1">
                          <AlertTriangle className="w-3 h-3" /> WARNING: HIGH
                        </span>
                      ) : (
                        <span className="text-green-400">STATUS: OPTIMAL</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Memory */}
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg blur opacity-30 group-hover:opacity-60 transition duration-300"></div>
                  <div className="relative border border-pink-500/30 rounded-lg bg-black/80 backdrop-blur-xl p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Activity className="w-5 h-5 text-pink-400" />
                        <span className="text-pink-400 font-mono text-sm uppercase tracking-wider">
                          MEMORY
                        </span>
                      </div>
                      <div
                        className="text-2xl font-bold text-pink-400 font-mono tabular-nums"
                        style={{
                          textShadow: "0 0 10px rgba(255, 0, 110, 0.8)",
                        }}
                      >
                        {metrics.memory}%
                      </div>
                    </div>
                    <div className="relative h-2 bg-gray-900 rounded-full overflow-hidden">
                      <div
                        className="absolute h-full bg-gradient-to-r from-pink-500 to-purple-500 transition-all duration-500"
                        style={{
                          width: `${metrics.memory}%`,
                          boxShadow: "0 0 10px rgba(255, 0, 110, 0.8)",
                        }}
                      ></div>
                    </div>
                    <div className="mt-2 text-xs text-gray-500 font-mono">
                      {metrics.memory > 80 ? (
                        <span className="text-yellow-400 flex items-center gap-1">
                          <AlertTriangle className="w-3 h-3" /> WARNING: HIGH
                        </span>
                      ) : (
                        <span className="text-green-400">STATUS: OPTIMAL</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Disk */}
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg blur opacity-30 group-hover:opacity-60 transition duration-300"></div>
                  <div className="relative border border-yellow-500/30 rounded-lg bg-black/80 backdrop-blur-xl p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <HardDrive className="w-5 h-5 text-yellow-400" />
                        <span className="text-yellow-400 font-mono text-sm uppercase tracking-wider">
                          DISK
                        </span>
                      </div>
                      <div
                        className="text-2xl font-bold text-yellow-400 font-mono tabular-nums"
                        style={{
                          textShadow: "0 0 10px rgba(255, 190, 11, 0.8)",
                        }}
                      >
                        {metrics.disk}%
                      </div>
                    </div>
                    <div className="relative h-2 bg-gray-900 rounded-full overflow-hidden">
                      <div
                        className="absolute h-full bg-gradient-to-r from-yellow-500 to-orange-500 transition-all duration-500"
                        style={{
                          width: `${metrics.disk}%`,
                          boxShadow: "0 0 10px rgba(255, 190, 11, 0.8)",
                        }}
                      ></div>
                    </div>
                    <div className="mt-2 text-xs text-gray-500 font-mono">
                      {metrics.disk > 85 ? (
                        <span className="text-red-400 flex items-center gap-1">
                          <AlertTriangle className="w-3 h-3" /> CRITICAL
                        </span>
                      ) : (
                        <span className="text-green-400">STATUS: OPTIMAL</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Network */}
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg blur opacity-30 group-hover:opacity-60 transition duration-300"></div>
                  <div className="relative border border-green-500/30 rounded-lg bg-black/80 backdrop-blur-xl p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Network className="w-5 h-5 text-green-400" />
                        <span className="text-green-400 font-mono text-sm uppercase tracking-wider">
                          NETWORK
                        </span>
                      </div>
                      <div
                        className="text-2xl font-bold text-green-400 font-mono tabular-nums"
                        style={{
                          textShadow: "0 0 10px rgba(34, 197, 94, 0.8)",
                        }}
                      >
                        {metrics.network}
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-sm font-mono">
                      <span className="text-cyan-400 flex items-center gap-1">
                        <Zap className="w-3 h-3" />↑{" "}
                        {Math.floor(metrics.network * 0.36)} MB/s
                      </span>
                      <span className="text-pink-400 flex items-center gap-1">
                        <Zap className="w-3 h-3" />↓{" "}
                        {Math.floor(metrics.network * 0.64)} MB/s
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 중앙: 실시간 차트 */}
              <div className="lg:col-span-2 space-y-6">
                {/* CPU & Memory 차트 */}
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 via-pink-500 to-yellow-500 rounded-lg blur opacity-20 group-hover:opacity-40 transition duration-300"></div>
                  <div className="relative border border-cyan-500/30 rounded-lg bg-black/80 backdrop-blur-xl p-6">
                    <h3 className="text-lg font-bold text-cyan-400 mb-4 font-mono uppercase tracking-widest flex items-center gap-2">
                      <Activity className="w-5 h-5" />
                      REAL-TIME SYSTEM METRICS
                    </h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <AreaChart data={chartData}>
                        <defs>
                          <linearGradient
                            id="colorCpu"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                          >
                            <stop
                              offset="5%"
                              stopColor="#00F0FF"
                              stopOpacity={0.8}
                            />
                            <stop
                              offset="95%"
                              stopColor="#00F0FF"
                              stopOpacity={0}
                            />
                          </linearGradient>
                          <linearGradient
                            id="colorMemory"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                          >
                            <stop
                              offset="5%"
                              stopColor="#FF006E"
                              stopOpacity={0.8}
                            />
                            <stop
                              offset="95%"
                              stopColor="#FF006E"
                              stopOpacity={0}
                            />
                          </linearGradient>
                        </defs>
                        <CartesianGrid
                          strokeDasharray="3 3"
                          stroke="#00F0FF"
                          opacity={0.1}
                        />
                        <XAxis
                          dataKey="time"
                          stroke="#00F0FF"
                          fontSize={10}
                          fontFamily="monospace"
                        />
                        <YAxis
                          stroke="#00F0FF"
                          fontSize={10}
                          fontFamily="monospace"
                        />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "#000000",
                            border: "1px solid #00F0FF",
                            borderRadius: "8px",
                            fontFamily: "monospace",
                          }}
                        />
                        <Area
                          type="monotone"
                          dataKey="cpu"
                          stroke="#00F0FF"
                          fillOpacity={1}
                          fill="url(#colorCpu)"
                          strokeWidth={2}
                          animationDuration={300}
                        />
                        <Area
                          type="monotone"
                          dataKey="memory"
                          stroke="#FF006E"
                          fillOpacity={1}
                          fill="url(#colorMemory)"
                          strokeWidth={2}
                          animationDuration={300}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                    <div className="flex items-center justify-center gap-6 mt-4">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-3 h-3 rounded-full bg-cyan-400"
                          style={{
                            boxShadow: "0 0 10px rgba(0, 240, 255, 0.8)",
                          }}
                        ></div>
                        <span className="text-xs text-cyan-400 font-mono">
                          CPU
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div
                          className="w-3 h-3 rounded-full bg-pink-400"
                          style={{
                            boxShadow: "0 0 10px rgba(255, 0, 110, 0.8)",
                          }}
                        ></div>
                        <span className="text-xs text-pink-400 font-mono">
                          MEMORY
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Network 차트 */}
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg blur opacity-20 group-hover:opacity-40 transition duration-300"></div>
                  <div className="relative border border-green-500/30 rounded-lg bg-black/80 backdrop-blur-xl p-6">
                    <h3 className="text-lg font-bold text-green-400 mb-4 font-mono uppercase tracking-widest flex items-center gap-2">
                      <Network className="w-5 h-5" />
                      NETWORK TRAFFIC
                    </h3>
                    <ResponsiveContainer width="100%" height={200}>
                      <LineChart data={chartData}>
                        <CartesianGrid
                          strokeDasharray="3 3"
                          stroke="#10B981"
                          opacity={0.1}
                        />
                        <XAxis
                          dataKey="time"
                          stroke="#10B981"
                          fontSize={10}
                          fontFamily="monospace"
                        />
                        <YAxis
                          stroke="#10B981"
                          fontSize={10}
                          fontFamily="monospace"
                        />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "#000000",
                            border: "1px solid #10B981",
                            borderRadius: "8px",
                            fontFamily: "monospace",
                          }}
                        />
                        <Line
                          type="monotone"
                          dataKey="network"
                          stroke="#10B981"
                          strokeWidth={3}
                          dot={false}
                          animationDuration={300}
                          style={{
                            filter:
                              "drop-shadow(0 0 8px rgba(16, 185, 129, 0.8))",
                          }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>

            {/* 하단 정보 */}
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 via-pink-500 to-yellow-500 rounded-lg blur opacity-20"></div>
              <div className="relative border border-cyan-500/30 rounded-lg bg-black/80 backdrop-blur-xl p-8">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-cyan-500/20 border border-cyan-500/50">
                    <Zap
                      className="w-6 h-6 text-cyan-400"
                      style={{
                        filter: "drop-shadow(0 0 10px rgba(0, 240, 255, 0.8))",
                      }}
                    />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-pink-400 to-yellow-400 mb-2 font-mono uppercase tracking-wider">
                      SYSTEM STATUS: OPERATIONAL
                    </h2>
                    <p className="text-gray-400 font-mono text-sm mb-4 leading-relaxed">
                      REAL-TIME INFRASTRUCTURE MONITORING SYSTEM v2.0 <br />
                      POWERED BY 3 YEARS OF DATACENTER OPERATIONS EXPERIENCE{" "}
                      <br />
                      KT NETWORK OPERATIONS CENTER 2019-2022 <br />
                      <span className="text-green-400">
                        ✓ BACKEND CONNECTED // SPRING BOOT API ACTIVE
                      </span>
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1.5 rounded-md bg-cyan-500/20 border border-cyan-500/50 text-cyan-400 text-xs font-mono uppercase">
                        ⚡ REAL-TIME
                      </span>
                      <span className="px-3 py-1.5 rounded-md bg-pink-500/20 border border-pink-500/50 text-pink-400 text-xs font-mono uppercase">
                        🎨 CYBERPUNK
                      </span>
                      <span className="px-3 py-1.5 rounded-md bg-yellow-500/20 border border-yellow-500/50 text-yellow-400 text-xs font-mono uppercase">
                        📊 LIVE CHARTS
                      </span>
                      <span className="px-3 py-1.5 rounded-md bg-green-500/20 border border-green-500/50 text-green-400 text-xs font-mono uppercase">
                        🔗 FULLSTACK
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
