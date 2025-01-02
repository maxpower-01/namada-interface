# 🟡 Namadillo

## About

**Namadillo** is a Web App built using [React](https://react.dev), designed to work hand-in-hand with the [Namada Browser Extension](https://github.com/anoma/namada-interface/tree/main/apps/extension).

It provides a user-friendly interface for interacting with the [Namada](https://github.com/anoma/namada) network, with development progressing in step with the phases outlined in the [Namada Roadmap](https://namada.net/mainnet-launch).

## Contribution

**Contributions are always welcome!** If you're interested in getting involved, please start by reading through our [CONTRIBUTING](https://github.com/anoma/namada-interface/blob/main/CONTRIBUTING.md) file. 

# 🚀 Usage

If you'd like to host Namadillo, there are multiple setup options available. This guide will walk you through the steps to set up and run the project. You can choose to run Namadillo either with Docker or without it, depending on your preference and environment.

## Configuration

When the user accesses Namadillo, the interface prompts them to enter valid Namada URLs for the RPC, [Indexer](https://github.com/anoma/namada-indexer), and [MASP Indexer](https://github.com/anoma/namada-masp-indexer) services. You can preconfigure these values to simplify the process for the user. 

**For publicly available infrastructure services, refer to the  [Namada Ecosystem Repository](https://github.com/Luminara-Hub/namada-ecosystem/tree/main/user-and-dev-tools/mainnet). Verify the configured URLs are valid and publicly accessible to ensure proper functionality. Invalid URLs, such as local IP addresses or those requiring VPN access, may prevent Namadillo from working correctly.**

Preconfiguration can be set up based on how you choose to run Namadillo by editing the appropriate configuration file outlined in the table.

| Docker | Self-Hosted |
|-|-|
| `apps/namadillo/docker/docker-compose.yml` | `apps/namadillo/public/config.toml` |

**Example:**
```
indexer_url = "https://<namada-indexer>:5001"
rpc_url = "https://<rpc>:26657"
masp_indexer_url = "https://<namada-masp-indexer>:5000"
localnet_enabled = false
```

Your selected RPC service should include the following ngnix configuration. Without this setup, the interface may fail to sync properly.

```
add_header Access-Control-Allow-Origin *;
add_header Access-Control-Max-Age 3600;
add_header Access-Control-Expose-Headers Content-Length;
```

## 🐳 Docker Deployment 

### Prerequisites

Before starting, ensure you have the necessary tools and dependencies installed. Below are the steps to set up the required environment.

- **Packages**: Install prerequisite packages from the APT repository.

```sh
apt-get install -y curl apt-transport-https ca-certificates software-properties-common git nano build-essential
```

- **Docker**: Follow the official instructions provided by Docker to install it: [Install Docker Engine](https://docs.docker.com/engine/install/).

### Usage

Ensure you have the latest repository cloned to maintain compatibility with other Namada interfaces. Use the following commands to clone the repository and navigate into its directory.

```sh
# Clone this repository, copy the URL from the Code button above.
git clone <copied-url>
cd <repository-name>
```

Modifiy the `docker/namadillo/docker-compose.yml` with your required enviroment varibvales, described in teh configraution chapter. 

Once the file is updated, build the Docker containers for the project. To build the Docker image, execute the following command from the monorepo root (`namada-interface`).

Modify the `docker/namadillo/docker-compose.yml` file to include your required environment variables, as described in the configuration section.

```sh
docker compose -f docker/namadillo/docker-compose.yml build
```

Launch the Namadillo interface containers with the appropriate naming convention for the Namada ecosystem.

```sh
# Start the Docker containers in the foreground, displaying logs and keeping the terminal active until stopped.
docker compose -p namada-interface -f docker/namadillo/docker-compose.yml up

# Start the Docker containers in detached mode, running them in the background without displaying logs.
docker compose -p namada-interface -f docker/namadillo/docker-compose.yml up -d
```

Namadillo is a single-page application, so all paths must be redirected to the `index.html` file. For [ngnix](https://nginx.org/en/) users, refer to the example configuration `docker/namadillo/docker-compose.yml` for proper setup.


## 🖥️ Self-Hosted Deployment

Use the following commands to set up your environment.

```sh
# Install project dependencies
yarn

# Build WebAssembly dependencies (for using SDK Query)
yarn wasm:build

# Build WebAssembly dependencies with debugging enabled
yarn wasm:build:dev

# Start the application in development mode
yarn dev

# Proxy RPC requests if running chains locally
yarn dev:proxy

# Build a production-ready release
yarn build

# Run ESLint to check for code issues
yarn lint

# Automatically fix ESLint issues
yarn lint:fix

# Execute test suites
yarn test
```

You can edit RPC, Indexer and MASP Indexer URLs, with the `apps/namadillo/public/config.toml` as a base, and specify the values you wish to override.