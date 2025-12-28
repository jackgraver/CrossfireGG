import { userRepository } from "./user.repository";
import { hashing } from "../../lib/hashing";
import { jwtUtils } from "../../lib/jwt";
import type {
    SignUpRequest,
    SignInRequest,
    AuthResponse,
    UserWithRoles,
} from "./user.types";

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

        const roles = await userRepository.getUserRoles(newUser.ID);

        const tokenVersion = 0;
        const refreshToken = jwtUtils.generateRefreshToken({
            userId: newUser.ID,
            tokenVersion,
        });

        await userRepository.updateRefreshToken(
            newUser.ID,
            refreshToken,
            tokenVersion
        );

        return {
            user: {
                id: newUser.ID,
                name: newUser.name,
                email: newUser.email,
                team_id: newUser.team_id || undefined,
                roles,
            },
        };
    },

    signIn: async (credentials: SignInRequest): Promise<AuthResponse> => {
        const user = await userRepository.findByEmail(credentials.email);
        if (!user) {
            throw new Error("Invalid email or password");
        }

        const isValidPassword = await hashing.verifyPassword(
            credentials.password,
            user.password
        );
        if (!isValidPassword) {
            throw new Error("Invalid email or password");
        }

        const roles = await userRepository.getUserRoles(user.ID);

        const tokenVersion = (user.token_version || 0) + 1;
        const refreshToken = jwtUtils.generateRefreshToken({
            userId: user.ID,
            tokenVersion,
        });

        await userRepository.updateRefreshToken(
            user.ID,
            refreshToken,
            tokenVersion
        );

        return {
            user: {
                id: user.ID,
                name: user.name,
                email: user.email,
                team_id: user.team_id || undefined,
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

        if (user.refresh_token !== refreshToken) {
            throw new Error("Invalid refresh token");
        }

        if ((user.token_version || 0) !== payload.tokenVersion) {
            throw new Error("Token version mismatch");
        }

        const roles = await userRepository.getUserRoles(user.ID);

        const newTokenVersion = payload.tokenVersion + 1;
        const newRefreshToken = jwtUtils.generateRefreshToken({
            userId: user.ID,
            tokenVersion: newTokenVersion,
        });

        await userRepository.updateRefreshToken(
            user.ID,
            newRefreshToken,
            newTokenVersion
        );

        return {
            user: {
                id: user.ID,
                name: user.name,
                email: user.email,
                team_id: user.team_id || undefined,
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
            id: user.ID,
            name: user.name,
            email: user.email,
            team_id: user.team_id || undefined,
            roles,
        };
    },

    signOut: async (userId: number): Promise<void> => {
        await userRepository.updateRefreshToken(userId, null);
    },
};

