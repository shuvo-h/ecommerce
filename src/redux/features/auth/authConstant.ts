

export const USER_ROLE = {
    ['IN-PROGRESS']:'in-progress',
    BLOCKED: "blocked"
} as const;
export type TUser_Role =  typeof USER_ROLE[keyof typeof USER_ROLE]