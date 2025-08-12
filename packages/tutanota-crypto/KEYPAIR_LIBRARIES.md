# Antwort: Welche Library wird hier genutzt um Keypairs zu erstellen?

Die Tutanota Kryptographie verwendet **mehrere spezialisierte Bibliotheken** für die Erstellung verschiedener Schlüsselpaar-Typen:

## Übersicht der verwendeten Bibliotheken

### 1. **noble-curves** (v1.3.0)
- **Für**: X25519 Schlüsselpaare (ECDH Key Agreement)
- **Datei**: `lib/internal/noble-curves-1.3.0.js`
- **Funktion**: `generateX25519KeyPair()`

### 2. **ed25519-dalek** (Rust Crate v2.1.1) 
- **Für**: Ed25519 Schlüsselpaare (Digitale Signaturen)
- **Implementierung**: WebAssembly aus Rust-Code
- **Quelle**: `../../tuta-sdk/rust/crypto-primitives/`
- **Funktion**: `generateEd25519KeyPair()`

### 3. **crypto-jsbn** (2012-08-09)
- **Für**: RSA Schlüsselpaare (2048-bit)
- **Datei**: `lib/internal/crypto-jsbn-2012-08-09_1.js`
- **Verwendung**: Legacy-Unterstützung für RSA

### 4. **liboqs** (Open Quantum Safe)
- **Für**: Kyber/ML-KEM-1024 (Post-Quantum Kryptographie)
- **Implementierung**: WebAssembly aus C-Code
- **Funktion**: `generateKeyPairKyber()`

## Warum verschiedene Bibliotheken?

Jede Bibliothek ist speziell für bestimmte kryptographische Algorithmen optimiert:

- **X25519**: Schnelle, moderne elliptische Kurven
- **Ed25519**: Sichere digitale Signaturen
- **RSA**: Rückwärtskompatibilität
- **Kyber**: Zukunftssicher gegen Quantencomputer

## Alle Exports verfügbar in:
- `lib/index.ts` - Hauptexport-Datei
- Siehe Dokumentation in `/doc/CRYPTO_LIBRARIES_KEYPAIRS.md`