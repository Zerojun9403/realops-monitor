"use client";

import { useEffect, useRef, useState } from "react";

interface Metrics {
  cpu: number;
  memory: number;
  disk: number;
  network: number;
  timestamp: number;
}

export function useWebSocket(url: string) {
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const connect = () => {
      try {
        const ws = new WebSocket(url);
        wsRef.current = ws;

        ws.onopen = () => {
          console.log("✅ WebSocket Connected");
          setIsConnected(true);
          setError(null);
        };

        ws.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);
            setMetrics(data);
          } catch (err) {
            console.error("❌ Failed to parse message:", err);
          }
        };

        ws.onerror = (event) => {
          console.error("❌ WebSocket Error:", event);
          setError("WebSocket connection error");
        };

        ws.onclose = () => {
          console.log("🔌 WebSocket Disconnected");
          setIsConnected(false);

          reconnectTimeoutRef.current = setTimeout(() => {
            console.log("🔄 Attempting to reconnect...");
            connect();
          }, 3000);
        };
      } catch (err) {
        console.error("❌ Failed to connect:", err);
        setError("Failed to connect to WebSocket");
      }
    };

    connect();

    return () => {
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [url]);

  return { metrics, isConnected, error };
}
