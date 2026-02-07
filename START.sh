#!/bin/bash

# Japan Trip App - Auto-Start Script
# Startet Python HTTP Server + ngrok Tunnel

echo "🚀 Starting Japan Trip App..."

# 1. Kill alte Prozesse
pkill -f "python3.*http.server" 2>/dev/null
pkill -f ngrok 2>/dev/null
sleep 1

# 2. Starten: Python HTTP Server (Port 3000)
cd /home/micha/.openclaw/workspace/japan-trip-app
echo "📡 Starting Python HTTP Server on port 3000..."
python3 -m http.server 3000 --bind 0.0.0.0 > /tmp/http-server.log 2>&1 &
HTTP_PID=$!
echo "   HTTP Server PID: $HTTP_PID"

# 3. Starten: ngrok Tunnel
sleep 2
echo "🔗 Starting ngrok tunnel..."
ngrok http 3000 --authtoken 39MUnDAIY2guv17yj5qJDQv0XO3_3TRAHePhDgRtX1SCzkACS > /tmp/ngrok.log 2>&1 &
NGROK_PID=$!
echo "   ngrok PID: $NGROK_PID"

# 4. Zeige URL
sleep 3
echo ""
echo "✅ Services running!"
echo "📍 Local: http://localhost:3000"
echo "📍 VM: http://192.168.133.129:3000"
echo ""
echo "Getting public URL..."
PUBLIC_URL=$(curl -s http://localhost:4040/api/tunnels | grep -o '"public_url":"[^"]*"' | cut -d'"' -f4 | head -1)
echo "🌍 Public (ngrok): $PUBLIC_URL"
echo ""
echo "Logs:"
echo "  HTTP Server: tail -f /tmp/http-server.log"
echo "  ngrok: tail -f /tmp/ngrok.log"
