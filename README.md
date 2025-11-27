# Code Challenge Solutions

A collection of coding challenges demonstrating algorithmic thinking, modern web development, and code optimization skills.

## 📁 Project Structure

```
challenge/
├── problem1/          # Algorithm Implementation
├── problem2/          # React Token Swap Interface
└── problem3/          # Code Refactoring & Optimization
```

---

## Problem 1: Sum to N - Algorithm Implementations

**Task**: Implement three different approaches to calculate the sum of integers from 1 to n.

### Solutions Provided

- **Method A**: Mathematical formula using `n * (n+1) / 2` - O(1) time complexity
- **Method B**: Iterative loop approach - O(n) time complexity  
- **Method C**: Recursive solution - O(n) time complexity

**Location**: `/problem1/index.js`

---

## Problem 2: Token Swap Interface

**Task**: Build a modern, functional token swap application with React and TypeScript.

### Features

- 🔄 Token swapping functionality with real-time validation
- 💰 Balance and price tracking
- 🎨 Modern UI with responsive design
- ⚡ Built with Vite for optimal performance
- 🎯 Custom hooks for swap actions and validation
- 📱 Toast notifications for user feedback

### Tech Stack

- React 18 + TypeScript
- Vite
- TailwindCSS/PostCSS
- Custom state management

**Live Demo**: [https://code-interview-ochre.vercel.app/](https://code-interview-ochre.vercel.app/)

**Location**: `/problem2/`

### Running Locally

```bash
cd problem2
yarn install
yarn dev
```

---

## Problem 3: Code Optimization Challenge

**Task**: Identify and fix code smells, bugs, and performance issues in a React WalletPage component.

### Issues Identified & Fixed (13 Total)

#### Critical Bugs
- Undefined variable reference causing runtime errors
- Inverted filter logic keeping zero/negative balances

#### Type Safety
- Missing interface properties
- Eliminated `any` types with proper TypeScript unions

#### Performance Optimizations
- Reduced array iterations from 3 to 2
- Added proper React memoization with `useMemo`
- Fixed unnecessary dependency in useMemo hooks

#### Code Quality
- Removed DRY violations and code duplication
- Fixed React anti-patterns (index as key)
- Simplified complex conditional logic
- Removed unused variables and redundant interfaces

**Location**: `/problem3/`  
**Documentation**: See `OPTIMIZATION_SUMMARY.md` for detailed analysis

---

## 🚀 Quick Start

Each problem is self-contained in its respective directory. Navigate to the specific problem folder to view the implementation or run the application.

---

## 💡 Key Takeaways

- **Problem 1**: Understanding time/space complexity tradeoffs
- **Problem 2**: Building production-ready React applications with modern tooling
- **Problem 3**: Identifying and resolving real-world code issues for better performance and maintainability

---

**Author**: Challenge Submission  
**Last Updated**: November 2025

