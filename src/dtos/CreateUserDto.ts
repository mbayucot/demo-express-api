// src/dtos/CreateUserDto.ts
import { IsEmail, IsString, MinLength } from "class-validator";
import { plainToInstance } from "class-transformer";

export class CreateUserDto {
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(6)
    password: string;
}

// middleware/validateDto.ts
import { validate } from "class-validator";
import { plainToInstance } from "class-transformer";
import { Request, Response, NextFunction } from "express";

export function validateDto(dto: any) {
    return async (req: Request, res: Response, next: NextFunction) => {
        const instance = plainToInstance(dto, req.body);
        const errors = await validate(instance);
        if (errors.length) {
            return res.status(400).json({ errors });
        }
        next();
    };
}