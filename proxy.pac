/**
 * Fichier de configuration automatique de proxy (PAC)
 * Prêt pour GitHub / GitHub Gist
 */

function FindProxyForURL(url, host) {

    // 1. CONTEXTE LOCAL : Si le site est une adresse locale, un nom simple (ex: http://routeur) 
    // ou localhost, on se connecte en DIRECT (sans passer par le proxy).
    if (isPlainHostName(host) ||
        shExpMatch(host, "*.local") ||
        isInNet(dnsResolve(host), "10.0.0.0", "255.0.0.0") ||
        isInNet(dnsResolve(host), "172.16.0.0", "255.240.0.0") ||
        isInNet(dnsResolve(host), "192.168.0.0", "255.255.0.0") ||
        isInNet(dnsResolve(host), "127.0.0.1", "255.255.255.255")) {
        return "DIRECT";
    }

    // 2. EXCEPTION DE SÉCURITÉ : On évite d'envoyer les banques ou services sensibles 
    // à travers un proxy tiers (Exemple ici avec la Banque Populaire).
    if (shExpMatch(host, "*.chaabinet.ma") || 
        shExpMatch(host, "*.banquepopulaire.ma") || 
        shExpMatch(host, "*.poc.ma")) {
        return "DIRECT";
    }

    // 3. EXCEPTION DE PROTOCOLE : Le trafic FTP n'est souvent pas géré par les proxys HTTP.
    if (url.substring(0, 4) === "ftp:") {
        return "DIRECT";
    }

    // 4. RÈGLE PAR DÉFAUT : Tout le reste du trafic internet passe par votre proxy.
    // /!\ REMPLACEZ "1.1.1.1:8080" PAR L'IP ET LE PORT DE VOTRE PROXY /\!
    // Si votre proxy est en panne, la connexion basculera automatiquement en "DIRECT".
    return "PROXY 1.1.1.1:8080; DIRECT";
}
