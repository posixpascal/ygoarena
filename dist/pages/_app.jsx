"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("@/styles/globals.css");
const trpc_1 = require("@/utils/trpc");
const Layout_1 = require("@/components/Layout");
const react_1 = __importDefault(require("react"));
const react_2 = require("next-auth/react");
const App = ({ Component, pageProps, }) => {
    const content = <Component {...pageProps}/>;
    const page = Component.getLayout ? Component.getLayout(content) : <Layout_1.Layout>{content}</Layout_1.Layout>;
    return (<react_2.SessionProvider session={pageProps.session}>
            {page}
        </react_2.SessionProvider>);
};
App.getInitialProps = async ({ ctx }) => {
    const session = await (0, react_2.getSession)(ctx);
    if (!session) {
        return {
            session: null
        };
    }
    return {
        session: await (0, react_2.getSession)(ctx),
    };
};
exports.default = trpc_1.trpc.withTRPC(App);
