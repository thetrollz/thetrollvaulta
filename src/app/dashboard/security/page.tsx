import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function SecurityPage() {
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <h1 className="font-headline text-3xl font-bold text-primary">Security Protocol</h1>
        <p className="text-muted-foreground mt-1">
          The Troll Vault's defense-in-depth architecture.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Stage 1: The Argon2id Wall & Keyfile</CardTitle>
          <CardDescription>
            Your master password is combined with a high-entropy keyfile, and then processed by Argon2id to create the master encryption key.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>Your master password alone is never used directly. It is first concatenated with a local, 64-byte high-entropy keyfile. This combined input is then fed into Argon2id, a formidable key derivation function designed to be memory-hard, making brute-force attacks extremely expensive. We use a high-cost configuration to maximize security.</p>
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary" className="font-code text-sm">Iterations (t_cost): 3</Badge>
            <Badge variant="secondary" className="font-code text-sm">Memory (m_cost): 1 GB</Badge>
            <Badge variant="secondary" className="font-code text-sm">Parallelism: 4 Threads</Badge>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Stage 2: Post-Quantum Hybrid Key Wrap</CardTitle>
          <CardDescription>
            We employ a forward-thinking hybrid encryption scheme to protect your data from both current and future threats, including those from quantum computers.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li>A <strong className="text-foreground">256-bit Master Vault Key</strong> is randomly generated to encrypt your vault data.</li>
            <li>This Master Vault Key is then encrypted (or "wrapped") using <strong className="text-foreground">ML-KEM-768</strong>, a post-quantum cryptography algorithm standardized by NIST. This produces an encrypted vault key and a PQC private key.</li>
            <li>The <strong className="text-foreground">PQC private key</strong> itself is then encrypted with <strong className="text-foreground">AES-256-GCM</strong> using the key derived from your password and keyfile in Stage 1.</li>
          </ol>
          <p className="font-semibold text-primary pt-4 border-t border-border mt-4">Result: To compromise the vault, an attacker would need to break the Argon2id wall (with your password and keyfile) AND break the ML-KEM encapsulation with a quantum computer.</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Vault Storage Format</CardTitle>
          <CardDescription>
            Your encrypted data is stored in a structured format using Protocol Buffers to ensure integrity and forward compatibility.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <pre className="p-4 rounded-lg bg-card-dark text-sm overflow-x-auto bg-secondary/30 font-code">
            <code>
{`syntax = "proto3";

message PqVault {
  bytes salt = 1;                // 32-byte Argon2 salt
  bytes argon2_iv = 2;           // IV for the Argon2-wrapped PQC key
  bytes pqc_wrapped_key = 3;     // The ML-KEM-768 encapsulated key
  bytes pqc_private_key_enc = 4; // The ML-KEM private key, AES-encrypted by (Pass + Keyfile)
  bytes encrypted_payload = 5;   // The actual vault data (AES-256-GCM)
  bytes payload_iv = 6;          // IV for the main payload
}`}
            </code>
          </pre>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Stage 3: Hardware-Accelerated Cryptography</CardTitle>
          <CardDescription>
            Whenever possible, cryptographic operations are delegated to dedicated hardware security modules (HSMs) like the Titan M2 chip on Pixel devices or Secure Enclaves on Apple devices.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>Using these hardware backends ensures that cryptographic keys are never exposed to the main operating system, providing a robust layer of physical security against even the most advanced software and physical attacks.</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Data Integrity: Atomic File Operations</CardTitle>
          <CardDescription>
            To prevent data corruption, vault updates are performed atomically, ensuring that a crash or interruption during a save operation doesn't result in a lost or damaged vault.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>When the vault is saved, the new encrypted data is first written to a temporary file. Only after the write operation has completed successfully is the temporary file atomically renamed to become the new official vault file. If any error occurs during the process, the temporary file is discarded, and the original, untouched vault file remains, guaranteeing data integrity.</p>
        </CardContent>
      </Card>

    </div>
  );
}
