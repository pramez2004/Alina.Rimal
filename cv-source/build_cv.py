from reportlab.lib.pagesizes import letter
from reportlab.lib.units import mm
from reportlab.lib.colors import HexColor
from reportlab.pdfgen import canvas
from reportlab.pdfbase.pdfmetrics import stringWidth

# ---- brand tokens (match the site) ----
CHARCOAL = HexColor("#1b201c")
SAGE = HexColor("#5f7a57")       # slightly darkened for print contrast
SAGE_LIGHT = HexColor("#7c9473")
INK = HexColor("#1c211d")
MID = HexColor("#5c6259")
LINE = HexColor("#dfe3da")
PAPER = HexColor("#ffffff")

PAGE_W, PAGE_H = letter
MARGIN = 22 * mm

c = canvas.Canvas("Alina-Rimal-CV.pdf", pagesize=letter)

def draw_header():
    # dark header band
    band_h = 62 * mm
    c.setFillColor(CHARCOAL)
    c.rect(0, PAGE_H - band_h, PAGE_W, band_h, fill=1, stroke=0)

    x = MARGIN
    y = PAGE_H - 24 * mm

    c.setFillColor(PAPER)
    c.setFont("Helvetica-Bold", 30)
    c.drawString(x, y, "Alina Rimal")

    y -= 9 * mm
    c.setFillColor(SAGE_LIGHT)
    c.setFont("Helvetica-Bold", 10.5)
    c.drawString(x, y, "CONTENT CREATOR  ·  MODEL  ·  BEAUTY SPECIALIST")

    y -= 10 * mm
    c.setFillColor(HexColor("#c7cdc2"))
    c.setFont("Helvetica", 9.5)
    contact_line = "alinarimal38@gmail.com   |   Instagram @alina.rimal   |   TikTok @alina.rimal22   |   Nepal"
    c.drawString(x, y, contact_line)

def section_title(x, y, text):
    c.setFillColor(SAGE)
    c.setFont("Helvetica-Bold", 11)
    c.drawString(x, y, text.upper())
    c.setStrokeColor(LINE)
    c.setLineWidth(0.75)
    c.line(x, y - 3.2 * mm, PAGE_W - MARGIN, y - 3.2 * mm)
    return y - 10 * mm

def wrap_text(text, font, size, max_width):
    words = text.split()
    lines, current = [], ""
    for w in words:
        trial = (current + " " + w).strip()
        if stringWidth(trial, font, size) <= max_width:
            current = trial
        else:
            if current:
                lines.append(current)
            current = w
    if current:
        lines.append(current)
    return lines

def draw_paragraph(x, y, text, size=9.7, leading=14.2, width=None, color=MID, font="Helvetica"):
    if width is None:
        width = PAGE_W - MARGIN - x
    c.setFillColor(color)
    c.setFont(font, size)
    for line in wrap_text(text, font, size, width):
        c.drawString(x, y, line)
        y -= leading
    return y

def bullet_list(x, y, items, size=9.7, leading=13.8, width=None, gap_after=4.5):
    if width is None:
        width = PAGE_W - MARGIN - x - 4 * mm
    for item in items:
        c.setFillColor(SAGE)
        c.setFont("Helvetica-Bold", 9.7)
        c.drawString(x, y, "–")
        y = draw_paragraph(x + 4.5 * mm, y, item, size=size, leading=leading, width=width)
        y -= gap_after
    return y

draw_header()

content_top = PAGE_H - 62 * mm - 14 * mm
x = MARGIN
y = content_top

# ---- Profile ----
y = section_title(x, y, "Profile")
profile_text = (
    "Content creator, model, and beauty enthusiast based in Nepal, working at the intersection of "
    "visual storytelling, personal style, and the beauty industry. Combines professional training in "
    "makeup artistry with hands-on experience building an engaged social media audience, creating "
    "content that is authentic, visually polished, and platform-native rather than generic."
)
y = draw_paragraph(x, y, profile_text, size=10, leading=14.8)
y -= 8 * mm

# ---- Areas of Expertise ----
y = section_title(x, y, "Areas of Expertise")
skills = [
    "Photo & Video Creation — concept through final edit, tailored to fast-moving social feeds",
    "Beauty & Makeup Expertise — professionally trained makeup artistry",
    "Social Media Strategy — platform-native content for Instagram and TikTok",
    "Writing & Storytelling — captions and scripts built for engagement",
    "Aesthetic & Visual Eye — styling and composition informed by a modeling background",
    "Creative Ideation — original concepts rather than trend-following",
]
y = bullet_list(x, y, skills)
y -= 4 * mm

# ---- Collaboration Interests ----
y = section_title(x, y, "Open to Collaboration On")
collab_types = "Brand Collaboration   ·   UGC   ·   Content Creation   ·   Product Promotion   ·   Photoshoots   ·   Modeling"
c.setFillColor(INK)
c.setFont("Helvetica", 9.7)
c.drawString(x, y, collab_types)
y -= 10 * mm

# ---- Platforms ----
y = section_title(x, y, "Platforms")
plat_col_w = (PAGE_W - 2 * MARGIN) / 2
c.setFillColor(INK)
c.setFont("Helvetica-Bold", 9.7)
c.drawString(x, y, "Instagram")
c.setFont("Helvetica", 9.7)
c.setFillColor(MID)
c.drawString(x + 28 * mm, y, "@alina.rimal")

c.setFillColor(INK)
c.setFont("Helvetica-Bold", 9.7)
c.drawString(x + plat_col_w, y, "TikTok")
c.setFont("Helvetica", 9.7)
c.setFillColor(MID)
c.drawString(x + plat_col_w + 20 * mm, y, "@alina.rimal22")
y -= 12 * mm

# ---- Portfolio ----
y = section_title(x, y, "Portfolio")
y = draw_paragraph(
    x, y,
    "Full portfolio with playable video work:",
    size=9.7, leading=14
)
c.setFillColor(SAGE)
c.setFont("Helvetica-Bold", 9.7)
c.drawString(x, y, "pramez2004.github.io/alina-rimal")
y -= 8 * mm

# ---- Footer ----
c.setStrokeColor(LINE)
c.setLineWidth(0.6)
c.line(MARGIN, 16 * mm, PAGE_W - MARGIN, 16 * mm)
c.setFillColor(MID)
c.setFont("Helvetica", 8)
c.drawString(MARGIN, 11 * mm, "Alina Rimal  —  Content Creator · Model · Beauty Specialist")
c.drawRightString(PAGE_W - MARGIN, 11 * mm, "alinarimal38@gmail.com")

c.showPage()
c.save()
print("saved")
