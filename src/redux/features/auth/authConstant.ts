export const USER_STATUS = {
  ["IN-PROGRESS"]: "in-progress",
  BLOCKED: "blocked",
} as const;
export type TUser_STATUS = (typeof USER_STATUS)[keyof typeof USER_STATUS];


export const USER_ROLE = {
    USER: 'User',
    Manager: 'Manager',
  } as const; // never change the value

  export type TUSER_ROLE = typeof USER_ROLE[keyof typeof USER_ROLE] 