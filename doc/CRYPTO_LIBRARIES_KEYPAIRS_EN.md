# Cryptographic Libraries for Keypair Generation in Tutanota

**Question**: Which library is used here to create keypairs?

**Answer**: Tutanota uses various cryptographic libraries for creating different types of key pairs:

## 1. X25519 Key Pairs (Elliptic Curve Diffie-Hellman)
- **Library**: `noble-curves` version 1.3.0
- **File**: `/packages/tutanota-crypto/lib/internal/noble-curves-1.3.0.js`
- **Usage**: Key agreement and ECDH operations
- **Function**: `generateX25519KeyPair()`
- **Implementation**: `/packages/tutanota-crypto/lib/encryption/X25519.ts`

## 2. Ed25519 Key Pairs (Digital Signatures)
- **Library**: Custom WebAssembly implementation based on Rust
- **Rust Crate**: `ed25519-dalek` version 2.1.1
- **WASM Source**: `/tuta-sdk/rust/crypto-primitives/`
- **Usage**: Digital signatures
- **Functions**: 
  - `ed25519_generate_keypair`
  - `ed25519_sign`
  - `ed25519_verify`
- **Implementation**: `/packages/tutanota-crypto/lib/encryption/Ed25519.ts`

## 3. RSA Key Pairs
- **Library**: `crypto-jsbn` (JavaScript BigNumber Library)
- **Version**: 2012-08-09
- **File**: `/packages/tutanota-crypto/lib/internal/crypto-jsbn-2012-08-09_1.js`
- **Usage**: RSA 2048-bit keys with public exponent 65537
- **Implementation**: `/packages/tutanota-crypto/lib/encryption/Rsa.ts`

## 4. Kyber/Post-Quantum Key Pairs (ML-KEM-1024)
- **Library**: `liboqs` (Open Quantum Safe) as WebAssembly
- **Algorithm**: ML-KEM-1024 (formerly Kyber-1024)
- **Usage**: Post-quantum cryptography
- **Functions**:
  - `generateKeyPairKyber`
  - `encapsulateKyber` 
  - `decapsulateKyber`
- **Implementation**: `/packages/tutanota-crypto/lib/encryption/Liboqs/Kyber.ts`

## 5. Additional Cryptographic Libraries
- **bCrypt**: `/packages/tutanota-crypto/lib/internal/bCrypt.js` for password hashing
- **SJCL**: `/packages/tutanota-crypto/lib/internal/sjcl.js` (Stanford JavaScript Crypto Library)

## Summary

Tutanota doesn't use a single library for all key pairs, but instead employs various specialized libraries:

1. **noble-curves** for modern elliptic curves (X25519)
2. **ed25519-dalek** (via WebAssembly) for Ed25519 signatures
3. **crypto-jsbn** for RSA operations
4. **liboqs** (via WebAssembly) for post-quantum cryptography

This architecture allows Tutanota to support various cryptographic algorithms and implement both classical and post-quantum secure methods.

## Technical Details

- **Main module**: `/packages/tutanota-crypto/`
- **Export file**: `/packages/tutanota-crypto/lib/index.ts`
- **WebAssembly build**: Rust code is compiled with `wasm-pack`
- **Configuration**: See `/packages/tutanota-crypto/package.json`

The different key types are exported through unified TypeScript interfaces and can be used as needed based on requirements.

## Key Generation Functions

### X25519 (Key Agreement)
```typescript
export function generateX25519KeyPair(): X25519KeyPair
```

### Ed25519 (Digital Signatures)
```typescript  
export function generateEd25519KeyPair(): Ed25519KeyPair
```

### RSA (Asymmetric Encryption)
Uses internal `crypto-jsbn` library with 2048-bit keys.

### Kyber (Post-Quantum)
```typescript
export function generateKeyPair(kyberWasm: LibOQSExports, randomizer: Randomizer): KyberKeyPair
```

## Library Dependencies

The crypto libraries are bundled internally to ensure:
- **Security**: Known versions without external dependencies
- **Performance**: Optimized for web environments
- **Compatibility**: Works across different platforms and browsers
- **Control**: Full control over cryptographic implementations