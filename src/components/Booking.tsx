import { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar as CalendarIcon, Clock, Check, Sparkles, ExternalLink, RefreshCw } from 'lucide-react';

export default function Booking() {
  const [bookingMode, setBookingMode] = useState<'interactive' | 'calendly'>('interactive');
  
  // Custom interactive calendar state
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [clientBrief, setClientBrief] = useState('');
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [isBooked, setIsBooked] = useState(false);
  const [bookingRef, setBookingRef] = useState('');

  const timeSlots = ['09:00 AM', '11:30 AM', '02:00 PM', '04:30 PM'];

  // Generate available calendar days (July 2026 as per local metadata date)
  const currentYear = 2026;
  const currentMonthName = 'July';
  const totalDays = 31;
  const startingDayOfWeek = 3; // July 1 2026 is a Wednesday (0=Sun, 3=Wed)

  // Array for empty cells before start of month
  const emptyCells = Array(startingDayOfWeek).fill(null);
  // Days of the month
  const monthDays = Array.from({ length: totalDays }, (_, i) => i + 1);

  const handleDaySelect = (day: number) => {
    // Avoid booking past/Sunday days
    const dateObj = new Date(currentYear, 6, day);
    if (dateObj.getDay() === 0) return; // Skip Sundays for high-fashion rest
    setSelectedDate(day);
    setSelectedTime(null);
  };

  const handleCustomSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime || !clientName || !clientEmail) return;

    // Create unique archival ref code
    const randomRef = `AU-2026-${selectedDate}${Math.floor(100 + Math.random() * 900)}`;
    setBookingRef(randomRef);
    setIsBooked(true);
  };

  const resetBooking = () => {
    setSelectedDate(null);
    setSelectedTime(null);
    setClientName('');
    setClientEmail('');
    setClientBrief('');
    setIsBooked(false);
    setBookingRef('');
  };

  // Live Calendly Popup Trigger
  const triggerCalendlyPopup = () => {
    if ((window as any).Calendly) {
      (window as any).Calendly.initPopupWidget({
        url: 'https://calendly.com/mitchelladetayo/meeting',
      });
    } else {
      // Fallback open link in new tab if script fails or is blocked
      window.open('https://calendly.com/mitchelladetayo/meeting', '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <section id="booking" className="py-24 md:py-36 bg-bg-base relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          
          {/* Left Column: Heading & Mode Controls */}
          <div className="lg:col-span-5">
            <span className="text-xs uppercase tracking-[0.3em] text-accent font-medium mb-4 block">
              Reservation
            </span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-light text-white tracking-tight mb-8">
              Reserve an <br />
              <span className="italic font-normal text-accent">Experience</span>
            </h2>
            <p className="text-sm md:text-base text-text-muted font-sans font-light leading-relaxed tracking-wide mb-10">
              Select a preferred session timeframe directly from our archival scheduler, or connect live using Calendly. Once locked, we will schedule a brief phone call to map out moodboards, location options, and coordinate styling resources.
            </p>

            {/* Toggle Switcher */}
            <div className="flex border border-white/10 p-1 bg-bg-surface w-fit mb-8 rounded">
              <button
                onClick={() => setBookingMode('interactive')}
                className={`px-5 py-2.5 text-[10px] uppercase tracking-[0.15em] font-medium font-sans cursor-pointer transition-all duration-300 ${
                  bookingMode === 'interactive' ? 'bg-accent text-bg-base' : 'text-text-muted hover:text-white'
                }`}
              >
                Archival Scheduler
              </button>
              <button
                onClick={() => setBookingMode('calendly')}
                className={`px-5 py-2.5 text-[10px] uppercase tracking-[0.15em] font-medium font-sans cursor-pointer transition-all duration-300 ${
                  bookingMode === 'calendly' ? 'bg-accent text-bg-base' : 'text-text-muted hover:text-white'
                }`}
              >
                Calendly Live
              </button>
            </div>

            {/* Action Buttons to trigger live widget outside */}
            <div className="flex flex-col gap-4 border-t border-white/5 pt-8">
              <button
                onClick={triggerCalendlyPopup}
                className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-semibold text-accent hover:text-white transition-colors duration-300 font-sans cursor-pointer group"
              >
                <span>Launch Calendly Floating Window</span>
                <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
              <p className="text-[10px] text-text-muted">
                Requires live internet connection. Will open in secure popup overlay.
              </p>
            </div>
          </div>

          {/* Right Column: Calendly Frame or Luxury Interactive Scheduler */}
          <div className="lg:col-span-7" id="booking-widget-canvas">
            <AnimatePresence mode="wait">
              {bookingMode === 'calendly' ? (
                /* Mode A: Real Calendly Inline Frame */
                <motion.div
                  key="calendly"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className="bg-bg-surface border border-white/10 overflow-hidden relative"
                >
                  <div className="h-[580px] w-full">
                    {/* Inline embed with clean overlay in case blocked */}
                    <iframe
                      src="https://calendly.com/mitchelladetayo/meeting?embed_domain=ai.studio&embed_type=Inline"
                      className="w-full h-full border-0 bg-transparent"
                      title="Calendly Live Scheduling Frame"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="absolute top-2 right-2 bg-bg-base/90 border border-white/5 px-2.5 py-1 text-[9px] uppercase tracking-[0.15em] text-accent font-sans">
                    Live Embed
                  </div>
                </motion.div>
              ) : (
                /* Mode B: Luxury Custom Interactive Selector */
                <motion.div
                  key="interactive"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className="bg-bg-surface border border-white/10 p-6 md:p-8"
                >
                  {!isBooked ? (
                    <form onSubmit={handleCustomSubmit}>
                      <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
                        <h4 className="font-display text-lg font-light text-white">
                          Select Date & Session Time
                        </h4>
                        <span className="text-[11px] font-sans text-accent uppercase tracking-[0.15em]">
                          {currentMonthName} {currentYear}
                        </span>
                      </div>

                      {/* Custom Calendar Month Grid */}
                      <div className="grid grid-cols-7 gap-1 text-center text-xs mb-6 font-sans">
                        {/* Weekday headers */}
                        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((d) => (
                          <div key={d} className="text-[10px] text-text-muted uppercase tracking-wider py-1 font-semibold">
                            {d}
                          </div>
                        ))}

                        {/* Pre-fill empty slots */}
                        {emptyCells.map((_, idx) => (
                          <div key={`empty-${idx}`} className="py-2.5 text-transparent select-none">
                            -
                          </div>
                        ))}

                        {/* Calendar days */}
                        {monthDays.map((day) => {
                          const dateObj = new Date(currentYear, 6, day);
                          const isSunday = dateObj.getDay() === 0;
                          const isSelected = selectedDate === day;

                          return (
                            <button
                              key={`day-${day}`}
                              type="button"
                              onClick={() => handleDaySelect(day)}
                              disabled={isSunday}
                              className={`py-2.5 rounded transition-all duration-300 font-light select-none cursor-pointer ${
                                isSunday
                                  ? 'text-white/5 cursor-not-allowed bg-transparent'
                                  : isSelected
                                  ? 'bg-accent text-bg-base font-semibold'
                                  : 'text-white hover:bg-white/5'
                              }`}
                            >
                              {day}
                            </button>
                          );
                        })}
                      </div>

                      {/* Selected Day Context */}
                      {selectedDate && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="border-t border-white/5 pt-6 mb-6"
                        >
                          <span className="text-[10px] uppercase tracking-[0.15em] text-accent block mb-3">
                            Available Hours for July {selectedDate}, {currentYear}
                          </span>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                            {timeSlots.map((time) => (
                              <button
                                key={time}
                                type="button"
                                onClick={() => setSelectedTime(time)}
                                className={`py-2 px-3 text-center border text-[11px] tracking-wide transition-all duration-300 cursor-pointer ${
                                  selectedTime === time
                                    ? 'border-accent text-accent bg-accent/5 font-semibold'
                                    : 'border-white/5 text-text-muted hover:border-white/20 hover:text-white'
                                }`}
                              >
                                {time}
                              </button>
                            ))}
                          </div>
                        </motion.div>
                      )}

                      {/* Client Brief Inputs */}
                      {selectedTime && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="space-y-4 border-t border-white/5 pt-6"
                        >
                          <span className="text-[10px] uppercase tracking-[0.15em] text-accent block">
                            Required Project Parameters
                          </span>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <input
                              type="text"
                              required
                              placeholder="Your full name"
                              value={clientName}
                              onChange={(e) => setClientName(e.target.value)}
                              className="bg-bg-base border border-white/5 p-3 text-xs text-white focus:outline-none focus:border-accent font-sans"
                            />
                            <input
                              type="email"
                              required
                              placeholder="Email address"
                              value={clientEmail}
                              onChange={(e) => setClientEmail(e.target.value)}
                              className="bg-bg-base border border-white/5 p-3 text-xs text-white focus:outline-none focus:border-accent font-sans"
                            />
                          </div>
                          <textarea
                            placeholder="Brief description of visual goals, theme ideas, or studio logistics"
                            rows={3}
                            value={clientBrief}
                            onChange={(e) => setClientBrief(e.target.value)}
                            className="w-full bg-bg-base border border-white/5 p-3 text-xs text-white focus:outline-none focus:border-accent font-sans resize-none"
                          />

                          <button
                            type="submit"
                            className="w-full py-4 text-xs uppercase tracking-[0.2em] font-semibold bg-white text-bg-base hover:bg-accent hover:text-white transition-all duration-300 cursor-pointer font-sans"
                          >
                            Lock Time Slot
                          </button>
                        </motion.div>
                      )}

                      {!selectedDate && (
                        <div className="py-8 text-center text-text-muted text-xs border border-dashed border-white/5 rounded">
                          <CalendarIcon className="w-5 h-5 mx-auto text-accent/30 mb-2" />
                          Please click a day on the July calendar to view hours.
                        </div>
                      )}
                    </form>
                  ) : (
                    /* Render confirmation ticket on success */
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-8"
                    >
                      <div className="w-12 h-12 bg-accent/10 border border-accent/20 text-accent rounded-full flex items-center justify-center mx-auto mb-6">
                        <Check className="w-6 h-6" />
                      </div>

                      <span className="text-xs uppercase tracking-[0.25em] text-accent block mb-2">
                        Archival Session Registered
                      </span>
                      <h4 className="font-display text-2xl font-light text-white mb-6">
                        Inquiry Verified
                      </h4>

                      {/* Ticket Box */}
                      <div className="bg-bg-base border border-white/15 p-6 md:p-8 max-w-md mx-auto mb-8 relative overflow-hidden rounded text-left">
                        {/* Cutouts on tickets */}
                        <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-bg-surface border-r border-white/10 rounded-full" />
                        <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-bg-surface border-l border-white/10 rounded-full" />

                        <div className="flex justify-between items-center border-b border-white/5 pb-4 mb-4">
                          <span className="font-display text-lg tracking-[0.1em] text-white">AURA PORTFOLIO</span>
                          <span className="font-mono text-[9px] text-accent font-bold uppercase tracking-wider bg-accent/5 border border-accent/15 px-2 py-0.5">
                            Pending Approval
                          </span>
                        </div>

                        <div className="space-y-4 text-xs font-sans">
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <span className="text-text-muted text-[9px] uppercase tracking-wider block">Client</span>
                              <span className="text-white font-medium">{clientName}</span>
                            </div>
                            <div>
                              <span className="text-text-muted text-[9px] uppercase tracking-wider block">Date Locked</span>
                              <span className="text-white font-medium">July {selectedDate}, 2026</span>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <span className="text-text-muted text-[9px] uppercase tracking-wider block">Timeframe</span>
                              <span className="text-white font-medium">{selectedTime}</span>
                            </div>
                            <div>
                              <span className="text-text-muted text-[9px] uppercase tracking-wider block">Archival ID</span>
                              <span className="font-mono text-accent">{bookingRef}</span>
                            </div>
                          </div>

                          {clientBrief && (
                            <div className="border-t border-white/5 pt-4">
                              <span className="text-text-muted text-[9px] uppercase tracking-wider block">Thematic brief</span>
                              <p className="text-text-muted text-[11px] leading-relaxed truncate-2-lines italic">
                                "{clientBrief}"
                              </p>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <button
                          onClick={resetBooking}
                          className="text-xs uppercase tracking-[0.15em] text-text-muted hover:text-white transition-colors duration-300 font-sans cursor-pointer flex items-center gap-1.5"
                        >
                          <RefreshCw className="w-3.5 h-3.5" />
                          Reserve Another Slot
                        </button>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
        </div>
      </div>
    </section>
  );
}
