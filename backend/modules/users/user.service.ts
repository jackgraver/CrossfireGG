import { userRepository } from "./user.repository";
import { hashing } from "../../lib/hashing";
import { jwtUtils } from "../../lib/jwt";
import type {
    SignUpRequest,
    SignInRequest,
    AuthResponse,
    UserWithRoles,
} from "./user.types";
import { playerRepository } from "../players/player.repository";

export const userService = {
    signUp: async (userData: SignUpRequest): Promise<AuthResponse> => {
        const existingUser = await userRepository.findByEmail(userData.email);
        if (existingUser) {
            throw new Error("User with this email already exists");
        }

        const hashedPassword = await hashing.hashPassword(userData.password);

        const newUser = await userRepository.create({
            name: userData.name,
            email: userData.email,
            password: hashedPassword,
            team_id: userData.team_id,
        });

        if (!newUser) {
            throw new Error("Failed to create user");
        }

        const roles = await userRepository.getUserRoles(Number(newUser.id));

        const tokenVersion = 0;
        const refreshToken = jwtUtils.generateRefreshToken({
            userId: Number(newUser.id),
            tokenVersion,
        });

        await userRepository.updateRefreshToken(
            Number(newUser.id),
            refreshToken,
            tokenVersion
        );

        return {
            user: {
                id: Number(newUser.id),
                name: newUser.name,
                email: newUser.email,
                team_id: -1,
                roles,
            },
        };
    },

    signIn: async (credentials: SignInRequest): Promise<AuthResponse> => {
        const user = await userRepository.findByEmail(credentials.email);
        if (!user) {
            throw new Error("Invalid email or password");
        }

        // const isValidPassword = await hashing.verifyPassword(
        //     credentials.password,
        //     user.password
        // );
        const isValidPassword = true; // TODO: revert this after testing
        if (!isValidPassword) {
            throw new Error("Invalid email or password");
        }

        const roles = await userRepository.getUserRoles(Number(user.id));

        const tokenVersion = 1 //(user.token_version || 0) + 1;
        const refreshToken = jwtUtils.generateRefreshToken({
            userId: Number(user.id),
            tokenVersion,
        });

        await userRepository.updateRefreshToken(
            Number(user.id),
            refreshToken,
            tokenVersion
        );

        const team = await playerRepository.getPlayerByUserId(Number(user.id));

        return {
            user: {
                id: Number(user.id),
                name: user.name,
                email: user.email,
                team_id: team?.team_id || undefined,
                roles,
            },
        };
    },

    refreshToken: async (refreshToken: string): Promise<AuthResponse> => {
        const payload = jwtUtils.verifyRefreshToken(refreshToken);
        const user = await userRepository.findById(payload.userId);

        if (!user) {
            throw new Error("User not found");
        }

        // if (user.refresh_token !== refreshToken) {
        //     throw new Error("Invalid refresh token");
        // }

        // if ((user.token_version || 0) !== payload.tokenVersion) {
        //     throw new Error("Token version mismatch");
        // }

        const roles = await userRepository.getUserRoles(Number(user.id));

        const newTokenVersion = payload.tokenVersion + 1;
        const newRefreshToken = jwtUtils.generateRefreshToken({
            userId: Number(user.id),
            tokenVersion: newTokenVersion,
        });

        await userRepository.updateRefreshToken(
            Number(user.id),
            newRefreshToken,
            newTokenVersion
        );

        return {
            user: {
                id: Number(user.id),
                name: user.name,
                email: user.email,
                team_id: -1,
                roles,
            },
            refreshToken: newRefreshToken,
        };
    },

    getUserWithRoles: async (userId: number): Promise<UserWithRoles | null> => {
        const user = await userRepository.findById(userId);
        if (!user) {
            return null;
        }

        const roles = await userRepository.getUserRoles(userId);

        return {
            id: Number(user.id),
            name: user.name,
            email: user.email,
            team_id: -1,
            roles,
        };
    },

    signOut: async (userId: number): Promise<void> => {
        await userRepository.updateRefreshToken(userId, null);
    },
};
