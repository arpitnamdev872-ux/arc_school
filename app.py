from flask import Flask, render_template, request

import sqlite3

app = Flask(__name__)

app.secret_key = "acr_school_secret_key_2026"

# Centralized data for Notice Board and News Page for consistency
notices_data = [
    {
        "icon": "📚", 
        "title": "सत्र 2026-27 हेतु प्रवेश प्रारम्भ", 
        "description": "कक्षा 6 से 12 तक प्रवेश प्रक्रिया जारी है। सीमित सीटों के लिए शीघ्र संपर्क करें।",
        "image": "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800&auto=format&fit=crop"
    },
    {
        "icon": "📝", 
        "title": "नियमित उपस्थिति अनिवार्य", 
        "description": "सभी विद्यार्थियों से विद्यालय में नियमित उपस्थिति एवं अनुशासन बनाए रखने का अनुरोध है।",
        "image": "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=800&auto=format&fit=crop"
    },
    {
        "icon": "💻", 
        "title": "स्मार्ट क्लास एवं कंप्यूटर शिक्षा", 
        "description": "आधुनिक तकनीक आधारित शिक्षण व्यवस्था द्वारा विद्यार्थियों को गुणवत्तापूर्ण शिक्षा प्रदान की जा रही है।",
        "image": "https://images.unsplash.com/photo-1588702547919-26089e690ecc?q=80&w=800&auto=format&fit=crop"
    },
    {
        "icon": "🏆", 
        "title": "खेलकूद एवं सह-पाठ्यक्रम गतिविधियाँ", 
        "description": "विद्यार्थियों के सर्वांगीण विकास हेतु विभिन्न खेलकूद एवं सांस्कृतिक कार्यक्रम आयोजित किए जाते हैं।",
        "image": "https://images.unsplash.com/photo-1565992441121-4367c2967103?q=80&w=800&auto=format&fit=crop"
    },
    {
        "icon": "🎯", 
        "title": "करियर मार्गदर्शन एवं परामर्श", 
        "description": "वरिष्ठ विद्यार्थियों के लिए विशेषज्ञ शिक्षकों द्वारा करियर काउंसलिंग एवं मार्गदर्शन उपलब्ध है।",
        "image": "https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=800&auto=format&fit=crop"
    },
    {
        "icon": "📖", 
        "title": "मासिक परीक्षा सूचना", 
        "description": "आगामी मासिक परीक्षा की तिथि एवं समय-सारणी शीघ्र घोषित की जाएगी।",
        "image": "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=800&auto=format&fit=crop"
    },
    {
        "icon": "🌿", 
        "title": "स्वच्छ परिसर, स्वस्थ वातावरण", 
        "description": "विद्यालय परिसर को स्वच्छ एवं हरित बनाए रखने में अपना सहयोग प्रदान करें।",
        "image": "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?q=80&w=800&auto=format&fit=crop"
    },
    {
        "icon": "📞", 
        "title": "सम्पर्क एवं सहायता", 
        "description": "किसी भी जानकारी हेतु विद्यालय कार्यालय से कार्य दिवसों में संपर्क करें।",
        "image": "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?q=80&w=800&auto=format&fit=crop"
    }
]

@app.route("/")
def home():
    return render_template("home.html", notices=notices_data)

@app.route("/about")
def about():
    return render_template("about.html")

@app.route("/vision")
def vision():
    return render_template("vision.html")

@app.route("/values")
def values():
    return render_template("values.html")

@app.route("/admission")
def admission():
    return render_template("admission.html")

@app.route("/academics")
def academics():
    return render_template("academics.html")

@app.route("/gallery")
def gallery():
    return render_template("gallery.html")

@app.route("/news")
def news():
    # Passing the same notices_data to the news page for consistency
    return render_template("news.html", notices=notices_data)

@app.route("/events")
def events():
    return render_template("events.html")

@app.route("/admin")
def admin():

    return render_template("admin_login.html")

@app.route("/admin/add-news", methods=["GET", "POST"])
def add_news():
    return "Add News Page"


@app.route("/complaint", methods=["GET", "POST"])
def complaint():

    if request.method == "POST":

        name = request.form["name"]
        mobile = request.form["mobile"]
        category = request.form["category"]
        subject = request.form["subject"]
        complaint_text = request.form["complaint"]

        conn = sqlite3.connect("database/school.db")

        cursor = conn.cursor()

        cursor.execute(
            """
            INSERT INTO complaints
            (name,mobile,category,subject,complaint)
            VALUES(?,?,?,?,?)
            """,
            (name, mobile, category, subject, complaint_text)
        )

        conn.commit()
        conn.close()

        return "आपका संदेश / सुझाव सफलतापूर्वक दर्ज हो गया है।"

    return render_template("complaint.html")


@app.route("/test")
def test():
    return "Website Running Successfully"


if __name__ == "__main__":
    app.run(debug=True)