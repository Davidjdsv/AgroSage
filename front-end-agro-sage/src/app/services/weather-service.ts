// weather.service.ts
// Este servicio consulta la API de Open-Meteo para obtener datos del clima

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// Interfaz para tipar la respuesta de la API
interface WeatherResponse {
  latitude: number;
  longitude: number;
  hourly: {
    time: string[];              // Array de fechas en formato ISO
    temperature_2m: number[];    // Temperaturas por hora
    precipitation_probability: number[]; // Probabilidad de lluvia (%)
    precipitation: number[];     // Cantidad de precipitación (mm)
    weather_code: number[];      // Código del clima (ver tabla abajo)
  };
  hourly_units: {
    temperature_2m: string;
    precipitation: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  
  // URL base de la API de Open-Meteo
  private apiUrl = 'https://api.open-meteo.com/v1/forecast';
  private geocodeUrl = 'https://geocoding-api.open-meteo.com/v1/search';

  constructor(private http: HttpClient) {}

  /** Busca ciudad/región y devuelve lat/lon (primer resultado) */
  searchCity(name: string): Observable<{ name: string; lat: number; lon: number; label: string } | null> {
    const params = { name, count: '1', language: 'es', format: 'json' };
    return this.http.get<GeocodingAPIResponse>(this.geocodeUrl, { params }).pipe(
      map((resp) => {
        const r = resp?.results?.[0];
        if (!r) return null;
        const label = [r.name, r.admin1, r.country].filter(Boolean).join(', ');
        return { name: r.name, lat: r.latitude, lon: r.longitude, label };
      })
    );
  }

  /**
   * Obtiene el clima actual y pronóstico
   * @param lat - Latitud de la ubicación
   * @param lon - Longitud de la ubicación
   * @returns Observable con los datos del clima
   */
  getWeather(lat: number, lon: number): Observable<WeatherResponse> {
    // Parámetros de la consulta
    const params = {
      latitude: lat.toString(),
      longitude: lon.toString(),
      // Variables que queremos obtener (por hora)
      hourly: [
        'temperature_2m',           // Temperatura actual
        'precipitation_probability', // % de lluvia
        'precipitation',            // Cantidad de lluvia
        'weather_code',             // Código del clima
        'relative_humidity_2m',     // Humedad
        'wind_speed_10m'            // Velocidad del viento
      ].join(','),
      timezone: 'auto',  // Ajusta automáticamente la zona horaria
      forecast_days: 3   // Pronóstico para 3 días
    };

    // Hace la petición GET a la API
    return this.http.get<WeatherResponse>(this.apiUrl, { params });
  }

  /**
   * Obtiene la ubicación actual del usuario usando Geolocation API
   * @returns Promise con latitud y longitud
   */
  getCurrentLocation(): Promise<{ lat: number; lon: number }> {
    return new Promise((resolve, reject) => {
      // Verifica si el navegador soporta geolocalización
      if (!navigator.geolocation) {
        reject('Geolocalización no disponible en este navegador');
        return;
      }

      // Solicita la ubicación al usuario
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Éxito: devuelve las coordenadas
          resolve({
            lat: position.coords.latitude,
            lon: position.coords.longitude
          });
        },
        (error) => {
          // Error: maneja el problema
          reject(`Error obteniendo ubicación: ${error.message}`);
        }
      );
    });
  }

  /**
   * Interpreta el código del clima y devuelve una descripción
   * @param code - Código WMO del clima
   * @returns Descripción del clima en español
   */
  getWeatherDescription(code: number): string {
    const weatherCodes: { [key: number]: string } = {
      0: 'Cielo despejado',
      1: 'Principalmente despejado',
      2: 'Parcialmente nublado',
      3: 'Nublado',
      45: 'Neblina',
      48: 'Niebla con escarcha',
      51: 'Llovizna ligera',
      53: 'Llovizna moderada',
      55: 'Llovizna densa',
      61: 'Lluvia ligera',
      63: 'Lluvia moderada',
      65: 'Lluvia fuerte',
      71: 'Nevada ligera',
      73: 'Nevada moderada',
      75: 'Nevada fuerte',
      80: 'Chubascos ligeros',
      81: 'Chubascos moderados',
      82: 'Chubascos violentos',
      95: 'Tormenta eléctrica',
      96: 'Tormenta con granizo ligero',
      99: 'Tormenta con granizo fuerte'
    };

    return weatherCodes[code] || 'Clima desconocido';
  }

  /**
   * Verifica si va a llover en las próximas horas
   * @param precipitationProb - Array de probabilidades de lluvia
   * @param hoursAhead - Cuántas horas hacia adelante revisar (default: 6)
   * @returns true si hay probabilidad alta de lluvia (>50%)
   */
  willItRain(precipitationProb: number[], hoursAhead: number = 6): boolean {
    // Revisa las próximas 'hoursAhead' horas
    const nextHours = precipitationProb.slice(0, hoursAhead);
    
    // Si alguna hora tiene más de 50% de probabilidad, devuelve true
    return nextHours.some(prob => prob > 50);
  }
}

interface GeocodingAPIResponse {
  results?: Array<{
    name: string;
    latitude: number;
    longitude: number;
    country?: string;
    admin1?: string;
  }>;
}