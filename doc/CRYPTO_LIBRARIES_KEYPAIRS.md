# Crypto-Bibliotheken für Schlüsselpaar-Erstellung in Tutanota

**Frage**: Welche Library wird hier genutzt um Keypairs zu erstellen?

**Antwort**: Tutanota nutzt verschiedene Kryptographie-Bibliotheken für die Erstellung unterschiedlicher Arten von Schlüsselpaaren:

## 1. X25519 Schlüsselpaare (Elliptic Curve Diffie-Hellman)
- **Bibliothek**: `noble-curves` Version 1.3.0
- **Datei**: `/packages/tutanota-crypto/lib/internal/noble-curves-1.3.0.js`
- **Verwendung**: Für Schlüsselvereinbarung (Key Agreement) und ECDH
- **Funktion**: `generateX25519KeyPair()`
- **Implementierung**: `/packages/tutanota-crypto/lib/encryption/X25519.ts`

## 2. Ed25519 Schlüsselpaare (Digitale Signaturen)
- **Bibliothek**: Custom WebAssembly Implementation basierend auf Rust
- **Rust Crate**: `ed25519-dalek` Version 2.1.1
- **WASM Quelle**: `/tuta-sdk/rust/crypto-primitives/`
- **Verwendung**: Für digitale Signaturen
- **Funktionen**: 
  - `ed25519_generate_keypair`
  - `ed25519_sign`
  - `ed25519_verify`
- **Implementierung**: `/packages/tutanota-crypto/lib/encryption/Ed25519.ts`

## 3. RSA Schlüsselpaare
- **Bibliothek**: `crypto-jsbn` (JavaScript BigNumber Library)
- **Version**: 2012-08-09
- **Datei**: `/packages/tutanota-crypto/lib/internal/crypto-jsbn-2012-08-09_1.js`
- **Verwendung**: RSA 2048-bit Schlüssel mit öffentlichem Exponent 65537
- **Implementierung**: `/packages/tutanota-crypto/lib/encryption/Rsa.ts`

## 4. Kyber/Post-Quantum Schlüsselpaare (ML-KEM-1024)
- **Bibliothek**: `liboqs` (Open Quantum Safe) als WebAssembly
- **Algorithmus**: ML-KEM-1024 (früher Kyber-1024)
- **Verwendung**: Post-Quantum Kryptographie
- **Funktionen**:
  - `generateKeyPairKyber`
  - `encapsulateKyber` 
  - `decapsulateKyber`
- **Implementierung**: `/packages/tutanota-crypto/lib/encryption/Liboqs/Kyber.ts`

## 5. Zusätzliche Kryptographie-Bibliotheken
- **bCrypt**: `/packages/tutanota-crypto/lib/internal/bCrypt.js` für Password-Hashing
- **SJCL**: `/packages/tutanota-crypto/lib/internal/sjcl.js` (Stanford JavaScript Crypto Library)

## Zusammenfassung

Tutanota verwendet keine einzelne Bibliothek für alle Schlüsselpaare, sondern setzt auf verschiedene spezialisierte Bibliotheken:

1. **noble-curves** für moderne elliptische Kurven (X25519)
2. **ed25519-dalek** (via WebAssembly) für Ed25519 Signaturen
3. **crypto-jsbn** für RSA-Operationen
4. **liboqs** (via WebAssembly) für Post-Quantum Kryptographie

Diese Architektur ermöglicht es Tutanota, verschiedene kryptographische Algorithmen zu unterstützen und sowohl klassische als auch Post-Quantum-sichere Verfahren zu implementieren.

## Technische Details

- **Hauptmodul**: `/packages/tutanota-crypto/`
- **Export-Datei**: `/packages/tutanota-crypto/lib/index.ts`
- **WebAssembly Build**: Rust-Code wird mit `wasm-pack` kompiliert
- **Konfiguration**: Siehe `/packages/tutanota-crypto/package.json`

Die verschiedenen Schlüsseltypen werden über einheitliche TypeScript-Interfaces exportiert und können je nach Anforderung verwendet werden.