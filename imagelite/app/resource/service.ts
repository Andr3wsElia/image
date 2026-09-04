import { Image } from "./image";  

export class ImageService {
  baseURL: string = 'http://localhost:8080/images';

  async buscar(): Promise<Image[]> {
    const response = await fetch(this.baseURL);
    return  await response.json();
  }
}
// React Hook
export const useImageService = () => new ImageService();