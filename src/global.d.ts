export type TTopics = "general" | "randam";

export interface ISendMsg {
    from: string;
    msg: string;
    topic: TTopics;
}
