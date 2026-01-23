import jwt from "jsonwebtoken";
import { config } from "../config/env";

export interface JWTPayload {
    userId: number;
    username: string;
    teamId?: number;
    faceitId?: string;
}

export interface RefreshTokenPayload {
    userId: number;
    tokenVersion: number;
}

const ACCESS_TOKEN_SECRET =
    process.env.JWT_ACCESS_SECRET ||
    "your-access-secret-key-change-in-production";
const REFRESH_TOKEN_SECRET =
    process.env.JWT_REFRESH_SECRET ||
    "your-refresh-secret-key-change-in-production";
const ACCESS_TOKEN_EXPIRY: string = process.env.JWT_ACCESS_EXPIRY || "15m";
const REFRESH_TOKEN_EXPIRY: string = process.env.JWT_REFRESH_EXPIRY || "7d";

export const jwtUtils = {
    generateAccessToken: (payload: JWTPayload): string => {
        return jwt.sign(payload, ACCESS_TOKEN_SECRET, {
            expiresIn: ACCESS_TOKEN_EXPIRY,
        } as jwt.SignOptions);
    },

    generateRefreshToken: (payload: RefreshTokenPayload): string => {
        return jwt.sign(payload, REFRESH_TOKEN_SECRET, {
            expiresIn: REFRESH_TOKEN_EXPIRY,
        } as jwt.SignOptions);
    },

    verifyAccessToken: (token: string): JWTPayload => {
        try {
            return jwt.verify(token, ACCESS_TOKEN_SECRET) as JWTPayload;
        } catch (error) {
            throw new Error("Invalid or expired access token");
        }
    },

    verifyRefreshToken: (token: string): RefreshTokenPayload => {
        try {
            return jwt.verify(
                token,
                REFRESH_TOKEN_SECRET
            ) as RefreshTokenPayload;
        } catch (error) {
            throw new Error("Invalid or expired refresh token");
        }
    },
};
