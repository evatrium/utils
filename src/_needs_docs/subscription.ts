
type UnSubscribeFunc = (subscription: Function) => void;

type ReturnedUnsubscriber = () => UnSubscribeFunc;

type SubscribeFunc = (subscriber: Function) => ReturnedUnsubscriber;

type PublishFunc = (...update: any[]) => void;

type CreateSubscription = () => [SubscribeFunc, PublishFunc, UnSubscribeFunc];

export const createSubscription: CreateSubscription = () => {
	let subs: Function[] = [];

	const unsub = (subscription: Function): any => {
		subs.splice(subs.indexOf(subscription) >>> 0, 1);
	};

	const sub = (subscriber: Function): ReturnedUnsubscriber => {
		subs.push(subscriber);
		return () => unsub(subscriber);
	};

	const pub = (...update: any[]) => {
		subs.slice().map(f => f(...update));
	};

	return [
		sub,
		pub,
		unsub
	];
};
