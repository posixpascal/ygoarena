"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authOptions = void 0;
const next_auth_1 = __importDefault(require("next-auth"));
const discord_1 = __importDefault(require("next-auth/providers/discord"));
const prisma_adapter_1 = require("@next-auth/prisma-adapter");
const prisma_1 = require("@/server/prisma");
const adapter = (0, prisma_adapter_1.PrismaAdapter)(prisma_1.prisma);
// Prisma adapter for NextAuth, optional and can be removed
exports.authOptions = {
    //secret: process.env.NEXTAUTH_SECRET,
    adapter,
    providers: [
        (0, discord_1.default)({
            clientId: process.env.DISCORD_CLIENT_ID,
            clientSecret: process.env.DISCORD_CLIENT_SECRET,
        }),
    ],
};
exports.default = (0, next_auth_1.default)(exports.authOptions);
