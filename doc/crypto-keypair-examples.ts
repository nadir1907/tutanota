/**
 * Code examples demonstrating keypair generation in Tutanota
 * 
 * This file shows how different cryptographic libraries are used
 * to generate various types of key pairs in the Tutanota crypto system.
 */

// Import statements from tutanota-crypto package
import { 
    generateX25519KeyPair, 
    generateEd25519KeyPair,
    generateKeyPairKyber,
    initEd25519,
    type X25519KeyPair,
    type Ed25519KeyPair,
    type KyberKeyPair,
    type LibOQSExports
} from '@tutao/tutanota-crypto'
import { random } from '@tutao/tutanota-crypto'

/**
 * Example 1: X25519 Key Pair Generation
 * Library: noble-curves v1.3.0
 * Use case: Key agreement (ECDH)
 */
function generateX25519Example(): X25519KeyPair {
    // Uses noble-curves library internally
    const keyPair = generateX25519KeyPair()
    
    console.log('X25519 Key Pair generated:')
    console.log('Public key length:', keyPair.publicKey.length, 'bytes')
    console.log('Private key length:', keyPair.privateKey.length, 'bytes')
    
    return keyPair
}

/**
 * Example 2: Ed25519 Key Pair Generation  
 * Library: ed25519-dalek (Rust) compiled to WebAssembly
 * Use case: Digital signatures
 */
async function generateEd25519Example(wasmSrc: BufferSource): Promise<Ed25519KeyPair> {
    // Initialize the WebAssembly module first
    await initEd25519(wasmSrc)
    
    // Generate Ed25519 key pair using Rust/WASM implementation
    const keyPair = generateEd25519KeyPair()
    
    console.log('Ed25519 Key Pair generated:')
    console.log('Public key:', keyPair.publicKey)
    console.log('Private key:', keyPair.privateKey)
    
    return keyPair
}

/**
 * Example 3: Kyber Key Pair Generation
 * Library: liboqs (Open Quantum Safe) compiled to WebAssembly  
 * Use case: Post-quantum key encapsulation
 */
function generateKyberExample(kyberWasm: LibOQSExports): KyberKeyPair {
    // Generate ML-KEM-1024 (Kyber) key pair for post-quantum cryptography
    const keyPair = generateKeyPairKyber(kyberWasm, random)
    
    console.log('Kyber Key Pair generated:')
    console.log('Public key length:', keyPair.publicKey.raw.length, 'bytes')
    console.log('Private key length:', keyPair.privateKey.raw.length, 'bytes')
    
    return keyPair
}

/**
 * Example 4: RSA Key Pair Generation
 * Library: crypto-jsbn (2012-08-09)
 * Use case: Asymmetric encryption (legacy support)
 * 
 * Note: RSA key generation is handled internally by the crypto-jsbn library
 * and is typically used for backward compatibility with older Tutanota versions.
 */
function generateRSAExample() {
    console.log('RSA Key generation uses crypto-jsbn library internally')
    console.log('Key length: 2048 bits')
    console.log('Public exponent: 65537')
    console.log('Implementation in: /packages/tutanota-crypto/lib/encryption/Rsa.ts')
}

/**
 * Summary of libraries used for key pair generation
 */
function printLibrarySummary() {
    console.log('\n=== Tutanota Crypto Libraries Summary ===')
    console.log('1. X25519: noble-curves v1.3.0 (JavaScript)')
    console.log('2. Ed25519: ed25519-dalek v2.1.1 (Rust -> WebAssembly)')  
    console.log('3. RSA: crypto-jsbn 2012-08-09 (JavaScript)')
    console.log('4. Kyber: liboqs (C -> WebAssembly)')
    console.log('5. Additional: bCrypt, SJCL for other crypto operations')
    console.log('\nAll libraries are bundled internally in /packages/tutanota-crypto/lib/internal/')
}

export {
    generateX25519Example,
    generateEd25519Example,
    generateKyberExample,
    generateRSAExample,
    printLibrarySummary
}