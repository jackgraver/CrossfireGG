import { Request, Response } from "express";
import { userService } from "./user.service";
import { userRepository } from "./user.repository";
import { jwtUtils } from "../../lib/jwt";

export const userController = {
    signUp: async (req: Request, res: Response) => {
        try {
            const userData = req.body;
            const authResponse = await userService.signUp(userData);

            const accessToken = jwtUtils.generateAccessToken({
                userId: authResponse.user.id,
                username: authResponse.user.name,
                teamId: authResponse.user.team_id,
            });

            const refreshToken = jwtUtils.generateRefreshToken({
                userId: authResponse.user.id,
                tokenVersion: 0,
            });

            const isProduction = process.env.NODE_ENV === "production";
            const sameSiteValue = isProduction ? "strict" : "lax";
            const cookieOptions = {
                httpOnly: true,
                secure: isProduction,
                sameSite: sameSiteValue as "strict" | "lax",
                maxAge: 7 * 24 * 60 * 60 * 1000,
                path: "/",
            };

            res.cookie("accessToken", accessToken, {
                ...cookieOptions,
                maxAge: 15 * 60 * 1000,
            });
            res.cookie("refreshToken", refreshToken, cookieOptions);

            res.status(201).json(authResponse);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    },

    signIn: async (req: Request, res: Response) => {
        try {
            const credentials = req.body;
            console.log("credentials", credentials);
            const authResponse = await userService.signIn(credentials);

            const accessToken = jwtUtils.generateAccessToken({
                userId: authResponse.user.id,
                username: authResponse.user.name,
                teamId: authResponse.user.team_id,
            });

            const userFromDb = await userRepository.findById(
                authResponse.user.id
            );
            if (!userFromDb) {
                throw new Error("User not found");
            }

            const refreshToken = jwtUtils.generateRefreshToken({
                userId: authResponse.user.id,
                tokenVersion: userFromDb.token_version || 0,
            });

            const isProduction = process.env.NODE_ENV === "production";
            const sameSiteValue = isProduction ? "strict" : "lax";
            const cookieOptions = {
                httpOnly: true,
                secure: isProduction,
                sameSite: sameSiteValue as "strict" | "lax",
                path: "/",
            };

            res.cookie("accessToken", accessToken, {
                ...cookieOptions,
                maxAge: 15 * 60 * 1000,
            });
            res.cookie("refreshToken", refreshToken, {
                ...cookieOptions,
                maxAge: 7 * 24 * 60 * 60 * 1000,
            });

            res.json(authResponse);
        } catch (error: any) {
            res.status(401).json({ error: error.message });
        }
    },

    refresh: async (req: Request, res: Response) => {
        try {
            const refreshToken = req.cookies.refreshToken;
            if (!refreshToken) {
                return res
                    .status(401)
                    .json({ error: "Refresh token required" });
            }

            const authResponse = await userService.refreshToken(refreshToken);

            const accessToken = jwtUtils.generateAccessToken({
                userId: authResponse.user.id,
                username: authResponse.user.name,
                teamId: authResponse.user.team_id,
            });

            const newRefreshToken = authResponse.refreshToken!;

            const isProduction = process.env.NODE_ENV === "production";
            const sameSiteValue = isProduction ? "strict" : "lax";
            const cookieOptions = {
                httpOnly: true,
                secure: isProduction,
                sameSite: sameSiteValue as "strict" | "lax",
                path: "/",
            };

            res.cookie("accessToken", accessToken, {
                ...cookieOptions,
                maxAge: 15 * 60 * 1000,
            });
            res.cookie("refreshToken", newRefreshToken, {
                ...cookieOptions,
                maxAge: 7 * 24 * 60 * 60 * 1000,
            });

            res.json(authResponse);
        } catch (error: any) {
            res.status(401).json({ error: error.message });
        }
    },

    getUserRole: async (req: Request, res: Response) => {
        try {
            const userId = (req as any).user?.userId;
            if (!userId) {
                return res.status(401).json({ error: "Unauthorized" });
            }

            const user = await userService.getUserWithRoles(userId);
            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }

            res.json(user);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    },

    signOut: async (req: Request, res: Response) => {
        try {
            const userId = (req as any).user?.userId;
            if (userId) {
                await userService.signOut(userId);
            }

            res.clearCookie("accessToken", { path: "/" });
            res.clearCookie("refreshToken", { path: "/" });

            res.json({ message: "Signed out successfully" });
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    },
};
