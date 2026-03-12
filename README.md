# AssetOracle-Hedera
Real-world asset tokenization platform using Hedera for trustless verification and fractional ownership.
Trustless Real-World Asset Tokenization on Hedera
Built for**Hedera Hello Future Apex Hackathon 2026** - DeFi & Tokenization Track

## Problem Statement

The $300 trillion real estate market suffers from:
- Centralized verification systems prone to fraud
- High barriers to entry (properties cost hundreds of thousands)
- Lack of liquidity for asset owners
- No trustless verification for cross-border investments

## Solution

AssetOracle leverages **Hedera's** high-throughput, low-fee network to provide:

**Trustless Verification** - Decentralized consensus validation of real-world assets
**Fractional Tokenization** - HTS tokens representing property ownership
**AI-Powered Analysis** - Automated fraud detection and investment scoring
**Instant Settlement** - Sub-second finality on Hedera
 **Low Cost** - $0.0001 transaction fees vs $50+ on Ethereum

## Architecture
```
┌─────────────────────────────────────────────────────┐
│                   Frontend (React)                   │
│              Hedera Wallet Integration               │
└─────────────────┬───────────────────────────────────┘
                  │
┌─────────────────▼───────────────────────────────────┐
│              Backend API (Express.js)                │
│  • Asset Registration  • User Management             │
│  • Verification Workflow  • Portfolio Tracking       │
└─────────┬───────────────────────┬───────────────────┘
          │                       │
┌─────────▼──────────┐  ┌────────▼─────────────────┐
│   AI Service        │  │  Hedera Smart Contracts  │
│   (Groq LLM)        │  │  • HTS Tokenization      │
│   • Fraud Detection │  │  • NFT Certificates      │
│   • Risk Scoring    │  │  • Verification Registry │
└─────────────────────┘  └──────────────────────────┘
```

## Hedera Integration

### **Why Hedera?**

1. **High Throughput** - 10,000+ TPS enables real-time verification
2. **Low Fees** - $0.0001 per transaction makes fractional ownership viable
3. **Fast Finality** - 3-5 second consensus for instant verification
4. **Native Tokenization** - HTS eliminates need for custom ERC-20 contracts
5. **Enterprise Grade** - ABFT consensus perfect for high-value RWAs

### **Hedera Services Used:**

- **Hedera Token Service (HTS)** - Fractional property tokens
- **Hedera Consensus Service (HCS)** - Verification audit trail
- **Smart Contracts** - Verification logic and ownership registry
- **Hedera SDKs** - JavaScript/TypeScript integration

## Quick Start

### Prerequisites
- Node.js 18+
- Hedera testnet account
- PostgreSQL database

### Backend
```bash
cd backend
npm install
cp .env.example .env
# Configure Hedera credentials
npm run dev
```

### Frontend
```bash
cd frontend
bun install
bun run dev
```

### AI Service
```bash
cd ai-service
pip install -r requirements.txt
python api.py
```

## Features

### Completed
- [x] Complete backend API (20+ endpoints)
- [x] AI-powered fraud detection
- [x] Property verification workflow
- [x] User portfolio management
- [x] File upload system
- [x] React frontend with wallet connection

### Hedera Migration (In Progress)
- [ ] HTS token creation for fractional ownership
- [ ] HCS topic for verification audit trail
- [ ] Smart contract deployment to Hedera testnet
- [ ] HashConnect wallet integration
- [ ] Hedera SDK integration in backend

## Hackathon Track Alignment

**Theme 2: DeFi & Tokenization**

AssetOracle demonstrates:
1. **Tokenized Real-World Assets** - Properties → HTS tokens
2. **Composable Systems** - Modular architecture (API, AI, Contracts)
3. **High Throughput** - Hedera enables real-time verification
4. **Low Fees** - Makes fractional ownership economically viable
5. **Programmable Finance** - Smart contracts automate verification

## Repository Structure
```
├── backend/          # Express.js API
├── frontend/         # React + TypeScript UI
├── contracts/        # Hedera smart contracts
├── ai-service/       # AI fraud detection
└── docs/            # Documentation
```

## Links

- **Live Demo**: [Coming Soon]
- **API Docs**: [Coming Soon]
- **Video Demo**: [Coming Soon]

## 👥 Team

Built by Asset-Oracle team for Hedera Hello Future Apex Hackathon 2026

