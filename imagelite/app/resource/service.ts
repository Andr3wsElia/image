import { Image } from "./image";  

export class ImageService {

  baseURL: string = 'http://localhost:8080/images';

  async buscar(query: string = '', extension?: string): Promise<Image[]> {
    const url = `${this.baseURL}?query=${query}&extension=${extension}`
    const response = await fetch(url);
    return  await response.json();
  }
}
// React Hook
export const useImageService = () => new ImageService();