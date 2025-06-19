# rec_app_t

**Kleine Rezept-App im Comic-Stil**  
Verwalte, bewerte und teile deine Lieblingsrezepte – einfach, bunt und barrierearm!

---

## Inhaltsverzeichnis

- [Über das Projekt](#über-das-projekt)
- [Features](#features)
- [Screenshots](#screenshots)
- [Installation](#installation)
- [Verwendung](#verwendung)
- [Projektstruktur](#projektstruktur)
- [Barrierefreiheit](#barrierefreiheit)
- [Mitwirken](#mitwirken)
- [Lizenz](#lizenz)
- [Kontakt](#kontakt)

---

## Über das Projekt

Dieses Projekt ist eine kleine, moderne Rezeptverwaltung mit Fokus auf Comic-Optik, Barrierefreiheit und Spaß an der Nutzung.  
Rezepte können hinzugefügt, bearbeitet, bewertet, getaggt und kommentiert werden.

---

## Features

- **Rezepte anlegen, bearbeiten und löschen**
- **Comic-Stil** mit liebevoll gestalteten Buttons und Chips
- **Tags als Chips**: Tags können einfach hinzugefügt und entfernt werden
- **Bewertungssystem** mit Sternen
- **Kommentare** zu jedem Rezept
- **Barrierearme Bedienung** (Labels, Fokus, Tastatursteuerung)
- **Responsive Design** für Desktop und Mobilgeräte

---

## Screenshots

*(Hier kannst du Screenshots deiner App einfügen)*

---

## Installation

### Voraussetzungen

- [Node.js](https://nodejs.org/) (für Backend, falls verwendet)
- [Git](https://git-scm.com/)

### Repository klonen

```bash
git clone https://github.com/RRHor/rec_app_t.git
cd rec_app_t
```

### Backend starten

*(Falls du ein eigenes Backend hast, beschreibe hier die Schritte. Beispiel:)*

```bash
cd backend
npm install
npm start
```

### Frontend starten

Öffne die Datei `frontend/index.html` im Browser  
**oder** verwende einen lokalen Server (z.B. mit VS Code Live Server oder Python):

```bash
cd frontend
python3 -m http.server
```

---

## Verwendung

1. **Neues Rezept hinzufügen:**  
   Fülle das Formular aus und klicke auf „Speichern“.

2. **Rezepte anzeigen:**  
   Alle gespeicherten Rezepte erscheinen unter „Gespeicherte Rezepte“.

3. **Rezept bearbeiten:**  
   Klicke auf „Bearbeiten“ in der Rezeptkarte, passe die Felder an und speichere.

4. **Tags verwalten:**  
   Tags erscheinen als Chips oben in der Karte. Im Bearbeiten-Modus kannst du sie hinzufügen oder entfernen.

5. **Rezept bewerten:**  
   Klicke auf die Sterne, um eine Bewertung abzugeben.

6. **Rezept löschen:**  
   Klicke auf „Löschen“, um ein Rezept zu entfernen.

---

## Projektstruktur

```text
rec_app_t/
├── backend/                # (optional) Backend-Code (Node.js/Express)
├── frontend/
│   ├── css/
│   │   └── style.css       # Comic-Stil und Layout
│   ├── js/
│   │   ├── api/            # API-Kommunikation
│   │   ├── ui/             # UI-Komponenten und Event-Handler
│   │   └── app.js          # Einstiegspunkt für das Frontend
│   └── index.html          # Haupt-HTML-Datei
├── README.md
└── ...
```

---

## Barrierefreiheit

- Alle Eingabefelder sind mit Labels versehen
- Fokus-Indikatoren für Tastatur-Nutzer:innen
- Buttons und Chips sind per Tastatur bedienbar
- Farbkontraste und Schriftgrößen sind angepasst

---

## Mitwirken

Beiträge, Bug-Reports und Feature-Wünsche sind willkommen!  
Bitte erstelle ein [Issue](https://github.com/RRHor/rec_app_t/issues) oder einen Pull Request.

---

## Lizenz

Dieses Projekt steht unter der MIT-Lizenz.  
Siehe [LICENSE](LICENSE) für Details.

---

## Kontakt

**Autor:** Rea R. Horn  
**GitHub:** [RRHor](https://github.com/RRHor)  
**E-Mail:** *r.r.horn@t-online.de*

---

*Viel Spaß beim Kochen und Programmieren!*
