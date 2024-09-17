import { Injectable } from '@nestjs/common';

@Injectable()
export class FileService {

    getHello(): string {
        return 'Hello World!';
     }
    async saveFile(file: File): Promise<void> {
        // Implement file saving logic here
        // console.log(`Saving file: ${file.name}`);
        console.log(file)
    }
}
