# Configuration, override port with usage: make PORT=4200
PORT ?= 4400
REPO_NAME ?= platformer3x
LOG_FILE = /tmp/server$(PORT).log

SHELL = /bin/bash -c
.SHELLFLAGS = -e # Exceptions will stop make, works on MacOS

# Phony Targets, makefile housekeeping for below definitions
.PHONY: default server clean stop

# Default target
default: server
	@echo "Terminal logging starting, watching server..."
	@(tail -f $(LOG_FILE) | awk '/Server address: http:\/\/127.0.0.1:$(PORT)/ { serverReady=1 } \
	serverReady { \
		print "Server started at http://127.0.0.1:$(PORT)"; \
		exit 0; \
	}') 2>/dev/null &
	@for ((COUNTER = 0; ; COUNTER++)); do \
		if grep -q "Serving HTTP" $(LOG_FILE); then \
			echo "Server started in $$COUNTER seconds"; \
			echo "Server address: http://127.0.0.1:$(PORT)/$(REPO_NAME)/"; \
			break; \
		fi; \
		if [ $$COUNTER -eq 60 ]; then \
			echo "Server timed out after $$COUNTER seconds."; \
			echo "Review errors from $(LOG_FILE)."; \
			cat $(LOG_FILE); \
			exit 1; \
		fi; \
		sleep 1; \
	done
	@sed '$$d' $(LOG_FILE)

# Start the local web server
server: stop
	@echo "Starting server..."
	@@nohup python3 -m http.server $(PORT) > $(LOG_FILE) 2>&1 & \
		PID=$$!; \
		echo "Server PID: $$PID"
	@@until [ -f $(LOG_FILE) ]; do sleep 1; done
	@echo "Server address: http://127.0.0.1:$(PORT)/$(REPO_NAME)/" >> $(LOG_FILE)

# Clean up project derived files, to avoid run issues stop is dependency
clean: stop
	@echo "Cleaning up..."
	@rm -rf _site

# Stop the server and kill processes
stop:
	@echo "Stopping server..."
	@@lsof -ti :$(PORT) | xargs kill >/dev/null 2>&1 || true
	@echo "Stopping logging process..."
	@@ps aux | awk -v log_file=$(LOG_FILE) '$$0 ~ "tail -f " log_file { print $$2 }' | xargs kill >/dev/null 2>&1 || true
	@rm -f $(LOG_FILE)
