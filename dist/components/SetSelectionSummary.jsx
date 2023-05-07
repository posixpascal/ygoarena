"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SetSelectionSummary = void 0;
const trpc_1 = require("@/utils/trpc");
const react_1 = __importStar(require("react"));
const router_1 = require("next/router");
const SetSelectionSummary = ({ readonly = false, setIds, setSelected }) => {
    const router = (0, router_1.useRouter)();
    const [sets, setSets] = (0, react_1.useState)([]);
    const { data, isLoading } = trpc_1.trpc.sets.summary.useQuery({
        setIds,
    }, {
        onSuccess(data) {
            setSets(data.sets);
        }
    });
    const handleSelection = async () => {
        const queryString = new URLSearchParams();
        queryString.append('sets', setIds.join('|'));
        await router.push('/arena/info?' + queryString.toString());
    };
    const totalCards = sets.reduce((acc, cur) => {
        return acc + cur._count.cards;
    }, 0);
    const removeSet = (set) => {
        setSelected(((sets) => [...sets.filter((s) => s !== set.id)]));
    };
    return <div className={`${readonly ? '' : 'h-full'}`}>
        <div>
            <h2 className={'text-2xl uppercase font-black text-sky-900'}>
                Selected Sets
            </h2>
            <p className={'text-sky-900 text-lg'}>
                Arena Mode with {totalCards} unique cards
            </p>
            {sets.map(set => {
            return <div className={'flex justify-between items-center py-4 gap-4'} key={set.id}>
                    <img alt={set.name} width={'52px'} src={set.image}/>
                    <div className={'flex-col flex flex-grow'}>
                        <h3 className={'text-lg text-sky-900 font-bold'}>
                            {set.name}
                        </h3>
                        <span className={'text-slate-800'}>
                                {set._count.cards} Cards
                        </span>
                    </div>
                    {!readonly && <button className={'text-red-500'} onClick={() => removeSet(set)}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                            <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd"/>
                        </svg>
                    </button>}
                </div>;
        })}
        </div>
    </div>;
};
exports.SetSelectionSummary = SetSelectionSummary;
