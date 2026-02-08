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
          <CardTitle>Stage 1: The Argon2id Wall</CardTitle>
          <CardDescription>
            Your master password is never stored directly. Instead, it's processed by a formidable key derivation function, Argon2id, to create a unique encryption key.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>Argon2id is an ASIC-resistant algorithm designed to be memory-hard, making brute-force attacks extremely expensive for attackers. We use a high-cost configuration to maximize security against supercomputers.</p>
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary" className="font-code text-sm">Iterations (t_cost): 4</Badge>
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
            <li>The <strong className="text-foreground">PQC private key</strong> itself is then encrypted with <strong className="text-foreground">AES-256-GCM</strong> using the key derived from your password in Stage 1.</li>
          </ol>
          <p className="font-semibold text-primary pt-4 border-t border-border mt-4">Result: To compromise the vault, an attacker would need to break the Argon2id wall with a supercomputer AND break the ML-KEM encapsulation with a quantum computer.</p>
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

    </div>
  );
}
