export interface Coordinates {
  lat: number;
  lng: number;
}

export interface AddProductPayload {
  name: string;
  city: string;
  lat: number;
  lng: number;
  description: string;
  categories: string;
  isProfit: boolean;
  WhatProfit: string;
  additionalInfo: string;
  imagePath: string;
  isConfirmed: string;
}

export interface OpenStreetAddress {
  city: string;
  country: string;
  neighbourhood: string;
  postcode: string;
  road: string;
}
