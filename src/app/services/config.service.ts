import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Config } from '../dto';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  config!: Config;

  constructor(private http: HttpClient) { }

  async loadConfig(): Promise<void> {
    let req = this.http.get<Config>('../../assets/config.json');

    const data = await lastValueFrom(req);
    
    this.config = data;
  }
}
