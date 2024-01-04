## Installing NVM (Node Version Manager)

### Step 1: Download and Install NVM

To install NVM, you can download and execute the NVM installation script:

```
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
```

### Step 2: Load NVM

After installation, load NVM into your current shell session:

```
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
```

### Step 3: List Available Node.js Versions

List all available Node.js versions to choose from:

```
nvm ls-remote
```

### Step 4: Install a Specific Node.js Version

Install a specific Node.js version using the following command:

```
nvm install <version>
```

### Step 5: Use a Specific Node.js Version

Switch to a specific Node.js version that you installed:

```
nvm use <version>
```