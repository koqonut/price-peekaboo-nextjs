# Install nvm (Node Version Manager)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

# Restart your terminal or source your profile
source ~/.zshrc  # or ~/.bashrc depending on your shell

# Install Node.js (LTS version)
nvm install --lts

# Verify installation
node -v
npm -v