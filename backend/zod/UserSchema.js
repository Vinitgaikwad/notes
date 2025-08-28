const zod = require('zod');

const UserInfoSchema = zod.object({
    username: zod.string().min(3, "Cannot Be Empty!").transform((val) => val.trim()),
    password: zod.string().min(8, "Value min should be 8").transform((val) => val.trim())
        .refine((val) => /[A-Z]/.test(val), {
            message: "Password must contain at least one uppercase letter",
        })
        .refine((val) => /[0-9]/.test(val), {
            message: "Password must contain at least one number",
        })
        .refine((val) => /[^A-Za-z0-9]/.test(val), {
            message: "Password must contain at least one special character",
        })
});

module.exports = UserInfoSchema;