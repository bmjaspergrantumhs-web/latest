
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { PropertyType, BookingData } from '../types';
import { SERVICES, PAGE_METADATA } from '../constants';
import { dbService } from '../db';
import { notificationService } from '../services/notificationService';
import { useStudioNotification } from '../src/App';
import SEO from '../components/SEO';

interface FormErrors {
  postalCode?: string;
  contactName?: string;
  email?: string;
  address?: string;
  phone?: string;
}

const Booking = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialType = queryParams.get('type') === 'quote' ? 'quotation' : 'booking';
  const initialService = queryParams.get('service');
  const { showToast } = useStudioNotification();

  const [step, setStep] = useState(1);
  const [bookingData, setBookingData] = useState<BookingData>({
    postalCode: '',
    propertyType: PropertyType.RESIDENTIAL,
    selectedServices: initialService ? [initialService] : [],
    contactName: '',
    email: '',
    address: '',
    phone: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [referenceId, setReferenceId] = useState('');

  useEffect(() => {
    if (initialService && !bookingData.selectedServices.includes(initialService)) {
      setBookingData(prev => ({ ...prev, selectedServices: [initialService] }));
    }
  }, [initialService]);

  const validatePostalCode = (pc: string) => {
    const regex = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/;
    if (!pc) return "Postal code is required";
    if (!regex.test(pc)) return "Please enter a valid Canadian postal code (e.g. A1A 1A1)";
    return undefined;
  };

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return "Email is required";
    if (!regex.test(email)) return "Please enter a valid email address";
    return undefined;
  };

  const validatePhone = (phone: string) => {
    const regex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if (!phone) return "Phone number is required";
    if (!regex.test(phone)) return "Please enter a valid 10-digit phone number";
    return undefined;
  };

  const handleBlur = (field: keyof BookingData) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    performValidation(field, bookingData[field] as string);
  };

  const performValidation = (field: string, value: string) => {
    let error: string | undefined;
    switch (field) {
      case 'postalCode':
        error = validatePostalCode(value);
        break;
      case 'email':
        error = validateEmail(value);
        break;
      case 'phone':
        error = validatePhone(value);
        break;
      case 'contactName':
        if (!value) error = "Name is required";
        break;
      case 'address':
        if (!value) error = "Address is required";
        break;
    }
    setErrors(prev => ({ ...prev, [field]: error }));
    return error;
  };

  const handleServiceToggle = (serviceId: string) => {
    setBookingData(prev => ({
      ...prev,
      selectedServices: prev.selectedServices.includes(serviceId)
        ? prev.selectedServices.filter(id => id !== serviceId)
        : [...prev.selectedServices, serviceId]
    }));
  };

  const isStepValid = () => {
    if (step === 1) return !validatePostalCode(bookingData.postalCode);
    if (step === 2) return !!bookingData.propertyType;
    if (step === 3) return bookingData.selectedServices.length > 0;
    if (step === 4) {
      return (
        !validatePostalCode(bookingData.postalCode) &&
        !validateEmail(bookingData.email) &&
        !validatePhone(bookingData.phone) &&
        !!bookingData.contactName &&
        !!bookingData.address
      );
    }
    return false;
  };

  const nextStep = () => {
    const error = step === 1 ? validatePostalCode(bookingData.postalCode) : undefined;
    if (error) {
      setErrors(prev => ({ ...prev, postalCode: error }));
      setTouched(prev => ({ ...prev, postalCode: true }));
      return;
    }
    setStep(s => s + 1);
  };

  const prevStep = () => setStep(s => s - 1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const finalErrors = {
      postalCode: validatePostalCode(bookingData.postalCode),
      email: validateEmail(bookingData.email),
      phone: validatePhone(bookingData.phone),
      contactName: bookingData.contactName ? undefined : "Name is required",
      address: bookingData.address ? undefined : "Address is required",
    };

    setErrors(finalErrors);
    setTouched({ contactName: true, email: true, phone: true, address: true, postalCode: true });

    const hasErrors = Object.values(finalErrors).some(err => !!err);
    if (hasErrors) return;

    setIsSubmitting(true);
    showToast("Initiating Studio Dispatch...", "info");
    
    try {
      await dbService.saveLead({
        ...bookingData,
        type: initialType as 'booking' | 'quotation'
      });
      
      const ref = `GA-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
      setReferenceId(ref);

      const res = await notificationService.dispatchStudioAlert(initialType as any, bookingData);
      
      if (res.success) {
        showToast("Inquiry logged and studio alerted.", "success");
      }

      await new Promise(resolve => setTimeout(resolve, 500));
      setIsComplete(true);
    } catch (error) {
      showToast("Transmission failed. Please check your connection.", "error");
      console.error("Submission failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isComplete) {
    const selectedServiceTitles = SERVICES
      .filter(s => bookingData.selectedServices.includes(s.id))
      .map(s => s.title);

    return (
      <div className="min-h-[90vh] flex items-center justify-center bg-[#fcfbf7] py-24 px-4">
        <SEO metadata={{ ...PAGE_METADATA.booking, title: 'Submission Confirmed | The Garden Architect' }} />
        <div className="max-w-3xl w-full bg-white p-10 md:p-20 shadow-2xl border border-stone-100 relative overflow-hidden animate-fade-in">
          <div className="absolute top-0 left-0 w-full h-2 bg-emerald-900"></div>
          
          <div className="text-center">
            <div className="w-20 h-20 bg-emerald-50 text-emerald-900 rounded-full flex items-center justify-center mx-auto mb-10">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            
            <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-emerald-800 block mb-4">Transmission Successful</span>
            <h2 className="text-4xl md:text-5xl font-bold mb-8 brand-font tracking-tight text-stone-950">
              {initialType === 'quotation' ? 'Quote Processed' : 'Inquiry Logged'}
            </h2>
            
            <p className="text-stone-500 mb-12 leading-relaxed serif-text italic text-lg max-w-xl mx-auto">
              Greetings, {bookingData.contactName}. Your request has been securely received and processed by The Studio. A principal architect will review your property details shortly.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 text-left border-t border-b border-stone-100 py-12">
              <div>
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-4">Reference Number</h4>
                <p className="font-mono text-xl font-bold text-emerald-950 tracking-tighter">{referenceId}</p>
              </div>
              <div>
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-4">Property Locale</h4>
                <p className="text-stone-800 font-medium tracking-tight uppercase text-sm">{bookingData.postalCode} • {bookingData.address}</p>
              </div>
              <div className="md:col-span-2">
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-4">Architectural Summary</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedServiceTitles.map((title, idx) => (
                    <span key={idx} className="px-3 py-1 bg-stone-50 border border-stone-200 text-[10px] font-bold uppercase tracking-widest text-stone-600">
                      {title}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <button 
                onClick={() => window.location.hash = '#/'}
                className="w-full bg-emerald-950 text-white py-6 rounded-sm text-xs font-bold uppercase tracking-[0.4em] shadow-lg hover:bg-black transition-all active:scale-95"
              >
                Return to Studio Gallery
              </button>
              <p className="text-[9px] text-stone-300 uppercase tracking-widest">Confidentiality Assured • Digital Heritage 2024</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#fcfbf7] min-h-screen py-24 px-4">
      <SEO metadata={PAGE_METADATA.booking} />
      
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-20">
           <h1 className="text-4xl md:text-5xl font-bold text-emerald-950 mb-6 brand-font tracking-tight">
             {initialType === 'quotation' ? 'Service Quotation' : 'Studio Consultation'}
           </h1>
           <p className="text-stone-500 serif-text italic">
             {initialType === 'quotation' ? 'Secure a detailed estimate for your specific requirements.' : 'Commissioning The Garden Architect for your terrain.'}
           </p>
        </div>

        <div className="flex justify-between items-center mb-16 px-4">
          {[1, 2, 3, 4].map((s) => (
            <React.Fragment key={s}>
              <div className="flex flex-col items-center relative">
                <div className={`w-8 h-8 flex items-center justify-center font-bold transition-all duration-300 ${
                  step >= s ? 'text-emerald-900' : 'text-stone-300'
                }`}>
                  <span className="text-xs uppercase tracking-widest">{s < 10 ? `0${s}` : s}</span>
                </div>
                <span className={`text-[8px] mt-2 font-bold uppercase tracking-[0.3em] ${step >= s ? 'text-emerald-900' : 'text-stone-300'}`}>
                  {['Locale', 'Sector', 'Service', 'Detail'][s-1]}
                </span>
                {step === s && <div className="absolute -bottom-4 w-1 h-1 bg-emerald-900 rounded-full"></div>}
              </div>
              {s < 4 && <div className={`flex-1 h-px mx-4 ${step > s ? 'bg-emerald-900/30' : 'bg-stone-200'}`} />}
            </React.Fragment>
          ))}
        </div>

        <div className="bg-white shadow-2xl border border-stone-100 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-emerald-900"></div>
          <div className="p-10 md:p-20">
            
            {step === 1 && (
              <div className="animate-fade-in">
                <h2 className="text-3xl font-bold text-stone-950 mb-4 brand-font">Property Locale</h2>
                <p className="text-stone-500 mb-12 serif-text italic">Serving distinguished addresses across the Greater Toronto Area.</p>
                <div className="space-y-6">
                  <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-[0.4em]">Postal Code</label>
                  <input 
                    type="text"
                    required
                    placeholder="M5V 2L1"
                    className={`w-full p-6 text-3xl font-bold border-b-2 transition-all outline-none uppercase tracking-widest placeholder:text-stone-100 bg-transparent ${
                      touched.postalCode && errors.postalCode ? 'border-red-500 text-red-500' : 'border-stone-100 focus:border-emerald-900'
                    }`}
                    value={bookingData.postalCode}
                    onBlur={() => handleBlur('postalCode')}
                    onChange={e => {
                      setBookingData({...bookingData, postalCode: e.target.value});
                      if (touched.postalCode) performValidation('postalCode', e.target.value);
                    }}
                  />
                  {touched.postalCode && errors.postalCode && (
                    <p className="text-red-500 text-[10px] uppercase tracking-widest font-bold mt-2 animate-fade-in">{errors.postalCode}</p>
                  )}
                </div>
                <button 
                  type="button"
                  onClick={nextStep}
                  className="w-full mt-16 bg-emerald-900 text-white py-6 rounded-sm font-bold text-xs uppercase tracking-[0.4em] shadow-xl hover:bg-black transition-all active:scale-95 disabled:bg-stone-200 disabled:cursor-not-allowed"
                >
                  Confirm Locale
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="animate-fade-in text-center">
                <h2 className="text-3xl font-bold text-stone-950 mb-12 brand-font">Select Sector</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <button 
                    type="button"
                    onClick={() => { setBookingData({...bookingData, propertyType: PropertyType.RESIDENTIAL}); nextStep(); }}
                    className={`p-12 border transition-all text-center group ${
                      bookingData.propertyType === PropertyType.RESIDENTIAL ? 'border-emerald-900 bg-stone-50' : 'border-stone-100 bg-white hover:border-emerald-200'
                    }`}
                  >
                    <div className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-6 group-hover:text-emerald-800">Section 01</div>
                    <h3 className="text-xl font-bold text-stone-950 mb-4 uppercase tracking-widest">Residential</h3>
                    <p className="text-stone-500 text-xs serif-text italic leading-relaxed">Private estates, urban gardens, and botanical residences.</p>
                  </button>
                  <button 
                    type="button"
                    onClick={() => { setBookingData({...bookingData, propertyType: PropertyType.COMMERCIAL}); nextStep(); }}
                    className={`p-12 border transition-all text-center group ${
                      bookingData.propertyType === PropertyType.COMMERCIAL ? 'border-emerald-900 bg-stone-50' : 'border-stone-100 bg-white hover:border-emerald-200'
                    }`}
                  >
                    <div className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-6 group-hover:text-emerald-800">Section 02</div>
                    <h3 className="text-xl font-bold text-stone-950 mb-4 uppercase tracking-widest">Commercial</h3>
                    <p className="text-stone-500 text-xs serif-text italic leading-relaxed">Corporate campuses, public spaces, and retail institutions.</p>
                  </button>
                </div>
                <button type="button" onClick={prevStep} className="mt-12 text-[10px] font-bold uppercase tracking-widest text-stone-400 hover:text-emerald-900 transition-colors">Return</button>
              </div>
            )}

            {step === 3 && (
              <div className="animate-fade-in">
                <h2 className="text-3xl font-bold text-stone-950 mb-12 brand-font">Architectural Requirements</h2>
                <div className="grid grid-cols-1 gap-4">
                  {SERVICES.map(service => (
                    <label 
                      key={service.id}
                      className={`flex items-center p-8 border cursor-pointer transition-all ${
                        bookingData.selectedServices.includes(service.id) ? 'border-emerald-900 bg-stone-50' : 'border-stone-100 bg-white hover:border-emerald-100'
                      }`}
                    >
                      <input 
                        type="checkbox"
                        className="hidden"
                        checked={bookingData.selectedServices.includes(service.id)}
                        onChange={() => handleServiceToggle(service.id)}
                      />
                      <div className="flex-1">
                        <h4 className="font-bold text-stone-950 uppercase tracking-widest text-sm mb-1">{service.title}</h4>
                        <p className="text-xs text-stone-400 serif-text italic">{service.description}</p>
                      </div>
                      <div className={`w-5 h-5 border flex items-center justify-center transition-colors ${
                        bookingData.selectedServices.includes(service.id) ? 'bg-emerald-900 border-emerald-900 text-white' : 'border-stone-200'
                      }`}>
                        {bookingData.selectedServices.includes(service.id) && <span className="text-[10px]">✓</span>}
                      </div>
                    </label>
                  ))}
                </div>
                <div className="flex gap-6 mt-16">
                  <button type="button" onClick={prevStep} className="flex-1 border border-stone-200 text-stone-500 py-5 font-bold text-xs uppercase tracking-widest hover:border-stone-400 transition-all">Return</button>
                  <button 
                    type="button" 
                    onClick={nextStep}
                    disabled={bookingData.selectedServices.length === 0}
                    className="flex-[2] bg-emerald-900 text-white py-5 font-bold text-xs uppercase tracking-[0.4em] shadow-xl hover:bg-black transition-all active:scale-95 disabled:bg-stone-200"
                  >
                    Confirm Services
                  </button>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="animate-fade-in">
                <h2 className="text-3xl font-bold text-stone-950 mb-12 brand-font">Personal Particulars</h2>
                <form onSubmit={handleSubmit} className="space-y-10 mb-16">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                      <div>
                          <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-[0.4em] mb-4">Full Name</label>
                          <input 
                            type="text"
                            required
                            className={`w-full p-4 border-b bg-transparent outline-none transition-all serif-text text-xl ${
                              touched.contactName && errors.contactName ? 'border-red-500 text-red-500' : 'border-stone-100 focus:border-emerald-900'
                            }`}
                            value={bookingData.contactName}
                            onBlur={() => handleBlur('contactName')}
                            onChange={e => {
                              setBookingData({...bookingData, contactName: e.target.value});
                              if (touched.contactName) performValidation('contactName', e.target.value);
                            }}
                          />
                          {touched.contactName && errors.contactName && <p className="text-red-500 text-[9px] uppercase tracking-widest font-bold mt-2">{errors.contactName}</p>}
                      </div>
                      <div>
                          <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-[0.4em] mb-4">Contact Phone</label>
                          <input 
                            type="tel"
                            required
                            placeholder="416-555-0198"
                            className={`w-full p-4 border-b bg-transparent outline-none transition-all serif-text text-xl ${
                              touched.phone && errors.phone ? 'border-red-500 text-red-500' : 'border-stone-100 focus:border-emerald-900'
                            }`}
                            value={bookingData.phone}
                            onBlur={() => handleBlur('phone')}
                            onChange={e => {
                              setBookingData({...bookingData, phone: e.target.value});
                              if (touched.phone) performValidation('phone', e.target.value);
                            }}
                          />
                          {touched.phone && errors.phone && <p className="text-red-500 text-[9px] uppercase tracking-widest font-bold mt-2">{errors.phone}</p>}
                      </div>
                   </div>

                   <div>
                      <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-[0.4em] mb-4">Email Address</label>
                      <input 
                        type="email"
                        required
                        placeholder="studio@client.com"
                        className={`w-full p-4 border-b bg-transparent outline-none transition-all serif-text text-xl ${
                          touched.email && errors.email ? 'border-red-500 text-red-500' : 'border-stone-100 focus:border-emerald-900'
                        }`}
                        value={bookingData.email}
                        onBlur={() => handleBlur('email')}
                        onChange={e => {
                          setBookingData({...bookingData, email: e.target.value});
                          if (touched.email) performValidation('email', e.target.value);
                        }}
                      />
                      {touched.email && errors.email && <p className="text-red-500 text-[9px] uppercase tracking-widest font-bold mt-2">{errors.email}</p>}
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                      <div className="md:col-span-2">
                          <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-[0.4em] mb-4">Street Address</label>
                          <input 
                            type="text"
                            required
                            className={`w-full p-4 border-b bg-transparent outline-none transition-all serif-text text-xl ${
                              touched.address && errors.address ? 'border-red-500 text-red-500' : 'border-stone-100 focus:border-emerald-900'
                            }`}
                            value={bookingData.address}
                            onBlur={() => handleBlur('address')}
                            onChange={e => {
                              setBookingData({...bookingData, address: e.target.value});
                              if (touched.address) performValidation('address', e.target.value);
                            }}
                          />
                          {touched.address && errors.address && <p className="text-red-500 text-[9px] uppercase tracking-widest font-bold mt-2">{errors.address}</p>}
                      </div>
                      <div>
                          <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-[0.4em] mb-4">Postal Code</label>
                          <input 
                            type="text"
                            required
                            className={`w-full p-4 border-b bg-transparent outline-none transition-all serif-text text-xl uppercase tracking-widest ${
                              touched.postalCode && errors.postalCode ? 'border-red-500 text-red-500' : 'border-stone-100 focus:border-emerald-900'
                            }`}
                            value={bookingData.postalCode}
                            onBlur={() => handleBlur('postalCode')}
                            onChange={e => {
                              setBookingData({...bookingData, postalCode: e.target.value});
                              if (touched.postalCode) performValidation('postalCode', e.target.value);
                            }}
                          />
                          {touched.postalCode && errors.postalCode && <p className="text-red-500 text-[9px] uppercase tracking-widest font-bold mt-2">{errors.postalCode}</p>}
                      </div>
                   </div>

                  <div className="flex gap-6">
                    <button type="button" onClick={prevStep} className="flex-1 border border-stone-200 text-stone-500 py-5 font-bold text-xs uppercase tracking-widest hover:border-stone-400 transition-all">Return</button>
                    <button 
                      type="submit"
                      disabled={isSubmitting || !isStepValid()}
                      className="flex-[2] bg-emerald-950 text-white py-5 font-bold text-xs uppercase tracking-[0.4em] shadow-2xl hover:bg-black transition-all active:scale-95 disabled:bg-stone-200 flex items-center justify-center"
                    >
                      {isSubmitting ? (
                        <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      ) : (initialType === 'quotation' ? 'Submit Quote Request' : 'Commit Inquiry')}
                    </button>
                  </div>
                </form>
                <p className="text-center text-[10px] text-stone-300 uppercase tracking-[0.2em] mt-10">Confidentiality Assured • Est. 1998 • SQLite Powered</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
