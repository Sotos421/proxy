/**
 * Fichier de configuration automatique de proxy (PAC) - Mode Rebond
 * À utiliser derrière votre VPN actif.
 */

function FindProxyForURL(url, host) {

    // 1. CONTEXTE LOCAL : Connexion DIRECTE (sans proxy ni VPN si configuré ainsi)
    if (isPlainHostName(host) ||
        shExpMatch(host, "*.local") ||
        isInNet(dnsResolve(host), "10.0.0.0", "255.0.0.0") ||
        isInNet(dnsResolve(host), "172.16.0.0", "255.240.0.0") ||
        isInNet(dnsResolve(host), "192.168.0.0", "255.255.0.0") ||
        isInNet(dnsResolve(host), "127.0.0.1", "255.255.255.255")) {
        return "DIRECT";
    }

    // 2. EXCEPTION DE SÉCURITÉ : Banques et services essentiels
    if (shExpMatch(host, "*.chaabinet.ma") || 
        shExpMatch(host, "*.banquepopulaire.ma") || 
        shExpMatch(host, "*.poc.ma")) {
        return "DIRECT";
    }

    // 3. EXCEPTION DE PROTOCOLE
    if (url.substring(0, 4) === "ftp:") {
        return "DIRECT";
    }

    // 4. RÈGLE PAR DÉFAUT : Votre rebond public
    // Remplacez l'IP et le port ci-dessous par un proxy actif.
    // Si le proxy public meurt, le trafic bascule sur "DIRECT" (donc uniquement votre VPN).
    return "PROXY 185.200.118.4:8080; DIRECT";
}
