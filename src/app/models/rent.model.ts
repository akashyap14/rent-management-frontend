export interface Rent {
    _id?: string;
    paymentDate: string;
    renterName: string;
    phone: string;
    monthPaidFor: string;
    yearPaidFor: number;
    rentAmount: number;
    electricityCharges: number;
    otherCharges: number;
    actualPaymentReceived: number;
    propertyType: string;
    paymentMode: string;
    comments: string;
    user?: { username: string}; // Optional field for the user who created the rent record
  }
  