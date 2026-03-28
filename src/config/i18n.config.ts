import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: {
        translation: {
          // Navigation & Common
          "welcome": "Welcome to OpenJustice",
          "logIn": "Log In",
          "settings": "Settings",
          "logout": "Logout",
          "search": "Search",
          "newQuestion": "New Question",
          "askQuestion": "Ask a Question",
          "browseTopics": "Browse Topics",
          "searchPlaceholder": "Search laws or procedures...",
          "policySearchPlaceholder": "Search policy...",
          "queryPlaceholder": "Type your legal query or research question here...",
          "attachDocument": "Attach Document",
          "voiceInput": "Voice Input",
          
          // Home Page
          "privateAndSecure": "Private & Secure",
          "privateDescription": "Your inquiries remain anonymous. We use enterprise-grade encryption to ensure your data is never shared or exposed.",
          "plainLanguage": "Plain Language",
          "plainDescription": "We strip away the legalese to provide you with clear, actionable information that anyone can understand, regardless of background.",
          "comprehensive": "Comprehensive",
          "comprehensiveDescription": "From housing disputes to small claims and family law, our library covers the essential legal procedures you need to know.",
          "disclaimer": "Important Disclaimer:",
          "disclaimerText": "OpenJustice is an AI-powered educational tool. We provide legal information, not legal advice or representation. Consult a qualified attorney for your specific situation.",
          "readPrivacyPolicy": "Read Privacy Policy",
          
          // Chat Examples
          "isMyDataShared": "Is my personal information shared with third parties?",
          "dataSecurity": "No. We prioritize data protection. Your inquiries are anonymized and stored securely using end-to-end encryption protocols.",
          "forceMajeure": "What does \"Force Majeure\" mean in simple terms?",
          "forceMajeureExplanation": "It refers to \"acts of God\"—unforeseeable events like floods or war that prevent someone from fulfilling their part of a contract.",
          "smallClaimsCase": "How do I start a small claims case?",
          "smallClaimsSteps": "1. Send a demand letter. 2. File a 'Statement of Claim' at court. 3. Pay the filing fee and serve the defendant.",
          
          // Topics
          "legalTopicBrowser": "Legal Topic Browser",
          "exploreTopics": "Explore our comprehensive legal topic library",
          "landAndProperty": "Land & Property",
          "landDescription": "Covers real estate transactions, residential and commercial tenancy agreements, land usage, and zoning regulations.",
          "employmentLaw": "Employment Law",
          "employmentDescription": "Statutes regarding workplace rights, contract obligations, termination disputes, and occupational health and safety standards.",
          "familyRights": "Family Rights",
          "familyDescription": "Legal frameworks for marriage, divorce proceedings, child custody rights, adoption, and inheritance distributions.",
          "consumerProtection": "Consumer Protection",
          "consumerDescription": "Rights regarding product liability, service guarantees, deceptive trade practices, and consumer credit regulations.",
          "criminalJustice": "Criminal Justice",
          "criminalDescription": "Procedural guidelines for criminal defense, sentencing guidelines, parole frameworks, and civil liberties protection.",
          "intellectualProperty": "Intellectual Property",
          "ipDescription": "Management of copyrights, patent filings, trademark protection, and trade secret litigation frameworks.",
          "relevantLaws": "Relevant Laws",
          "standardProcedures": "Standard Procedures",
          "commonDefinitions": "Common Definitions",
          
          // Admin Dashboard
          "adminDashboard": "Admin Dashboard",
          "overview": "Overview",
          "systemHealth": "System Health",
          "ethicalAudits": "Ethical Audits",
          "dataPipelines": "Data Pipelines",
          "configurations": "Configurations",
          "adminUser": "Admin User",
          "systemOverseer": "System Overseer",
          
          // Browse Sidebar
          "recentQueries": "Recent Queries",
          "evictionNotice": "Eviction Notice Rights",
          "employmentContract": "Employment Contract Review",
          "consumerWarranty": "Consumer Warranty Claim",
          "dashboard": "Dashboard",
          "caseLaw": "Case Law",
          "statutes": "Statutes",
          "researchLibrary": "Research Library",
          "recentActivity": "Recent Activity",
          
          // Account/Settings
          "accountSettings": "Account Settings",
          "userName": "J. Smith",
          
          // History menu
          "tenantRights": "Tenant rights in CA",
          "ipProtection": "IP protection for software",
          "employmentBasics": "Employment law basics",
        }
      },
      si: {
        translation: {
          // Navigation & Common
          "welcome": "OpenJustice වෙත සාදරයි",
          "logIn": "ඇතුල් වන්න",
          "settings": "සැකසුම්",
          "logout": "ඉවත් වන්න",
          "search": "සෙවුම",
          "newQuestion": "නව ප්‍රශ්නය",
          "askQuestion": "ප්‍රශ්නයක් අසන්න",
          "browseTopics": "විෂයන් ගවේෂණය කරන්න",
          "searchPlaceholder": "නීති හෝ ක්‍රියා පටිපාටි සොයන්න...",
          "policySearchPlaceholder": "ප්‍රතිපත්තිය සෙවුම් කරන්න...",
          "queryPlaceholder": "ඔබගේ නීතිමය ප්‍රශ්නය හෝ පර්යේෂණ ප්‍රශ්නය මෙහි ටයිප් කරන්න...",
          "attachDocument": "ලේඛනය සම්බන්ධ කරන්න",
          "voiceInput": "හඩ ආදානය",
          
          // Home Page
          "privateAndSecure": "පුද්ගලික හා ආරක්ෂිත",
          "privateDescription": "ඔබගේ විමසීම් නිර්නාම පවතී. ඔබගේ ඩේටා කිසි විටෙකත් බෙදා ගැනීම හෝ ගෙවීම සිදු නොවන බව සහතික කිරීමට අපි ශ්‍රේණිගත එনক්‍රිප්션ය භාවිතා කරමි.",
          "plainLanguage": "සරල භාෂාව",
          "plainDescription": "නීතිමය හා සම්බන්ධයෙන් අවබෝධ කරගත නොහැකි වචන ඉවත් කර, ඔබට පැහැදිලි සහ ක්‍රියාත්මක තොරතුරු ලබා දෙමු.",
          "comprehensive": "ලිහිල්",
          "comprehensiveDescription": "නිවාස ආข්‍යාන සිට කුඩා ප්‍රකාශන සහ පවුල් නීතිය දක්වා, අපගේ පුස්තකාලය අপරිহාර්ය නීතිමය ක්‍රියා පටිපාටි ආවරණය කරයි.",
          "disclaimer": "වැදගත් අවවාදය:",
          "disclaimerText": "OpenJustice යනු AI-බල සම්පන්න අධ්‍යාපනීය මෙවලමකි. අපි නීතිමය තොරතුරු සපයමු, නීතිමය උපදෙස් හෝ නිරූපණය නොවේ. ඔබගේ නිශ්චිත තත්ත්වය සඳහා योग్य නීතිවේදයෙකු හා සම්බන්ධ වන්න.",
          "readPrivacyPolicy": "පෞද්ගලිකતා ප්‍රතිපත්තිය කියවන්න",
          
          // Chat Examples
          "isMyDataShared": "මගේ ব්‍යක්තිগත තොරතුරු තෙවන මිතුරුවරුන් සමඟ බෙදා ගනු ලැබේ ද?",
          "dataSecurity": "නැත. ඩේටා ආරක්ෂණ ප්‍රাধාන්য දෙමු. ඔබගේ විමසීම් නිර්නාම කරන ලද හා අවසාන ප්‍රান්තයේ එනක්‍රිප්션ය භාවිතයෙන් ආරක්ෂිතව ගබඩා කරන ලා ඇත.",
          "forceMajeure": "සරල පද වලින් \"Force Majeure\" යනු කුමක්ද?",
          "forceMajeureExplanation": "එය \"දෙවිවරුන්ගේ කර්ම\" ගැන සඳහන් කරයි—බාධා හෝ යුද්ධ වැනි අপ්‍රত්‍යාශිත සිදුවීම් නිසා වගකිවිලි අවසන් කිරීම සිදු නොවිය හැක.",
          "smallClaimsCase": "කුඩා ප්‍රකාශනයක් ඇරඹීම ඉතා ප්‍රමාණවත් පෙළ ගස්තුවි ද?",
          "smallClaimsSteps": "1. ඉල්ලුම්පත්‍රය එවන්න. 2. අධිකරණ ස්ථානයේ 'Claim ප්‍රකාශන' ඉදිරිපත් කරන්න. 3. ගිණුම් ගාස්තු ගෙවා විත්තිකරුට සේවා කරන්න.",
          
          // Topics
          "legalTopicBrowser": "නීතිමය විෂය ගවේෂකය",
          "exploreTopics": "අපගේ විස්තර නීතිමය විෂය පුස්තකාලය ගවේෂණ කරන්න",
          "landAndProperty": "ඉඩම් සහ ගුණාංගය",
          "landDescription": "අසාধారණ ගුණසම්පත් ගිණුම්, නිවාස සහ වාණිජ ගිණුම්  කිරීම, ඉඩම් භාවිතය සහ অঞ্চল නිඪ් කිරීම ඇතුලත්.",
          "employmentLaw": "වැඩ නීතිය",
          "employmentDescription": "වැඩ අයිතිවාසිකම්, ගිණුම් බැඳුම්කම්, අවසාන විවාද සහ වෘත්තීය සෞඛ්‍ය සහ ආරක්ෂණ ඡන්ද තිබේ.",
          "familyRights": "පවුල් අයිතිවාසිකම්",
          "familyDescription": "විවාහය, දාරිකාවෙන් මිදීමේ ක්‍රියා පටිපාටිය, ඉරණම් ගිණුම් අයිතිවාසිකම්, දෙමිතුරු සහ උරුම බෙදා දීම පිළිබඳ නීතිමය රාමුව.",
          "consumerProtection": "පරිභෝගක ආරක්ෂණ",
          "consumerDescription": "වාසිතු වගකිවිල්ල, සේවා ඇතුල් කිරීම්, රෙවතින التাણ විපටිසම්, සහ පරිභෝගක ණය නීතිනීතිය සම්බන්ධයෙන්.",
          "criminalJustice": "අපරාධ न්යාය",
          "criminalDescription": "අපරාධ ආරක්ෂණ ක්‍රියා පටිපාටිය, දඩුවම් මාර්ගෝපදේශ, පොරොන්දුවක් මුදා නිකුතුකරණ රාමුව සහ සිවිල් නිදහස් ආරක්ෂණ.",
          "intellectualProperty": "බුද්ධිමය ගුණසම්පත්",
          "ipDescription": "ගිණුම්, ගිණුම් ගිණුම්, වෙළඳ ලකුණු ආරක්ෂණ සහ වෙළඳ රහස් නීතිවිරෝධී රාමුවාකරණය කිරීම.",
          "relevantLaws": "අදාළ නීති",
          "standardProcedures": "සම්මත ක්‍රියා පටිපාටිය",
          "commonDefinitions": "සාමාන්‍ය අර්ථ දැක්වීම්",
          
          // Admin Dashboard
          "adminDashboard": "පරිපාලක උපකරණ ගොඩ",
          "overview": "පසුතිබෙන දැක්ම",
          "systemHealth": "ක්‍රමයේ සෞඛ්‍ය",
          "ethicalAudits": "සamerikansk විචාරවලිය",
          "dataPipelines": "දත්ත ශ්‍රේණිය",
          "configurations": "වින්‍යාස",
          "adminUser": "පරිපාලක පරිශீලක",
          "systemOverseer": "ක්‍රම නිරීක්ෂක",
          
          // Browse Sidebar
          "recentQueries": "මෑත ප්‍රශ්නා",
          "evictionNotice": "ඉවත් කිරීමේ දැනුවත්කරණ අයිතිවාසිකම්",
          "employmentContract": "වැඩ ගිණුම් සමාලෝචනය",
          "consumerWarranty": "පරිභෝගක ඇතුඩුව ඉල්ලීම",
          "dashboard": "උපකරණ ගොඩ",
          "caseLaw": "නඩු නීතිය",
          "statutes": "නීති",
          "researchLibrary": "පර්යේෂණ පුස්තකාලය",
          "recentActivity": "මෑත ක්‍රියාකාරකම",
          
          // Account/Settings
          "accountSettings": "ගිණුම් සැකසුම්",
          "userName": "ජ. ස්මිතු",
          
          // History menu
          "tenantRights": "ගෝඩා අයිතිවාසිකම් (CA)",
          "ipProtection": "සෙවනෙත් ගුණසම්පත් ආරක්ෂණ",
          "employmentBasics": "වැඩ නීතිය මූල් කරුණු",
        }
      },
      ta: {
        translation: {
          // Navigation & Common
          "welcome": "OpenJustice க்கு வரவேற்கிறோம்",
          "logIn": "உள்நுழைக",
          "settings": "அமைப்புகள்",
          "logout": "வெளியேறு",
          "search": "தேடல்",
          "newQuestion": "புதிய கேள்வி",
          "askQuestion": "கேள்வி கேட்கவும்",
          "browseTopics": "தலைப்புகளை உலாவவும்",
          "searchPlaceholder": "சட்டம் அல்லது நடைமுறைகளைத் தேடுக...",
          "policySearchPlaceholder": "கொள்கையைத் தேடுக...",
          "queryPlaceholder": "உங்கள் சட்ட வினா அல்லது ஆராய்ச்சி கேள்வியை இங்கே உள்நுழைக...",
          "attachDocument": "ஆவணத்தைக் கணக்கிற சேர்க்கவும்",
          "voiceInput": "குரல் உள்ளீடு",
          
          // Home Page
          "privateAndSecure": "தனிப்பட்ட மற்றும் பாதுகாப்பான",
          "privateDescription": "உங்கள் விசாரணைகள் அநாமதேயமாக இருக்கும். உங்கள் தரவு ஒருபோதும் பகிரப்படாமல் அல்லது வெளிப்படாமல் இருப்பதை உறுதிசெய்ய நாங்கள் என்டারপிரைசு-கிரேড என்க்রிப்ஷன் பயன்படுத்துகிறோம்.",
          "plainLanguage": "எளிய மொழி",
          "plainDescription": "சட்ட சொற்கள் நீக்கி, எல்லா பின்னணிககளிட மக்களுக்கு புரிந்துகொண்ட, செயல்படக்கூடிய தகவல் வழங்குகிறோம்.",
          "comprehensive": "விரிவான",
          "comprehensiveDescription": "வீட்டு மற்றும் சொத்து சட்டம் முதல் சிறிய வழக்குகள் மற்றும் குடும்ப சட்டம் வரை, எங்கள் நூலகம் அத்தியாவசிய சட்ட நடைமுறைகளை உள்ளடக்கியுள்ளது.",
          "disclaimer": "முக்கியமான எச்சரிக்கை:",
          "disclaimerText": "OpenJustice என்பது AI-இயக்கப்பட்ட கல்வி கருவி. நாங்கள் சட்ட தகவல் வழங்குகிறோம், சட்ட ஆலோசனை அல்லது பிரতिनिधित्வ அல்ல. உங்கள் குறிப்பிட்ட சூழ்நிலைக்கு ஒரு தொழிலாளர் வழக்கறிஞரை பரிந்துரைக்கவும்.",
          "readPrivacyPolicy": "தனியுரிமை கொள்கையைப் படிக்கவும்",
          
          // Chat Examples
          "isMyDataShared": "என்னுடைய ব்যக்তிগত தகவல் மூன்றாம் பক்ষத்திற்கு பகிரப்படுமா?",
          "dataSecurity": "இல்லை. தரவு பாதுகாப்பை முன்னுரிமை கொடுக்கிறோம். உங்கள் விசாரணைகள் அநாமதேயமாக্கப்பட்ட் மற்றும் முடிந்து-முடிய என்க்रிப்ஷன் நெறிமுறைகளைப் பயன்படுத்தி பாதுகாப்பாக சேமிக்கப்படுகிறது.",
          "forceMajeure": "\"Force Majeure\" என்பதன் பொருள் என்ன?",
          "forceMajeureExplanation": "இது \"கடவுளின் செயல்கள்\" குறிக்கிறது—பெரிய வெள்ளம் அல்லது யுத்தம் போன்ற முன்பு料 செய்ய முடியாத நிகழ்வுகள் ஒரு ஒப்பந்தத்தின் ஒரு பக்கத்தை நிறைவேற்றுவதை தடுக்கும்.",
          "smallClaimsCase": "நான் சிறிய வழக்கு எப்படி தொடங்குவேன்?",
          "smallClaimsSteps": "1. கோரிக்கை கடிதம் அனுப்பவும். 2. நீதிமன்றத்தில் 'கோரிக்கை அறிக்கை' சமர்ப்பிக்கவும். 3. தாக்கல் கட்டணம் செலுத்தவும் மற்றும் கடன்தாரருக்கு சேவை செய்யவும்.",
          
          // Topics
          "legalTopicBrowser": "சட்ட தலைப்பு உலாவி",
          "exploreTopics": "எங்கள் விரிவான சட்ட தலைப்பு நூலகத்தை ஆராயுங்கள்",
          "landAndProperty": "நிலம் மற்றும் சொத்து",
          "landDescription": "எஸ்டேட பரிவர்த்தனைகள், குடியிருப்பு மற்றும் வணிக வாடை ஒப்பந்தங்கள், நிலப் பயன்பாடு மற்றும் மண்ட வரம்பு விதிமுறைகளை உள்ளடக்குகிறது.",
          "employmentLaw": "வேலை சட்டம்",
          "employmentDescription": "பணியிட உரிமைகள், ஒப்பந்த கடமைகள், பணிநீக்கம் மாணவர், மற்றும் தொழிל உறுப்பு மற்றும் பாதுகாப்பு தரவுக மாணவர்.",
          "familyRights": "குடும்ப உரிமைகள்",
          "familyDescription": "திருமணம், விவாहmissing செயல்பாட்டுகள், குழந்தை சிறுவர் கண்காணிப்பு சரვிகம், பெற்றோர் மற்றும் மரபுவழி விநியோகத்திற்கான சட்ட கட்டமைப்பு.",
          "consumerProtection": "நுகர்வோர் பாதுகாப்பு",
          "consumerDescription": "பொருள் பொறுப்பு, சேவை உத்தரவாதம், மோசமான வர்த்தக நடைமுறைகள், மற்றும் நுகர்வோர் கடன் விதிமுறைகள் தொடர்பான உரிமைகள்.",
          "criminalJustice": "குற்ற நீதி",
          "criminalDescription": "குற்ற பாதுகாப்பு நடைமுறைகள், தண்டனை வழிகாட்டல், பெண்கள் விடுவிப்பு கட்டமைப்புகள், மற்றும் சிவிल சுதந்திரங்கள் பாதுகாப்பு.",
          "intellectualProperty": "அறிவுசார் சম்பத்தி",
          "ipDescription": "பதிப்புரிமை, পেটենட் ஆய்வுகள், வர்த்தகப் பெயர் பாதுகாப்பு, மற்றும் வர்த்தக ரகசிய訴訟 கட்டமைப்புகளை நிர்வகிக்கிறது.",
          "relevantLaws": "சம்பந்தப்பட்ட சட்டங்கள்",
          "standardProcedures": "தरกรณ் நடைமுறைகள்",
          "commonDefinitions": "பொதுவான வரையறைகள்",
          
          // Admin Dashboard
          "adminDashboard": "நிர்வாக` கையாளுதல்",
          "overview": "கண்ணோட்டம்",
          "systemHealth": "அமைப்பு ஆரோக்கியம்",
          "ethicalAudits": "தாDecoder வகுப்பு தணிக்கைகள்",
          "dataPipelines": "தரவு பரिणाम",
          "configurations": "கட்டமைப்புகள்",
          "adminUser": "நிர்வாக பயனர்",
          "systemOverseer": "அமைப்பு மேற்பார்வையாளர்",
          
          // Browse Sidebar
          "recentQueries": "சமீபத்திய வினாக்கள்",
          "evictionNotice": "வெளியேற்ற கறிக்கை உரிமைகள்",
          "employmentContract": "வேலை ஒப்பந்த மதிப்பாய்வு",
          "consumerWarranty": "நுகர்வோர் உத்தரவாதம் கோரிக்கை",
          "dashboard": "கையாளுதல்",
          "caseLaw": "வழக்கு சட்டம்",
          "statutes": "சட்டங்கள்",
          "researchLibrary": "ஆராய்ச்சி நூலகம்",
          "recentActivity": "சமீபத்திய செயல்பாடு",
          
          // Account/Settings
          "accountSettings": "கணக்கு அமைப்புகள்",
          "userName": "ஜே. ஸ்மிது",
          
          // History menu
          "tenantRights": "வாடையாளர் உரிमை (CA)",
          "ipProtection": "மென்பொருள் IP பாதுகாப்பு",
          "employmentBasics": "வேலை சட்ட அடிப்படைகள்",
        }
      }
    }
  });

export default i18n;
