- **Download and Install NVM:**
	```bash
	wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
	```

- **Load NVM:** Load NVM into your current shell session:
	```bash
	export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
	[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
	```

- **List Available Node.js Versions:**
	```bash
	nvm ls-remote
	```

- **Install a Specific Node.js Version:** 

	```bash
	nvm install <version>
	```

	Replace `<version>` with the Node.js version number you want to install (e.g., `14.17.0`).

- **Use a Specific Node.js Version:** Switch to a specific Node.js version that you installed:
	```bash
	nvm use <version>
	```

	Replace `<version>` with the Node.js version number you want to use (e.g., `14.17.0`).