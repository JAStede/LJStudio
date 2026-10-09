# LJ Studio — nieuwe gecodeerde website

Deze map bevat een complete **statische website zonder Framer, abonnementen, frameworks of buildstap**. Open `index.html` voor een lokale preview, of publiceer alle bestanden in een statische hostingomgeving.

## Inhoud

- 12 HTML-pagina’s (inclusief 404)
- Eigen responsive CSS en animaties met respect voor `prefers-reduced-motion`
- Mobiel menu, werkende interne navigatie, FAQ-accordions, mailto-aanvraagformulier
- SEO: paginatitels, beschrijvingen, canonical links, sitemap, robots, Open Graph, JSON-LD
- Geen externe JS-bibliotheken, trackers of betaalde lettertypen

## BELANGRIJK: nog controleren vóór je Framer opzegt

1. **Teksten**: de bestaande Framer-website kon niet worden uitgelezen. Dit is een complete nieuwe tekstversie op basis van bekende LJ Studio-informatie, geen geverifieerde 1-op-1 kopie. Vergelijk alle teksten met je huidige site.
2. **E-mail**: `info@ljstudio.nl` is een AANNAME, niet bevestigd. Pas dit adres aan in `assets/script.js` (const email) én in `contact.html` / `aanvraag.html` als het niet klopt. Het formulier opent de e-mailapp, het verstuurt niet automatisch.
3. **Prijzen/pakketdetails**: €750 / €1.350 eenmalig en LJ Care €39,99/maand met hosting en 30 minuten werk zijn gebaseerd op bekende afspraken. De overige pakketonderdelen zijn concept en moeten worden afgestemd op je daadwerkelijke aanbod.
4. **Privacyverklaring**: concept, niet overgenomen uit Framer. Vervang deze door je bestaande juridisch gecontroleerde privacyverklaring en pas hem aan op nieuwe hosting en formulieren.
5. **Logo/huisstijl**: het LJ-monogram en kleurpalet zijn nieuw ontworpen. Lever het officiële LJ Studio-logo en kleuren aan als die exact behouden moeten blijven.
6. **Bestaande URL’s**: Framer kan andere slugs hebben. Inventariseer alle oude URLs en stel 301 redirects in bij je hostingprovider. Deze site gebruikt `.html` bestandsnamen; configureer nette URLs/redirects waar mogelijk.
7. **SEO/migratie**: controleer Search Console, metadata, canonical URLs, sitemap, analytics en contactgegevens. Test alle links en formulieren op mobiel en desktop.
8. **Hosting**: GitHub Pages is geschikt voor een tijdelijke preview, maar raadpleeg de gebruiksvoorwaarden voor commercieel gebruik. Kies een geschikte productiehost, bijvoorbeeld Cloudflare Pages of een reguliere webhost, en sluit je eigen domein aan.
9. **Framer**: pas opzeggen wanneer je eigen domein werkt met SSL, alle belangrijke pagina’s en contactmogelijkheden getest zijn en je oude inhoud/SEO goed is gemigreerd.

## Publiceren vanaf je telefoon

Upload de inhoud van deze map (niet de bovenliggende map) naar een GitHub-repository. Maak een preview via GitHub Pages of verbind de repository aan je statische hostingprovider. Controleer eerst de preview en koppel pas daarna het domein.

## Animaties

Scroll-reveal, hero floating cards, roterende decoratieve lijnen, hover-bewegingen en openklappende FAQ’s. Alle animaties vallen terug bij beperkte bewegingsvoorkeuren.
