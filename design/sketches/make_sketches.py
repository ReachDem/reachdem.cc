#!/usr/bin/env python3
"""
Generateur de sketches de sections pour la landing ReachDem.

Chaque section est un GIF anime : les zones apparaissent une par une, avec
leur libelle, puis l'ensemble tient quelques frames avant de boucler.

Ce sont des sketches VIERGES : pas de design, pas de couleur de marque, pas de
copie. Uniquement la structure — ou va quoi, et en quelle proportion. Ils sont
faits pour etre remplaces un par un par la vraie section.

Usage :
    python make_sketches.py            # tous les sketches
    python make_sketches.py hero faq   # seulement certains

Sortie : design/sketches/out/*.gif
"""

from __future__ import annotations

import sys
import math
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

OUT = Path(__file__).resolve().parent / "out"
OUT.mkdir(parents=True, exist_ok=True)

W, H = 1200, 820
PAD = 56
BODY_TOP = 132
BODY_BOTTOM = H - 44
BODY_H = BODY_BOTTOM - BODY_TOP
BODY_W = W - PAD * 2

PAPER = (250, 250, 247)
CARD = (240, 240, 235)
INK = (26, 26, 26)
MUTED = (138, 138, 130)
LINE = (196, 196, 188)
GHOST = (221, 221, 214)
ACCENT = (196, 92, 52)

FONT_DIR = Path("C:/Windows/Fonts")
REG = FONT_DIR / "segoeui.ttf"
BOLD = FONT_DIR / "segoeuib.ttf"
if not REG.exists():
    REG = FONT_DIR / "arial.ttf"
    BOLD = FONT_DIR / "arialbd.ttf"


def font(size: int, bold: bool = False) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(str(BOLD if bold else REG), size)


# --- briques de dessin ------------------------------------------------------
def fit_text(d: ImageDraw.ImageDraw, text: str, max_w: float, max_size: int, min_size: int):
    """Reduit la police pour tenir en largeur, puis passe a la ligne si besoin.

    Sans ca, un libelle comme « Preuves — conformite, securite » deborde de sa
    boite et empiète sur la zone voisine.
    """
    size = max_size
    while size > min_size:
        f = font(size, True)
        if d.textlength(text, font=f) <= max_w:
            return [text], f
        size -= 1
    f = font(min_size, True)
    if d.textlength(text, font=f) <= max_w:
        return [text], f
    words = text.split()
    best = None
    for i in range(1, len(words)):
        a, b = " ".join(words[:i]), " ".join(words[i:])
        if d.textlength(a, font=f) <= max_w and d.textlength(b, font=f) <= max_w:
            best = [a, b]
    return (best or [text]), f


def zone(d: ImageDraw.ImageDraw, box, label, kind="block", ghost_alpha=1.0):
    """Une zone du sketch : contour pointille + remplissage + libelle."""
    x0, y0, x1, y1 = box
    fill = CARD if kind != "cta" else (247, 232, 225)
    d.rounded_rectangle(box, radius=10, fill=fill, outline=LINE, width=2)

    # contour pointille par-dessus, pour l'effet "wireframe"
    dash = 8
    for x in range(x0, x1, dash * 2):
        d.line([(x, y0), (min(x + dash, x1), y0)], fill=LINE, width=2)
        d.line([(x, y1), (min(x + dash, x1), y1)], fill=LINE, width=2)
    for y in range(y0, y1, dash * 2):
        d.line([(x0, y), (x0, min(y + dash, y1))], fill=LINE, width=2)
        d.line([(x1, y), (x1, min(y + dash, y1))], fill=LINE, width=2)

    # indices de contenu
    inner_pad = 18
    if kind == "text":
        top = y0 + inner_pad
        for i in range(3):
            wl = (x1 - x0 - inner_pad * 2) * (1.0 if i < 2 else 0.55)
            d.rounded_rectangle(
                [x0 + inner_pad, top + i * 18, x0 + inner_pad + wl, top + i * 18 + 7],
                radius=3, fill=GHOST,
            )

    if kind == "cta":
        # le libelle va DANS le bouton, sinon il chevauche le rectangle colore
        bw = min(190, (x1 - x0) - 24)
        bh = min(38, (y1 - y0) - 10)
        bx0 = x0 + ((x1 - x0) - bw) / 2
        by0 = y0 + ((y1 - y0) - bh) / 2
        d.rounded_rectangle([bx0, by0, bx0 + bw, by0 + bh], radius=bh / 2, fill=ACCENT)
        lines, f = fit_text(d, label, bw - 16, 15, 9)
        th = sum(f.getbbox(l)[3] for l in lines) + 4 * (len(lines) - 1)
        ty = by0 + (bh - th) / 2
        for l in lines:
            lw = d.textlength(l, font=f)
            d.text((bx0 + (bw - lw) / 2, ty), l, font=f, fill=(255, 255, 255))
            ty += f.getbbox(l)[3] + 4
        return

    lines, f = fit_text(d, label, (x1 - x0) - 22, 17, 10)
    th = sum(f.getbbox(l)[3] for l in lines) + 3 * (len(lines) - 1)
    ty = y1 - th - 12 if (y1 - y0) > 50 else y0 + ((y1 - y0) - th) / 2
    for l in lines:
        lw = d.textlength(l, font=f)
        d.text((x0 + ((x1 - x0) - lw) / 2, ty), l, font=f, fill=MUTED)
        ty += f.getbbox(l)[3] + 3


def frame(section, n_visible, total, index, total_all):
    img = Image.new("RGB", (W, H), PAPER)
    d = ImageDraw.Draw(img)

    # en-tete : numero + nom + rangee de reperes
    d.text((PAD, 40), f"{index:02d}", font=font(40, True), fill=INK)
    d.text((PAD + 74, 52), section["title"], font=font(26, True), fill=INK)
    sub = section.get("note", "")
    if sub:
        d.text((PAD + 74, 84), sub, font=font(15), fill=MUTED)
    d.line([(PAD, 116), (W - PAD, 116)], fill=LINE, width=2)

    # zones
    for i, z in enumerate(section["zones"]):
        if i >= n_visible:
            break
        label, rect = z[0], z[1]
        kind = z[2] if len(z) > 2 else "block"
        fx, fy, fw, fh = rect
        box = [
            PAD + fx * BODY_W,
            BODY_TOP + fy * BODY_H,
            PAD + (fx + fw) * BODY_W,
            BODY_TOP + (fy + fh) * BODY_H,
        ]
        zone(d, [round(v) for v in box], label, kind)

    # pied : avancement de l'animation
    d.text((PAD, H - 30), f"{min(n_visible, total)}/{total} zones", font=font(13), fill=MUTED)
    d.text((W - PAD - 190, H - 30), "SKETCH — a remplacer", font=font(13, True), fill=GHOST)
    return img


def build(section, index, total_all, path):
    zones = section["zones"]
    total = len(zones)
    frames = []
    durations = []

    # apparition une par une
    for n in range(1, total + 1):
        frames.append(frame(section, n, total, index, total_all))
        durations.append(160)
    # tenue
    hold = frame(section, total, total, index, total_all)
    for _ in range(10):
        frames.append(hold)
        durations.append(120)

    frames[0].save(
        path,
        save_all=True,
        append_images=frames[1:],
        duration=durations,
        loop=0,
        optimize=True,
        disposal=2,
    )
    return path, len(frames)


# --- definition des sections ------------------------------------------------
# rect = (x, y, w, h) en fractions de la zone de contenu
SECTIONS = [
    {
        "id": "navbar",
        "title": "Navbar",
        "note": "barre fixe — logo, navigation, un seul CTA",
        "zones": [
            ("Logo", (0.00, 0.00, 0.14, 1.00)),
            ("Liens (4)", (0.18, 0.00, 0.42, 1.00)),
            ("Connexion", (0.72, 0.00, 0.12, 1.00), "block"),
            ("CTA", (0.86, 0.00, 0.14, 1.00), "cta"),
        ],
    },
    {
        "id": "hero",
        "title": "Hero",
        "note": "une seule promesse — visuel produit a droite",
        "zones": [
            ("Eyebrow", (0.00, 0.06, 0.46, 0.09)),
            ("Titre H1", (0.00, 0.19, 0.46, 0.22), "text"),
            ("Sous-titre", (0.00, 0.45, 0.46, 0.14), "text"),
            ("CTA principal", (0.00, 0.63, 0.20, 0.10), "cta"),
            ("CTA secondaire", (0.22, 0.63, 0.20, 0.10)),
            ("Visuel produit", (0.53, 0.06, 0.47, 0.84), "block"),
        ],
    },
    {
        "id": "logos",
        "title": "Preuves — logos",
        "note": "juste apres le hero : qui nous fait deja confiance",
        "zones": [
            ("Accroche", (0.28, 0.10, 0.44, 0.12)),
            ("Logo 1", (0.00, 0.38, 0.14, 0.24)),
            ("Logo 2", (0.17, 0.38, 0.14, 0.24)),
            ("Logo 3", (0.34, 0.38, 0.14, 0.24)),
            ("Logo 4", (0.51, 0.38, 0.14, 0.24)),
            ("Logo 5", (0.68, 0.38, 0.14, 0.24)),
            ("Logo 6", (0.85, 0.38, 0.14, 0.24)),
        ],
    },
    {
        "id": "probleme",
        "title": "Le constat",
        "note": "pourquoi le visiteur est la — trois douleurs",
        "zones": [
            ("Titre de section", (0.18, 0.08, 0.64, 0.14), "text"),
            ("Douleur 1", (0.00, 0.34, 0.31, 0.44), "text"),
            ("Douleur 2", (0.345, 0.34, 0.31, 0.44), "text"),
            ("Douleur 3", (0.69, 0.34, 0.31, 0.44), "text"),
        ],
    },
    {
        "id": "features",
        "title": "Fonctionnalites",
        "note": "ce que le produit fait — grille de six",
        "zones": [
            ("Titre de section", (0.24, 0.05, 0.52, 0.12), "text"),
            ("Carte 1", (0.00, 0.25, 0.31, 0.32), "text"),
            ("Carte 2", (0.345, 0.25, 0.31, 0.32), "text"),
            ("Carte 3", (0.69, 0.25, 0.31, 0.32), "text"),
            ("Carte 4", (0.00, 0.62, 0.31, 0.32), "text"),
            ("Carte 5", (0.345, 0.62, 0.31, 0.32), "text"),
            ("Carte 6", (0.69, 0.62, 0.31, 0.32), "text"),
        ],
    },
    {
        "id": "process",
        "title": "Comment ca marche",
        "note": "trois etapes, un numero par etape",
        "zones": [
            ("Titre de section", (0.24, 0.06, 0.52, 0.12), "text"),
            ("Etape 1", (0.00, 0.32, 0.27, 0.46)),
            ("Etape 2", (0.365, 0.32, 0.27, 0.46)),
            ("Etape 3", (0.73, 0.32, 0.27, 0.46)),
        ],
    },
    {
        "id": "demo",
        "title": "Produit en action",
        "note": "capture d ecran reelle — pas une illustration",
        "zones": [
            ("Capture produit", (0.00, 0.06, 0.62, 0.86), "block"),
            ("Point cle 1", (0.66, 0.06, 0.34, 0.22), "text"),
            ("Point cle 2", (0.66, 0.33, 0.34, 0.22), "text"),
            ("Point cle 3", (0.66, 0.60, 0.34, 0.22), "text"),
            ("Lien", (0.66, 0.86, 0.20, 0.08)),
        ],
    },
    {
        "id": "testimonial",
        "title": "Testimonial",
        "note": "une voix forte, pas un mur de citations",
        "zones": [
            ("Citation", (0.10, 0.08, 0.80, 0.34), "text"),
            ("Auteur — nom, role, photo", (0.35, 0.46, 0.30, 0.18)),
            ("Logo de l entreprise", (0.42, 0.68, 0.16, 0.12)),
            ("Citation secondaire", (0.00, 0.78, 0.48, 0.18), "text"),
            ("Citation secondaire", (0.52, 0.78, 0.48, 0.18), "text"),
        ],
    },
    {
        "id": "chiffres",
        "title": "Preuves chiffrees",
        "note": "des chiffres verifiables, pas des monuments",
        "zones": [
            ("Metrique 1", (0.00, 0.16, 0.22, 0.42)),
            ("Metrique 2", (0.26, 0.16, 0.22, 0.42)),
            ("Metrique 3", (0.52, 0.16, 0.22, 0.42)),
            ("Metrique 4", (0.78, 0.16, 0.22, 0.42)),
            ("Note de source", (0.20, 0.68, 0.60, 0.14), "text"),
        ],
    },
    {
        "id": "academy",
        "title": "Teaser Academy",
        "note": "formation + suivi — necessite un compte",
        "zones": [
            ("Titre", (0.00, 0.08, 0.50, 0.16), "text"),
            ("Cours 1", (0.00, 0.30, 0.31, 0.48), "text"),
            ("Cours 2", (0.345, 0.30, 0.31, 0.48), "text"),
            ("Cours 3", (0.69, 0.30, 0.31, 0.48), "text"),
            ("CTA", (0.00, 0.84, 0.18, 0.11), "cta"),
        ],
    },
    {
        "id": "blog",
        "title": "Teaser blog",
        "note": "trois articles, tires de Payload",
        "zones": [
            ("Titre", (0.00, 0.08, 0.46, 0.14), "text"),
            ("Article 1", (0.00, 0.28, 0.31, 0.56), "text"),
            ("Article 2", (0.345, 0.28, 0.31, 0.56), "text"),
            ("Article 3", (0.69, 0.28, 0.31, 0.56), "text"),
            ("Lien vers /blog", (0.40, 0.90, 0.20, 0.09)),
        ],
    },
    {
        "id": "pricing-teaser",
        "title": "Tarifs — teaser",
        "note": "trois plans, un seul mis en avant",
        "zones": [
            ("Titre", (0.28, 0.06, 0.44, 0.12), "text"),
            ("Plan 1", (0.00, 0.24, 0.31, 0.58), "text"),
            ("Plan 2 — mis en avant", (0.345, 0.18, 0.31, 0.68), "text"),
            ("Plan 3", (0.69, 0.24, 0.31, 0.58), "text"),
        ],
    },
    {
        "id": "faq",
        "title": "FAQ",
        "note": "questions repliees — les vraies objections",
        "zones": [
            ("Titre", (0.00, 0.06, 0.42, 0.12), "text"),
            ("Question 1", (0.00, 0.24, 1.00, 0.10)),
            ("Question 2", (0.00, 0.37, 1.00, 0.10)),
            ("Question 3", (0.00, 0.50, 1.00, 0.10)),
            ("Question 4", (0.00, 0.63, 1.00, 0.10)),
            ("Question 5", (0.00, 0.76, 1.00, 0.10)),
            ("Contact", (0.00, 0.90, 0.30, 0.08)),
        ],
    },
    {
        "id": "cta",
        "title": "CTA final",
        "note": "derniere chance avant le footer — une action",
        "zones": [
            ("Titre", (0.22, 0.18, 0.56, 0.16), "text"),
            ("Sous-titre", (0.28, 0.40, 0.44, 0.12), "text"),
            ("Bouton", (0.40, 0.60, 0.20, 0.13), "cta"),
            ("Rassurance", (0.32, 0.78, 0.36, 0.09)),
        ],
    },
    {
        "id": "footer",
        "title": "Footer",
        "note": "navigation secondaire + preuves + mentions",
        "zones": [
            ("Logo + baseline", (0.00, 0.02, 0.24, 0.46), "text"),
            ("Colonne Produit", (0.28, 0.02, 0.16, 0.54)),
            ("Colonne Ressources", (0.46, 0.02, 0.16, 0.54)),
            ("Colonne Entreprise", (0.64, 0.02, 0.16, 0.54)),
            ("Preuves — conformite, securite", (0.82, 0.02, 0.18, 0.54), "text"),
            ("Mentions legales", (0.00, 0.70, 0.46, 0.22), "text"),
            ("Langue / reseaux", (0.52, 0.70, 0.48, 0.22)),
        ],
    },
]


def main(argv):
    wanted = {a.strip().lower() for a in argv[1:]} if len(argv) > 1 else None
    made = []
    for i, s in enumerate(SECTIONS, start=1):
        if wanted and s["id"] not in wanted:
            continue
        path = OUT / f"{i:02d}-{s['id']}.gif"
        _, n = build(s, i, len(SECTIONS), path)
        size = path.stat().st_size / 1024
        made.append((path, n, size))
        print(f"  {path.name:28} {n:2d} frames  {size:6.0f} Ko")
    print(f"\n{len(made)} sketch(es) dans {OUT}")


if __name__ == "__main__":
    main(sys.argv)
