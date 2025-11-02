// composables/server/types.ts
export interface Vendor {
  id: number;
  name: string;
  contactEmail: string;
  category: string;
  rating: number;
}

export interface VendorCreateInput {
  name: string;
  contactEmail: string;
  category: string;
  rating: number;
}

export interface VendorUpdateInput {
  id: number;
  name?: string;
  contactEmail?: string;
  category?: string;
  rating?: number;
}

export interface VendorDeleteInput {
  id: number;
}

export interface VendorFilter {
  id?: number;
  name?: string;
  contactEmail?: string;
  category?: string;
  rating?: number;
  limit?: number;
  offset?: number;
}

export interface VendorSearchFilter {
  id?: string;
  name?: string;
  contactEmail?: string;
  category?: string;
  rating?: string;
}
