import React, { useState } from "react";

interface Lawyer {
  id: string;
  name: string;
  specialization: string;
  experience: string;
  location: string;
  contact: string;
  email: string;
  imageUrl: string;
  bio: string;
  availableSlots: string[];
  gender: string;
  education: string;
  languages: string[];
  practiceCourts: string[];
  rating: number;
}

interface Appointment {
  lawyer: Lawyer;
  slot: string;
  dateBooked: string;
}

const MOCK_LAWYERS: Lawyer[] = [
  {
    id: "l1",
    name: "Nuwan Perera",
    specialization: "Criminal Defense",
    experience: "15+ Years",
    location: "Colombo",
    contact: "+94 77 123 4567",
    email: "nuwan.perera@example.lk",
    imageUrl: "https://media.istockphoto.com/id/1949501832/photo/handsome-hispanic-senior-business-man-with-crossed-arms-smiling-at-camera-indian-or-latin.jpg?s=612x612&w=0&k=20&c=LtlsYrQxUyX7oRmYS37PnZeaV2JmoPX9hWYPOfojCgw=",
    bio: "Expert in criminal defense with over a decade of successful case history in the High Courts of Sri Lanka.",
    availableSlots: ["Mon 10:00 AM", "Wed 02:00 PM", "Fri 11:30 AM"],
    gender: "Male",
    education: "LL.B. (Hons), Sri Lanka Law College",
    languages: ["English", "Sinhala"],
    practiceCourts: ["Supreme Court", "High Court of Colombo"],
    rating: 4.8
  },
  {
    id: "l2",
    name: "Sanduni Jayasinghe",
    specialization: "Family Law",
    experience: "8 Years",
    location: "Kandy",
    contact: "+94 71 987 6543",
    email: "sanduni.j@example.lk",
    imageUrl: "https://media.istockphoto.com/id/2148603139/photo/confident-young-businesswoman-with-curly-hair-wearing-a-suit-smiles-seated-at-boardroom-table.jpg?s=612x612&w=0&k=20&c=pWwxxBrSg0VaMHxKFVODz7rnB_pxM4_W1s3W4IFP5y0=",
    bio: "Compassionate family lawyer specializing in divorce, child custody, and domestic disputes.",
    availableSlots: ["Tue 09:00 AM", "Thu 01:00 PM"],
    gender: "Female",
    education: "LL.B. University of Peradeniya",
    languages: ["English", "Sinhala"],
    practiceCourts: ["District Court of Kandy", "Magistrate Court"],
    rating: 4.9
  },
  {
    id: "l3",
    name: "Kamal de Silva",
    specialization: "Corporate Law",
    experience: "20 Years",
    location: "Colombo",
    contact: "+94 77 555 1234",
    email: "kamal.desilva@example.lk",
    imageUrl: "https://media.istockphoto.com/id/660149946/photo/business-colleagues-in-meeting-room-young-man-with-laptop.jpg?s=612x612&w=0&k=20&c=Boj6kQ6xqL1SwYDMQEr06tT7rBpLi6Ce4-XdZ05x0B4=",
    bio: "Senior counsel advising multinational corporations on mergers, acquisitions, and compliance in Sri Lanka.",
    availableSlots: ["Mon 04:00 PM", "Fri 09:00 AM"],
    gender: "Male",
    education: "LL.M. in Commercial Law, University of Colombo",
    languages: ["English", "Sinhala", "Tamil"],
    practiceCourts: ["Commercial High Court", "Supreme Court"],
    rating: 4.7
  },
  {
    id: "l4",
    name: "Amila Fernando",
    specialization: "Property & Real Estate",
    experience: "12 Years",
    location: "Galle",
    contact: "+94 76 222 3333",
    email: "amila.fernando@example.lk",
    imageUrl: "https://media.istockphoto.com/id/660151192/photo/senior-businessman-an-young-male-colleague-leaving-offices.jpg?s=612x612&w=0&k=20&c=GeEwy5UvzWsFgfXJiWLIRdPQnIjxDL_-vs_AdqwCXSw=",
    bio: "Dedicated to resolving complex land disputes, title registrations, and property conveyancing matters.",
    availableSlots: ["Wed 10:00 AM", "Thu 03:30 PM"],
    gender: "Male",
    education: "LL.B., Sri Lanka Law College",
    languages: ["English", "Sinhala"],
    practiceCourts: ["District Court of Galle"],
    rating: 4.6
  },
  {
    id: "l5",
    name: "Dilini Gunawardena",
    specialization: "Immigration & Human Rights",
    experience: "10 Years",
    location: "Colombo",
    contact: "+94 70 444 8888",
    email: "dilini.g@example.lk",
    imageUrl: "https://media.istockphoto.com/id/2197466827/photo/happy-businesswoman-drinking-a-cup-of-coffee-at-home-and-looking-through-the-window.jpg?s=612x612&w=0&k=20&c=2MaIPHlFY1XI-icgsc5fZyhUVdFQVmBO3hj13prQ4cY=",
    bio: "Prominent human rights advocate providing consultation for immigration, asylum, and fundamental rights petitions.",
    availableSlots: ["Tue 11:00 AM", "Thu 10:00 AM", "Sat 09:00 AM"],
    gender: "Female",
    education: "LL.M. in Human Rights, University of London",
    languages: ["English", "Sinhala"],
    practiceCourts: ["Supreme Court", "Court of Appeal"],
    rating: 4.9
  },
  {
    id: "l6",
    name: "Kasun Silva",
    specialization: "Labor & Employment",
    experience: "14 Years",
    location: "Colombo",
    contact: "+94 77 111 2233",
    email: "kasun.silva@example.lk",
    imageUrl: "https://media.istockphoto.com/id/2190087290/photo/portrait-of-confident-indian-businessman-wearing-eyeglasses-hands-in-pockets-looking-at-camera.jpg?s=612x612&w=0&k=20&c=sl0-kt_FzEOCFPG1JPyFkKSgMpOhZNvc8nxVKLZ2uEg=",
    bio: "Focused on labor laws and resolving employment disputes, representing both companies and employees.",
    availableSlots: ["Mon 10:00 AM", "Wed 12:00 PM"],
    gender: "Male",
    education: "LL.B. (Hons), University of Colombo",
    languages: ["English", "Sinhala", "Tamil"],
    practiceCourts: ["Labor Tribunal", "High Court"],
    rating: 4.8
  },
  {
    id: "l7",
    name: "Chamari Bandara",
    specialization: "Intellectual Property",
    experience: "9 Years",
    location: "Kandy",
    contact: "+94 71 222 4444",
    email: "chamari.b@example.lk",
    imageUrl: "https://media.istockphoto.com/id/2224278731/photo/young-indian-businesswoman-smiling-brightly-at-the-camera.jpg?s=612x612&w=0&k=20&c=YD4MIk7tmF0MBeKKJk4lMwtzY83XRENRHRVQUsrKDKE=",
    bio: "Helping businesses secure their intellectual assets, handling patents, trademarks, and copyright issues.",
    availableSlots: ["Tue 11:30 AM", "Thu 02:00 PM"],
    gender: "Female",
    education: "Attorney-at-Law, Sri Lanka Law College",
    languages: ["English", "Sinhala"],
    practiceCourts: ["Commercial High Court"],
    rating: 4.7
  },
  {
    id: "l8",
    name: "Dinesh Ratnayake",
    specialization: "Commercial Litigation",
    experience: "18 Years",
    location: "Colombo",
    contact: "+94 70 555 7777",
    email: "dinesh.r@example.lk",
    imageUrl: "https://media.istockphoto.com/id/660142492/photo/two-young-sri-lankan-business-colleagues-in-modern-office.jpg?s=612x612&w=0&k=20&c=ojmiP-B8Lrhm9V5NiB6uX5wB7zzDnk5QjqB7hXliBMw=",
    bio: "Veteran litigator with vast experience in commercial arbitration and dispute resolution.",
    availableSlots: ["Fri 10:00 AM", "Sat 11:00 AM"],
    gender: "Male",
    education: "LL.M. in International Commercial Law",
    languages: ["English", "Sinhala"],
    practiceCourts: ["Commercial High Court", "Supreme Court"],
    rating: 4.8
  },
  {
    id: "l9",
    name: "Shiromi Weerasinghe",
    specialization: "Tax Law",
    experience: "11 Years",
    location: "Colombo",
    contact: "+94 77 888 9999",
    email: "shiromi.w@example.lk",
    imageUrl: "https://media.istockphoto.com/id/2162679805/photo/woman-working-with-laptop-on-the-terrace-under-palm-tree-during-workation-in-sri-lanka.jpg?s=612x612&w=0&k=20&c=TXd27kWyqAyvzxZzFLAfQJZg_wbaP1-6CEMb-3u5pEU=",
    bio: "Expert advice on domestic tax structuring, audits, and compliance with the Inland Revenue Department.",
    availableSlots: ["Mon 02:00 PM", "Thu 09:30 AM"],
    gender: "Female",
    education: "LL.B. (Hons), Tax Professional Certification",
    languages: ["English", "Sinhala"],
    practiceCourts: ["Tax Appeals Commission", "Court of Appeal"],
    rating: 4.6
  },
  {
    id: "l10",
    name: "Ruwan Rajapakse",
    specialization: "Constitutional Law",
    experience: "25 Years",
    location: "Galle",
    contact: "+94 76 111 8888",
    email: "ruwan.r@example.lk",
    imageUrl: "https://media.istockphoto.com/id/2190087287/photo/confident-bearded-indian-man-wearing-stylish-eyeglasses-with-crossed-arms-looking-away-on.jpg?s=612x612&w=0&k=20&c=37aa4w31-G4rfuRDeaPy8xKnKEuKSDGoAWOvQkKsw2Q=",
    bio: "Eminent lawyer frequently appearing in the Supreme Court for fundamental rights applications.",
    availableSlots: ["Tue 10:00 AM", "Wed 03:00 PM"],
    gender: "Male",
    education: "PhD in Law, University of Colombo",
    languages: ["English", "Sinhala"],
    practiceCourts: ["Supreme Court", "Court of Appeal"],
    rating: 5.0
  },
  {
    id: "l11",
    name: "Nadeeka Liyanage",
    specialization: "Environmental Law",
    experience: "7 Years",
    location: "Kandy",
    contact: "+94 71 333 5555",
    email: "nadeeka.l@example.lk",
    imageUrl: "https://media.istockphoto.com/id/1299077558/photo/lead-yourself-to-a-life-of-success.jpg?s=612x612&w=0&k=20&c=OQZPSnM1Eq-4Xx8bxJE8KQ5olJFfRw_YMc29aQ0Au6U=",
    bio: "Passionate environmentalist and lawyer focusing on sustainability, conservation, and regulatory compliance.",
    availableSlots: ["Wed 11:00 AM", "Fri 01:00 PM"],
    gender: "Female",
    education: "LL.B. University of Peradeniya",
    languages: ["English", "Sinhala"],
    practiceCourts: ["District Court", "Magistrate Court"],
    rating: 4.5
  },
  {
    id: "l12",
    name: "Asanka Peiris",
    specialization: "Maritime Law",
    experience: "16 Years",
    location: "Colombo",
    contact: "+94 77 666 4444",
    email: "asanka.p@example.lk",
    imageUrl: "https://media.istockphoto.com/id/660141788/photo/young-man-in-suit-talking-and-smiling-to-woman-with-laptop.jpg?s=612x612&w=0&k=20&c=Ks5Uliq73Omg6p2U904pCru7uHyvI-w89rwbxiYztDc=",
    bio: "Specialist in admiralty matters, marine insurance, and shipping disputes in the commercial high court.",
    availableSlots: ["Thu 10:00 AM", "Fri 04:00 PM"],
    gender: "Male",
    education: "LL.M. in Maritime Law, UK",
    languages: ["English", "Sinhala"],
    practiceCourts: ["Commercial High Court", "Supreme Court"],
    rating: 4.8
  }
];

const LawyerDirectory: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLawyer, setSelectedLawyer] = useState<Lawyer | null>(null);
  const [bookingLawyer, setBookingLawyer] = useState<Lawyer | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string>("");
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [bookedAppointments, setBookedAppointments] = useState<Appointment[]>([]);
  const [viewingBookings, setViewingBookings] = useState(false);
  const itemsPerPage = 6;

  const filteredLawyers = MOCK_LAWYERS.filter((lawyer) =>
    lawyer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lawyer.specialization.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lawyer.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredLawyers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentLawyers = filteredLawyers.slice(startIndex, startIndex + itemsPerPage);

  const handleBookAppointment = () => {
    if (selectedSlot && bookingLawyer) {
      setBookedAppointments(prev => [...prev, {
        lawyer: bookingLawyer,
        slot: selectedSlot,
        dateBooked: new Date().toLocaleDateString()
      }]);
      setBookingSuccess(true);
      setTimeout(() => {
        setBookingLawyer(null);
        setBookingSuccess(false);
        setSelectedSlot("");
      }, 3000);
    }
  };

  const handleCancelBooking = (index: number) => {
    setBookedAppointments(prev => prev.filter((_, i) => i !== index));
  };

  const renderHeader = () => (
    <div className="mb-6 flex flex-col items-center">
      <div className="text-[11px] font-bold uppercase tracking-widest text-slate-500 mb-2">Connect with Legal Professionals</div>
      <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2 font-serif">Lawyer Directory</h1>
      <span className="text-sm font-mono text-cyan-600 dark:text-cyan-400">
        Find and book experienced lawyers in Sri Lanka
      </span>
      
      {!selectedLawyer && (
        <div className="mt-8 flex bg-slate-100 dark:bg-slate-800/80 p-1 rounded-lg">
          <button 
            onClick={() => setViewingBookings(false)} 
            className={`px-6 py-2.5 rounded-md text-sm font-bold transition-all ${!viewingBookings ? 'bg-white dark:bg-slate-700 shadow-sm text-cyan-600 dark:text-cyan-400' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
          >
            All Lawyers
          </button>
          <button 
            onClick={() => setViewingBookings(true)} 
            className={`px-6 py-2.5 rounded-md text-sm font-bold transition-all flex items-center gap-2 ${viewingBookings ? 'bg-white dark:bg-slate-700 shadow-sm text-cyan-600 dark:text-cyan-400' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
          >
            My Bookings 
            {bookedAppointments.length > 0 && (
              <span className={`text-[10px] px-2 py-0.5 rounded-full ${viewingBookings ? 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/50 dark:text-cyan-300' : 'bg-slate-200 text-slate-600 dark:bg-slate-700 dark:text-slate-300'}`}>
                {bookedAppointments.length}
              </span>
            )}
          </button>
        </div>
      )}
    </div>
  );

  const renderBookedAppointments = () => (
    <div className="w-full max-w-4xl pb-10">
      {renderHeader()}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {bookedAppointments.length === 0 ? (
          <div className="col-span-2 text-center py-16 px-4 bg-slate-50 dark:bg-[#121212] rounded-xl border border-slate-200 dark:border-slate-800 border-dashed">
            <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">No Bookings Yet</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm max-w-sm mx-auto mb-6">
              You haven't booked any appointments. Switch back to the directory to find a lawyer.
            </p>
            <button 
              onClick={() => setViewingBookings(false)}
              className="bg-cyan-600 hover:bg-cyan-700 text-white text-sm font-bold px-6 py-2 rounded transition-colors"
            >
              Browse Lawyers
            </button>
          </div>
        ) : (
          bookedAppointments.map((apt, i) => (
            <div key={i} className="flex flex-col rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#121212] p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/><path d="M8 14h.01"/><path d="M12 14h.01"/><path d="M16 14h.01"/><path d="M8 18h.01"/><path d="M12 18h.01"/><path d="M16 18h.01"/></svg>
                  <span className="text-sm font-bold">{apt.slot}</span>
                </div>
                <div className="text-[10px] uppercase font-bold text-slate-400">Booked {apt.dateBooked}</div>
              </div>
              <div className="flex items-center gap-4 mb-4">
                <img src={apt.lawyer.imageUrl} alt={apt.lawyer.name} className="w-16 h-16 rounded-full object-cover border-2 border-slate-100 dark:border-slate-800" />
                <div>
                  <h3 className="text-lg font-bold font-serif text-slate-900 dark:text-white">{apt.lawyer.name}</h3>
                  <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">{apt.lawyer.specialization}</div>
                </div>
              </div>
              <div className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-1 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                {apt.lawyer.contact}
              </div>
              <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
                <button 
                  onClick={() => handleCancelBooking(i)} 
                  className="text-xs font-bold text-red-500 hover:text-red-700 bg-red-50 dark:bg-red-500/10 hover:bg-red-100 dark:hover:bg-red-500/20 px-4 py-2 rounded transition-colors flex items-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" x2="6" y1="6" y2="18"/><line x1="6" x2="18" y1="6" y2="18"/></svg>
                  CANCEL BOOKING
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );

  const renderLawyersList = () => (
    <div className="w-full max-w-5xl pb-10">
      {renderHeader()}

      <div className="mb-10 w-full max-w-2xl mx-auto flex">
        <input
          type="text"
          placeholder="Search by name, specialization, or location..."
          className="w-full rounded-l-lg border border-slate-300 dark:border-slate-700 bg-white/50 dark:bg-black/50 px-4 py-3 text-sm text-slate-900 dark:text-white focus:border-cyan-500 focus:outline-none"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1);
          }}
        />
        <button className="bg-slate-900 dark:bg-slate-200 text-white dark:text-black font-bold text-sm px-6 rounded-r-lg hover:bg-slate-800 dark:hover:bg-white transition-colors">
          SEARCH
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {currentLawyers.map(lawyer => (
          <div
            key={lawyer.id}
            className="group flex flex-col justify-between rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#121212] p-6 cursor-pointer hover:border-cyan-500/50 hover:shadow-lg transition-all hover:-translate-y-1"
          >
            <div>
              <div className="flex items-center gap-4 mb-4">
                <img src={lawyer.imageUrl} alt={lawyer.name} className="w-16 h-16 rounded-full object-cover border-2 border-slate-100 dark:border-slate-800" />
                <div>
                  <h3 className="text-lg font-bold font-serif text-slate-900 dark:text-white">{lawyer.name}</h3>
                  <div className="text-[11px] font-bold text-white bg-slate-800 dark:bg-slate-700 inline-block px-2 py-0.5 rounded uppercase tracking-wider mt-1">
                    {lawyer.specialization}
                  </div>
                </div>
              </div>
              <div className="text-sm text-slate-500 dark:text-slate-400 mb-4 flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                {lawyer.location} • {lawyer.experience}
              </div>
            </div>
            <div className="flex gap-2 mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
              <button 
                onClick={(e) => { e.stopPropagation(); setSelectedLawyer(lawyer); }}
                className="flex-1 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white text-xs font-bold py-2 rounded transition-colors text-center"
              >
                VIEW PROFILE
              </button>
              <button 
                onClick={(e) => { e.stopPropagation(); setBookingLawyer(lawyer); }}
                className="flex-1 bg-cyan-600 hover:bg-cyan-700 text-white text-xs font-bold py-2 rounded transition-colors text-center"
              >
                BOOK NOW
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {filteredLawyers.length === 0 ? (
        <div className="text-center py-10 text-slate-500 dark:text-slate-400">
          No lawyers found matching your search.
        </div>
      ) : totalPages > 1 ? (
        <div className="flex justify-center items-center gap-2 mb-10">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded border border-slate-200 dark:border-slate-800 text-sm font-bold text-slate-600 dark:text-slate-400 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            Prev
          </button>
          
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`w-10 h-10 rounded border text-sm font-bold transition-colors ${
                currentPage === i + 1
                  ? "bg-slate-900 dark:bg-slate-200 text-white dark:text-black border-slate-900 dark:border-slate-200"
                  : "border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
              }`}
            >
              {i + 1}
            </button>
          ))}
          
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 rounded border border-slate-200 dark:border-slate-800 text-sm font-bold text-slate-600 dark:text-slate-400 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            Next
          </button>
        </div>
      ) : null}
    </div>
  );

  const renderLawyerProfile = () => {
    if (!selectedLawyer) return null;
    return (
      <div className="w-full max-w-4xl pb-10">
        <button onClick={() => setSelectedLawyer(null)} className="mb-6 text-cyan-500 hover:text-cyan-400 font-bold text-sm flex items-center gap-2">
          &larr; Back to Directory
        </button>
        
        <div className="bg-white dark:bg-[#121212] border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
          <div className="bg-slate-100 dark:bg-slate-800/50 p-8 flex flex-col md:flex-row gap-8 items-start md:items-center border-b border-slate-200 dark:border-slate-800">
            <img src={selectedLawyer.imageUrl} alt={selectedLawyer.name} className="w-32 h-32 rounded-full object-cover border-4 border-white dark:border-slate-700 shadow-md" />
            <div className="flex-1">
              <h1 className="text-3xl font-bold font-serif text-slate-900 dark:text-white mb-2">{selectedLawyer.name}</h1>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="text-xs font-bold text-white bg-slate-800 dark:bg-slate-700 px-3 py-1 rounded uppercase tracking-wider">{selectedLawyer.specialization}</span>
                <span className="text-xs font-bold text-slate-600 dark:text-slate-300 bg-slate-200 dark:bg-slate-700/50 px-3 py-1 rounded">{selectedLawyer.experience}</span>
                <span className="text-xs font-bold text-slate-600 dark:text-slate-300 bg-slate-200 dark:bg-slate-700/50 px-3 py-1 rounded flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                  {selectedLawyer.location}
                </span>
              </div>
              <button 
                onClick={() => setBookingLawyer(selectedLawyer)}
                className="bg-cyan-600 hover:bg-cyan-700 text-white text-sm font-bold px-6 py-2 rounded transition-colors inline-block"
              >
                Book Appointment
              </button>
            </div>
          </div>
          
          <div className="p-8">
            <h2 className="text-xl font-bold font-serif text-slate-900 dark:text-white mb-4 border-b border-slate-100 dark:border-slate-800 pb-2">Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 mb-8">
              <div>
                <div className="text-[10px] font-bold uppercase text-slate-500 mb-1">Name</div>
                <div className="text-sm font-semibold text-slate-900 dark:text-white">{selectedLawyer.name}</div>
              </div>
              <div>
                <div className="text-[10px] font-bold uppercase text-slate-500 mb-1">Gender</div>
                <div className="text-sm font-semibold text-slate-900 dark:text-white">{selectedLawyer.gender}</div>
              </div>
              <div>
                <div className="text-[10px] font-bold uppercase text-slate-500 mb-1">Experience</div>
                <div className="text-sm font-semibold text-slate-900 dark:text-white">{selectedLawyer.experience}</div>
              </div>
              <div>
                <div className="text-[10px] font-bold uppercase text-slate-500 mb-1">Rating</div>
                <div className="text-sm font-semibold text-slate-900 dark:text-white flex items-center gap-1">
                  {selectedLawyer.rating} <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="#eab308" stroke="#eab308" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                </div>
              </div>
              <div className="md:col-span-2">
                <div className="text-[10px] font-bold uppercase text-slate-500 mb-1">Specialization</div>
                <div className="text-sm font-semibold text-slate-900 dark:text-white">{selectedLawyer.specialization}</div>
              </div>
              <div className="md:col-span-2">
                <div className="text-[10px] font-bold uppercase text-slate-500 mb-1">Education</div>
                <div className="text-sm font-semibold text-slate-900 dark:text-white">{selectedLawyer.education}</div>
              </div>
              <div>
                <div className="text-[10px] font-bold uppercase text-slate-500 mb-1">Languages Known</div>
                <div className="text-sm font-semibold text-slate-900 dark:text-white">{selectedLawyer.languages.join(", ")}</div>
              </div>
              <div>
                <div className="text-[10px] font-bold uppercase text-slate-500 mb-1">Practice Courts</div>
                <div className="text-sm font-semibold text-slate-900 dark:text-white">{selectedLawyer.practiceCourts.join(", ")}</div>
              </div>
            </div>

            <h2 className="text-xl font-bold font-serif text-slate-900 dark:text-white mb-4 border-b border-slate-100 dark:border-slate-800 pb-2">About</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
              {selectedLawyer.bio}
            </p>
            
            <h2 className="text-xl font-bold font-serif text-slate-900 dark:text-white mb-4 border-b border-slate-100 dark:border-slate-800 pb-2">Contact Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-900/50 p-4 rounded-lg border border-slate-100 dark:border-slate-800">
                <div className="bg-slate-200 dark:bg-slate-800 p-2 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                </div>
                <div>
                  <div className="text-[10px] font-bold uppercase text-slate-500">Phone</div>
                  <div className="text-sm font-semibold text-slate-900 dark:text-white">{selectedLawyer.contact}</div>
                </div>
              </div>
              <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-900/50 p-4 rounded-lg border border-slate-100 dark:border-slate-800">
                <div className="bg-slate-200 dark:bg-slate-800 p-2 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                </div>
                <div>
                  <div className="text-[10px] font-bold uppercase text-slate-500">Email</div>
                  <div className="text-sm font-semibold text-slate-900 dark:text-white">{selectedLawyer.email}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderBookingModal = () => {
    if (!bookingLawyer) return null;
    
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
        <div className="bg-white dark:bg-[#121212] border border-slate-200 dark:border-slate-800 rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
          <div className="flex justify-between items-center p-6 border-b border-slate-100 dark:border-slate-800">
            <h2 className="text-xl font-bold font-serif text-slate-900 dark:text-white">Book Appointment</h2>
            <button onClick={() => { setBookingLawyer(null); setBookingSuccess(false); setSelectedSlot(""); }} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </button>
          </div>
          
          <div className="p-6">
            {bookingSuccess ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Booking Confirmed!</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm">
                  Your appointment with {bookingLawyer.name} for {selectedSlot} has been scheduled.
                </p>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-4 mb-6 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-slate-100 dark:border-slate-800">
                  <img src={bookingLawyer.imageUrl} alt={bookingLawyer.name} className="w-12 h-12 rounded-full object-cover" />
                  <div>
                    <div className="font-bold text-slate-900 dark:text-white">{bookingLawyer.name}</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">{bookingLawyer.specialization}</div>
                  </div>
                </div>
                
                <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-3">Select a Date & Time</h3>
                <div className="grid grid-cols-1 gap-2 mb-6">
                  {bookingLawyer.availableSlots.map(slot => (
                    <button
                      key={slot}
                      onClick={() => setSelectedSlot(slot)}
                      className={`p-3 rounded border text-sm font-semibold transition-colors flex justify-between items-center ${
                        selectedSlot === slot 
                          ? 'border-cyan-500 bg-cyan-50 dark:bg-cyan-900/20 text-cyan-700 dark:text-cyan-400' 
                          : 'border-slate-200 dark:border-slate-700 hover:border-cyan-300 dark:hover:border-slate-500 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {slot}
                      {selectedSlot === slot && (
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                      )}
                    </button>
                  ))}
                </div>
                
                <button 
                  onClick={handleBookAppointment}
                  disabled={!selectedSlot}
                  className={`w-full py-3 rounded font-bold transition-colors ${
                    selectedSlot 
                      ? 'bg-cyan-600 hover:bg-cyan-700 text-white' 
                      : 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  CONFIRM BOOKING
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="relative z-10 flex w-full flex-1 flex-col items-center px-4 pt-10 md:px-6 h-full overflow-y-auto">
      {selectedLawyer 
        ? renderLawyerProfile() 
        : viewingBookings 
          ? renderBookedAppointments() 
          : renderLawyersList()}
      {renderBookingModal()}
    </div>
  );
};

export default LawyerDirectory;
