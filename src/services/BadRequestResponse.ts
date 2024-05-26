import { HttpException, HttpStatus } from "@nestjs/common"


export const BadRequest = (message: string) => {
    throw new HttpException( message, HttpStatus.BAD_REQUEST)
}
