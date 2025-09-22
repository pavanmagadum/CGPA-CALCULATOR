#!/usr/bin/env python3
"""
Simple HTTP Server for CGPA Calculator
Run this script to host the web application locally
"""

import http.server
import socketserver
import webbrowser
import os
import sys
from pathlib import Path

class CustomHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=os.path.dirname(os.path.abspath(__file__)), **kwargs)
    
    def end_headers(self):
        # Add CORS headers for better compatibility
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', '*')
        super().end_headers()

def find_free_port(start_port=8000, end_port=8100):
    """Find a free port in the given range"""
    import socket
    for port in range(start_port, end_port):
        try:
            with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
                s.bind(('localhost', port))
                return port
        except OSError:
            continue
    return None

def main():
    # Change to the directory containing this script
    script_dir = Path(__file__).parent
    os.chdir(script_dir)
    
    # Check if required files exist
    required_files = ['index.html', 'style.css', 'script.js']
    missing_files = [f for f in required_files if not Path(f).exists()]
    
    if missing_files:
        print(f"❌ Missing required files: {', '.join(missing_files)}")
        print("Please make sure all files are in the same directory as this server script.")
        sys.exit(1)
    
    # Find a free port
    port = find_free_port()
    if port is None:
        print("❌ Could not find a free port between 8000-8100")
        sys.exit(1)
    
    # Create server
    try:
        with socketserver.TCPServer(("localhost", port), CustomHTTPRequestHandler) as httpd:
            server_url = f"http://localhost:{port}"
            
            print("🎓 CGPA Calculator Web Server")
            print("=" * 50)
            print(f"✅ Server running at: {server_url}")
            print(f"✅ Directory: {script_dir}")
            print("=" * 50)
            print("📖 Instructions:")
            print("   • Open the URL above in your web browser")
            print("   • Or wait 2 seconds for auto-opening")
            print("   • Press Ctrl+C to stop the server")
            print("=" * 50)
            
            # Auto-open browser after 2 seconds
            import threading
            def open_browser():
                import time
                time.sleep(2)
                try:
                    webbrowser.open(server_url)
                    print(f"🌐 Opened {server_url} in your default browser")
                except Exception as e:
                    print(f"⚠️  Could not auto-open browser: {e}")
                    print(f"   Please manually open: {server_url}")
            
            browser_thread = threading.Thread(target=open_browser)
            browser_thread.daemon = True
            browser_thread.start()
            
            # Start server
            httpd.serve_forever()
            
    except KeyboardInterrupt:
        print("\n🛑 Server stopped by user")
    except Exception as e:
        print(f"❌ Server error: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()