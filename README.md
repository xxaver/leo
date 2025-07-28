![SJB](https://frag-johannes.vercel.app/logo.png)
# Johannes
Ich bin der Chat-Assistent des Studienkolleg St. Johann.

## Integration
* Wenn Content-Security-Policy aktiviert ist: frame-src https://frag-johannes.vercel.app erlauben
* https://frag-johannes.vercel.app/chatbot-integration.js herunterladen und auf der Website einbinden (egal ob im head oder im body)

### Typo3
* In Dateien am besten den Ordner mit anderen js-Dateien suchen (z.B. jquery.min.js) und dort chatbot-integration.js hochladen
* Die typoscript-Datei suchen, in der die anderen js-Dateien eingebunden werden (dort kann meistens auch die Content-Security-Policy geändert werden, falls nötig)
* chatbot-integration.js auf dieselbe weise wie die anderen Dateien einbinden (z.B. in includeJSLibs oder includeJS)
* alternativ kann die datei auch in einem Snippet, das auf jeder Seite vorhanden ist (z.B. der Footer) direkt per html so eingebunden werden: <script src="(url der datei)" />