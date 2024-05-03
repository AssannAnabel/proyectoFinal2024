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
    // el if comprueba si la extension es .csv, de no serlo entra
    if (!file.originalname.match(/\.csv$/)) {

        return cb(new HttpException({
            status: HttpStatus.BAD_REQUEST, error: `El archivo a subir debe ser de extension .csv`
        }, HttpStatus.BAD_REQUEST), false);
    }

    // Si el archivo tiene la extensión .csv, llamamos a cb sin errores
    cb(null, true);
};