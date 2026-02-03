import { userRepository } from "./user.repository";

export const userService = {
    getUserWithRoles: async (userId: number) => {
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
};
