import {
    HttpException,
    HttpStatus,
  } from '@nestjs/common';
  
  export const Request400 = (message: string) => {
    throw new HttpException(message, HttpStatus.BAD_REQUEST);
  };
  
  export const Request200 = (message: string) => {
    throw new HttpException(message, HttpStatus.OK);
  };
  
  export const Request201 = (message: string) => {
    throw new HttpException(message, HttpStatus.CREATED);
  };
  
  export const ConflictExeption = (message: string) => {
    throw new HttpException(message, HttpStatus.CONFLICT);
  };
  
  export const UnAuthorized401 = (message: string) => {
    throw new HttpException(message, HttpStatus.UNAUTHORIZED);
  };
  export const NOTFOUND404 = (message: string) => {
    throw new HttpException(message, HttpStatus.NOT_FOUND);
  };