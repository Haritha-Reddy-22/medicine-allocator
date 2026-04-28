// Data Setup
const MOCK_MEDICINES = [
  "Paracetamol 500mg", "Amoxicillin 250mg", "Ibuprofen 400mg", "Cetirizine 10mg", "ORS Powder", 
  "Azithromycin 500mg", "Metformin 500mg", "Amlodipine 5mg", "Pantoprazole 40mg", "Iron & Folic Acid",
  "Diclofenac Gel", "Aspirin 75mg", "Ciprofloxacin 500mg", "Ceftriaxone Injection", "Doxycycline 100mg",
  "Salbutamol Inhaler", "Omeprazole 20mg", "Calcium + Vitamin D3", "B-Complex Syrup", "Albendazole 400mg",
  "Metronidazole 400mg", "Levocetirizine 5mg", "Domperidone 10mg", "Ondansetron 4mg", "Fluconazole 150mg",
  "Atorvastatin 10mg", "Losartan 50mg", "Insulin Mixtard", "Telmisartan 40mg", "Tetanus Toxoid Injection"
];

const MOCK_CENTRES = [
  { id: 1, name: "PHC Kalamb", village: "Kalamb", lat: 20.3546, lng: 78.3697 },
  { id: 2, name: "Sub-centre Ralegaon", village: "Ralegaon", lat: 20.3802, lng: 78.4320 },
  { id: 3, name: "Rural Hospital Yavatmal", village: "Yavatmal", lat: 20.3888, lng: 78.1204 },
  { id: 4, name: "PHC Babhulgaon", village: "Babhulgaon", lat: 20.5510, lng: 78.1639 },
  { id: 5, name: "City Medicals", village: "Yavatmal", lat: 20.3950, lng: 78.1300 },
  { id: 6, name: "Sanjeevani Pharmacy", village: "Yavatmal", lat: 20.3800, lng: 78.1150 },
  { id: 7, name: "Om Sai Medical", village: "Yavatmal", lat: 20.3822, lng: 78.1250 },
  { id: 8, name: "LifeCare Clinic & Store", village: "Yavatmal", lat: 20.4000, lng: 78.1200 },
  { id: 9, name: "Sub-centre Ghatanji", village: "Ghatanji", lat: 20.1364, lng: 78.3188 },
  { id: 10, name: "PHC Maregaon", village: "Maregaon", lat: 20.1064, lng: 78.7891 },
  { id: 11, name: "Sub-centre Zari Jamani", village: "Zari Jamani", lat: 19.8659, lng: 78.4908 },
  { id: 12, name: "PHC Wani", village: "Wani", lat: 20.0634, lng: 78.9500 },
  { id: 13, name: "Darwha Rural Hospital", village: "Darwha", lat: 20.3134, lng: 77.7725 },
  { id: 14, name: "Pusad Medical Store", village: "Pusad", lat: 19.9079, lng: 77.5681 },
  { id: 15, name: "Digras Pharmacy", village: "Digras", lat: 20.1170, lng: 77.7214 },
  { id: 16, name: "Umarkhed Health Centre", village: "Umarkhed", lat: 19.6000, lng: 77.6920 },
  { id: 17, name: "Arni Sub-centre", village: "Arni", lat: 20.0760, lng: 77.9400 },
  { id: 18, name: "Ner PHC", village: "Ner", lat: 20.4850, lng: 77.9100 },
  { id: 19, name: "Bori Medicals", village: "Bori", lat: 20.3100, lng: 77.9800 },
  { id: 20, name: "Gour Pharmacy", village: "Kalamb", lat: 20.3580, lng: 78.3600 },
  { id: 21, name: "Pendurthi PHC", village: "Pendurthi", lat: 17.8175, lng: 83.1979 },
  { id: 22, name: "Vizag Apollo Pharmacy", village: "Vizag", lat: 17.6868, lng: 83.2185 },
  { id: 23, name: "Gajuwaka MedPlus", village: "Gajuwaka", lat: 17.6830, lng: 83.1678 },
  { id: 24, name: "KGH Hospital", village: "Vizag", lat: 17.7083, lng: 83.3000 },
  { id: 25, name: "MVP Colony Pharmacy", village: "Vizag", lat: 17.7383, lng: 83.3361 },
  { id: 26, name: "Anakapalle PHC", village: "Anakapalle", lat: 17.6881, lng: 83.0041 },
  { id: 27, name: "Simhachalam Clinic", village: "Pendurthi", lat: 17.7669, lng: 83.2505 },
  { id: 28, name: "Steel Plant Hospital", village: "Gajuwaka", lat: 17.6362, lng: 83.1706 },
  { id: 29, name: "Bheemili Sub-centre", village: "Bheemili", lat: 17.8872, lng: 83.4449 },
  { id: 30, name: "Madhurawada Medicals", village: "Madhurawada", lat: 17.8155, lng: 83.3619 }
];

const initDB = () => {
  if (!localStorage.getItem('mednear_medicines')) localStorage.setItem('mednear_medicines', JSON.stringify(MOCK_MEDICINES));
  
  // Force refresh of local storage if we added more mock centres
  const savedCentres = JSON.parse(localStorage.getItem('mednear_centres') || '[]');
  if (savedCentres.length < MOCK_CENTRES.length) {
    localStorage.setItem('mednear_centres', JSON.stringify(MOCK_CENTRES));
    localStorage.removeItem('mednear_stock'); // Force new stock to be generated for new centres
  }
  
  if (!localStorage.getItem('mednear_stock')) {
    const stock = {};
    const now = Date.now();
    MOCK_CENTRES.forEach(c => {
      stock[c.id] = {};
      MOCK_MEDICINES.forEach(m => {
        const inStock = Math.random() > 0.3;
        const ageHrs = Math.random() * 96; // 0 to 96 hours
        stock[c.id][m] = { inStock, updatedAt: now - (ageHrs * 60 * 60 * 1000) };
      });
    });
    localStorage.setItem('mednear_stock', JSON.stringify(stock));
  }
};

const getDB = (key) => JSON.parse(localStorage.getItem(`mednear_${key}`));
const setDB = (key, val) => localStorage.setItem(`mednear_${key}`, JSON.stringify(val));

// i18n
const i18n = {
  en: {
    app_title: "Medicine is nearby.",
    subtitle: "Find essential stock instantly",
    patient_btn: "I Need Medicine",
    worker_btn: "I'm a Health Worker",
    find_med: "Find Medicine",
    search_pl: "Search medicine...",
    no_results: "No centres found",
    expand_rad: "Expand search radius",
    in_stock: "In Stock",
    out_stock: "Out of Stock",
    outdated: "May be outdated (>48h)",
    directions: "Directions",
    updated: "Updated",
    worker_login: "Worker Login",
    phone: "Phone Number",
    otp: "OTP",
    login_btn: "Verify & Login",
    update_stock: "Update Stock",
    save_btn: "Save & Publish",
    loc_unknown: "Location Unknown - Tap to set",
    loc_set: "Current Location",
    enter_village: "Enter your village",
    save: "Save",
    km: "km",
    add_medicine: "Add Medicine",
    med_name: "Medicine Name"
  },
  hi: {
    app_title: "दवा आपके पास है।",
    subtitle: "तुरंत आवश्यक स्टॉक खोजें",
    patient_btn: "मुझे दवा चाहिए",
    worker_btn: "मैं स्वास्थ्य कार्यकर्ता हूँ",
    find_med: "दवा खोजें",
    search_pl: "दवा खोजें...",
    no_results: "कोई केंद्र नहीं मिला",
    expand_rad: "खोज दायरा बढ़ाएं",
    in_stock: "उपलब्ध",
    out_stock: "उपलब्ध नहीं",
    outdated: "पुराना हो सकता है (>48h)",
    directions: "दिशा-निर्देश",
    updated: "अपडेट किया गया",
    worker_login: "कार्यकर्ता लॉगिन",
    phone: "फ़ोन नंबर",
    otp: "ओटीपी",
    login_btn: "सत्यापित करें और लॉगिन",
    update_stock: "स्टॉक अपडेट करें",
    save_btn: "सहेजें और प्रकाशित करें",
    loc_unknown: "स्थान अज्ञात - सेट करने के लिए टैप करें",
    loc_set: "वर्तमान स्थान",
    enter_village: "अपना गाँव दर्ज करें",
    save: "सहेजें",
    km: "किमी",
    add_medicine: "दवा जोड़ें",
    med_name: "दवा का नाम"
  },
  mr: {
    app_title: "औषध जवळच आहे.",
    subtitle: "त्वरित आवश्यक स्टॉक शोधा",
    patient_btn: "मला औषध हवे आहे",
    worker_btn: "मी आरोग्य कर्मचारी आहे",
    find_med: "औषध शोधा",
    search_pl: "औषध शोधा...",
    no_results: "कोणतेही केंद्र आढळले नाही",
    expand_rad: "शोध त्रिज्या वाढवा",
    in_stock: "उपलब्ध",
    out_stock: "उपलब्ध नाही",
    outdated: "जुने असू शकते (>48h)",
    directions: "दिशा",
    updated: "अद्यतनित",
    worker_login: "कर्मचारी लॉगिन",
    phone: "फोन नंबर",
    otp: "ओटीपी",
    login_btn: "पडताळणी आणि लॉगिन",
    update_stock: "स्टॉक अद्यतनित करा",
    save_btn: "जतन करा आणि प्रकाशित करा",
    loc_unknown: "स्थान अज्ञात - सेट करण्यासाठी टॅप करा",
    loc_set: "वर्तमान स्थान",
    enter_village: "तुमचे गाव प्रविष्ट करा",
    save: "जतन करा",
    km: "किमी",
    add_medicine: "औषध जोडा",
    med_name: "औषधाचे नाव"
  },
  bn: {
    app_title: "ওষুধ কাছাকাছি আছে।",
    subtitle: "অবিলম্বে প্রয়োজনীয় স্টক খুঁজুন",
    patient_btn: "আমার ওষুধ দরকার",
    worker_btn: "আমি একজন স্বাস্থ্যকর্মী",
    find_med: "ওষুধ খুঁজুন",
    search_pl: "ওষুধ খুঁজুন...",
    no_results: "কোন কেন্দ্র পাওয়া যায়নি",
    expand_rad: "অনুসন্ধানের ব্যাসার্ধ বাড়ান",
    in_stock: "মজুদ আছে",
    out_stock: "মজুদ নেই",
    outdated: "পুরানো হতে পারে (>48h)",
    directions: "দিকনির্দেশ",
    updated: "আপডেট করা হয়েছে",
    worker_login: "কর্মী লগইন",
    phone: "ফোন নম্বর",
    otp: "ওটিপি",
    login_btn: "যাচাই এবং লগইন",
    update_stock: "স্টক আপডেট করুন",
    save_btn: "সংরক্ষণ ও প্রকাশ করুন",
    loc_unknown: "অবস্থান অজানা - সেট করতে আলতো চাপুন",
    loc_set: "বর্তমান অবস্থান",
    enter_village: "আপনার গ্রাম লিখুন",
    save: "সংরক্ষণ করুন",
    km: "কিমি",
    add_medicine: "ওষুধ যোগ করুন",
    med_name: "ওষুধের নাম"
  },
  te: {
    app_title: "మందు సమీపంలో ఉంది.",
    subtitle: "తక్షణమే మందులను కనుగొనండి",
    patient_btn: "నాకు మందు కావాలి",
    worker_btn: "నేను ఆరోగ్య కార్యకర్తను",
    find_med: "మందును కనుగొనండి",
    search_pl: "మందు కోసం వెతకండి...",
    no_results: "ఏ కేంద్రాలు కనుగొనబడలేదు",
    expand_rad: "శోధన పరిధిని పెంచండి",
    in_stock: "స్టాక్ ఉంది",
    out_stock: "స్టాక్ లేదు",
    outdated: "పాతది కావచ్చు (>48h)",
    directions: "దిశలు",
    updated: "నవీకరించబడింది",
    worker_login: "కార్యకర్త లాగిన్",
    phone: "ఫోన్ నంబర్",
    otp: "ఓటీపీ",
    login_btn: "ధృవీకరించి లాగిన్ అవ్వండి",
    update_stock: "స్టాక్ నవీకరించండి",
    save_btn: "సేవ్ మరియు పబ్లిష్",
    loc_unknown: "స్థానం తెలియదు - సెట్ చేయడానికి నొక్కండి",
    loc_set: "ప్రస్తుత స్థానం",
    enter_village: "మీ గ్రామాన్ని నమోదు చేయండి",
    save: "సేవ్",
    km: "కి.మీ",
    add_medicine: "మందు జోడించండి",
    med_name: "మందు పేరు"
  },
  ta: {
    app_title: "மருந்து அருகில் உள்ளது.",
    subtitle: "தேவையான மருந்தை தேடுங்கள்",
    patient_btn: "எனக்கு மருந்து தேவை",
    worker_btn: "நான் ஒரு சுகாதார பணியாளர்",
    find_med: "மருந்தை தேடுங்கள்",
    search_pl: "மருந்தை தேடுங்கள்...",
    no_results: "எந்த மையமும் கிடைக்கவில்லை",
    expand_rad: "தேடல் வரம்பை விரிவாக்கு",
    in_stock: "கையிருப்பில் உள்ளது",
    out_stock: "கையிருப்பில் இல்லை",
    outdated: "பழையதாக இருக்கலாம் (>48h)",
    directions: "திசைகள்",
    updated: "புதுப்பிக்கப்பட்டது",
    worker_login: "பணியாளர் உள்நுழைவு",
    phone: "தொலைபேசி எண்",
    otp: "ஓடிபி",
    login_btn: "சரிபார்த்து உள்நுழையவும்",
    update_stock: "கையிருப்பை புதுப்பி",
    save_btn: "சேமித்து வெளியிடு",
    loc_unknown: "இடம் தெரியவில்லை - தட்டவும்",
    loc_set: "தற்போதைய இடம்",
    enter_village: "கிராமத்தை உள்ளிடவும்",
    save: "சேமி",
    km: "கிமீ",
    add_medicine: "மருந்தைச் சேர்",
    med_name: "மருந்தின் பெயர்"
  },
  kn: {
    app_title: "ಔಷಧಿ ಹತ್ತಿರದಲ್ಲಿದೆ.",
    subtitle: "ಅಗತ್ಯವಿರುವ ಸ್ಟಾಕ್ ಅನ್ನು ಹುಡುಕಿ",
    patient_btn: "ನನಗೆ ಔಷಧಿ ಬೇಕು",
    worker_btn: "ನಾನು ಆರೋಗ್ಯ ಕಾರ್ಯಕರ್ತ",
    find_med: "ಔಷಧಿ ಹುಡುಕಿ",
    search_pl: "ಔಷಧಿ ಹುಡುಕಿ...",
    no_results: "ಯಾವುದೇ ಕೇಂದ್ರ ಕಂಡುಬಂದಿಲ್ಲ",
    expand_rad: "ಹುಡುಕಾಟದ ವ್ಯಾಪ್ತಿಯನ್ನು ವಿಸ್ತರಿಸಿ",
    in_stock: "ಸ್ಟಾಕ್ ಇದೆ",
    out_stock: "ಸ್ಟಾಕ್ ಇಲ್ಲ",
    outdated: "ಹಳೆಯದಾಗಿರಬಹುದು (>48h)",
    directions: "ನಿರ್ದೇಶನಗಳು",
    updated: "ನವೀಕರಿಸಲಾಗಿದೆ",
    worker_login: "ಕಾರ್ಯಕರ್ತ ಲಾಗಿನ್",
    phone: "ಫೋನ್ ಸಂಖ್ಯೆ",
    otp: "ಓಟಿಪಿ",
    login_btn: "ಪರಿಶೀಲಿಸಿ ಮತ್ತು ಲಾಗಿನ್ ಮಾಡಿ",
    update_stock: "ಸ್ಟಾಕ್ ನವೀಕರಿಸಿ",
    save_btn: "ಉಳಿಸಿ ಮತ್ತು ಪ್ರಕಟಿಸಿ",
    loc_unknown: "ಸ್ಥಳ ತಿಳಿದಿಲ್ಲ - ಟ್ಯಾಪ್ ಮಾಡಿ",
    loc_set: "ಪ್ರಸ್ತುತ ಸ್ಥಳ",
    enter_village: "ನಿಮ್ಮ ಹಳ್ಳಿಯನ್ನು ನಮೂದಿಸಿ",
    save: "ಉಳಿಸಿ",
    km: "ಕಿ.ಮೀ",
    add_medicine: "ಔಷಧಿ ಸೇರಿಸಿ",
    med_name: "ಔಷಧಿಯ ಹೆಸರು"
  },
  gu: {
    app_title: "દવા નજીકમાં છે.",
    subtitle: "જરૂરી સ્ટોક તરત જ શોધો",
    patient_btn: "મારે દવા જોઈએ છે",
    worker_btn: "હું આરોગ્ય કાર્યકર છું",
    find_med: "દવા શોધો",
    search_pl: "દવા શોધો...",
    no_results: "કોઈ કેન્દ્ર મળ્યું નથી",
    expand_rad: "શોધ ત્રિજ્યા વિસ્તૃત કરો",
    in_stock: "સ્ટોકમાં છે",
    out_stock: "સ્ટોકમાં નથી",
    outdated: "જૂનું હોઈ શકે છે (>48h)",
    directions: "દિશાઓ",
    updated: "અપડેટ કર્યું",
    worker_login: "કાર્યકર લોગિન",
    phone: "ફોન નંબર",
    otp: "ઓટીપી",
    login_btn: "ચકાસો અને લોગિન કરો",
    update_stock: "સ્ટોક અપડેટ કરો",
    save_btn: "સાચવો અને પ્રકાશિત કરો",
    loc_unknown: "સ્થાન અજ્ઞાત - સેટ કરવા ટેપ કરો",
    loc_set: "વર્તમાન સ્થાન",
    enter_village: "તમારું ગામ દાખલ કરો",
    save: "સાચવો",
    km: "કિમી",
    add_medicine: "દવા ઉમેરો",
    med_name: "દવાનું નામ"
  },
  ml: {
    app_title: "മരുന്ന് അടുത്തുണ്ട്.",
    subtitle: "ആവശ്യമായ മരുന്ന് ഉടൻ കണ്ടെത്തുക",
    patient_btn: "എനിക്ക് മരുന്ന് വേണം",
    worker_btn: "ഞാൻ ഒരു ആരോഗ്യ പ്രവർത്തകനാണ്",
    find_med: "മരുന്ന് കണ്ടെത്തുക",
    search_pl: "മരുന്ന് തിരയുക...",
    no_results: "ഒരു കേന്ദ്രവും കണ്ടെത്തിയില്ല",
    expand_rad: "തിരയൽ പരിധി വിപുലീകരിക്കുക",
    in_stock: "സ്റ്റോക്കുണ്ട്",
    out_stock: "സ്റ്റോക്കില്ല",
    outdated: "പഴയതായിരിക്കാം (>48h)",
    directions: "വഴികൾ",
    updated: "അപ്ഡേറ്റ് ചെയ്തു",
    worker_login: "പ്രവർത്തക ലോഗിൻ",
    phone: "ഫോൺ നമ്പർ",
    otp: "ഒടിപി",
    login_btn: "പരിശോധിച്ച് ലോഗിൻ ചെയ്യുക",
    update_stock: "സ്റ്റോക്ക് അപ്ഡേറ്റ് ചെയ്യുക",
    save_btn: "സേവ് ചെയ്ത് പ്രസിദ്ധീകരിക്കുക",
    loc_unknown: "സ്ഥലം അജ്ഞാതമാണ് - ടാപ്പുചെയ്യുക",
    loc_set: "നിലവിലെ സ്ഥലം",
    enter_village: "നിങ്ങളുടെ ഗ്രാമം നൽകുക",
    save: "സേവ് ചെയ്യുക",
    km: "കി.മീ",
    add_medicine: "മരുന്ന് ചേർക്കുക",
    med_name: "മരുന്നിന്റെ പേര്"
  },
  pa: {
    app_title: "ਦਵਾਈ ਨੇੜੇ ਹੈ।",
    subtitle: "ਲੋੜੀਂਦਾ ਸਟਾਕ ਤੁਰੰਤ ਲੱਭੋ",
    patient_btn: "ਮੈਨੂੰ ਦਵਾਈ ਚਾਹੀਦੀ ਹੈ",
    worker_btn: "ਮੈਂ ਸਿਹਤ ਕਰਮਚਾਰੀ ਹਾਂ",
    find_med: "ਦਵਾਈ ਲੱਭੋ",
    search_pl: "ਦਵਾਈ ਲੱਭੋ...",
    no_results: "ਕੋਈ ਕੇਂਦਰ ਨਹੀਂ ਮਿਲਿਆ",
    expand_rad: "ਖੋਜ ਦਾ ਘੇਰਾ ਵਧਾਓ",
    in_stock: "ਸਟਾਕ ਵਿੱਚ ਹੈ",
    out_stock: "ਸਟਾਕ ਵਿੱਚ ਨਹੀਂ",
    outdated: "ਪੁਰਾਣਾ ਹੋ ਸਕਦਾ ਹੈ (>48h)",
    directions: "ਦਿਸ਼ਾਵਾਂ",
    updated: "ਅੱਪਡੇਟ ਕੀਤਾ",
    worker_login: "ਵਰਕਰ ਲਾਗਇਨ",
    phone: "ਫੋਨ ਨੰਬਰ",
    otp: "ਓਟੀਪੀ",
    login_btn: "ਤਸਦੀਕ ਕਰੋ ਅਤੇ ਲਾਗਇਨ ਕਰੋ",
    update_stock: "ਸਟਾਕ ਅੱਪਡੇਟ ਕਰੋ",
    save_btn: "ਸੇਵ ਅਤੇ ਪਬਲਿਸ਼ ਕਰੋ",
    loc_unknown: "ਸਥਾਨ ਅਣਪਛਾਤਾ - ਸੈੱਟ ਕਰਨ ਲਈ ਟੈਪ ਕਰੋ",
    loc_set: "ਮੌਜੂਦਾ ਸਥਾਨ",
    enter_village: "ਆਪਣਾ ਪਿੰਡ ਦਾਖਲ ਕਰੋ",
    save: "ਸੇਵ ਕਰੋ",
    km: "ਕਿ.ਮੀ",
    add_medicine: "ਦਵਾਈ ਸ਼ਾਮਲ ਕਰੋ",
    med_name: "ਦਵਾਈ ਦਾ ਨਾਮ"
  },
  or: {
    app_title: "ଔଷଧ ପାଖରେ ଅଛି।",
    subtitle: "ତୁରନ୍ତ ଆବଶ୍ୟକ ଷ୍ଟକ୍ ଖୋଜନ୍ତୁ",
    patient_btn: "ମୋତେ ଔଷଧ ଦରକାର",
    worker_btn: "ମୁଁ ଜଣେ ସ୍ୱାସ୍ଥ୍ୟ କର୍ମୀ",
    find_med: "ଔଷଧ ଖୋଜନ୍ତୁ",
    search_pl: "ଔଷଧ ଖୋଜନ୍ତୁ...",
    no_results: "କୌଣସି କେନ୍ଦ୍ର ମିଳିଲା ନାହିଁ",
    expand_rad: "ସନ୍ଧାନ ପରିସର ବଢ଼ାନ୍ତୁ",
    in_stock: "ଷ୍ଟକ୍ ଅଛି",
    out_stock: "ଷ୍ଟକ୍ ନାହିଁ",
    outdated: "ପୁରୁଣା ହୋଇପାରେ (>48h)",
    directions: "ଦିଗ",
    updated: "ଅପଡେଟ୍ ହୋଇଛି",
    worker_login: "କର୍ମୀ ଲଗଇନ୍",
    phone: "ଫୋନ୍ ନମ୍ବର",
    otp: "ଓଟିପି",
    login_btn: "ଯାଞ୍ଚ କରନ୍ତୁ ଏବଂ ଲଗଇନ୍ କରନ୍ତୁ",
    update_stock: "ଷ୍ଟକ୍ ଅପଡେଟ୍ କରନ୍ତୁ",
    save_btn: "ସେଭ୍ ଏବଂ ପ୍ରକାଶ କରନ୍ତୁ",
    loc_unknown: "ସ୍ଥାନ ଅଜ୍ଞାତ - ସେଟ୍ କରିବାକୁ ଟ୍ୟାପ୍ କରନ୍ତୁ",
    loc_set: "ବର୍ତ୍ତମାନର ସ୍ଥାନ",
    enter_village: "ଆପଣଙ୍କ ଗ୍ରାମ ପ୍ରବେଶ କରନ୍ତୁ",
    save: "ସେଭ୍ କରନ୍ତୁ",
    km: "କି.ମି",
    add_medicine: "ଔଷଧ ଯୋଡନ୍ତୁ",
    med_name: "ଔଷଧର ନାମ"
  }
};

const t = (key) => {
  const lang = localStorage.getItem('mednear_lang') || 'en';
  return (i18n[lang] && i18n[lang][key]) || i18n['en'][key] || key;
};

// Utilities
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon/2) * Math.sin(dLon/2);
  return (R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)))).toFixed(1);
};

const timeAgo = (ts) => {
  const diff = Math.floor((Date.now() - ts) / 1000);
  if (diff < 60) return 'Just now';
  if (diff < 3600) return `${Math.floor(diff/60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff/3600)}h ago`;
  return `${Math.floor(diff/86400)}d ago`;
};

const showToast = (msg) => {
  let container = document.querySelector('.toast-container');
  if (!container) { container = document.createElement('div'); container.className = 'toast-container'; document.body.appendChild(container); }
  const toast = document.createElement('div'); toast.className = `toast`;
  toast.innerHTML = `<i data-lucide="check-circle"></i> <span>${msg}</span>`;
  container.appendChild(toast); lucide.createIcons();
  setTimeout(() => toast.remove(), 3000);
};

// State
let currentView = localStorage.getItem('mednear_lang') ? 'landing' : 'language';
let previousView = null; // Store state across language switches
let currentSearch = '';
let currentFilter = 20;
let loggedInCentre = null;
let userLoc = null; // Mock dynamic location

// View Rendering
const app = document.getElementById('app');

const renderApp = () => {
  app.innerHTML = `
    <!-- Language Selection -->
    <div id="view-language" class="view">
      <div class="content-container" style="justify-content: center; align-items: center;">
        <h2 style="margin-bottom: 0.5rem">Select Language</h2>
        <p style="color: var(--text-secondary)">भाषा चुनें / भाषा निवडा</p>
        
        <div class="lang-grid">
          <button class="lang-card" onclick="setLang('hi')"><div class="lang-script">हिंदी</div><div class="lang-roman">Hindi</div></button>
          <button class="lang-card" onclick="setLang('mr')"><div class="lang-script">मराठी</div><div class="lang-roman">Marathi</div></button>
          <button class="lang-card" onclick="setLang('bn')"><div class="lang-script">বাংলা</div><div class="lang-roman">Bengali</div></button>
          <button class="lang-card" onclick="setLang('te')"><div class="lang-script">తెలుగు</div><div class="lang-roman">Telugu</div></button>
          <button class="lang-card" onclick="setLang('ta')"><div class="lang-script">தமிழ்</div><div class="lang-roman">Tamil</div></button>
          <button class="lang-card" onclick="setLang('kn')"><div class="lang-script">ಕನ್ನಡ</div><div class="lang-roman">Kannada</div></button>
          <button class="lang-card" onclick="setLang('gu')"><div class="lang-script">ગુજરાતી</div><div class="lang-roman">Gujarati</div></button>
          <button class="lang-card" onclick="setLang('ml')"><div class="lang-script">മലയാളം</div><div class="lang-roman">Malayalam</div></button>
          <button class="lang-card" onclick="setLang('pa')"><div class="lang-script">ਪੰਜਾਬੀ</div><div class="lang-roman">Punjabi</div></button>
          <button class="lang-card" onclick="setLang('or')"><div class="lang-script">ଓଡ଼ିଆ</div><div class="lang-roman">Odia</div></button>
          <button class="lang-card" onclick="setLang('en')" style="grid-column: span 2;"><div class="lang-script">English</div></button>
        </div>
      </div>
    </div>

    <!-- Landing View -->
    <div id="view-landing" class="view">
      <div class="landing-header">
        <button class="lang-toggle-btn" onclick="openLangPicker()"><i data-lucide="globe" style="width:24px;height:24px;"></i></button>
      </div>
      <div class="content-container" style="justify-content: center; align-items: center; text-align: center;">
        <i data-lucide="cross" style="width: 72px; height: 72px; color: var(--accent-color); margin-bottom: 1rem;"></i>
        <h1 style="font-size: 2.5rem; line-height: 1.2; margin-bottom: 0.5rem;">${t('app_title')}</h1>
        <p style="font-size: 1.1rem; color: var(--text-secondary); margin-bottom: 3rem;">${t('subtitle')}</p>
        
        <div style="width: 100%; display: flex; flex-direction: column; gap: 1rem;">
          <button class="btn btn-primary" onclick="navigate('patient')">
            <div class="flex-row"><i data-lucide="search"></i> ${t('patient_btn')}</div>
          </button>
          <button class="btn btn-secondary" onclick="navigate('worker-auth')">
            <div class="flex-row"><i data-lucide="shield-plus"></i> ${t('worker_btn')}</div>
          </button>
        </div>
      </div>
    </div>

    <!-- Patient Flow -->
    <div id="view-patient" class="view">
      <div class="app-header">
        <button class="back-btn" onclick="navigate('landing')"><i data-lucide="arrow-left"></i></button>
        <div class="header-title-container"><h2 class="header-title">${t('find_med')}</h2></div>
        <button class="lang-toggle-btn" onclick="openLangPicker()"><i data-lucide="globe"></i></button>
      </div>
      
      <div class="location-bar" onclick="openLocModal()">
        <span id="loc-display" class="loc-text">${t('loc_unknown')}</span>
        <i data-lucide="map-pin" style="width:16px;height:16px;"></i>
      </div>
      
      <div class="search-container">
        <div class="search-box">
          <i data-lucide="search" class="search-icon"></i>
          <input type="text" class="search-input" id="med-search" placeholder="${t('search_pl')}">
          <div class="autocomplete-list" id="med-autocomplete"></div>
        </div>
        <div class="filters">
          <button class="chip ${currentFilter === 5 ? 'active' : ''}" onclick="setFilter(5)">< 5 ${t('km')}</button>
          <button class="chip ${currentFilter === 10 ? 'active' : ''}" onclick="setFilter(10)">< 10 ${t('km')}</button>
          <button class="chip ${currentFilter === 20 ? 'active' : ''}" onclick="setFilter(20)">< 20 ${t('km')}</button>
          <button class="chip ${currentFilter === 50 ? 'active' : ''}" onclick="setFilter(50)">< 50 ${t('km')}</button>
        </div>
      </div>
      
      <div class="results-container" id="patient-results"></div>
    </div>

    <!-- Worker Auth Flow -->
    <div id="view-worker-auth" class="view">
      <div class="app-header">
        <button class="back-btn" onclick="navigate('landing')"><i data-lucide="arrow-left"></i></button>
        <div class="header-title-container"><h2 class="header-title">${t('worker_login')}</h2></div>
        <button class="lang-toggle-btn" onclick="openLangPicker()"><i data-lucide="globe"></i></button>
      </div>
      <div class="content-container" style="justify-content: center; align-items: center;">
        <div class="auth-form">
          <div class="form-group">
            <label class="form-label">Select Your Centre</label>
            <select class="form-input" id="worker-centre" style="background-color: var(--bg-primary); padding-right: 1rem;">
               ${getDB('centres').map(c => `<option value="${c.id}">${c.name} (${c.village})</option>`).join('')}
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">${t('phone')}</label>
            <input type="tel" class="form-input" id="worker-phone" placeholder="10-digit number" value="9876543210">
          </div>
          <div class="form-group">
            <label class="form-label">${t('otp')}</label>
            <input type="number" class="form-input" placeholder="4 digits" value="1234">
          </div>
          <button class="btn btn-primary" onclick="handleLogin()" style="margin-top: 0.5rem">${t('login_btn')}</button>
        </div>
      </div>
    </div>

    <!-- Worker Dashboard -->
    <div id="view-worker-dash" class="view">
      <div class="app-header">
        <button class="back-btn" onclick="navigate('landing')"><i data-lucide="log-out"></i></button>
        <div class="header-title-container"><h2 class="header-title">${t('update_stock')}</h2></div>
        <button class="lang-toggle-btn" onclick="openLangPicker()"><i data-lucide="globe"></i></button>
      </div>
      <div class="dashboard-header" id="dash-header"></div>
      <div class="stock-list" id="stock-list"></div>
      <div class="bottom-action">
        <button class="btn btn-primary" onclick="saveStock()">
          <div class="flex-row"><i data-lucide="save"></i> ${t('save_btn')}</div>
        </button>
      </div>
      <button class="fab" onclick="openAddModal()"><i data-lucide="plus"></i></button>
    </div>

    <!-- Admin Map -->
    <div id="view-admin-map" class="view">
      <div class="app-header">
        <button class="back-btn" onclick="navigate('landing')"><i data-lucide="arrow-left"></i></button>
        <div class="header-title-container"><h2 class="header-title">Live Map</h2></div>
        <button class="lang-toggle-btn" onclick="openLangPicker()"><i data-lucide="globe"></i></button>
      </div>
      <div id="admin-map-container" class="map-container"></div>
    </div>

    <!-- Modals -->
    <div class="modal-overlay" id="loc-modal">
      <div class="modal-content">
        <div class="modal-header">
          <h3>${t('enter_village')}</h3>
          <button class="back-btn" onclick="closeLocModal()"><i data-lucide="x"></i></button>
        </div>
        <input type="text" class="form-input" id="village-input" placeholder="e.g. Yavatmal" style="width:100%; margin-bottom: 1rem;">
        <button class="btn btn-primary" onclick="saveLoc()">${t('save')}</button>
      </div>
    </div>

    <div class="modal-overlay" id="add-modal">
      <div class="modal-content">
        <div class="modal-header">
          <h3>${t('add_medicine')}</h3>
          <button class="back-btn" onclick="closeAddModal()"><i data-lucide="x"></i></button>
        </div>
        <input type="text" class="form-input" id="new-med-name" placeholder="${t('med_name')}" style="width:100%; margin-bottom: 1rem;">
        <button class="btn btn-primary" onclick="addNewMedicine()">${t('save')}</button>
      </div>
    </div>
  `;
  
  lucide.createIcons();
  setupEventListeners();
  updateView();
  updateLocDisplay();
};

window.openLangPicker = () => {
  previousView = currentView;
  navigate('language');
};

window.setLang = (lang) => {
  localStorage.setItem('mednear_lang', lang);
  renderApp(); // Re-renders whole DOM with new language
  
  if (previousView && previousView !== 'language') {
    navigate(previousView);
  } else {
    navigate('landing');
  }
};

const navigate = (view) => {
  currentView = view;
  updateView();
};

const updateView = () => {
  document.querySelectorAll('.view').forEach(el => el.classList.remove('active'));
  document.getElementById(`view-${currentView}`).classList.add('active');
  
  if (currentView === 'patient') {
    if (!userLoc) openLocModal(); // Force loc if missing
    renderPatientResults();
  } else if (currentView === 'worker-dash') {
    renderWorkerDashboard();
  } else if (currentView === 'admin-map') {
    setTimeout(initMap, 100);
  }
};

// -- Location Handling --
window.openLocModal = () => document.getElementById('loc-modal').classList.add('active');
window.closeLocModal = () => document.getElementById('loc-modal').classList.remove('active');
window.saveLoc = () => {
  const v = document.getElementById('village-input').value.trim();
  if (v) {
    let centres = getDB('centres');
    let mockC = centres.find(c => c.village.toLowerCase() === v.toLowerCase());
    
    if (mockC) { 
      userLoc = { lat: mockC.lat, lng: mockC.lng, name: mockC.village }; 
    } else { 
      // Village not found! Generate dynamic dummy clinics for unrecognized villages!
      const newLat = 15 + Math.random() * 10;
      const newLng = 75 + Math.random() * 10;
      userLoc = { lat: newLat, lng: newLng, name: v }; 
      
      // Capitalize first letter for aesthetic clinic names
      const vName = v.charAt(0).toUpperCase() + v.slice(1);
      
      const newCentres = [
        { id: Date.now(), name: `${vName} General Hospital`, village: vName, lat: newLat + (Math.random() * 0.02 - 0.01), lng: newLng + (Math.random() * 0.02 - 0.01) },
        { id: Date.now() + 1, name: `${vName} Care Clinic`, village: vName, lat: newLat + (Math.random() * 0.02 - 0.01), lng: newLng + (Math.random() * 0.02 - 0.01) },
        { id: Date.now() + 2, name: `Apollo Pharmacy ${vName}`, village: vName, lat: newLat + (Math.random() * 0.02 - 0.01), lng: newLng + (Math.random() * 0.02 - 0.01) },
        { id: Date.now() + 3, name: `${vName} Primary Health Centre`, village: vName, lat: newLat + (Math.random() * 0.04 - 0.02), lng: newLng + (Math.random() * 0.04 - 0.02) }
      ];
      
      centres.push(...newCentres);
      setDB('centres', centres);
      
      let stock = getDB('stock');
      const meds = getDB('medicines');
      const now = Date.now();
      newCentres.forEach(c => {
        stock[c.id] = {};
        meds.forEach(m => {
          stock[c.id][m] = { inStock: Math.random() > 0.3, updatedAt: now - (Math.random() * 96 * 60 * 60 * 1000) };
        });
      });
      setDB('stock', stock);
    } 
    
    updateLocDisplay();
    closeLocModal();
    if (currentView === 'patient') renderPatientResults();
  }
};

const updateLocDisplay = () => {
  const d = document.getElementById('loc-display');
  if (d) d.innerText = userLoc ? `${t('loc_set')}: ${userLoc.name}` : t('loc_unknown');
};

// -- Patient Flow --
window.setFilter = (km) => {
  currentFilter = km;
  document.querySelectorAll('.chip').forEach(c => c.classList.toggle('active', c.innerText.includes(km)));
  renderPatientResults();
};

const setupEventListeners = () => {
  const searchInput = document.getElementById('med-search');
  const autocomplete = document.getElementById('med-autocomplete');
  if(searchInput) {
    searchInput.addEventListener('input', (e) => {
      const val = e.target.value.toLowerCase();
      currentSearch = val;
      if (!val) { autocomplete.style.display = 'none'; renderPatientResults(); return; }
      
      const meds = getDB('medicines').filter(m => m.toLowerCase().includes(val));
      if (meds.length > 0) {
        // ALWAYS keep generic medicines in English
        autocomplete.innerHTML = meds.map(m => `<div class="autocomplete-item" onclick="selectSearch('${m}')">${m}</div>`).join('');
        autocomplete.style.display = 'block';
      } else { autocomplete.style.display = 'none'; }
      renderPatientResults();
    });
  }
};

window.selectSearch = (val) => {
  document.getElementById('med-search').value = val;
  currentSearch = val.toLowerCase();
  document.getElementById('med-autocomplete').style.display = 'none';
  renderPatientResults();
};

const renderPatientResults = () => {
  const container = document.getElementById('patient-results');
  if (!container || !userLoc) return;
  
  const centres = getDB('centres');
  const stock = getDB('stock');
  const query = currentSearch.trim();
  const now = Date.now();
  
  let results = centres.map(c => {
    const dist = calculateDistance(userLoc.lat, userLoc.lng, c.lat, c.lng);
    let availability = null;
    let latestUpdate = 0;
    
    if (query) {
      const exact = Object.keys(stock[c.id]).find(m => m.toLowerCase() === query);
      if (exact) availability = stock[c.id][exact];
      else {
        const match = Object.keys(stock[c.id]).find(m => m.toLowerCase().includes(query));
        if (match) availability = stock[c.id][match];
      }
    }
    
    Object.values(stock[c.id]).forEach(s => { if (s.updatedAt > latestUpdate) latestUpdate = s.updatedAt; });
    return { ...c, dist: parseFloat(dist), availability, latestUpdate };
  });
  
  results = results.filter(r => r.dist <= currentFilter);
  if (query) results = results.filter(r => r.availability && r.availability.inStock === true);
  results.sort((a, b) => a.dist - b.dist);
  
  if (results.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 3rem 1rem; color: var(--text-secondary);">
        <i data-lucide="map-pin-off" style="width:48px;height:48px;opacity:0.5;margin-bottom:1rem;"></i>
        <h3 style="margin-bottom:0.5rem">${t('no_results')}</h3>
        <button class="btn btn-secondary" onclick="setFilter(50)">${t('expand_rad')} (< 50${t('km')})</button>
      </div>
    `;
    lucide.createIcons();
    return;
  }
  
  container.innerHTML = results.map(r => {
    let badgeHtml = '';
    const ts = r.availability ? r.availability.updatedAt : r.latestUpdate;
    const ageHrs = (now - ts) / (1000 * 60 * 60);
    const timeHtml = timeAgo(ts);
    
    // Warning badge
    const warningHtml = ageHrs > 48 ? `<div class="badge badge-warning"><i data-lucide="alert-triangle" style="width:12px;height:12px;"></i> ${t('outdated')}</div>` : '';
    
    if (query && r.availability) {
      badgeHtml = `<div class="badge badge-in-stock"><i data-lucide="check" style="width:14px;height:14px;"></i> ${t('in_stock')}</div>`;
    } else if (query && !r.availability) {
      badgeHtml = `<div class="badge badge-out-stock"><i data-lucide="x" style="width:14px;height:14px;"></i> ${t('out_stock')}</div>`;
    }
    
    return `
      <div class="result-card">
        <div class="card-header">
          <div>
            <h3 class="centre-name">${r.name}</h3>
            <div class="village-distance"><i data-lucide="map-pin" style="width:16px;height:16px;"></i> ${r.village} • ${r.dist} ${t('km')}</div>
          </div>
          <div class="badges-col">
            ${badgeHtml}
            ${warningHtml}
          </div>
        </div>
        <div class="card-footer">
          <div class="updated-time">${t('updated')} ${timeHtml}</div>
          <button class="btn-directions" onclick="openMaps(${r.lat}, ${r.lng})"><i data-lucide="navigation" style="width:16px;height:16px;"></i> ${t('directions')}</button>
        </div>
      </div>
    `;
  }).join('');
  lucide.createIcons();
};

window.openMaps = (lat, lng) => window.open(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`, '_blank');

// -- Worker Flow --
window.handleLogin = () => {
  const phone = document.getElementById('worker-phone').value;
  const centreId = parseInt(document.getElementById('worker-centre').value);
  if (phone.length >= 10 && centreId) { 
    loggedInCentre = getDB('centres').find(c => c.id === centreId); 
    navigate('worker-dash'); 
  }
};

let currentEdits = {};

const renderWorkerDashboard = () => {
  if (!loggedInCentre) return navigate('worker-auth');
  document.getElementById('dash-header').innerHTML = `<h3 class="centre-title">${loggedInCentre.name}</h3><div class="centre-location"><i data-lucide="map-pin" style="width:18px;height:18px;"></i>${loggedInCentre.village}</div>`;
  
  const stock = getDB('stock')[loggedInCentre.id];
  const meds = getDB('medicines');
  currentEdits = JSON.parse(JSON.stringify(stock)); 
  
  const list = document.getElementById('stock-list');
  list.innerHTML = [...meds].sort().map(m => {
    const s = currentEdits[m] || { inStock: false, updatedAt: Date.now() };
    if (!currentEdits[m]) currentEdits[m] = s;
    return `
      <div class="stock-item">
        <div class="stock-info"><span class="stock-name">${m}</span><span class="stock-meta">${t('updated')} ${timeAgo(s.updatedAt)}</span></div>
        <label class="switch"><input type="checkbox" ${s.inStock ? 'checked' : ''} onchange="toggleStock('${m}', this.checked)"><span class="slider"></span></label>
      </div>`;
  }).join('');
  lucide.createIcons();
};

window.toggleStock = (med, isChecked) => { currentEdits[med] = { inStock: isChecked, updatedAt: Date.now() }; };
window.saveStock = () => {
  const stock = getDB('stock'); stock[loggedInCentre.id] = currentEdits; setDB('stock', stock);
  showToast(t('save_btn')); renderWorkerDashboard(); 
};

// -- Modals --
window.openAddModal = () => document.getElementById('add-modal').classList.add('active');
window.closeAddModal = () => document.getElementById('add-modal').classList.remove('active');
window.addNewMedicine = () => {
  const name = document.getElementById('new-med-name').value.trim();
  if (name) {
    const meds = getDB('medicines');
    if (!meds.includes(name)) {
      meds.push(name); setDB('medicines', meds);
      currentEdits[name] = { inStock: true, updatedAt: Date.now() };
      renderWorkerDashboard(); closeAddModal(); showToast(t('save_btn'));
    }
  }
};

// -- Map Flow --
const initMap = () => {
  if (mapInstance) {
    mapInstance.invalidateSize();
    return;
  }
  
  mapInstance = L.map('admin-map-container', {
    zoomControl: false
  }).setView([20.3888, 78.1204], 10);
  
  // Using Google Maps Live Tiles
  L.tileLayer('http://mt0.google.com/vt/lyrs=m&hl=en&x={x}&y={y}&z={z}', {
    attribution: '&copy; Google Maps',
    maxZoom: 20
  }).addTo(mapInstance);
  
  updateMapMarkers();
};

const updateMapMarkers = () => {
  if (!mapInstance) return;
  const centres = getDB('centres');
  const stock = getDB('stock');
  const now = Date.now();
  
  centres.forEach(c => {
    const cStock = stock[c.id];
    let latestUpdate = 0;
    Object.values(cStock).forEach(s => { if (s.updatedAt > latestUpdate) latestUpdate = s.updatedAt; });
    const ageHrs = (now - latestUpdate) / (1000 * 60 * 60);
    let statusClass = 'marker-green';
    if (latestUpdate === 0 || ageHrs > 168) statusClass = 'marker-red';
    else if (ageHrs > 48) statusClass = 'marker-orange';
    
    const icon = L.divIcon({ className: `map-marker-simple ${statusClass}`, iconSize: [14, 14] });
    L.marker([c.lat, c.lng], { icon }).addTo(mapInstance).bindPopup(`<div style="padding: 0.5rem;"><h4 style="margin:0 0 0.25rem 0; color:#111;">${c.name}</h4><p style="margin:0; font-size: 0.85rem; color:#555;">${c.village}</p></div>`);
  });
};

document.addEventListener('DOMContentLoaded', () => { initDB(); renderApp(); });

// Real-time synchronization across different tabs/windows
window.addEventListener('storage', (e) => {
  if (e.key === 'mednear_stock') {
    if (currentView === 'patient') renderPatientResults();
    if (currentView === 'worker-dash') renderWorkerDashboard();
    if (currentView === 'admin-map' && typeof updateMapMarkers === 'function') updateMapMarkers();
  }
});
