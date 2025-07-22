import { GoogleGenAI } from "@google/genai";

// This will run on Vercel's servers, where environment variables are secure.
if (!process.env.API_KEY) {
    // This will cause the function to fail and log an error on the Vercel dashboard.
    throw new Error("API_KEY environment variable not set");
}
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Configure this function to run on the Vercel Edge Runtime.
// This is faster and more cost-effective for this kind of task.
export const config = {
  runtime: 'edge',
};

// The list of methods is kept on the server to avoid bloating the client-side code.
const MANIFESTATION_METHODS = `
1. Vision Board
2. Mind Movie (visuelle Affirmationsvideos)
3. Meditation (Fokus & Visualisierung)
4. Affirmationen (laut & schriftlich)
5. Journaling (z.B. „Script Writing“)
6. Dankbarkeitstagebuch
7. 55×5 Methode (Affirmation 55×5 Tage schreiben)
8. 369 Methode (Nikola Tesla inspiriert)
9. Visualisierung mit Gefühl
10. Gesetz der Annahme (Neville Goddard)
11. Intention Setting (klare Absicht formulieren)
12. Manifestationsmusik / Binaural Beats
13. Rituale (z.B. Vollmond, Kerzen, Wasser)
14. Acting as if (so tun, als ob es schon da ist)
15. Selbstkonzept-Arbeit
16. Theta Healing
17. Ho’oponopono
18. Segnen / Liebe senden
19. Subliminals
20. Energetisches Aufräumen (Feng Shui, Decluttering)
21. Quantenmanifestation
22. Gebet (spirituell oder religiös)
23. Future Self Kontakt
24. Spiegelarbeit
25. Schattenarbeit (Blockaden lösen)
26. Scripting (Tagebuch aus Zukunftsperspektive)
27. Emotionale Anker setzen
28. EFT (Emotional Freedom Technique / Klopfen)
29. Wunschbrief ans Universum
30. Manifestationsbox (Wünsche hineinlegen)
31. Morgenseiten (Morning Pages)
32. Powerfragen (Afformationen)
33. Vision Talk (mit sich selbst reden)
34. Manifestation durch Kunst (Malen, Collagen)
35. Frequenzanhebung durch Musik / Tanz
36. Manifestation durch Atemtechniken
37. Schlafvisualisierung / Vor dem Einschlafen
38. Luzides Träumen (gezielte Einflussnahme)
39. Traumarbeit (Wünsche im Traum bewusst setzen)
40. Timeline Jumping
41. Parallelrealitäten bewusst wählen
42. Reality Shifting
43. Intuitive Eingebungen empfangen (Empfangsmodus)
44. Energiearbeit (z.B. Reiki, Prana)
45. Kristallarbeit (z.B. mit Citrin, Rosenquarz)
46. Aromatherapie (Gerüche zur Ankerung)
47. Chakrenarbeit (z.B. Herzchakra)
48. Frequenzkarten / Energetische Karten
49. Sound Healing / Klangschalen
50. Energiezentrierung im Hara
51. Naturmagie (Elemente einbeziehen)
52. Symbolarbeit (Runen, Zeichen)
53. Sigillenmagie
54. Mandalas zeichnen
55. Orakel / Tarot zur Fokussierung
56. Numerologie (z.B. manifestieren an Portaltagen)
57. Astro-Manifestation (z.B. Neumondrituale)
58. Raunächte nutzen
59. Sternschnuppen-Wünsche
60. Mantras rezitieren
61. Hand auf Herz-Methode
62. Spiegelmanifeste (Wunsch ins Spiegelbild sprechen)
63. Manifestieren mit Wasser (Wunsch ins Wasser sprechen, trinken)
64. Wunschmeditation mit Kerzenfokus
65. Powernap + Visualisierung
66. Minimalismus (Raum für Neues schaffen)
67. „Release and Trust“-Rituale
68. Frequenz-Hacking (z.B. 432Hz, 528Hz)
69. NLP-Techniken (Ankern, Reframing)
70. Dankbarkeitsrampage (emotionaler Flow)
71. Gruppenmanifestation / Kollektives Feld
72. Tapping in Gruppen
73. Manifestieren durch Schreiben von Kurzgeschichten
74. Schauspielern des Wunschzustandes
75. Kleidung/Outfit als Anker
76. Essen als Ritual (bewusst laden)
77. Morgen-/Abendrituale
78. Journaling mit spezifischen Prompts
79. Manifestationsmeditation mit Musik
80. Anruf ans „Zukunfts-Ich“ (imaginär)
81. Brief an das zukünftige Ich
82. Loslassrituale (z.B. Zettel verbrennen)
83. Manifestationsapps
84. Audioaufnahme der Affirmationen anhören
85. Energetisches Signature setzen (z.B. mit Duft, Symbol)
86. Inneres Kind heilen
87. Selbsthypnose
88. Körperhaltungen (Power Posing)
89. Zukunfts-Collage digital
90. Manifestations-Countdown (z.B. 21 Tage)
91. Wunschtagebuch mit Bildern
92. Energetischer Tanz (freier Ausdruck + Absicht)
93. Feedback vom Körper lesen
94. Quantenatmung
95. 2-Cup-Methode (Wasser + Realität wechseln)
96. Intuitives Schreiben
97. 17-Sekunden-Regel (Abraham Hicks)
98. Herz-Gehirn-Kohärenz
99. Raumgestaltung mit Absicht (z.B. Wunschplatz)
100. Manifestieren durch Geben (Spenden, Teilen)
101. Manifestation mit Klangmantren (z.B. „Om Gam Ganapataye Namaha“)
102. Tageszielsetzung mit Manifestationsintention
103. Zielkarten (Wunsch + Deadline auf Karte)
104. Selbstgespräche im Auto (fokussierte Manifestation)
105. Wunsch-Visualisierung im Spiegel
106. Glückssymbole tragen (z.B. Anhänger mit Bedeutung)
107. Vision Walk (Zukunft im Gehen vorstellen)
108. Fasten mit Manifestationsabsicht
109. Manifestieren mit Räucherwerk
110. Naturrituale (z.B. Wunsch in Baum flüstern)
111. Manifestieren beim Sport (Gedankenfokus beim Joggen)
112. Wunschkapsel (wie Zeitkapsel mit Manifestation)
113. Routine mit Affirmationen koppeln (z.B. beim Zähneputzen)
114. Aromatische Anker setzen (Duft = Wunsch)
115. Lichtvisualisierung (Wunsch in Lichtfarbe denken)
116. Farben gezielt einsetzen (z.B. Grün für Geld)
117. Meditation mit Symbol (z.B. Lotus, Sonne)
118. Wunsch-Tattoo (temporär oder echt)
119. Wunsch auf Haut schreiben (abwaschbar)
120. Glaubenssatz-Umkehrung (The Work, z.B. Byron Katie)
121. Wachtraumtechniken
122. Frequenzarbeit mit Apps (z.B. binaurale Beats)
123. Ziel mit Duftöl verbinden
124. Audio-Journaling
125. Moodboard mit Stimmung des Wunschlebens
126. Wunsch-Gedicht schreiben
127. Wunsch-Playlist erstellen
128. Erfolgsvisualisierung nach NLP
129. Hypnose mit Manifestationsziel
130. Eye Movement Integration
131. Embodiment-Übungen
132. Wunsch mit Edelsteinen aufladen
133. Energetische Körperhaltung einnehmen
134. Wunsch als Passwort nutzen (sicher!)
135. Schreibrituale bei Sonnenaufgang
136. Gruppenrituale (z.B. Neumondkreis)
137. Dankbarkeit vor dem Wunsch fühlen
138. Quantenheilung mit Zielzustand
139. Vision Day einführen (1× Monat komplett im Wunschleben leben)
140. Wunschtürschild (symbolisch)
141. Zeichen vom Universum deuten
142. Sigillen aktivieren (z.B. verbrennen)
143. Wunschstein in Tasche tragen
144. Wunsch in Natur vergraben (Samenform)
145. Energetische Wunschdusche
146. Wunsch über Wasserflasche programmieren
147. 1%-Methode (täglich kleiner Schritt)
148. Fokusritual (1 Wunsch = 1 Tag)
149. Spiegelritual mit Lächeln
150. Countdown-Zeitstrahl erstellen
151. Energetische Schutzrituale (um Zweifel fernzuhalten)
152. Vision-Schlüsselanhänger basteln
153. Persönliches Mantra erstellen
154. High-Vibe-Rituale (tanzen, lachen)
155. Manifestation durch Storytelling
156. Wunsch-Doodle-Zeichnungen
157. Collage am Kühlschrank (täglicher Blickfang)
158. Vision in Ton oder Tonerde modellieren
159. Manifestation durch Kochen (bewusste Zutatenwahl)
160. Klangmassage mit Absicht
161. Vision Board im Handyhintergrund
162. Manifestieren mit Kindern (spielerisch)
163. Wunsch als Comic zeichnen
164. Mini-Ziele als tägliche „Wunder“
165. Wunsch über Pantomime ausdrücken
166. Körperreise mit Zukunftsbild
167. Manifestation bei Sonnenaufgang/untergang
168. Wunsch am Spiegel mit Lippenstift schreiben
169. Affirmation beim Gehen im Takt sprechen
170. Erfolgsjournal führen
171. Lebensrad + Wunschanalyse
172. Erfolgserinnerungen aufschreiben (Selbstwert stärken)
173. Wunsch mit Geldschein verbinden
174. Wunscherfüllung feiern, als ob’s schon da ist
175. Manifestation durch Schweigen (innerer Fokus)
176. Herzensvision malen (aus Intuition)
177. Wunsch „pflanzen“ im Garten
178. Wunsch mit Wind senden
179. Erfüllungsfilm schauen (Gefühl erzeugen)
180. Geführte Manifestationsreise (Audio)
181. Bewegung mit Absicht (z.B. Yoga)
182. Wunsch auf Kissen sprechen (vor dem Schlafen)
183. Wunsch mit Tier verbinden (Totemtier)
184. Sternensymbolik nutzen (Astrologie)
185. Selbstgemalte Wunschkarte täglich ziehen
186. Intentionsarmband tragen
187. Wunsch mit Tee „aufgießen“ und trinken
188. Energetische Handschrift (bewusstes Schreiben)
189. Schatten auflösen mit Journal-Fragen
190. Wunsch-SMS (an sich selbst senden)
191. Wunsch-Seife herstellen und nutzen
192. Wunsch in Schneekugel (symbolisch)
193. Manifestation durch bewusstes Zuhören
194. Intuitives Orakel bauen (eigene Methode)
195. Wunschbrief ans zukünftige Kind
196. Wunsch auf Origami falten
197. Wunsch mit Foto verbinden
198. Wunschmosaik gestalten
199. Mini-Affirmationszettel überall verstecken
200. Zukünftiges Ich interviewen (schriftlich)
201. Manifestations-Rap schreiben und performen
202. Wunsch auf Puzzle schreiben, zusammensetzen
203. Wunsch als Theaterstück inszenieren (privat)
204. Wunsch auf Ballon schreiben, steigen lassen
205. Wunsch mit Finger in Sand oder Erde schreiben
206. Wunschkerze herstellen und anzünden
207. Manifestations-Brettspiel entwickeln/spielen
208. Wunsch als Instagram-Post (privat) formulieren
209. Wunsch im Kalender eintragen, als sei er erfüllt
210. Absicht als Klang aufnehmen, im Loop anhören
211. Duftkerzen mit Wunschthema nutzen
212. Wunsch mit Klang (z.B. Klanggabel) „besingen“
213. Zukunfts-Visitenkarte erstellen
214. Wunsch durch Seifenblasen pusten
215. Wunsch in Morsecode schreiben
216. Zukunftsbudget schreiben (monatliche Einnahmen)
217. Wunsch als Comicstrip zeichnen
218. Energiezirkel mit Freunden (Manifestationskreis)
219. Manifestieren durch kreatives Basteln
220. Wunsch mit Seil oder Band binden (symbolisch)
221. Wunsch auf Stein schreiben, an Kraftort legen
222. Wunsch als Skulptur modellieren
223. Vision durch Farben ausdrücken (Farbmeditation)
224. Wunsch per Morsezeichen aufschreiben
225. Manifestationslauf – beim Joggen wiederholen
226. Wunsch auf Frucht schreiben und essen
227. Manifestation durch Duftmemory (z.B. Parfum)
228. Persönlichen Manifestationsaltar gestalten
229. Wunsch auf Stoff sticken/nähen
230. Wunsch als Tattoo-Entwurf (symbolisch)
231. Visionsflagge (z.B. tibetisch inspiriert)
232. Wunsch-Gebetskette erstellen
233. Wunsch in Mandarine schreiben & verschenken
234. Wunsch auf Kaffeetasse gestalten
235. Wunsch mit Morseklopfen klopfen
236. Vision in Stop-Motion-Video darstellen
237. Manifestieren mit 3D-Modellen
238. Wunsch mit Pflanzen verbinden (z.B. Basilikum)
239. Wunsch durch Seilspringen manifestieren
240. Manifestieren durch „Story Reels“ (Video-Visualisierung)
241. Wunsch mit Duftbaum im Auto verbinden
242. Wunsch auf Spielkarte schreiben
243. Wunschbuch gestalten (Collage, Texte, Ziele)
244. Wunsch auf Luftmatratze zeichnen & schwimmen
245. Wunsch auf Spiegel gravieren (z.B. Laser, Folie)
246. Zukunftshaus malen oder bauen (Modell)
247. Wunsch auf Blatt legen und flussabwärts senden
248. Manifestations-Kissen gestalten
249. Zukunfts-E-Mail an sich selbst planen (z.B. futureme.org)
250. Wunsch-Tonspur als Weckton
251. Wunsch als Computerspiel-Charakter leben
252. Wunsch in QR-Code umwandeln
253. Wunsch per Morse-App „blinken“ lassen
254. Manifestation über Schattenspiel (Licht & Hände)
255. Wunsch-Emoji-Kombination verwenden
256. Wunsch-Tanz (fester Ablauf mit Intention)
257. Wunsch in Sims/Spielwelt nachbauen
258. Energetischer Kreis mit Wunschsymbol
259. Wunsch mit Naturmaterialien legen
260. Manifestation mit Foto-Collage von Zukunft
261. Wunsch als Stickerei auf Kleidung
262. Wunsch-Laterne basteln
263. Wunsch als Liedtext schreiben
264. Wunsch durch Duftöl-Rollon aktivieren
265. Wunsch auf den Körper zeichnen (z.B. Henna)
266. Zukunftsraum gestalten (real oder digital)
267. Wunsch auf Wasseroberfläche schreiben (Tinte)
268. Wunsch als Code/Chiffre notieren
269. Wunsch als Titel eines Buchs schreiben
270. Wunsch beim Treppensteigen wiederholen
271. Wunsch als magisches Rezept notieren
272. Wunsch mit Lichtprojektion anzeigen
273. Wunsch über Morseklänge hören
274. Wunsch über Morsezeichen summen
275. Wunsch mit Magneten anziehen (symbolisch)
276. Wunsch über digitale Animation visualisieren
277. Wunsch in Pflanzen-DNA „sprechen“ (Absicht setzen beim Gießen)
278. Zukunfts-Schreibtisch einrichten
279. Wunsch mit Sandkunst darstellen
280. Wunsch mit Fotofilter „sichtbar“ machen
281. Wunsch auf Leinwand sprühen
282. Wunsch in Stopmotion-Film umsetzen
283. Wunsch auf Schallplatte gravieren lassen
284. Wunsch als Hologramm vorstellen
285. Wunsch in VR-Welt designen
286. Wunsch mit Handyvibration koppeln
287. Wunsch über Morse-Vibration senden
288. Wunsch per Tonspur im Raum „verstecken“
289. Wunsch auf Tischplatte schreiben (unsichtbar)
290. Wunsch als Hintergrundmusik vertonen
291. Wunsch in Audio-Kunstwerk einbauen
292. Wunsch per Morsezeichen singen
293. Wunsch mit Symbolstempeln gestalten
294. Wunsch als animiertes GIF designen
295. Wunsch durch Morsezeichnen mit Taschenlampe
296. Wunsch als Duftmischung im Diffusor
297. Wunsch mit Drohnen-Lichtshow visualisieren (digital möglich)
298. Wunsch als tägliches Passwort (intim & sicher)
299. Wunsch auf digitalem Whiteboard speichern
300. Wunsch als 3D-Druckobjekt modellieren
`;

// This is the Vercel Edge Function that will handle API requests.
export default async function handler(req: Request) {
    // Only allow POST requests
    if (req.method !== 'POST') {
        return new Response(JSON.stringify({ error: 'Method not allowed' }), {
            status: 405,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    try {
        const { action, wish, instruction } = await req.json();

        if (action === 'getInstruction') {
            if (!wish || typeof wish !== 'string') {
                return new Response(JSON.stringify({ error: 'Parameter "wish" is required and must be a string.' }), {
                    status: 400,
                    headers: { 'Content-Type': 'application/json' },
                });
            }

            const systemInstruction = `
                Du bist ein liebevoller und weiser Manifestations-Coach. Deine Aufgabe ist es, Menschen dabei zu helfen, ihre Wünsche zu manifestieren. Du sprichst immer in der herzlichen 'Du'-Form.
                Der Nutzer wird dir einen Wunsch mitteilen. Wähle aus der folgenden Liste von Manifestationsmethoden EINE Methode aus, die am besten zu diesem spezifischen Wunsch passt.
                Antworte NUR mit einer kurzen, konkreten und liebevollen Handlungsanweisung, die auf der ausgewählten Methode basiert. Gib KEINE Erklärung und nenne NICHT den Namen der Methode. Formuliere es als direkten, liebevollen Ratschlag in 2-3 Sätzen.
                
                Beispiel:
                Wenn der Wunsch 'Ich wünsche mir mehr Selbstliebe' ist und du die Methode 'Spiegelarbeit' wählst, könnte deine Antwort lauten: 'Stell dich jeden Morgen vor den Spiegel, sieh dir tief in die Augen und sage mit einem Lächeln: "Ich liebe und akzeptiere dich genau so, wie du bist." Fühle diese Worte in deinem Herzen.'

                Hier ist die Liste der Methoden, aus der du wählen musst:
                ${MANIFESTATION_METHODS}
            `;

            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: `Mein Wunsch ist: "${wish}"`,
                config: {
                    systemInstruction: systemInstruction,
                },
            });
            return new Response(JSON.stringify({ text: response.text }), {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            });

        } else if (action === 'getExplanation') {
            if (!instruction || typeof instruction !== 'string') {
                 return new Response(JSON.stringify({ error: 'Parameter "instruction" is required and must be a string.' }), {
                    status: 400,
                    headers: { 'Content-Type': 'application/json' },
                });
            }

            const systemInstruction = `
                Du bist ein liebevoller und weiser Manifestations-Coach. Deine Aufgabe ist es, Menschen dabei zu helfen, ihre Wünsche zu manifestieren. Du sprichst immer in der herzlichen 'Du'-Form.
                Erkläre die folgende Manifestations-Anweisung auf eine einfache, motivierende und herzliche Weise. Erkläre kurz, was der tiefere Sinn dahinter ist und wie es der Person hilft, ihren Wunsch zu verwirklichen. Halte die Erklärung bei etwa 2-4 Sätzen und bleibe positiv und ermutigend.
            `;
            
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: `Bitte erkläre diese Anweisung: "${instruction}"`,
                config: {
                    systemInstruction: systemInstruction,
                },
            });

            return new Response(JSON.stringify({ text: response.text }), {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            });
        } else {
            return new Response(JSON.stringify({ error: 'Invalid or missing "action" parameter.' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

    } catch (error) {
        console.error('API Route Error:', error);
        return new Response(JSON.stringify({ error: 'An internal server error occurred while contacting the AI model.' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
