import { Injectable } from '@nestjs/common';
import { ConfigModel } from './../interfaces/config';
import { promises as fs } from 'fs';
import { join } from 'path';

@Injectable()
export class ConfigService {


  async getConfig():Promise<ConfigModel> {

    const fs = require('fs');

  try {
      const rawData = await fs.promises.readFile(join(__dirname, '..', '/static/data/configuracion.json'), 'utf-8');
      // Convierte la cadena JSON a un objeto
      const configuracion = JSON.parse(rawData);
    
      return configuracion;
    } catch (err) {
      console.error(err);
    }
  }


  async saveConfig(config: ConfigModel): Promise<boolean> {
    try {
      const contenido = JSON.stringify(config, null, 2);
      // await fs.writeFile('./src/data/configuracion.json', contenido);
      await fs.writeFile(join(__dirname, '..', '/static/data/configuracion.json'), contenido);

      return true;
    } catch (error) {
      throw new Error(`Error al guardar archivo de configuración: ${error.message}`);
      return false
    }
  };
  
}
