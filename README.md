
# Installation
Um dieses Projekt nutzen zu können, ist Node.js vonnöten.

Danach sollte

- npm install

ausgeführt werden, um alle Dependencies für das Projekt herunterladen zu können. 
Sollte dies nicht möglich sein, könnte man auch die benötigten, externen Pakete einzeln hinzufügen.

- npm install axios
- npm install cors
- npm install html2canvas
- npm install rxjs

tslib und zone.js sind Komponenten, die automatisch hinzugefügt wurden.
Mit 
- cd .\web_app\

 In den web-app Ordner wechseln und dort

- ng serve --open  

ausführen, um so die App zu starten.
Für das Anzeigen und den Austausch von Daten wird das lokale Submodule benötigt, in dem ein Dockerfile für das Backend enthalten ist.

- cd .\backend\employeemanagement_api_without_keycloak\docker\

und dort 

- docker compose up
ausführen auf Windows muss dafür die Dockerapp laufen. 

Wenn die grobe UI lädt, kann es unter Umständen etwas dauern, bis die Karten mit den Daten der Benutzer aktualisiert werden. 


# Projekt Dokumentation

Dokumentation Angular-Projekt

In den Wireframes gibt es innerhalb eines Steckbriefes einen Button zum Aktualisieren. Dieser fällt in der Anwendung weg. Stattdessen kann man den Steckbrief jederzeit bearbeiten und sobald man auf den Speichern-Button drückt,
werden die Einträge entweder aktualisiert. Sollte man über den Button „New Employee“ in der Side-bar-Navigation auf Speichern drücken, so wird ein neuer Employee angelegt.

Verwendete Technologien:
axios:
Ein Promise-basiertes HTTP-Client-Tool für Browser und Node.js, das einfache API-Anfragen ermöglicht.

Vereinfacht das Arbeiten mit HTTP-Anfragen durch Promises und bietet Funktionen wie automatische Umwandlung von JSON-Daten.

-cors:
Ein Node.js-Paket für die Behandlung von Cross-Origin Resource Sharing (CORS) in Webanwendungen.
Ermöglicht das kontrollierte Teilen von Ressourcen zwischen verschiedenen Domains, wodurch Cross-Origin-Anfragen sicherer und effizienter werden.
(Verschiebung von Inhalten einer Komponente zu einer anderen)

-html2canvas:
Eine JavaScript-Bibliothek, die es ermöglicht, Screenshots von HTML-Elementen im Browser zu erstellen.
Nützlich für die Generierung von Bildern aus dem DOM, z.B. für Screenshots von bestimmten Bereichen in einer Webanwendung.

-rxjs:
Eine Bibliothek für reaktive Programmierung, die auf Observables basiert.
Vereinfacht die Behandlung von asynchronen Ereignissen und Datenströmen, erleichtert die Verkettung und Transformation von Daten.

-tslib:
Ein TypeScript-Hilfspaket, das gemeinsame Hilfsfunktionen für generierten TypeScript-Code bereitstellt.
Verbessert die Effizienz und Kompaktheit von TypeScript-Code, indem es allgemeine Funktionen und Hilfsklassen bereitstellt.

-zone.js:
Eine Bibliothek für das Patchen von JavaScript-Laufzeitumgebungen, um asynchrone Operationen zu verfolgen und zu koordinieren.
