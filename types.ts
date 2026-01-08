
export interface Speaker {
  id: string;
  name: string;
  title: string;
  image: string;
  expertise?: string;
  description?: string;
}

export interface Guest {
  id: string;
  name: string;
  designation: string;
  bio: string;
  image: string;
}

export interface Event {
  id: string;
  title: string;
  date: string;
  description: string;
  image: string;
  benefits: string[];
}

export interface RegistrationData {
  id: string;
  fullName: string;
  gender: string;
  phone: string;
  email: string;
  city: string;
  state: string;
  
  organization: string;
  designation: string;
  orgType: string;
  orgTypeOther?: string;
  
  domains: string[];
  domainsOther?: string;
  
  ecosystemRole: string;
  purposes: string[];
  qucInterest: string;
  
  stallType: '4mx8m' | '6mx12m' | 'None';
  stallPrice: number;
  
  ticketCount: number;
  totalAmount: number;
  paymentStatus: 'PENDING' | 'PAID' | 'FAILED';
  paymentId?: string;
  registrationDate: string;
  checkedIn: boolean;
  ticketType: string;
}

export interface SponsorshipInquiry {
  id: string;
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  tier: string;
  budget: string;
  status: 'New' | 'Contacted' | 'Closed';
  date: string;
}

export interface VolunteerTask {
  id: string;
  title: string;
  description: string;
  assignedTime: string;
  status: 'Pending' | 'Complete';
}
