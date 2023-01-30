# A small flask server to allow remote control of the main server

from os import getcwd
from os.path import join
from flask import Flask
import subprocess

app = Flask(__name__)

pagef = open('index.html', 'r')
page = pagef.read()
pagef.close()

scripts_folder = join(getcwd(), "scripts/")

server_running = False

@app.route("/")
def index_page():
	return page, 200, {'Content-Type': 'text/html'}

@app.route("/api/serverstart")
def serverstart():
	global server_running

	if server_running:
		return "Server already running", 200, {'Content-Type': 'text/html'}

	subprocess.run(["./start_server.sh"], cwd=scripts_folder)

	server_running = True
	print("Started server")
	return "Server started", 200, {'Content-Type': 'text/html'}

@app.route("/api/serverstop")
def serverstop():
	global server_running

	if not server_running:
		return "Server not running", 200, {'Content-Type': 'text/html'}

	subprocess.run(["./stop_server.sh"], cwd=scripts_folder)

	server_running = False
	print("Stopped server")
	return "Server stopped", 200, {'Content-Type': 'text/html'}

@app.route("/api/serverrunning")
def serverrunning():
	global server_running

	res = subprocess.run("screen -ls | grep scrapmap-main", shell=True, capture_output=True)

	# Return code 0 means grep did not fail, therefor the screen exists and the server is running
	server_running = res.returncode == 0

	if server_running:
		return "1", 200, {'Content-Type': 'text/plain'}
	else:
		return "0", 200, {'Content-Type': 'text/plain'}

# Start server
if __name__ == "__main__":
	app.run(host="0.0.0.0", port=3100, debug=False)
