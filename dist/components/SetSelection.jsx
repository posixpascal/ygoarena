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
exports.SetSelection = void 0;
const trpc_1 = require("@/utils/trpc");
const react_1 = __importStar(require("react"));
const usePaging_1 = require("@/hooks/usePaging");
const web_1 = require("@react-spring/web");
const SelectableCardSet_1 = require("@/components/SelectableCardSet");
const SetSelection = ({ query, selected, setSelected }) => {
    const [sets, setSets] = (0, react_1.useState)([]);
    const loadMoreRef = (0, react_1.useRef)(null);
    const { fetchNextPage, isLoading } = trpc_1.trpc.sets.list.useInfiniteQuery({
        name: query,
        limit: 20,
    }, {
        getNextPageParam: (lastPage) => lastPage.nextPage,
        initialCursor: 1,
        onSuccess(data) {
            setSets(() => ((data === null || data === void 0 ? void 0 : data.pages) || []).reduce((acc, page) => {
                let items = [];
                // Only add new items
                page.items.forEach(item => {
                    if (acc.find(set => set.id === item.id)) {
                        return;
                    }
                    items.push(item);
                });
                return [...acc, ...items];
            }, []));
        }
    });
    // Paginate the query on scroll
    (0, usePaging_1.usePaging)({ elementRef: loadMoreRef, onNextPage: fetchNextPage });
    const transition = (0, web_1.useTransition)(isLoading ? [] : sets, {
        from: { scale: 0, opacity: 0 },
        enter: { scale: 1, opacity: 1 },
        leave: { scale: 0, opacity: 0 },
    });
    const addSet = (set) => {
        setSelected((sets => [...sets, set.id]));
    };
    const removeSet = (set) => {
        setSelected((sets => [...sets.filter(s => s !== set.id)]));
    };
    if (isLoading) {
        return <div>
            Loading
        </div>;
    }
    return <div className={'relative h-full w-full'}>
        <div className={'grid grid-cols-4 gap-4'}>
            {sets.map((set) => {
            return <web_1.animated.div className={'h-full bg-white flex items-center justify-center rounded-xl'} key={set.id}>
                    <SelectableCardSet_1.SelectableCardSet set={set} selected={selected} addSet={addSet} removeSet={removeSet}/>
                </web_1.animated.div>;
        })}
        </div>
        {/*Load more sets on scroll */}
        <div className={'h-[30px]'} ref={loadMoreRef}/>
    </div>;
};
exports.SetSelection = SetSelection;
