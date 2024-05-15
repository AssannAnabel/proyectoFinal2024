import { HttpException, HttpStatus } from "@nestjs/common";

export const renameFile = (req, file, cb) => {
    const name = file.originalname.split('.')[0];
    const fileName = file.originalname
    const randomName = Array(4)
        .fill(null)
        .map(() => Math.round(Math.random() * 16).toString(16))
        .join('')

    console.log(`${randomName}-${fileName}`);

    cb(null, `${randomName}-${fileName}`);
}

export const fileFilter = (req, file, cb) => {
    // El regex comprueba si la extensión es .csv, .jpg, .jpeg, .png o .gif
    if (!file.originalname.match(/\.(csv|jpg|jpeg|png|gif)$/i)) {
        return cb(new HttpException({
            status: HttpStatus.BAD_REQUEST, error: 'El archivo a subir debe ser de extensión .csv, .jpg, .jpeg, .png o .gif'
        }, HttpStatus.BAD_REQUEST), false);
    }

    cb(null, true);
};


export const getThreeLetters = (word: string): string => {
    const extractWord = word.substring(0, 3);
    const randomName = Array(3)
        .fill(null)
        .map(() => Math.round(Math.random() * 16).toString(16))
        .join('')

    return `${extractWord}-${randomName}`
}