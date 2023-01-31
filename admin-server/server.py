# A small flask server to allow remote control of the main server

from os import getcwd
from os.path import join
from flask import Flask
import subprocess
import json

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
		return json.dumps({"msg": "Server already running"}), 200, {'Content-Type': 'application/json'}

	subprocess.run(["./start_server.sh"], cwd=scripts_folder)

	server_running = True
	print("Started server")
	return json.dumps({"msg": "Server started"}), 200, {'Content-Type': 'application/json'}

@app.route("/api/serverstop")
def serverstop():
	global server_running

	if not server_running:
		return json.dumps({"msg": "Server not running"}), 200, {'Content-Type': 'application/json'}

	subprocess.run(["./stop_server.sh"], cwd=scripts_folder)

	server_running = False
	print("Stopped server")
	return json.dumps({"msg": "Server stopped"}), 200, {'Content-Type': 'application/json'}

@app.route("/api/serverrunning")
def serverrunning():
	global server_running

	res = subprocess.run("screen -ls | grep scrapmap-main", shell=True, capture_output=True)

	# Return code 0 means grep did not fail, therefor the screen exists and the server is running
	server_running = res.returncode == 0

	return json.dumps({"running": server_running}), 200, {'Content-Type': 'application/json'}

# Start server
if __name__ == "__main__":
	app.run(host="0.0.0.0", port=3100, debug=False)
