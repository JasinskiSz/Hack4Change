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
