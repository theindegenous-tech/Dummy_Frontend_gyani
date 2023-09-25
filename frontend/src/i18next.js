import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      "Welcome to React": "Welcome to React and react-i18next",
    }
  },
  fr: {
    translation: {
      "Home": "Maison",
      "Read":"Lire",
      "Reading":"En lisant",
      "Discover":"Découvrir",
      "Completed":"Complété",
      "Tools":"Outils",
      "My Library":"Ma bibliothèque",
      "Profile":"Profil",
      "Summary Generator":"Générateur de résumé",
      "Liked":"Aimée",
      "Bookmarks":"Signets",
      "Detect AI":"Détecter l'IA",
      "Settings":"Paramètres",
      "Saved":"Enregistrée",
      "Reader":"Lectrice",
      "Hey":"Bonjour",
      "Find the next adventure to lose yourself in":"Trouvez la prochaine aventure dans laquelle vous perdre",
      "Over 10,000 titles to choose from":"Plus de 10 000 titres au choix",
      "Currently Trending":"Tendance actuelle",
      "Here's a Quote for you,":"Voici un devis pour vous,"
    }
  },
  hi: {
    translation: {
      "Home": "होम पेज",
      "Read":"पढ़ें",
      "Reading":"अध्ययन",
      "Discover":"जाँच करें",
      "Completed":"समाप्तः",
      "Tools":"हथियार",
      "My Library":"मेरा पुस्तकालय",
      "Profile":"प्रोफ़ाइल",
      "Summary Generator":"सारांश जेनरेटर",
      "Liked":"पसंद",
      "Bookmarks":"बुकमार्क",
      "Detect AI":"AI साहित्यिक चोरी",
      "Settings":"समायोजन",
      "Saved":"बचाए हुए",
      "Reader":"पाठक",
      "Hey":"नमस्कार",
      "Find the next adventure to lose yourself in":"अपने आप को खोने के लिए अगला रोमांच खोजें",
      "Over 10,000 titles to choose from":"चुनने के लिए 10,000 से अधिक शीर्षक",
      "Currently Trending":"अभि ट्रेंडिंग",
      "Here's a Quote for you,":"यहाँ आपके लिए एक उद्धरण है,",

      "Patience is a Virtue":"सब्र एक गुण है",
      "Summarize":"संक्षेप",
      "Change Image":"चित्र को बदलें",
      "Here is Your Uploaded File":"यहां आपकी अपलोड की गई फ़ाइल है",
      "BROWSE" : "चयन करें",
      "There are no size limits!":"कोई आकार सीमा नहीं है!",
      "Summarize a Document":"दस्तावेज़ को सारांशित करें",
      "Next":"अगला",
      "Create a password to read anytime using on any device":"किसी भी डिवाइस पर किसी भी समय पढ़ने के लिए एक पासवर्ड बनाएं",
      "Gyani is personalized for you":"ज्ञानी आपके लिए वैयक्तिकृत है",
      "Finish setting up your account":"अपना खाता सेट करना समाप्त करें",
      "Upload a File / write Text you want to summarize":"एक फ़ाइल अपलोड करें / वह पाठ लिखें जिसे आप सारांशित करना चाहते हैं",
      "Read Text":"पढ़ें",
      "Search Results":"खोज के परिणाम",
      "Write Text":"लिखें",
      "Detect AI Plagiarism":"एआई साहित्यिक चोरी का पता लगाएं",
      "DETECT":"पता लगाएं",
      "Search by author, ISBN, title or topic":"लेखक, ISBN, शीर्षक या विषय द्वारा खोजें",
      "My Notes":"मेरी टिप्पणियाँ",
    }
  },
  ka: {
    translation: {
      "Home": "ಮುಖಪುಟ",
      "Read":"ಓದು",
      "Reading":"ಓಡುವವು",
      "Discover":"ಅನ್ವೇಷಿಸಿ",
      "Completed":"ಪೂರ್ಣಗೊಂಡವವು",
      "Tools":"ಪರಿಕರಗಳು",
      "My Library":"ನನ್ನ ಗ್ರಂಥಾಲಯ",
      "Profile":"ಪ್ರೊಫೈಲ್",
      "Summary Generator":"ಸಾರಾಂಶ ಜನರೇಟರ್",
      "Liked":"ಇಷ್ಟಪಟ್ಟಿರುವ",
      "Bookmarks":"ಬುಕ್‌ಮಾರ್ಕ್‌ಗಳು",
      "Detect AI":"AI ಪದಗಳನ್ನು ಪತ್ತೆ ಮಾಡಿ",
      "Settings":"ಸಂಯೋಜನೆಗಳು",
      "Saved":"ಸೇವ್ ಮಾಡಿರುವ",
      "Reader":"ಓದುಗ",
      "Hey":"ನಮಸ್ಕಾರ",
      "Find the next adventure to lose yourself in":"ನಿಮ್ಮನ್ನು ಕಳೆದುಕೊಳ್ಳಲು ಮುಂದಿನ ಸಾಹಸವನ್ನು ಹುಡುಕಿ",
      "Over 10,000 titles to choose from":"ಆಯ್ಕೆ ಮಾಡಲು 10,000 ಕ್ಕೂ ಹೆಚ್ಚು ಶೀರ್ಷಿಕೆಗಳು",
      "Currently Trending":"ಪ್ರಸ್ತುತ ಟ್ರೆಂಡಿಂಗ್",
      "Here's a Quote for you,":"ನಿಮಗಾಗಿ ಒಂದು ಉಲ್ಲೇಖ ಇದೆ,",
      "Notes": "ನನ್ನ ಟಿಪ್ಪಣಿಗಳು",


      "Patience is a Virtue":"ತಾಳ್ಮೆ ಒಂದು ಪುಣ್ಯ",
      "Summarize":"ಸಾರಾಂಶಗೊಳಿಸಿ",
      "Change Image":"ಚಿತ್ರವನ್ನು ಬದಲಾಯಿಸಿ",
      "Here is Your Uploaded File":"ನಿಮ್ಮ ಅಪ್‌ಲೋಡ್ ಮಾಡಿದ ಫೈಲ್ ಇಲ್ಲಿದೆ",
      "BROWSE" : "ಆಯ್ಕೆ ಮಾಡಿ",
      "There are no size limits!":"ಯಾವುದೇ ಗಾತ್ರದ ಮಿತಿಗಳಿಲ್ಲ!",
      "Summarize a Document":"ಡಾಕ್ಯುಮೆಂಟ್ ಅನ್ನು ಸಾರಾಂಶಗೊಳಿಸಿ",
      "Next":"ಮುಂದೆ",
      "Create a password to read anytime using on any device":"ಯಾವುದೇ ಸಾಧನದಲ್ಲಿ ಬಳಸಿ ಯಾವುದೇ ಸಮಯದಲ್ಲಿ ಓದಲು ಪಾಸ್‌ವರ್ಡ್ ರಚಿಸಿ",
      "Gyani is personalized for you":"Gyani ನಿಮಗಾಗಿ ವೈಯಕ್ತೀಕರಿಸಲಾಗಿದೆ",
      "Finish setting up your account":"ನಿಮ್ಮ ಖಾತೆಯನ್ನು ಹೊಂದಿಸುವುದನ್ನು ಪೂರ್ಣಗೊಳಿಸಿ",
      "Upload a File / write Text you want to summarize":"ಫೈಲ್ ಅನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ / ನೀವು ಸಂಕ್ಷಿಪ್ತಗೊಳಿಸಲು ಬಯಸುವ ಪಠ್ಯವನ್ನು ಬರೆಯಿರಿ",
      "Read Text":"ಪಠ್ಯವನ್ನು ಓದಿ",
      "Search Results":"ಹುಡುಕಾಟ ಫಲಿತಾಂಶಗಳು",
      "Write Text":"ಪಠ್ಯವನ್ನು ಬರೆಯಿರಿ",
      "Detect AI Plagiarism":"AI ಕೃತಿಚೌರ್ಯವನ್ನು ಪತ್ತೆ ಮಾಡಿ",
      "DETECT":"ಪತ್ತೆ ಮಾಡಿ",
      "Search by author, ISBN, title or topic":"ಲೇಖಕ, ISBN, ಶೀರ್ಷಿಕೆ ಅಥವಾ ವಿಷಯದ ಮೂಲಕ ಹುಡುಕಿ"
    },
  },
  
  ben:{
    translation:{
    "Home": "হোমপেজ",
    "Read":"পঢ়া",
    "Reading":"পঢ়ি থকা",
    "Discover":"আৱিষ্কাৰ কৰা",
    "Completed":"সম্পূৰ্ণ হ’ল",
    "Tools":"সঁজুলি",
    "My Library":"মোৰ লাইব্ৰেৰী",
    "Profile":"ৰূপৰেখা",
    "Summary Generator":"সাৰাংশ জেনেৰেটৰ",
    "Liked":"ভাল লাগিল",
    "Bookmarks":"বুকমাৰ্ক",
    "Detect AI":"এআই শব্দ চিনাক্ত কৰা",
    "Settings":"ছেটিংছ",
    "Saved":"সংৰক্ষণ কৰা হৈছে",
    "Reader":"পাঠক",
    "Hey":"নমস্কাৰ",
    "Find the next adventure to lose yourself in":"নিজকে হেৰুৱাবলৈ পৰৱৰ্তী দুঃসাহসিক অভিযান বিচাৰি উলিয়াওক",
    "Over 10,000 titles to choose from":"১০,০০০ তকৈ অধিক শিৰোনামৰ মাজৰ পৰা বাছি ল’ব পাৰি",
    "Currently Trending":"বৰ্তমান ট্ৰেণ্ডিং",
    "Here's a Quote for you,":"আপোনাৰ বাবে এটা উদ্ধৃতি আগবঢ়ালোঁ,",
    "Patience is a Virtue":"ধৈর্য একটি সদ্গুণ",
    "Summarize":"সংক্ষিপ্ত করুন",
    "Change Image":"ছবি পরিবর্তন করুন",
    "Here is Your Uploaded File":"এখানে আপনার আপলোড করা ছবি",
    "BROWSE" : "ব্রাউজ",
    "There are no size limits!":"কোন আকারের সীমা নেই",
    "Summarize a Document":"একটি নথি সংক্ষিপ্ত করুন",
    "Next":"তার পর",
    "Create a password to read anytime using on any device":"যেকোনো সময় যেকোনো যন্ত্র  ব্যবহার করে পড়ার জন্য একটি পাসওয়ার্ড তৈরি করুন",
    "Gyani is personalized for you":"জ্ঞানী আপনার জন্য ব্যক্তিগতকৃত",
    "Finish setting up your account":"আপনার অ্যাকাউন্ট সেট আপ শেষ করুন",
    "Upload a File / write Text you want to summarize":"আপনি সংক্ষিপ্ত করতে চান এমন একটি ফাইল/লেখা পাঠ্য আপলোড করুন",
    "Read Text":"টেক্সট পঢ়ক",
    "Search Results":"সন্ধানৰ ফলাফল",
    "Write Text":"লিখা লিখা",
    "Detect AI Plagiarism":"AI Plagiarism ধৰা পেলাওক",
    "DETECT":"চিনাক্ত কৰা",
    "Search by author, ISBN, title or topic":"লেখক, ISBN, শিৰোনাম বা বিষয় অনুসৰি সন্ধান কৰক"
    }
  }
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "en",     
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

  export default i18n;