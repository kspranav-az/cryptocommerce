Here's an updated version of the `README.md` with additional information about running the Node.js server and the `NodeMCU_Scripts` directory containing scripts for the RFID scanner and ultrasonic sensor:

---

# CryptoCommerce: A Blockchain-Based E-Commerce and Supply Chain Management Platform

CryptoCommerce is a decentralized e-commerce platform built on blockchain technology, providing a secure and transparent supply chain management system. The platform enables real-time tracking of products from the seller to the buyer, ensuring authenticity, security, and efficiency. It integrates blockchain to maintain an immutable record of transactions and supply chain events, promoting transparency and trust among all stakeholders.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Architecture](#architecture)
- [Smart Contracts](#smart-contracts)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Deployment](#deployment)
  - [Running Tests](#running-tests)
- [Running the Node.js Server](#running-the-nodejs-server)
- [NodeMCU Scripts](#nodemcu-scripts)
- [Usage](#usage)
  - [Product Management](#product-management)
  - [Order Management](#order-management)
  - [Crate Management](#crate-management)
  - [Location Tracking](#location-tracking)
  - [Financial Management](#financial-management)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Introduction

CryptoCommerce aims to revolutionize the traditional e-commerce and supply chain management systems by leveraging blockchain technology. It ensures a secure, transparent, and traceable flow of goods from sellers to buyers. The platform not only focuses on e-commerce but also provides comprehensive supply chain management solutions, offering regular updates and real-time visibility into the movement of goods.

## Features

- **Decentralized E-Commerce Platform**: Facilitates secure transactions between buyers and sellers using blockchain.
- **Secure Supply Chain Management**: Tracks product movements from warehouses to buyers, ensuring authenticity and security.
- **Transparency and Traceability**: Immutable records of all supply chain events, accessible to all stakeholders.
- **Real-Time Updates**: Regular updates on the status and location of products in the supply chain.
- **Product Authenticity**: Each product is uniquely identified and tracked throughout its lifecycle.

## Architecture

CryptoCommerce uses a smart contract-based architecture for secure and transparent management of the supply chain. Key components include:

- **Blockchain Network**: For storing immutable records of transactions and supply chain events.
- **Smart Contracts**: Implement core functionalities such as product management, order processing, crate management, location tracking, and financial management.
- **Frontend (Next.js)**: User-friendly interface for buyers, sellers, and administrators to interact with the platform.
- **RFID/Barcode Integration**: For seamless tracking and identification of products in the supply chain.

## Smart Contracts

The platform consists of several smart contracts, each responsible for a specific function:

1. **Product Management**: Manages product creation, updates, and stock management.
2. **Order Management**: Handles order placement, status updates, and retrieval of user orders.
3. **Crate Management**: Manages crate creation, delivery, and the contents within each crate.
4. **Location Tracking**: Updates and retrieves the geographical location of crates in the supply chain.
5. **Financial Management**: Manages payments, refunds, and withdrawal of funds by the owner.

## Getting Started

### Prerequisites

- Node.js and npm
- Hardhat (for local Ethereum development)
- Metamask or any other Ethereum wallet
- Git

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/cryptocommerce.git
   cd cryptocommerce
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

### Deployment

1. Compile the smart contracts:

   ```bash
   npx hardhat compile
   ```

2. Deploy the smart contracts to a local network:

   ```bash
   npx hardhat run scripts/deploy.js --network localhost
   ```

3. Deploy to a test network (e.g., Ropsten):

   ```bash
   npx hardhat run scripts/deploy.js --network ropsten
   ```

### Running Tests

Run the smart contract tests to ensure everything is working correctly:

```bash
npx hardhat test
```

## Running the Node.js Server

To start the Node.js server for handling API requests and interacting with the blockchain network:

1. Navigate to the `server` directory:

   ```bash
   cd server
   ```

2. Install server dependencies:

   ```bash
   npm install
   ```

3. Start the server:

   ```bash
   npm start
   ```

   The server will start on the default port (e.g., `http://localhost:3000`). You can modify the port and other configurations in the `.env` file located in the `server` directory.

## NodeMCU Scripts

The `NodeMCU_Scripts` directory contains the scripts required for integrating the NodeMCU device with the platform. The scripts include functionalities for:

1. **RFID Scanner**: Scans RFID tags and sends the data to the blockchain for verification and tracking.
2. **Ultrasonic Sensor**: Monitors the distance and sends real-time updates about crate movements and location tracking.

### Setting Up NodeMCU

1. Connect the NodeMCU to your system.
2. Flash the scripts from the `NodeMCU_Scripts` directory to the NodeMCU using the Arduino IDE or PlatformIO.
3. Configure the Wi-Fi credentials and server URL in the script to enable communication with the Node.js server.

## Usage

### Product Management

- **Create Product**: Add new products to the platform, specifying details such as name, category, price, and initial stock.
- **Update Stock**: Modify the available stock for a product.

### Order Management

- **Place Order**: Customers can place orders by specifying the product ID and quantity.
- **Retrieve Orders**: View all orders placed by a specific user.

### Crate Management

- **Create Crate**: Group multiple products into a crate for efficient shipping and tracking.
- **Deliver Crate**: Mark a crate as delivered and update the status of all contained items.

### Location Tracking

- **Update Location**: Update the geographical location of a crate at any point in the supply chain.
- **Get Location History**: Retrieve the historical locations of a specific crate.

### Financial Management

- **Withdraw Funds**: The owner can withdraw accumulated funds from the smart contract.

## Contributing

We welcome contributions from the community! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Commit your changes with a descriptive message.
4. Open a pull request against the main branch.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For any queries or suggestions, feel free to contact the project maintainers:

- **Pranav Dutthan K S**: [pranavdutthan.ks2022@vitstudent.ac.in](mailto:pranavdutthan.ks2022@vitstudent.ac.in)
- GitHub: [kspranav-az](https://github.com/kspranav-az)

---
